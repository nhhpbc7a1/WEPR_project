import db from '../../ultis/db.js';

export default {
    findAll() {
        return db('categories')
            .leftJoin('categories as parent', 'categories.parent_category_id', 'parent.category_id')
            .select(
                'categories.category_id',
                'categories.category_name',
                'categories.parent_category_id',
                'parent.category_name as parent_category_name'
            );
    },
    findAllParentCategory() {
        return db('categories').whereNull('parent_category_id');
    },

    findById(id) {
        return db('categories')
            .where('category_id', id)
            .first();
    },
    add(entity) {
        return db('categories')
            .insert(entity)
            .then(() => {
                return db('categories')
                    .max('category_id as id')
                    .first();
            })
            .then(result => {
                return result.id;  // Trả về category_id của bản ghi mới
            });
    },
    patch(category_id, entity) {
        return db('categories')
            .where('category_id', category_id)
            .update(entity);
    },
    del(category_id) {
        return db('categories').where('category_id', category_id).del();
    },

}