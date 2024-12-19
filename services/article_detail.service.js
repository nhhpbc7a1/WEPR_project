import db from '../ultis/db.js';
export default{
    findAll(){
        return db('Articles');
    },
    findArticleById(id){
        return db('Articles')
        .join('Categories','Categories.category_id','Articles.article_id')
        .join('users','users.user_id','Articles.writer_id')
        .where('article_id', id)
        .first();
    },
    findCommentByArticleId(id){
        return db('Comments').where('article_id',id);
    },
    findTagByArticleId(id){
        return db('Tags')
        .join('Article_tags','Tags.tag_id','Article_tags.tag_id')
        .where('article_id', id)
    },
    addComment(entity){
        return db('Comments').insert(entity);
    }

}