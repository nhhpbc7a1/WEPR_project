import db from '../../ultis/db.js';

export default {
    findAll() {
        return db('articles')
            .join('categories', 'categories.category_id', 'articles.category_id')
            .join('writers', 'writers.writer_id', 'articles.writer_id');
    },
    findByID(ID) {
        return db('articles')
            .join('categories', 'categories.category_id', 'articles.category_id')
            .join('writers', 'writers.writer_id', 'articles.writer_id')
            .where('article_id', ID).first();
    },
    add(entity) {
        return db('articles').insert(entity);
    },
    findAllParentCategory() {
        return db('categories').whereNull('parent_category_id');
    },
    findAllChildCategory() {
        return db('categories as parents')
            .join('categories', 'parents.category_id', 'categories.parent_category_id');
    },
}