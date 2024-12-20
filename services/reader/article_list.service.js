import db from '../../ultis/db.js';

export default {
  async findAll() {
    try {
      let articles = await db('Articles')
        .leftJoin('Comments', 'Articles.article_id', 'Comments.article_id')
        .select(
          'Articles.*',
          'Articles.published_date',
          db.raw('COUNT(Comments.comment_id) as commentsCount')
        )
        .groupBy('Articles.article_id');
      for (let article of articles)
        article.tags = await db('tags').join('Article_tags', 'article_tags.tag_id', 'tags.tag_id').where('article_tags.article_id', article.article_id);
      return articles;
    } catch (error) {
      console.error('Error fetching articles with tags and comments count:', error);
      throw new Error('Unable to fetch articles with tags and comments count');
    }
  },
  async countByCategoryId(categoryId) {
    try {
      const result = await db('Articles')
        .where('category_id', categoryId)
        .count('* as total')
        .first();
      return result;
    } catch (error) {
      console.error('Error counting articles by category:', error);
      throw new Error('Unable to count articles by category');
    }
  },
  async findPageByCategoryId(categoryId, limit, offset) {
    try {
      const articles = await db('Articles')
        .leftJoin('Comments', 'Articles.article_id', 'Comments.article_id')
        .select(
          'Articles.*',
          db.raw('COUNT(Comments.comment_id) as commentsCount')
        )
        .where('Articles.category_id', categoryId)
        .groupBy('Articles.article_id')
        .limit(limit)
        .offset(offset);

      for (let article of articles)
        article.tags = await db('tags').join('Article_tags', 'article_tags.tag_id', 'tags.tag_id').where('article_tags.article_id', article.article_id);
      return articles;

    } catch (error) {
      console.error('Error fetching paginated articles by category:', error);
      throw new Error('Unable to fetch paginated articles by category');
    }
  },
  async countAll() {
    try {
      const result = await db('Articles').count('* as total').first();
      return result.total;
    } catch (error) {
      console.error('Error counting all articles', error);
      throw new Error('Unable to count articles');
    }
  },
  async findPageAll(limit, offset) {
    try {
      const articles = await db('Articles')
        .leftJoin('Comments', 'Articles.article_id', 'Comments.article_id')
        .select(
          'Articles.*',
          db.raw('COUNT(Comments.comment_id) as commentsCount')
        )
        .groupBy('Articles.article_id')
        .limit(limit)
        .offset(offset);
      for (let article of articles)
        article.tags = await db('tags').join('Article_tags', 'article_tags.tag_id', 'tags.tag_id').where('article_tags.article_id', article.article_id);
      return articles;

    } catch (error) {
      console.error('Error fetching paginated articles without category:', error);
      throw new Error('Unable to fetch paginated articles');
    }
  },
  async searchArticlesByTitleCount(title) {
    try {
      const result = await db('Articles')
        .where('Articles.title', 'like', `%${title}%`)
        .count('* as total')
        .first();
      return result.total;
    } catch (error) {
      console.error('Error counting articles by search title:', error);
      throw new Error('Unable to count articles by search title');
    }
  },
  async findPageBySearchTitle(title, limit, offset) {
    try {
      // Truy vấn danh sách bài viết và đếm số lượng bình luận
      const articles = await db('Articles')
        .leftJoin('Comments', 'Articles.article_id', 'Comments.article_id')
        .select(
          'Articles.*',
          db.raw('COUNT(Comments.comment_id) as commentsCount')
        )
        .where('Articles.title', 'like', `%${title}%`)
        .groupBy('Articles.article_id') // Đảm bảo GROUP BY cho COUNT
        .limit(limit)
        .offset(offset);

      if (articles.length === 0) {
        return [];
      }

      // Lấy tất cả article_id từ danh sách bài viết
      const articleIds = articles.map(article => article.article_id);

      // Truy vấn tất cả tags liên quan đến các bài viết
      const tags = await db('tags')
        .join('Article_tags', 'Article_tags.tag_id', 'tags.tag_id')
        .whereIn('Article_tags.article_id', articleIds)
        .select('Article_tags.article_id', 'tags.tag_id', 'tags.tag_name'); // Lấy article_id, tag_id và tag_name

      // Gán tags vào từng bài viết
      articles.forEach(article => {
        article.tags = tags
          .filter(tag => tag.article_id === article.article_id)
          .map(tag => ({
            tag_id: tag.tag_id,
            tag_name: tag.tag_name
          })); // Tạo đối tượng tag gồm tag_id và tag_name
      });

      return articles;

    } catch (error) {
      console.error('Error fetching paginated articles by search title:', error);
      throw new Error('Unable to fetch paginated articles');
    }
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