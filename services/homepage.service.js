import db from '../ultis/db.js';

export default {
    // 1. Hiển thị 3-4 bài viết nổi bật nhất trong tuần qua
    async getFeaturedArticlesThisWeek() {
        return await db('Articles as A')
            .select('A.title', 'C.category_name', 'A.published_date', 'A.image_url', 'A.article_id','A.category_id','A.is_premium')
            .join('Categories as C', 'A.category_id', 'C.category_id')
            .where('A.is_featured', true)
            .andWhere('A.published_date', '>=', db.raw('DATE_SUB(NOW(), INTERVAL 10000 DAY)'))
            .orderBy('A.published_date', 'desc')
            .limit(4);
    },

    // 2. Hiển thị 10 bài viết được xem nhiều nhất (mọi chuyên mục)
    async getMostViewedArticles() {
        return await db('Articles as A')
            .where('A.published_date', '>=', db.raw('DATE_SUB(NOW(), INTERVAL 10000 DAY)'))
            .select('A.title', 'C.category_name', 'A.published_date', 'A.image_url', 'A.article_id', 'A.abstract','A.category_id','A.is_premium')
            .count('V.view_id as view_count')
            .join('Categories as C', 'A.category_id', 'C.category_id')
            .leftJoin('Article_Views as V', 'A.article_id', 'V.article_id')
            .groupBy('A.article_id', 'A.title', 'C.category_name', 'A.published_date', 'A.image_url')
            .orderBy('view_count', 'desc')
            .limit(10);
    },

    // 3. Hiển thị 10 bài viết mới nhất (mọi chuyên mục)
    async getNewestArticles() {

        return await db('Articles as A')
            .where('A.published_date', '>=', db.raw('DATE_SUB(NOW(), INTERVAL 10000 DAY)'))
            .select('A.title', 'C.category_name', 'A.published_date', 'A.image_url', 'A.article_id', 'A.abstract','A.category_id','A.is_premium')
            .join('Categories as C', 'A.category_id', 'C.category_id')
            .orderBy('A.published_date', 'desc')
            .limit(10);
    },

    // 4. Hiển thị top 10 chuyên mục, mỗi chuyên mục 1 bài mới nhất
    async getNewestArticleInEachCategory() {

        const subquery = db('Articles')
            .select('category_id')
            .max('published_date as max_date')
            .groupBy('category_id');

        return await db('Articles as A')
            .where('A.published_date', '>=', db.raw('DATE_SUB(NOW(), INTERVAL 10000 DAY)'))
            .select('A.title', 'C.category_name', 'A.published_date', 'A.image_url', 'A.article_id', 'A.abstract','A.category_id','A.is_premium')
            .join('Categories as C', 'A.category_id', 'C.category_id')
            .whereIn(['A.category_id', 'A.published_date'], subquery)
            .orderBy('C.category_name', 'asc')
            .limit(10);
    }
};
