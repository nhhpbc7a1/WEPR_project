
import express from 'express';
import articleDetailService from '../services/article_detail.service.js';

const router = express.Router();

router.get('/',async function (req, res)
{
    const id =  +req.query.id || 0;
    const list = await articleDetailService.getNewestArticles(); 
    const article = await articleDetailService.findArticleById(id);
    const tagList = await articleDetailService.findTagByArticleId(id);
    // console.log(list);
    const commentList = await articleDetailService.findCommentByArticleId(id);
    const parentCat = await articleDetailService.findParentCategory(article.parent_category_id);
    // console.log(article);
    // console.log(commentList);
    // console.log(tagList);

    res.render('vwArticle/detail', {
        articles: list,
        articleDetail: article,
        comments: commentList,
        tags : tagList,
        parentCat: parentCat,
    })
});
// router.get('/add', function(req, res){
//     res.render('vwCategory/add');
// })

router.post('/', async function(req,res){
    const data = req.body;
    const id =  +req.query.id || 0;
    const comment = {
        article_id: id,
        commented_date: new Date() ,
        commenter_name: data.commenterName ,
        content: data.commentContent,
    }
    const ret = await articleDetailService.addComment(comment);
    // console.log(ret);
    console.log(comment);
    // console.log(req.body);
    res.redirect(`/article_detail?id=${id}`);
})



export default router;

