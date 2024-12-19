import express from 'express';
import manage_articleService from '../../services/admin/manage_article.service.js';
import moment from 'moment';
const router = express.Router();

const __dirname = process.cwd();
import multer from 'multer';
import fs from 'fs';
import path from 'path';

import handleFileUpload from '../../services/handleFileUpload.service.js';
const upload_main_img = multer({ dest: 'uploads/' });



router.get('/', function (req, res) {
    res.redirect('/admin/article/list');
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
    const tags = await manage_articleService.getAllTags();

    res.render('vwAdmin/article/add', {
        parent_categories: parent_categories,
        child_categories: child_categories,
        tags: tags,
    });
});

router.get('/edit', async function (req, res) {
    const id = +req.query.id || 0;
    const parent_categories = await manage_articleService.findAllParentCategory();
    const child_categories = await manage_articleService.findAllChildCategory();
    const article = await manage_articleService.findByID(id);
    const tags = await manage_articleService.getAllTags();
    const oldTags = await manage_articleService.getTagsByArticleID(id);
    console.log(article);
    res.render('vwAdmin/article/edit', {
        article: article,
        parent_categories: parent_categories,
        child_categories: child_categories,
        tags: tags,
        oldTags: oldTags,
    });
});


// ===== ================================ Xử lý upload ảnh

// Tạo thư mục lưu trữ nếu chưa có
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Cấu hình Multer để lưu file hình ảnh
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir); // Thư mục lưu hình
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Đặt tên file không trùng
    }
});
const upload = multer({ storage });

// Endpoint xử lý upload hình ảnh
router.post('/upload-image', upload.single('upload'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({
            uploaded: false,
            error: { message: 'No file uploaded' }
        });
    }

    // Trả về đường dẫn hình ảnh đã upload
    res.json({
        uploaded: true,
        url: `/uploads/${req.file.filename}` // URL cho CKEditor
    });
});

// Phục vụ file tĩnh trong thư mục uploads
// =================================================================

router.use(express.json());
router.post('/add', upload_main_img.single('main_image'), async function (req, res) {
    const ymd_published_date = moment(req.body.raw_published_date, 'DD/MM/YYYY HH:mm').format('YYYY-MM-DD HH:mm');
    
    // Thông tin bài viết
    const entity = {
        title: req.body.title,
        category_id: +req.body.category_id,
        is_premium: req.body.is_premium === 'on' ? '1' : '0',
        is_featured: req.body.is_featured === 'on' ? '1' : '0',
        status: req.body.status,
        abstract: req.body.abstract,
        content: req.body.content,
        published_date: ymd_published_date
    };

    const new_id = await manage_articleService.add(entity);

    const image = req.file; // Ảnh tải lên
    const imagePath = await handleFileUpload(req, 'articles', new_id);
    if (image) {
        entity.image_url = imagePath;
        await manage_articleService.patch(new_id, entity);
    }

    const tags = req.body.tags || [];
    if (tags.length > 0) {
        await manage_articleService.updateTags(new_id, tags);
    }

    res.redirect('/admin/article/');
});

router.post('/edit', upload_main_img.single('main_image'), async function (req, res) {
    // Thông tin bài viết
    const id = +req.body.article_id || 0;
    const ymd_published_date = moment(req.body.raw_published_date, 'DD/MM/YYYY HH:mm').format('YYYY-MM-DD HH:mm');
    const entity = {
        title: req.body.title,
        abstract: req.body.abstract,
        content: req.body.content,
        category_id: +req.body.category_id,
        is_premium: req.body.is_premium === 'on' ? '1' : '0',
        is_featured: req.body.is_featured === 'on' ? '1' : '0',
        status: req.body.status,
        published_date: ymd_published_date
    };
    console.log(entity);


    await manage_articleService.patch(id, entity);
    const image = req.file; // Ảnh tải lên
    const imagePath = await handleFileUpload(req, 'articles', id);
    if (image) {
        entity.image_url = imagePath;
        await manage_articleService.patch(id, entity);
    }


    const tags = req.body.tags || [];

    if (tags.length > 0) {
        await manage_articleService.updateTags(id, tags);
    }

    res.redirect('/admin/article/');
});

router.get('/del', upload.single('image'), async function (req, res) {
    const id = +req.query.id || 0;
    await manage_articleService.del(id);
    res.redirect('/admin/article');
});


export default router;  