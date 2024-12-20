import express from 'express';
import manage_categoryRouter from './manage_category.route.js'
import manage_tagRouter from './manage_tag.route.js'
import manage_articleRouter from './manage_article.route.js'
import manage_userRouter from './manage_user.route.js'
import accountService from '../../services/account.service.js'
import moment from 'moment';
import bcrypt from 'bcryptjs';

const router = express.Router();

router.use((req, res, next) => {
    res.locals.layout = 'admin';
    next();
  });

router.get('/',async function (req, res){
    res.redirect('/admin/article');
});

router.get('/profile', async function (req, res) {
    const user = req.session.authUser;
    res.render('vwAdmin/profile', {
        user: user,
    });
});

router.post('/profile', async function (req, res) {
    const id = req.session.authUser.user_id;
    const encrypted_password = await bcrypt.hash(req.body.password, 8);
    const ymd_dob = moment(req.body.raw_dob, 'DD/MM/YYYY').format('YYYY-MM-DD');
    const newAdmin = {
        username: req.body.username,
        password: encrypted_password,
        fullname: req.body.fullname,
        phone_number: req.body.phone_number,
        email: req.body.email,
        birth_date: ymd_dob,
    } 

    console.log(newAdmin);
    await accountService.editUserByID(id, newAdmin);
    req.session.authUser = await accountService.findUserByUserID(id);
    res.redirect('/admin/profile');
});



router.use('/category', manage_categoryRouter);
router.use('/tag', manage_tagRouter);
router.use('/article', manage_articleRouter);
router.use('/user', manage_userRouter);



export default router;
