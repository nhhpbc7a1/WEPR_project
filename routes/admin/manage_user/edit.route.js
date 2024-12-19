import express from 'express';
import manage_userService from '../../../services/admin/manage_user.service.js';
import bcrypt from 'bcryptjs'
import moment from 'moment';

const router = express.Router();


router.get('/admin', async function (req, res) {
    const id = +req.query.id || 0;
    const user = await manage_userService.findUserByID(id);
    res.render('vwAdmin/user/edit/admin', {
        user: user,
    });
});
router.post('/admin', async function (req, res) {
    const id = +req.body.user_id || 0;
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

    console.log(newAdmin);
    await manage_userService.edit(id, newAdmin);
    res.redirect('/admin/user');
});

router.get('/editor', async function (req, res) {
    const categories = await manage_userService.getAllCategories();
    const id = +req.query.id || 0;
    const user = await manage_userService.findUserByID(id);
    const oldCategories = await manage_userService.getOldCategoriesOfEditor(id);
    console.log(oldCategories);
    res.render('vwAdmin/user/edit/editor', {
        oldCategories: oldCategories,
        categories: categories,
        user: user,
    });
});

router.post('/editor', async function (req, res) {
    const id = +req.body.user_id || 0;
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

    await manage_userService.edit(id, newEditor);

    const categories = req.body.categories || [];

    if (categories.length > 0) {
        await manage_userService.updateAssignments(id, categories);
    }

    res.redirect('/admin/user');
});

router.get('/writer', async function (req, res) {
    const id = +req.query.id || 0;
    const user = await manage_userService.findUserByID(id);
    res.render('vwAdmin/user/edit/writer', {
        user: user,
    });
});
router.post('/writer', async function (req, res) {
    const id = +req.body.user_id || 0;
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

    console.log(newWriter);
    await manage_userService.edit(id, newWriter);
    res.redirect('/admin/user');
});

router.get('/subscriber', async function (req, res) {
    const id = +req.query.id || 0;
    const user = await manage_userService.findUserByID(id);
    res.render('vwAdmin/user/edit/subscriber', {
        user: user,
    });
});

router.post('/subscriber', async function (req, res) {
    const id = +req.body.user_id || 0;
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

    console.log(newAdmin);
    await manage_userService.edit(id, newAdmin);
    res.redirect('/admin/user');
});


export default router;