import express from 'express';
import manage_tagService from '../../services/admin/manage_tag.service.js';

const router = express.Router();

router.get('/', async function(req, res) {
    const tags = await manage_tagService.findAll();
    console.log(tags);
    res.locals.title = 'List tags';
    res.render('vwAdmin/tag/list', {
        tags: tags,
    });
});

router.get('/list', async function(req, res) {
    const tags = await manage_tagService.findAll();

    res.locals.title = 'List tags';
    res.render('vwAdmin/tag/list', {
        tags: tags,
    });
});

router.get('/add', async function(req, res) {
    res.locals.title = 'Add tag';
    res.render('vwAdmin/tag/add');
});

router.get('/edit', async function(req, res) {
    const id = +req.query.id || 0;
    const tag = await manage_tagService.findById(id);

    res.locals.title = 'Edit tag';
    res.render('vwAdmin/tag/edit', {
        tag: tag,
    });
});

router.post('/add', async function (req, res) {
    await manage_tagService.add({
        tag_name: req.body.tag_name,
    });
    res.redirect('/admin/tag/list');
});

router.post('/patch', async function (req, res) {
    const id = +req.body.tag_id || 0;
    await manage_tagService.patch(id, {
        tag_name: req.body.tag_name,
    });
    res.redirect(`/admin/tag`);
});

router.post('/del', async function (req, res) {
    const id = +req.body.tag_id || 0;
    await manage_tagService.del(id);
    res.redirect('/admin/tag/list');
});

export default router;