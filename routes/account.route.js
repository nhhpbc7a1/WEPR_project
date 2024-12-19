import express from 'express';
import accountService from '../services/account.service.js';
import bcrypt from 'bcryptjs';
import check from '../middlewares/auth.route.js'
import moment from 'moment';

const router = express.Router();

router.get('/signup', async function (req, res) {
    res.render('signup');
});

router.post('/signup', async function (req, res) {
    const password = bcrypt.hashSync(req.body.raw_password, 8);
    const user = {
        username: req.body.username,
        password: password,
        role_id: 4,
    }
    req.session.user_id = await accountService.add_user(user);
    req.session.auth = true;
    req.session.authUser = user;
    res.redirect('/');
});


router.get('/login', async function (req, res) {
    res.render('login');
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
    const user = await accountService.findByUsername(req.body.username);
    console.log(req.body.raw_password);
    if (!user) {
        return res.render('login', {
            showErrors: true
        });
    }
    if (!bcrypt.compareSync(req.body.raw_password, user.password)) {
        return res.render('login', {
            showErrors: true
        });
    }

    req.session.auth = true;
    req.session.authUser = user;
    const retUrl = req.session.retUrl || '/';
    res.redirect(retUrl);
});

router.get('/profile', check, function (req, res) {
    res.render('profile', {
        user: req.session.authUser
    });
});

router.post('/logout', check, function (req, res) {
    req.session.auth = false;
    req.session.authUser = null;
    req.session.user_id = null;
    res.redirect('/');
    console.log('logged out');
});

export default router;