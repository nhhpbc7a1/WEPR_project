import express from 'express';

const router = express.Router();


router.get('/', function (req, res) {
    res.render('login', {
        layout: false, 
        title: 'Login Page',
    });
});

export default router;
