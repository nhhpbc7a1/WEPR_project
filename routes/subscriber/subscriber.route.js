import express from 'express';
import manage_userService from '../../services/admin/manage_user.service.js';
import bcrypt from 'bcryptjs'
import moment from 'moment';

const router = express.Router();

router.get('/profile', async function (req, res) {
    const id = req.session.authUser.user_id;
    const user = await manage_userService.findUserByID(id);
    res.render('vwSubscriber/profile', {
        user: user,
    });
});

router.get('/pay', async function (req, res) {
    const id = req.session.authUser.user_id;
    const user = await manage_userService.addSubscriptionDays(id);
    res.redirect('/subscriber/profile')
});

router.post('/profile', async function (req, res) {
    const id = req.session.authUser.user_id;
    const encrypted_password = await bcrypt.hash(req.body.password, 8);
    const ymd_dob = moment(req.body.raw_dob, 'DD/MM/YYYY').format('YYYY-MM-DD');
    const ymd_expiration = moment(req.body.raw_expiration, 'DD/MM/YYYY HH:mm').format('YYYY-MM-DD HH:mm');
    const newInfo = {
        username: req.body.username,
        password: encrypted_password,
        fullname: req.body.fullname,
        phone_number: req.body.phone_number,
        email: req.body.email,
        birth_date: ymd_dob,
        subscription_expiration: ymd_expiration,
        role_id: 4,
    } 
    await manage_userService.edit(id, newInfo);
    req.session.authUser = await manage_userService.findUserByID(id);

    res.redirect('/subscriber/profile');
});


export default router;