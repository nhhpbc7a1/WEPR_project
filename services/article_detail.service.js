import db from '../ultis/db.js';
export default {
    findAll() {
        return db('Articles');
    },
    findArticleById(id) {
        return db('Articles')
            .join('Categories', 'Categories.category_id', 'Articles.category_id')
            .join('users', 'users.user_id', 'Articles.writer_id')
            .where('article_id', id)
            .first();
    },
    findParentCategory(category_id) {
        return db('Categories')
            .where('category_id', category_id)
            .first();
    },
    findCommentByArticleId(id) {
        return db('Comments').where('article_id', id);
    },
    findTagByArticleId(id) {
        return db('Tags')
            .join('Article_tags', 'Tags.tag_id', 'Article_tags.tag_id')
            .where('article_id', id)
    },
    addComment(entity) {
        return db('Comments').insert(entity);
    },
    async getNewestArticles() {
        return await db('Articles as A')
            .where('A.published_date', '>=', db.raw('DATE_SUB(NOW(), INTERVAL 10000 DAY)'))
            .select('A.title', 'C.category_name', 'A.published_date', 'A.image_url', 'A.article_id', 'A.abstract', 'A.category_id')
            .join('Categories as C', 'A.category_id', 'C.category_id')
            .orderBy('A.published_date', 'desc')
            .limit(5);
    },


}