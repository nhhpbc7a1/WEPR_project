import express from 'express';

import articleService from '../services/reader/article_list.service.js'; 
const router = express.Router();
router.get('/', async function(req, res) {
    const articles = await articleService.findAll();

    res.render('vwArticle/list', {
        layout: false,
        articles: articles 
    });
});

export default router;
