import db from '../ultis/db.js';

export default {
    findByUsername(username) {
        return db('users')
           .where('username', username)
           .first();
    },
    findByEmail(email) {
        return db('users')
           .where('email', email)
           .first();
    },

    findUserByUserID(user_id) {
        return db('users')
           .where('user_id', user_id)
           .first();
    },
    add_user(entity) {
        return db('users')
            .insert(entity)
            .then(() => {
                return db('users')
                   .max('user_id as id')
                   .first();
            })
           .then(result => {
                return result.id;  // Trả về user_id của bản ghi mới
            });
    },
    editUserByID(id, entity) {
        return db('users')
           .where('user_id', id)
           .update(entity);
    }
};