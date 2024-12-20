import db from '../../ultis/db.js';

export default {
    findAllOfWriterID(writer_id) {
        return db('articles')
            .join('categories', 'categories.category_id', 'articles.category_id')
            .where('articles.writer_id', writer_id)
            .leftJoin('users', 'users.user_id', 'articles.writer_id');
    },
    findByID(ID) {
        return db('articles')
            .join('categories', 'categories.category_id', 'articles.category_id')
            .leftJoin('users', 'users.user_id', 'articles.writer_id')
            .where('article_id', ID).first();
    },
    add(entity) {
        return db('articles')
            .insert(entity)
            .then(() => {
                return db('articles')
                    .max('article_id as id')
                    .first();
            })
            .then(result => {
                return result.id;  // Trả về article_id của bản ghi mới
            });
    },
    patch(id, entity) {
        return db('articles')
            .where('article_id', id)
            .update(entity);
    },
    del(id) {
        return db('articles').where('articles.article_id', id).del();
    },
    findAllParentCategory() {
        return db('categories').whereNull('parent_category_id');
    },
    findAllChildCategory() {
        return db('categories as parents')
            .join('categories', 'parents.category_id', 'categories.parent_category_id');
    },
    getAllTags() {
        return db('tags');
    },
    getTagsByArticleID(articleID) {
        return db('article_tags')
            .where('article_tags.article_id', articleID);
    },
    async updateTags(id, tag_id_list) {
        await db('article_tags')
            .where('article_id', id)
            .del();

        tag_id_list.forEach(async (tag_id) => {
            const newTag = {
                tag_id: tag_id,
                article_id: id,
            };
            await db('article_tags').insert(newTag);
        });

    }

}