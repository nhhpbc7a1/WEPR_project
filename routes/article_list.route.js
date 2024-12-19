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

router.get('/search', async function(req, res) {
    const limit = 4;
    const currentPage = parseInt(req.query.page, 10) || 1;
    const offset = (currentPage - 1) * limit;

    const title = req.query.title ? req.query.title.trim() : null; 

    try {
        if (!title) {
            return res.render('vwArticle/search', {
                articles: [],
                empty: true,
                searchTerm: '',
                pageNumbers: [],
                currentPage,
                prevPage: null,
                nextPage: null,
                title: ''
            });
        }

        const totalRows = await articleService.searchArticlesByTitleCount(title);
        const articles = await articleService.findPageBySearchTitle(title, limit, offset);
        const totalPages = Math.ceil(totalRows / limit);

        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push({
                value: i,
                active: i === currentPage
            });
        }

        res.render('vwArticle/search', {
            articles,
            empty: articles.length === 0,
            searchTerm: title,
            pageNumbers,
            currentPage,
            prevPage: currentPage > 1 ? currentPage - 1 : null,
            nextPage: currentPage < totalPages ? currentPage + 1 : null,
            title
        });
        console.log('Search term:', title);
    } catch (error) {
        console.error('Error in search pagination', error);
        res.status(500).send('Internal Server Error');
    }
});


export default router;

