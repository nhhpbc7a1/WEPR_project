
import express from 'express';
import articleDetailService from '../services/article_detail.service.js';

const router = express.Router();

router.get('/', async function (req, res) {
    const id = +req.query.id || 0;
    const article = await articleDetailService.findArticleById(id);
    const tagList = await articleDetailService.findTagByArticleId(id);
    const commentList = await articleDetailService.findCommentByArticleId(id);
    const parentCat = await articleDetailService.findParentCategory(article.parent_category_id);
    const list = await articleDetailService.getSimilarArticles(article.category_id, 5);

    let errorMessage = ""; 
    let error = false;
    if (article.is_premium) {
        if (req.session.auth == false) {
            req.session.retUrl = `/article_detail?id=${id}`;  // Save the requested URL for later use.
            errorMessage = "Đây là bài viết premium, vui lòng đăng nhập để xem nội dung!";
            error = true;
        }
        else if (req.session.authUser.role_id == 4 && new Date(req.session.authUser.subscription_expiration) < new Date()) {
            errorMessage = "Tài khoản của bạn đã hết gói premium, vui lòng gia hạn để xem tiếp các bài viết premium!";
            error = true;
        }
    }
    
    await articleDetailService.add_article_view({
        user_id: 1,
        article_id: id,
    });

    res.render('vwArticle/detail', {
        articles: list,
        articleDetail: article,
        comment_count: commentList.length,
        comments: commentList,
        tags: tagList,
        parentCat: parentCat,
        errorMessage: errorMessage,
        error: error
    })
});

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
    res.redirect(`/article_detail?id=${id}`);
})



export default router;

