import db from '../../ultis/db.js';

export default {
    findAll() {
        return db('articles')
            .join('categories', 'categories.category_id', 'articles.category_id')
            .leftJoin('users', 'users.user_id', 'articles.writer_id');
    },
    findByID(ID) {
        return db('articles')
            .join('categories', 'categories.category_id', 'articles.category_id')
            .leftJoin('users', 'user.user_id', 'articles.writer_id')
            .where('article_id', ID).first();
    },
    add(entity) {
        return db('articles').insert(entity);
    },
    patch(id, entity) {
        return db('articles')
           .where('article_id', id)
           .update(entity);
    },
    del(id) {
        return db('articles').where('articles.article_id', id).del();
    },
    findAllParentCategory() {
        return db('categories').whereNull('parent_category_id');
    },
    findAllChildCategory() {
        return db('categories as parents')
            .join('categories', 'parents.category_id', 'categories.parent_category_id');
    },
}