import db from '../../ultis/db.js';

export default {
    findAll() {
        return db('tags');
    },
    findById(id) {
        return db('tags')
           .where('tag_id',id)
           .first();
    },
    add(entity) {
        return db('tags')
            .insert(entity)
            .then(() => {
                return db('tags')
                    .max('tag_id as id')
                    .first();
            })
            .then(result => {
                return result.id;  // Trả về tag_id của bản ghi mới
            });
    },
    patch(tag_id, entity) {
        return db('tags')
            .where('tag_id', tag_id)
            .update(entity);
    },
    del(tag_id) {
        return db('tags').where('tag_id', tag_id).del();
    },

}