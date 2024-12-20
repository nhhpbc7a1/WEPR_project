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
        article.tags = await db('tags').join('Article_tags','article_tags.tag_id','tags.tag_id').where('article_tags.article_id', article.article_id);
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
        article.tags = await db('tags').join('Article_tags','article_tags.tag_id','tags.tag_id').where('article_tags.article_id', article.article_id);
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
        article.tags = await db('tags').join('Article_tags','article_tags.tag_id','tags.tag_id').where('article_tags.article_id', article.article_id);
      return articles;

    } catch (error) {
      console.error('Error fetching paginated articles without category:', error);
      throw new Error('Unable to fetch paginated articles');
    }
  },
  async searchArticlesByTitleCount(title) {
    try {
      const result = await db('Articles')
        .leftJoin('Comments', 'Articles.article_id', 'Comments.article_id')
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
      const articles = await db('Articles')
        .leftJoin('Comments', 'Articles.article_id', 'Comments.article_id')
        .select(
          'Articles.*',
          db.raw('COUNT(Comments.comment_id) as commentsCount')
        )
        .where('Articles.title', 'like', `%${title}%`)
        .limit(limit)
        .offset(offset);
      for (let article of articles)
        article.tags = await db('tags').join('Article_tags','article_tags.tag_id','tags.tag_id').where('article_tags.article_id', article.article_id);
      return articles;

    } catch (error) {
      console.error('Error fetching paginated articles by search title:', error);
      throw new Error('Unable to fetch paginated articles');
    }
  }


}