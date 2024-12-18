import express from 'express';
import manage_articleService from '../../services/admin/manage_article.service.js';
const router = express.Router();

const __dirname = process.cwd();
import multer from 'multer';
import fs from 'fs';
import path from 'path';


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

    res.render('vwAdmin/article/edit', {
        article: article,
        parent_categories: parent_categories,
        child_categories: child_categories,
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
router.post('/add', upload.single('image'), async function (req, res) {
    // Thông tin bài viết

    const entity = {
        title: req.body.title,
        abstract: req.body.abstract,
        content: req.body.content,
        category_id: +req.body.category_id,
        is_premium: req.body.is_premium === 'on' ? '1' : '0',
        status: "pending",
    };

    await manage_articleService.add(entity);
    res.redirect('/admin/article/');
});

router.post('/edit', upload.single('image'), async function (req, res) {
    // Thông tin bài viết
    const id = +req.body.article_id || 0;

    const entity = {
        title: req.body.title,
        abstract: req.body.abstract,
        content: req.body.content,
        category_id: +req.body.category_id,
        is_premium: req.body.is_premium === 'on' ? '1' : '0',
        status: "pending",
    };

    await manage_articleService.patch(id, entity);
    res.redirect('/admin/article/');
});

router.get('/del', upload.single('image'), async function (req, res) {
    const id = +req.query.id || 0;
    console.log(id);
    await manage_articleService.del(id);
    res.redirect('/admin/article');
});


export default router;  