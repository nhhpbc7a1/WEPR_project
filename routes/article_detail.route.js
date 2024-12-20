
import express from 'express';
import articleDetailService from '../services/article_detail.service.js';

const router = express.Router();

router.get('/', async function (req, res) {
    const id = +req.query.id || 0;
    const list = await articleDetailService.getNewestArticles();
    const article = await articleDetailService.findArticleById(id);
    const tagList = await articleDetailService.findTagByArticleId(id);
    // console.log(list);
    const commentList = await articleDetailService.findCommentByArticleId(id);
    const parentCat = await articleDetailService.findParentCategory(article.parent_category_id);
    // console.log(article);
    // console.log(commentList);
    // console.log(tagList);
    let errorMessage = ""; 
    let error = false;
    if (article.is_premium) {
        if (req.session.auth == false) {
            req.session.retUrl = `/article_detail?id=${id}`;  // Save the requested URL for later use.
            errorMessage = "Đây là bài viết premium, vui lòng đăng nhập để xem nội dung!";
            error = true;
        }
        else if (req.session.authUser.role_id == 4 && req.session.authUser.subscription_expiration < new Date()) {
            errorMessage = "Tài khoản của bạn đã gói premium, vui lòng gia hạn để xem tiếp các bài viết premium!";
            error = true;
        }
    }
    
    res.render('vwArticle/detail', {
        articles: list,
        articleDetail: article,
        comments: commentList,
        tags: tagList,
        parentCat: parentCat,
        errorMessage: errorMessage,
        error: error
    })
});
// router.get('/add', function(req, res){
//     res.render('vwCategory/add');
// })

router.post('/', async function (req, res) {
    const data = req.body;
    const id = +req.query.id || 0;
    const comment = {
        article_id: id,
        commented_date: new Date(),
        commenter_name: data.commenterName,
        content: data.commentContent,
    }
    const ret = await articleDetailService.addComment(comment);
    // console.log(ret);
    console.log(comment);
    // console.log(req.body);
    res.redirect(`/article_detail?id=${id}`);
})



export default router;

