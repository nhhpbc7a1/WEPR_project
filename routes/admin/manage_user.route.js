import express from 'express';
import manage_userService from '../../services/admin/manage_user.service.js';
import bcrypt from 'bcryptjs'
import moment from 'moment';

const router = express.Router();

// route for /admin/user/...

router.use((req, res, next) => {
    res.locals.active = 'user'; // Đặt giá trị 'active' mặc định
    next(); // Chuyển sang middleware/route handler tiếp theo
});

router.get('/list', function (req, res) {
    res.redirect('/admin/user');
})

router.get('/', async function (req, res) {
    const list = await manage_userService.findAll();
    res.render('vwAdmin/user/list', {
        users: list
    });
});

router.get('/add/admin', async function (req, res) {
    res.render('vwAdmin/user/add/admin');
});
router.post('/add/admin', async function (req, res) {
    const encrypted_password = await bcrypt.hash(req.body.password, 8);
    const ymd_dob = moment(req.body.raw_dob, 'DD/MM/YYYY').format('YYYY-MM-DD');
    const newAdmin = {
        username: req.body.username,
        password: encrypted_password,
        fullname: req.body.fullname,
        phone_number: req.body.phone_number,
        email: req.body.email,
        birth_date: ymd_dob,
        role_id: 1,
    } 

    await manage_userService.add(newAdmin);
    res.redirect('/admin/user');
});

router.get('/add/editor', async function (req, res) {
    const categories = await manage_userService.getAllCategories();
    res.render('vwAdmin/user/add/editor', {
        categories: categories,
    });
});

router.post('/add/editor', async function (req, res) {
    const encrypted_password = await bcrypt.hash(req.body.password, 8);
    const ymd_dob = moment(req.body.raw_dob, 'DD/MM/YYYY').format('YYYY-MM-DD');
    const newEditor = {
        username: req.body.username,
        password: encrypted_password,
        fullname: req.body.fullname,
        phone_number: req.body.phone_number,
        email: req.body.email,
        birth_date: ymd_dob,
        role_id: 2,
    } 

    const new_id = await manage_userService.add(newEditor);

    const categories = req.body.categories || [];

    if (categories.length > 0) {
        await manage_userService.updateAssignments(new_id, categories);
    }

    res.redirect('/admin/user');
});

router.get('/add/writer', async function (req, res) {
    res.render('vwAdmin/user/add/writer');
});
router.post('/add/writer', async function (req, res) {
    const encrypted_password = await bcrypt.hash(req.body.password, 8);
    const ymd_dob = moment(req.body.raw_dob, 'DD/MM/YYYY').format('YYYY-MM-DD');
    const newWriter = {
        username: req.body.username,
        password: encrypted_password,
        fullname: req.body.fullname,
        phone_number: req.body.phone_number,
        email: req.body.email,
        birth_date: ymd_dob,
        role_id: 3,
        pen_name: req.body.pen_name,
    } 

    await manage_userService.add(newWriter);
    res.redirect('/admin/user');
});

router.get('/add/subscriber', async function (req, res) {
    res.render('vwAdmin/user/add/subscriber');
});

router.post('/add/subscriber', async function (req, res) {
    const encrypted_password = await bcrypt.hash(req.body.password, 8);
    const ymd_dob = moment(req.body.raw_dob, 'DD/MM/YYYY').format('YYYY-MM-DD');
    const ymd_expiration = moment(req.body.raw_expiration, 'DD/MM/YYYY HH:mm').format('YYYY-MM-DD HH:mm');
    const newAdmin = {
        username: req.body.username,
        password: encrypted_password,
        fullname: req.body.fullname,
        phone_number: req.body.phone_number,
        email: req.body.email,
        birth_date: ymd_dob,
        subscription_expiration: ymd_expiration,
        role_id: 4,
    } 

    await manage_userService.add(newAdmin);
    res.redirect('/admin/user');
});


router.post('/del', async function (req, res) {
    await manage_userService.del(req.body.user_id);
    res.redirect('/admin/user');
});

import editRouter from './manage_user/edit.route.js'
router.use('/edit', editRouter);


export default router;