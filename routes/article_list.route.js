import express from 'express';
import articleService from '../services/reader/article_list.service.js'; 
const router = express.Router();
router.get('/', async function(req, res) {
    const limit = 4;
    const currentPage = parseInt(req.query.page, 10) || 1;
    const offset = (currentPage - 1) * limit;

    try {
        const totalRows = await articleService.countAll();
        const totalPages = Math.ceil(totalRows / limit);

        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push({
                value: i,
                active: i === currentPage
            });
        }

        const articles = await articleService.findPageAll(limit, offset);

        res.render('vwArticle/list', {
            articles,
            empty: articles.length === 0,
            pageNumbers,
            currentPage
        });
    } catch (error) {
        console.error('Error fetching paginated articles', error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/byCategory', async function (req, res) {
    const categoryId = req.query.id || 0;
    const limit = 4;
    const currentPage = parseInt(req.query.page, 10) || 1;
    const offset = (currentPage - 1) * limit;

    try {
        // Đếm tổng số bài viết trong danh mục
        const totalRows = await articleService.countByCategoryId(categoryId);
        const totalPages = Math.ceil(totalRows.total / limit);

        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push({
                value: i,
                active: i === currentPage
            });
        }

        const articles = await articleService.findPageByCategoryId(categoryId, limit, offset);

        res.render('vwArticle/bycategory', {
            articles,
            empty: articles.length === 0,
            pageNumbers,
            catId: categoryId,
            currentPage
        });
    } catch (error) {
        console.error('Error fetching paginated articles by category:', error);
        res.status(500).send('Internal Server Error');
    }
});

export default router;

