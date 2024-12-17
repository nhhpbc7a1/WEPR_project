import express from 'express';
import manage_articleService from '../../services/admin/manage_article.service.js';
const router = express.Router();

import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
import multer from 'multer';

router.get('/', function (req, res) {
    res.redirect('/list');
});

router.get('/list', async function (req, res) {
    const articles = await manage_articleService.findAll();
    res.render('vwAdmin/article/list', {
        articles: articles
    });
});

router.get('/detail', async function (req, res) {
    const id = +req.query.id || 0;
    const article = await manage_articleService.findByID(id);
    res.render('vwAdmin/article/detail', {
        article: article
    });
});

router.get('/add', async function (req, res) {
    const parent_categories = await manage_articleService.findAllParentCategory();
    const child_categories = await manage_articleService.findAllChildCategory();

    res.render('vwAdmin/article/add', {
        parent_categories: parent_categories,
        child_categories: child_categories,
    });
});

router.get('/edit', async function (req, res) {
    const id = +req.query.id || 0;
    const parent_categories = await manage_articleService.findAllParentCategory();
    const child_categories = await manage_articleService.findAllChildCategory();
    const article = await manage_articleService.findByID(id);
    res.render('vwAdmin/article/add', {
        article: article,
        parent_categories: parent_categories,
        child_categories: child_categories,
    });
});


// ===== ================================ Xử lý upload ảnh
import fs from 'fs';
import path from 'path';

// Kiểm tra và tạo thư mục uploads nếu chưa có
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir); // Chỉ định thư mục tải lên
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage });

// API upload hình ảnh
router.post('/upload-image', upload.single('upload'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.filename}`
    });
});
// =================================================================

router.use(express.json());
router.post('/add', upload.single('image'), async function (req, res) {
    // Thông tin bài viết
    console.log(req.body);
    console.log(req.body.content);
    res.redirect('/articles');
    return;
    const entity = {
        title: req.body.title,
        author: req.body.author,
        abstract: req.body.abstract,
        content: req.body.content,
        category_id: +req.body.category_id,
        is_premium: req.body.is_premium === 'on' ? '1' : '0',
    };

    await manage_articleService.add(entity);
    res.redirect('/articles');
});


export default router;  