import express from 'express';
import numeral from 'numeral';
import { dirname, extname } from 'path';
import { fileURLToPath } from 'url';
import { engine } from 'express-handlebars';
import hbs_sections from 'express-handlebars-sections';
import homepageService from './services/homepage.service.js';;
import categoryService from './services/category.service.js';
import moment from 'moment';
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(express.urlencoded({
    extended: true,
}));

app.engine('hbs', engine({
    extname: '.hbs',
    defaultLayout: 'main',
    helpers: {
        format_price(value) {
            return numeral(value).format('0,000') + ' VNĐ';
        },
        format_round(value) {
            return numeral(value).format('0,000');
        },

        json(context) {
            return JSON.stringify(context);
        },
        ifEquals(arg1, arg2, options) {
            return arg1 == arg2 ? options.fn(this) : options.inverse(this);
        },
        ifNotEquals(arg1, arg2, options) {
            return arg1 != arg2 ? options.fn(this) : options.inverse(this);
        },
        eq(arg1, arg2) {
            return arg1 === arg2; // Trả về true nếu 2 giá trị bằng nhau
        },
        section: hbs_sections(),
        contain_assignment(array, id) {
            if (Array.isArray(array)) {
                return array.some(item => item.category_id.toString() === id.toString());
            }
            return false;
        },
        contain_taglink(array, id) {
            if (Array.isArray(array)) {
                return array.some(item => item.tag_id.toString() === id.toString());
            }
            return false;
        },
        formatYMD(date) {
            return moment(date).format('MMMM DD, YYYY');  // Định dạng ngày theo format
        }
    },
}));

app.set('view engine', 'hbs');
app.set('views', './views');

app.use('/public', express.static('public'));
app.use('/uploads', express.static('uploads'));

app.use(async function (req, res, next) {
    const categories = await categoryService.findAll();
    res.locals.lcCategories = categories
    next();
});

app.get('/', async function (req, res) {
    const featuredArticles = await homepageService.getFeaturedArticlesThisWeek();
    // console.log(featuredArticles);

    const mostViewedArticles = await homepageService.getMostViewedArticles();
    // console.log(mostViewedArticles);

    const newestArticles = await homepageService.getNewestArticles();
    // console.log(newestArticles);

    const newestInCategories = await homepageService.getNewestArticleInEachCategory();
    // console.log(newestInCategories);

    res.render('home', {
        featuredArticles: featuredArticles,
        mostViewedArticles: mostViewedArticles,
        newestArticles: newestArticles,
        newestInCategories: newestInCategories,
    });

});

import loginRouter from './routes/login.route.js'
app.use('/login', loginRouter);

import signupRouter from './routes/signup.route.js'
app.use('/signup', signupRouter);
import article_listRouter from './routes/article_list.route.js'
app.use('/article_list', article_listRouter);

import article_detailRouter from './routes/article_detail.route.js'
app.use('/article_detail', article_detailRouter);

// import writerRouter from './routes/writer/writer.route.js'
// app.use('/writer', writerRouter);

// import editorRouter from './routes/editor/editor.route.js'
// app.use('/editor', editorRouter);

import adminRouter from './routes/admin/admin.route.js'
app.use('/admin', adminRouter);

import accountRouter from './routes/account.route.js'
app.use('/account', accountRouter);


app.listen(3000, function () {
    console.log('Server is running at http://localhost:3000');
});