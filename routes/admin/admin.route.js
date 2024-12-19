import express from 'express';
import manage_categoryRouter from './manage_category.route.js'
import manage_tagRouter from './manage_tag.route.js'
import manage_articleRouter from './manage_article.route.js'
import manage_userRouter from './manage_user.route.js'

const router = express.Router();

router.use((req, res, next) => {
    res.locals.layout = 'admin';
    next();
  });

router.get('/',async function (req, res){
    res.render('vwAdmin/dashboard', {
        layout: 'admin',
    });
});

router.use('/category', manage_categoryRouter);
router.use('/tag', manage_tagRouter);
router.use('/article', manage_articleRouter);
router.use('/user', manage_userRouter);



export default router;
