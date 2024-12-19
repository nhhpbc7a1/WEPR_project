import db from '../../ultis/db.js';

export default {
    async findAll() {
        try {
            return await db('Articles')
                .leftJoin('Article_Tags', 'Articles.article_id', 'Article_Tags.article_id')
                .leftJoin('Tags', 'Article_Tags.tag_id', 'Tags.tag_id')
                .leftJoin('Comments', 'Articles.article_id', 'Comments.article_id') 
                .select(
                    'Articles.*',
                    'Articles.published_date',
                    'Tags.tag_id',
                    'Tags.tag_name',
                    db.raw('COUNT(Comments.comment_id) as commentsCount') 
                )
                .groupBy('Articles.article_id', 'Tags.tag_id', 'Tags.tag_name'); 
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
          return await db('Articles')
            .leftJoin('Article_Tags', 'Articles.article_id', 'Article_Tags.article_id')
            .leftJoin('Tags', 'Article_Tags.tag_id', 'Tags.tag_id')
            .leftJoin('Comments', 'Articles.article_id', 'Comments.article_id')
            .select(
              'Articles.*',
              'Tags.tag_id',
              'Tags.tag_name',
              db.raw('COUNT(Comments.comment_id) as commentsCount')
            )
            .where('Articles.category_id', categoryId)
            .groupBy('Articles.article_id', 'Tags.tag_id', 'Tags.tag_name')
            .limit(limit)
            .offset(offset);
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
            return await db('Articles')
                .leftJoin('Article_Tags', 'Articles.article_id', 'Article_Tags.article_id')
                .leftJoin('Tags', 'Article_Tags.tag_id', 'Tags.tag_id')
                .leftJoin('Comments', 'Articles.article_id', 'Comments.article_id')
                .select(
                    'Articles.*',
                    'Tags.tag_id',
                    'Tags.tag_name',
                    db.raw('COUNT(Comments.comment_id) as commentsCount')
                )
                .groupBy('Articles.article_id', 'Tags.tag_id', 'Tags.tag_name')
                .limit(limit)
                .offset(offset);
        } catch (error) {
            console.error('Error fetching paginated articles without category:', error);
            throw new Error('Unable to fetch paginated articles');
        }
    },
    async searchArticlesByTitleCount(title) {
      try {
          const result = await db('Articles')
              .leftJoin('Article_Tags', 'Articles.article_id', 'Article_Tags.article_id')
              .leftJoin('Tags', 'Article_Tags.tag_id', 'Tags.tag_id')
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
        return await db('Articles')
            .leftJoin('Article_Tags', 'Articles.article_id', 'Article_Tags.article_id')
            .leftJoin('Tags', 'Article_Tags.tag_id', 'Tags.tag_id')
            .leftJoin('Comments', 'Articles.article_id', 'Comments.article_id')
            .select(
                'Articles.*',
                'Tags.tag_id',
                'Tags.tag_name',
                db.raw('COUNT(Comments.comment_id) as commentsCount')
            )
            .where('Articles.title', 'like', `%${title}%`)
            .groupBy('Articles.article_id', 'Tags.tag_id', 'Tags.tag_name')
            .limit(limit)
            .offset(offset);
    } catch (error) {
        console.error('Error fetching paginated articles by search title:', error);
        throw new Error('Unable to fetch paginated articles');
    }
}
  
  
}