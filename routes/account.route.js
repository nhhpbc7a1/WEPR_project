import express from 'express';
import accountService from '../services/account.service.js';
import bcrypt from 'bcryptjs';
import check from '../middlewares/auth.route.js'
import moment from 'moment';

const router = express.Router();

router.get('/register', async function (req, res) {
    res.render('vwAccount/register');
});

router.post('/register', async function (req, res) {
    const hashed_password = bcrypt.hashSync(req.body.raw_password, 8);
    const ymd_dob = moment(req.body.raw_dob, 'DD/MM/YYYY').format('YYYY-MM-DD');
    const account = {
        username: req.body.username,
        hashed_password: hashed_password,
        role_id: 2,
    }
    const account_id = await accountService.add_account(account);
    account.account_id = account_id;
    const user = {
        account_id: account_id,
        full_name: req.body.full_name,
        phone_number: req.body.phone_number,
        address: req.body.address,
        email: req.body.email,
        birthday: ymd_dob,
        gender: req.body.gender
    }
    req.session.user_id = await accountService.add_user(user);
    req.session.auth = true;
    req.session.authAccount = account;
    res.redirect('/');
});


router.get('/login', async function (req, res) {
    res.render('vwAccount/login');
});



router.get('/is-available', async function (req, res) {
    const username = req.query.username;

    const user = await accountService.findByUsername(username);
    if (user) {
        return res.json(true);
    }

    res.json(false);

});

router.get('/is-available-email', async function (req, res) {
    const email = req.query.email;

    const user = await accountService.findByEmail(email);
    if (user) {
        return res.json(true);
    }

    res.json(false);

});



router.post('/login', async function (req, res) {
    const account = await accountService.findByUsername(req.body.username);
    console.log(req.body.raw_password);
    if (!account) {
        return res.render('vwAccount/login', {
            showErrors: true
        });
    }
    if (!bcrypt.compareSync(req.body.raw_password, account.hashed_password)) {
        return res.render('vwAccount/login', {
            showErrors: true
        });
    }

    req.session.authAccount = account;
    req.session.auth = true;
    const user = await accountService.findUserByAccountID(account.account_id);
    req.session.user_id = user.user_id;
    const retUrl = req.session.retUrl || '/';
    res.redirect(retUrl);
});

router.get('/profile', check, function (req, res) {
    res.render('vwAccount/profile', {
        user: req.session.authAccount
    });
});

router.post('/logout', check, function (req, res) {
    req.session.auth = false;
    req.session.authAccount = null;
    req.session.user_id = null;
    res.redirect('/');
    console.log('logged out');
});

export default router;