import express from 'express';


const router = express.Router();
router.get('/', function(req, res) {
    res.render('vwArticle/list', {
        layout: false,
    });
});

export default router;
