import express from 'express';

const router = express.Router();

router.get('/',async function (req, res){
    res.render('vwAdmin/dashboard', {
        layout: 'admin',
    });
});

export default router;
