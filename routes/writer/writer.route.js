import express from 'express';
import manage_articleRouter from './manage_article.route.js'
import moment from 'moment';
import bcrypt from 'bcryptjs';
import accountService from '../../services/account.service.js'

const router = express.Router();

router.use((req, res, next) => {
    res.locals.layout = 'writer';
    next();
  });

router.get('/',async function (req, res){
    res.redirect('/writer/article');
});

router.get('/profile', async function (req, res) {
    const user = req.session.authUser;
    res.render('vwWriter/profile', {
        user: user,
    });
});

router.post('/profile', async function (req, res) {
    const id = req.session.authUser.user_id;
    const encrypted_password = await bcrypt.hash(req.body.password, 8);
    const ymd_dob = moment(req.body.raw_dob, 'DD/MM/YYYY').format('YYYY-MM-DD');
    const newWriter = {
        username: req.body.username,
        password: encrypted_password,
        fullname: req.body.fullname,
        phone_number: req.body.phone_number,
        email: req.body.email,
        birth_date: ymd_dob,
        pen_name: req.body.pen_name
    } 

    console.log(newWriter);
    await accountService.editUserByID(id, newWriter);
    req.session.authUser = await accountService.findUserByUserID(id);
    res.redirect('/writer/profile');
});


router.use('/article', manage_articleRouter);



export default router;
