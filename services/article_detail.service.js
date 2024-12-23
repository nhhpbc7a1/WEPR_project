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
            .select('A.title', 'C.category_name', 'A.published_date', 'A.image_url', 'A.article_id', 'A.abstract', 'A.category_id', 'A.is_premium')
            .join('Categories as C', 'A.category_id', 'C.category_id')
            .orderBy('A.published_date', 'desc')
            .limit(5);
    },
    add_article_view(entity) {
        return db('Article_views').insert(entity);
    },
    async getSimilarArticles(category_id, limit) {
        try {
            const articles = await db('Articles')
                .where('Articles.status', 'published')
                .andWhere('Articles.published_date', '>=', db.raw('DATE_SUB(NOW(), INTERVAL 10000 DAY)'))
                .where('Articles.category_id', category_id)
                .leftJoin('Comments', 'Articles.article_id', 'Comments.article_id')
                .leftJoin('Article_Views', 'Articles.article_id', 'Article_Views.article_id') // Thêm leftJoin với Article_Views
                .select(
                    'Articles.*',
                    db.raw('COUNT(DISTINCT Comments.comment_id) as comment_count'),
                    db.raw('COUNT(DISTINCT Article_Views.view_id) as view_count') // Thêm đếm số lượt view
                )
                .groupBy('Articles.article_id')
                .orderBy('Articles.is_premium', 'desc')
                .orderBy('Articles.published_date', 'desc')
                .limit(limit);

            for (let article of articles)
                article.tags = await db('tags').join('Article_tags', 'article_tags.tag_id', 'tags.tag_id').where('article_tags.article_id', article.article_id);
            return articles;

        } catch (error) {
            console.error('Error fetching paginated articles by category:', error);
            throw new Error('Unable to fetch paginated articles by category');
        }
    },
}