import db from '../../ultis/db.js';

export default {
    async findAll() {
        try {
            return await db('Articles')
                .leftJoin('Article_Tags', 'Articles.article_id', 'Article_Tags.article_id')
                .leftJoin('Tags', 'Article_Tags.tag_id', 'Tags.tag_id')
                .leftJoin('Comments', 'Articles.article_id', 'Comments.article_id') // Thêm bảng Comments để đếm
                .select(
                    'Articles.*',
                    'Articles.published_date',
                    'Tags.tag_id',
                    'Tags.tag_name',
                    db.raw('COUNT(Comments.comment_id) as commentsCount') // Đếm tổng số bình luận
                )
                .groupBy('Articles.article_id', 'Tags.tag_id', 'Tags.tag_name'); // Nhóm theo article_id và tag_id để tránh xung đột
        } catch (error) {
            console.error('Error fetching articles with tags and comments count:', error);
            throw new Error('Unable to fetch articles with tags and comments count');
        }
    }
}