import db from '../../ultis/db.js';

export default {
  async findAll() {
    try {
      let articles = await db('Articles')
        .where('Articles.status', 'published')
        .andWhere('Articles.published_date', '>=', db.raw('DATE_SUB(NOW(), INTERVAL 10000 DAY)'))
        .leftJoin('Comments', 'Articles.article_id', 'Comments.article_id')
        .leftJoin('Article_Views', 'Articles.article_id', 'Article_Views.article_id') // Thêm leftJoin với Article_Views
        .select(
          'Articles.*',
          'Articles.published_date',
          db.raw('COUNT(DISTINCT Comments.comment_id) as commentsCount'),
          db.raw('COUNT(DISTINCT Article_Views.view_id) as view_count') // Thêm đếm số lượt view
        )
        .groupBy('Articles.article_id')
        .orderBy('Articles.is_premium', 'desc')
        .orderBy('Articles.published_date', 'desc');
      for (let article of articles)
        article.tags = await db('tags').join('Article_tags', 'article_tags.tag_id', 'tags.tag_id').where('article_tags.article_id', article.article_id);
      return articles;
    } catch (error) {
      console.error('Error fetching articles with tags and comments count:', error);
      throw new Error('Unable to fetch articles with tags and comments count');
    }
  },

  async countByCategoryId(categoryId) {
    // Hàm này không cần view_count, vì chỉ đếm số lượng
    try {
      const result = await db('Articles')
        .where('Articles.status', 'published')
        .andWhere('Articles.published_date', '>=', db.raw('DATE_SUB(NOW(), INTERVAL 10000 DAY)'))
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
        .where('Articles.status', 'published')
        .andWhere('Articles.published_date', '>=', db.raw('DATE_SUB(NOW(), INTERVAL 10000 DAY)'))
        .where('Articles.category_id', categoryId)
        .leftJoin('Comments', 'Articles.article_id', 'Comments.article_id')
        .leftJoin('Article_Views', 'Articles.article_id', 'Article_Views.article_id') // Thêm leftJoin với Article_Views
        .select(
          'Articles.*',
          db.raw('COUNT(DISTINCT Comments.comment_id) as commentsCount'),
          db.raw('COUNT(DISTINCT Article_Views.view_id) as view_count') // Thêm đếm số lượt view
        )
        .groupBy('Articles.article_id')
        .orderBy('Articles.is_premium', 'desc')
        .orderBy('Articles.published_date', 'desc')
        .limit(limit)
        .offset(offset);

      const articleIds = articles.map(article => article.article_id);
      const tags = await db('tags')
        .join('Article_tags', 'Article_tags.tag_id', 'tags.tag_id')
        .whereIn('Article_tags.article_id', articleIds);

      articles.forEach(article => {
        article.tags = tags.filter(tag => tag.article_id === article.article_id);
      });

      return articles;
    } catch (error) {
      console.error('Error fetching paginated articles by category:', error);
      throw new Error('Unable to fetch paginated articles by category');
    }
  },

  async countByTagId(tagId) {
    try {
      const result = await db('Articles')
        .where('Articles.status', 'published')
        .andWhere('Articles.published_date', '>=', db.raw('DATE_SUB(NOW(), INTERVAL 10000 DAY)'))
        .join('Article_Tags', 'Articles.article_id', 'Article_Tags.article_id')
        .where('Article_Tags.tag_id', tagId)
        .count('* as total')
        .first();
      return result;
    } catch (error) {
      console.error('Error counting articles by tagId:', error);
      throw new Error('Unable to count articles by tagId');
    }
  },

  async findPageByTagId(tagId, limit, offset) {
    try {
      const articles = await db('Articles')
        .where('Articles.status', 'published')
        .andWhere('Articles.published_date', '>=', db.raw('DATE_SUB(NOW(), INTERVAL 10000 DAY)'))
        .join('Article_Tags', 'Articles.article_id', 'Article_Tags.article_id')
        .where('Article_Tags.tag_id', tagId)
        .leftJoin('Comments', 'Articles.article_id', 'Comments.article_id')
        .leftJoin('Article_Views', 'Articles.article_id', 'Article_Views.article_id')
        .select(
          'Articles.*',
          db.raw('COUNT(DISTINCT Comments.comment_id) as commentsCount'),
          db.raw('COUNT(DISTINCT Article_Views.view_id) as view_count')
        )
        .groupBy('Articles.article_id')
        .orderBy('Articles.is_premium', 'desc')
        .orderBy('Articles.published_date', 'desc')
        .limit(limit)
        .offset(offset);

      for (let article of articles) {
        article.tags = await db('Tags')
          .join('Article_Tags', 'Article_Tags.tag_id', 'Tags.tag_id')
          .where('Article_Tags.article_id', article.article_id)
          .select('Tags.tag_id', 'Tags.tag_name');
      }

      return articles;
    } catch (error) {
      console.error('Error fetching paginated articles by tagId:', error);
      throw new Error('Unable to fetch paginated articles by tagId');
    }
  },

  async countAll() {
    // Hàm này không cần view_count, vì chỉ đếm số lượng
    try {
      const result = await db('Articles')
        .where('Articles.status', 'published')
        .andWhere('Articles.published_date', '>=', db.raw('DATE_SUB(NOW(), INTERVAL 10000 DAY)'))
        .count('* as total').first();
      return result.total;
    } catch (error) {
      console.error('Error counting all articles', error);
      throw new Error('Unable to count articles');
    }
  },

  async findPageAll(limit, offset) {
    try {
      const articles = await db('Articles')
        .where('Articles.status', 'published')
        .andWhere('Articles.published_date', '>=', db.raw('DATE_SUB(NOW(), INTERVAL 10000 DAY)'))
        .leftJoin('Comments', 'Articles.article_id', 'Comments.article_id')
        .leftJoin('Article_Views', 'Articles.article_id', 'Article_Views.article_id') // Thêm leftJoin với Article_Views
        .select(
          'Articles.*',
          db.raw('COUNT(DISTINCT Comments.comment_id) as commentsCount'),
          db.raw('COUNT(DISTINCT Article_Views.view_id) as view_count') // Thêm đếm số lượt view
        )
        .groupBy('Articles.article_id')
        .orderBy('Articles.is_premium', 'desc')
        .orderBy('Articles.published_date', 'desc')
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
        .where('Articles.status', 'published')
        .andWhere('Articles.published_date', '>=', db.raw('DATE_SUB(NOW(), INTERVAL 10000 DAY)'))
        .where(db.raw("MATCH(Articles.title, Articles.abstract, Articles.content) AGAINST(? IN BOOLEAN MODE)", [`*${title}*`]))
        .count('* as total')
        .first();
      return result.total;
    } catch (error) {
      console.error('Error counting articles by search title (full-text):', error);
      throw new Error('Unable to count articles by search title (full-text)');
    }
  },

  async findPageBySearchTitle(title, limit, offset) {
    try {
      const articles = await db('Articles')
        .where('Articles.status', 'published')
        .andWhere('Articles.published_date', '>=', db.raw('DATE_SUB(NOW(), INTERVAL 10000 DAY)'))
        .leftJoin('Comments', 'Articles.article_id', 'Comments.article_id')
        .leftJoin('Article_Views', 'Articles.article_id', 'Article_Views.article_id')
        .select(
          'Articles.*',
          db.raw('COUNT(DISTINCT Comments.comment_id) as commentsCount'),
          db.raw('COUNT(DISTINCT Article_Views.view_id) as view_count'),
          db.raw("MATCH(Articles.title, Articles.abstract, Articles.content) AGAINST(? IN BOOLEAN MODE) as relevance_score", [`*${title}*`]) // Thêm điểm số và đặt tên là relevance_score
        )
        .where(db.raw("MATCH(Articles.title, Articles.abstract, Articles.content) AGAINST(? IN BOOLEAN MODE)", [`*${title}*`]))
        .groupBy('Articles.article_id')
        .orderBy('relevance_score', 'desc') // Sắp xếp theo điểm số giảm dần
        .orderBy('Articles.is_premium', 'desc')
        .orderBy('Articles.published_date', 'desc')
        .limit(limit)
        .offset(offset);

      if (articles.length === 0) {
        return [];
      }

      const articleIds = articles.map(article => article.article_id);

      const tags = await db('tags')
        .join('Article_tags', 'Article_tags.tag_id', 'tags.tag_id')
        .whereIn('Article_tags.article_id', articleIds)
        .select('Article_tags.article_id', 'tags.tag_id', 'tags.tag_name');

      articles.forEach(article => {
        article.tags = tags
          .filter(tag => tag.article_id === article.article_id)
          .map(tag => ({
            tag_id: tag.tag_id,
            tag_name: tag.tag_name
          }));
      });

      return articles;

    } catch (error) {
      console.error('Error fetching paginated articles by search title (full-text):', error);
      throw new Error('Unable to fetch paginated articles by search title (full-text)');
    }
  },
  async getNewestArticles() {
    return await db('Articles as A')
      .where('A.status', 'published')
      .andWhere('A.published_date', '>=', db.raw('DATE_SUB(NOW(), INTERVAL 10000 DAY)'))
      .leftJoin('Article_Views', 'A.article_id', 'Article_Views.article_id') // Thêm leftJoin với Article_Views
      .select('A.title', 'C.category_name', 'A.published_date', 'A.image_url', 'A.article_id', 'A.abstract', 'A.category_id', 'A.is_premium',
        db.raw('COUNT(DISTINCT Article_Views.view_id) as view_count')) // Thêm đếm số lượt view
      .join('Categories as C', 'A.category_id', 'C.category_id')
      .groupBy('A.article_id') // group by article id
      .orderBy('A.published_date', 'desc')
      .limit(5);
  },
  findTagByID(id) {
    return db('Tags')
      .where('tag_id', id)
      .first();
  },
  findCategoryByID(id) {
    return db('Categories')
      .where('category_id', id)
      .first();
  }
}