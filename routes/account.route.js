import express from 'express';
import accountService from '../services/account.service.js';
import bcrypt from 'bcryptjs';
import check from '../middlewares/auth.route.js'
import moment from 'moment';
import googleAuthService from '../services/googleAuthService.js';
import FacebookAuthService from '../services/facebookAuth.service.js';
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
router.post('/auth/google', async function (req, res) {
    const { id_token } = req.body;  
    console.log(id_token);

    try {
        const userPayload = await googleAuthService.verifyGoogleToken(id_token);
        console.log(userPayload);
        let user = await accountService.findByEmail(userPayload.email);
        
        const newUsername = await accountService.generateUsername();
        console.log(newUsername);

        if (!user) {
            // Nếu chưa có người dùng, tạo mới
            const newUser = {
                username: newUsername,
                fullname: userPayload.name,
                email: userPayload.email,
                password: '', 
                role_id: 4,   
            };
            const userId = await accountService.add_user(newUser);
            user = { ...newUser, id: userId };
        }

        req.session.auth = true;
        req.session.authUser = user;

        const retUrl = req.session.retUrl || '/';
        res.redirect(retUrl);

    } catch (error) {
        console.error('Lỗi xác thực Google:', error);
        return res.status(400).render('login', { showErrors: true });
    }
});
router.get('/auth/google/callback', async function (req, res) {
    const { code } = req.query;
    try {

        const tokenResponse = await googleAuthService.getTokenFromCode(code);
        const userPayload = await googleAuthService.verifyGoogleToken(tokenResponse.id_token);

        console.log('Google User Payload (Callback):', userPayload);

    
        let user = await accountService.findByEmail(userPayload.email);

        const newUsername = await accountService.generateUsername();

        if (!user) {
            const newUser = {
                username: newUsername,
                fullname: userPayload.name,
                email: userPayload.email,
                password: '',
                role_id: 4,
            };
            const userId = await accountService.add_user(newUser);
            user = { ...newUser, id: userId };
        }

        req.session.auth = true;
        req.session.authUser = user;

        const retUrl = req.session.retUrl || '/';
        res.redirect(retUrl);
    } catch (error) {
        console.error('Lỗi xác thực Google Callback:', error);
        res.status(400).render('login', { showErrors: true });
    }
});
router.post('/auth/facebook', async function (req, res) {
    const { accessToken } = req.body;
    console.log(accessToken)
    try {
     
        const userPayload = await FacebookAuthService.getUserData(accessToken);
        
        let user = await accountService.findByEmail(userPayload.email);

        if (!user) {
            // Nếu chưa có người dùng, tạo mới
            const newUser = {
                username: userPayload.name,
                email: userPayload.email,
                password: '', 
                role_id: 4,   
            };
            const userId = await accountService.add_user(newUser);
            user = { ...newUser, id: userId };
        }

        req.session.auth = true;
        req.session.authUser = user;

        const retUrl = req.session.retUrl || '/';
        res.redirect(retUrl);

    } catch (error) {
        console.error('Lỗi xác thực Facebook:', error);
        return res.status(400).render('login', { showErrors: true });
    }
});

export default router;