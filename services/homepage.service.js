import db from '../ultis/db.js';

export default {
    // 1. Hiển thị 3-4 bài viết nổi bật nhất trong tuần qua
    async getFeaturedArticlesThisWeek() {
        return [
            {
                title: 'Science and the Universe',
                category_name: 'Science',
                published_date: new Date('2024-10-05T04:30:00.000Z'),
                image_href: '/1/main.jpg'
            },
            {
                title: 'The Future of Technology',
                category_name: 'Technology',
                published_date: new Date('2024-10-01T03:00:00.000Z'),
                image_href: '/2/main.jpg'
            },
            {
                title: 'Health Tips for 2024',
                category_name: 'Health',
                published_date: new Date('2024-09-20T02:00:00.000Z'),
                image_href: '/3/main.jpg'
            },
        ];
        return await db('Articles as A')
            .select('A.title', 'C.category_name', 'A.published_date', 'I.image_href')
            .join('Categories as C', 'A.category_id', 'C.category_id')
            .join('Images as I', 'A.image_id', 'I.image_id')
            .where('A.is_featured', true)
            .andWhere('A.published_date', '>=', db.raw('DATE_SUB(NOW(), INTERVAL 10000 DAY)'))
            .orderBy('A.published_date', 'desc')
            .limit(4);
    },

    // 2. Hiển thị 10 bài viết được xem nhiều nhất (mọi chuyên mục)
    async getMostViewedArticles() {
        return [
            {
                title: 'Science and the Universe',
                category_name: 'Science',
                published_date: new Date('2024-10-05T04:30:00.000Z'),
                image_href: '/1/main.jpg'
            },
            {
                title: 'The Future of Technology',
                category_name: 'Technology',
                published_date: new Date('2024-10-01T03:00:00.000Z'),
                image_href: '/2/main.jpg'
            },
            {
                title: 'Health Tips for 2024',
                category_name: 'Health',
                published_date: new Date('2024-09-20T02:00:00.000Z'),
                image_href: '/3/main.jpg'
            },
            {
                title: 'Science and the Universe',
                category_name: 'Science',
                published_date: new Date('2024-10-05T04:30:00.000Z'),
                image_href: '/1/main.jpg'
            },
            {
                title: 'The Future of Technology',
                category_name: 'Technology',
                published_date: new Date('2024-10-01T03:00:00.000Z'),
                image_href: '/2/main.jpg'
            },
            {
                title: 'Health Tips for 2024',
                category_name: 'Health',
                published_date: new Date('2024-09-20T02:00:00.000Z'),
                image_href: '/3/main.jpg'
            },
            {
                title: 'Science and the Universe',
                category_name: 'Science',
                published_date: new Date('2024-10-05T04:30:00.000Z'),
                image_href: '/1/main.jpg'
            },
            {
                title: 'The Future of Technology',
                category_name: 'Technology',
                published_date: new Date('2024-10-01T03:00:00.000Z'),
                image_href: '/2/main.jpg'
            },
            {
                title: 'Health Tips for 2024',
                category_name: 'Health',
                published_date: new Date('2024-09-20T02:00:00.000Z'),
                image_href: '/3/main.jpg'
            },
            {
                title: 'Science and the Universe',
                category_name: 'Science',
                published_date: new Date('2024-10-05T04:30:00.000Z'),
                image_href: '/1/main.jpg'
            },

        ];
            return await db('Articles as A')
            .select('A.title', 'C.category_name', 'A.published_date', 'I.image_href')
            .count('V.view_id as view_count')
            .join('Categories as C', 'A.category_id', 'C.category_id')
            .join('Images as I', 'A.image_id', 'I.image_id')
            .leftJoin('Article_Views as V', 'A.article_id', 'V.article_id')
            .groupBy('A.article_id', 'A.title', 'C.category_name', 'A.published_date', 'I.image_href')
            .orderBy('view_count', 'desc')
            .limit(10);
    },

    // 3. Hiển thị 10 bài viết mới nhất (mọi chuyên mục)
    async getNewestArticles() {
        return [
            {
                title: 'Science and the Universe',
                category_name: 'Science',
                published_date: new Date('2024-10-05T04:30:00.000Z'),
                image_href: '/1/main.jpg'
            },
            {
                title: 'The Future of Technology',
                category_name: 'Technology',
                published_date: new Date('2024-10-01T03:00:00.000Z'),
                image_href: '/2/main.jpg'
            },
            {
                title: 'Health Tips for 2024',
                category_name: 'Health',
                published_date: new Date('2024-09-20T02:00:00.000Z'),
                image_href: '/3/main.jpg'
            },
            {
                title: 'Science and the Universe',
                category_name: 'Science',
                published_date: new Date('2024-10-05T04:30:00.000Z'),
                image_href: '/1/main.jpg'
            },
            {
                title: 'The Future of Technology',
                category_name: 'Technology',
                published_date: new Date('2024-10-01T03:00:00.000Z'),
                image_href: '/2/main.jpg'
            },
            {
                title: 'Health Tips for 2024',
                category_name: 'Health',
                published_date: new Date('2024-09-20T02:00:00.000Z'),
                image_href: '/3/main.jpg'
            },
            {
                title: 'Science and the Universe',
                category_name: 'Science',
                published_date: new Date('2024-10-05T04:30:00.000Z'),
                image_href: '/1/main.jpg'
            },
            {
                title: 'The Future of Technology',
                category_name: 'Technology',
                published_date: new Date('2024-10-01T03:00:00.000Z'),
                image_href: '/2/main.jpg'
            },
            {
                title: 'Health Tips for 2024',
                category_name: 'Health',
                published_date: new Date('2024-09-20T02:00:00.000Z'),
                image_href: '/3/main.jpg'
            },
            {
                title: 'Science and the Universe',
                category_name: 'Science',
                published_date: new Date('2024-10-05T04:30:00.000Z'),
                image_href: '/1/main.jpg'
            },

        ];

        return await db('Articles as A')
            .select('A.title', 'C.category_name', 'A.published_date', 'I.image_href')
            .join('Categories as C', 'A.category_id', 'C.category_id')
            .join('Images as I', 'A.image_id', 'I.image_id')
            .orderBy('A.published_date', 'desc')
            .limit(10);
    },

    // 4. Hiển thị top 10 chuyên mục, mỗi chuyên mục 1 bài mới nhất
    async getNewestArticleInEachCategory() {
        return [
            {
                title: 'Science and the Universe',
                category_name: 'Science',
                published_date: new Date('2024-10-05T04:30:00.000Z'),
                image_href: '/1/main.jpg'
            },
            {
                title: 'The Future of Technology',
                category_name: 'Technology',
                published_date: new Date('2024-10-01T03:00:00.000Z'),
                image_href: '/2/main.jpg'
            },
            {
                title: 'Health Tips for 2024',
                category_name: 'Health',
                published_date: new Date('2024-09-20T02:00:00.000Z'),
                image_href: '/3/main.jpg'
            },
            {
                title: 'Science and the Universe',
                category_name: 'Science',
                published_date: new Date('2024-10-05T04:30:00.000Z'),
                image_href: '/1/main.jpg'
            },
            {
                title: 'The Future of Technology',
                category_name: 'Technology',
                published_date: new Date('2024-10-01T03:00:00.000Z'),
                image_href: '/2/main.jpg'
            },
            {
                title: 'Health Tips for 2024',
                category_name: 'Health',
                published_date: new Date('2024-09-20T02:00:00.000Z'),
                image_href: '/3/main.jpg'
            },
            {
                title: 'Science and the Universe',
                category_name: 'Science',
                published_date: new Date('2024-10-05T04:30:00.000Z'),
                image_href: '/1/main.jpg'
            },
            {
                title: 'The Future of Technology',
                category_name: 'Technology',
                published_date: new Date('2024-10-01T03:00:00.000Z'),
                image_href: '/2/main.jpg'
            },
            {
                title: 'Health Tips for 2024',
                category_name: 'Health',
                published_date: new Date('2024-09-20T02:00:00.000Z'),
                image_href: '/3/main.jpg'
            },
            {
                title: 'Science and the Universe',
                category_name: 'Science',
                published_date: new Date('2024-10-05T04:30:00.000Z'),
                image_href: '/1/main.jpg'
            },

        ];

        const subquery = db('Articles')
            .select('category_id')
            .max('published_date as max_date')
            .groupBy('category_id');

        return await db('Articles as A')
            .select('A.title', 'C.category_name', 'A.published_date', 'I.image_href')
            .join('Categories as C', 'A.category_id', 'C.category_id')
            .join('Images as I', 'A.image_id', 'I.image_id')
            .whereIn(['A.category_id', 'A.published_date'], subquery)
            .orderBy('C.category_name', 'asc')
            .limit(10);
    }
};
