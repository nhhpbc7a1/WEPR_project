import express from 'express';
import manage_categoryService from '../../services/admin/manage_category.service.js';

const router = express.Router();

router.get('/', async function (req, res) {
    const categories = await manage_categoryService.findAll();

    res.locals.title = 'List categories';
    res.render('vwAdmin/category/list', {
        categories: categories,
    });
});

router.get('/list', async function (req, res) {
    res.redirect('/admin/category');
});

router.get('/add', async function (req, res) {
    res.locals.title = 'Add category';
    const parentCat = await manage_categoryService.findAllParentCategory();
    res.render('vwAdmin/category/add', {
        parentCat: parentCat,
    });
});

router.get('/edit', async function (req, res) {
    const id = +req.query.id || 0;
    const category = await manage_categoryService.findById(id);
    const parentCat = await manage_categoryService.findAllParentCategory();
    res.locals.title = 'Edit category';
    res.render('vwAdmin/category/edit', {
        category: category,
        parentCat: parentCat,
    });
});

router.post('/add', async function (req, res) {
    const newCat = {
        category_name: req.body.category_name,
    };
    newCat.parent_category_id = req.body.parent_category_id != "" ? +req.body.parent_category_id : null;

    await manage_categoryService.add(newCat);
    res.redirect('/admin/category/list');
});

router.post('/patch', async function (req, res) {
    const id = +req.body.category_id || 0;
    const newCat = {
        category_name: req.body.category_name,
    };
    newCat.parent_category_id = req.body.parent_category_id != "" ? +req.body.parent_category_id : null;

    await manage_categoryService.patch(id, newCat);
    res.redirect(`/admin/category`);
});

router.post('/del', async function (req, res) {
    const id = +req.body.category_id || 0;
    await manage_categoryService.del(id);
    res.redirect('/admin/category/list');
});

export default router;