import express from 'express';
import manage_articleRouter from './manage_article.route.js'

const router = express.Router();

router.use((req, res, next) => {
    res.locals.layout = 'writer';
    next();
  });

router.get('/',async function (req, res){
    res.render('vwWriter/dashboard', {
        layout: 'writer',
    });
});

router.use('/article', manage_articleRouter);



export default router;
