import db from '../../ultis/db.js';

export default {
    findAll() {
        return db('users')
            .join('roles', 'roles.role_id', 'users.role_id');
    },
    add(entity) {
        return db('users')
            .insert(entity)
            .then(() => {
                return db('users')
                    .max('user_id as id')
                    .first();
            })
            .then(result => {
                return result.id;  // Trả về category_id của bản ghi mới
            });
    },
    getAllCategories() {
        return db('categories');
    },
    async updateAssignments(editor_id, category_id_list) {
        await db('assignments').where('editor_id', editor_id).del();
        category_id_list.forEach(async (category_id) => {
            const newAssignment = {
                editor_id: editor_id,
                category_id: category_id,
            };
            await db('assignments').insert(newAssignment);
        });
    },
    findUserByID(id) {
        return db('users')
            .where('user_id', id)
            .first();
    },
    getOldCategoriesOfEditor(id) {
        return db('assignments')
            .where('editor_id', id)
            .join('categories', 'categories.category_id', 'assignments.category_id')
            .select('categories.category_id', 'categories.category_name');
    },
    edit(id, entity) {
        return db('users')
            .where('user_id', id)
            .update(entity);
    },
    async addSubscriptionDays(userId, daysToAdd = 7) { // Default to 7 days
        if (!Number.isInteger(userId) || userId <= 0) {
            throw new Error('Invalid user ID');
        }

        try {
            await db.transaction(async trx => { // Using a transaction
                const user = await trx('users') // Use trx instead of db
                    .where('user_id', userId)
                    .first();

                if (!user) {
                    throw new Error('User not found');
                }

                const { subscription_expiration } = user;
                let startDate = new Date();

                if (subscription_expiration && subscription_expiration > startDate) {
                    startDate = new Date(subscription_expiration);
                }

                const newExpirationDate = new Date(startDate);
                newExpirationDate.setDate(startDate.getDate() + daysToAdd);

                await trx('users') // Use trx instead of db
                    .where('user_id', userId)
                    .update({ subscription_expiration: newExpirationDate });
            });

        } catch (error) {
            console.error('Error adding subscription days:', error);
            throw new Error('Failed to add subscription days');
        }
    }
}