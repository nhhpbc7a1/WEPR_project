import express from 'express';
import manage_articleService from '../../services/editor/manage_article.service.js';
import moment from 'moment';
const router = express.Router();

const __dirname = process.cwd();
import multer from 'multer';
import fs from 'fs';
import path from 'path';

import handleFileUpload from '../../services/handleFileUpload.service.js';
const upload_main_img = multer({ dest: 'uploads/' });


router.get('/', function (req, res) {
    res.redirect('/editor/article/list');
});

router.get('/list', async function (req, res) {
    const editor_id = req.session.authUser.user_id;
    const articles = await manage_articleService.getArticlesAssignedToEditor(editor_id);
    res.locals.title = 'Assigned Articles List';
    res.render('vwEditor/article/list', {
        articles: articles
    });
});

router.get('/detail', async function (req, res) {
    const id = +req.query.id || 0;
    const article = await manage_articleService.findByID(id);
    res.render('vwEditor/article/detail', {
        article: article
    });
});

router.get('/edit', async function (req, res) {
    const id = +req.query.id || 0;
    const parent_categories = await manage_articleService.findAllParentCategory();
    const child_categories = await manage_articleService.findAllChildCategory();
    const article = await manage_articleService.findByID(id);
    const tags = await manage_articleService.getAllTags();
    const oldTags = await manage_articleService.getTagsByArticleID(id);
    res.locals.title = 'Reviewing article #'+id;
    console.log(article);
    res.render('vwEditor/article/edit', {
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
router.post('/edit', upload_main_img.single('main_image'), async function (req, res) {
    // Thông tin bài viết
    const id = +req.body.article_id || 0;
    const ymd_published_date = moment(req.body.raw_published_date, 'DD/MM/YYYY HH:mm').format('YYYY-MM-DD HH:mm');
    const entity = {
        status: req.body.status,
        published_date: ymd_published_date
    };
    console.log(entity);


    await manage_articleService.patch(id, entity);

    res.redirect('/editor/article/');
});


export default router;  