import express from 'express';
import numeral from 'numeral';
import { dirname, extname } from 'path';
import { fileURLToPath } from 'url';
import { engine } from 'express-handlebars';
import hbs_sections from 'express-handlebars-sections';
import homepageService from './services/homepage.service.js';;
import categoryService from './services/category.service.js';
import moment from 'moment';
import session from 'express-session';
import { authAdmin } from './middlewares/auth.route.js';
import { authEditor } from './middlewares/auth.route.js';
import { authWriter } from './middlewares/auth.route.js';
import { authSubscriber } from './middlewares/auth.route.js';
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
        formatDate(date) {
            return moment(date).format('MMMM DD, YYYY');  // Định dạng ngày theo format
        },
        formatDate_x(inputDate, format) {
            moment.locale('vi'); 
            const date = moment(inputDate);
            const formattedDate = date.format(format);
            return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
        },
        formatYMD(date) {
            return moment(date).format('MMMM DD, YYYY');  // Định dạng ngày theo format
        },
        formatDate_thu(inputDate) {
            moment.locale('vi');
            const date = moment(inputDate);
            const formattedDate = date.format('dddd, DD/MM/YYYY');
            return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
        },
        formatDate_thumuoi(inputDate) {
            moment.locale('vi'); // Thiết lập ngôn ngữ là tiếng Việt
            const date = moment(inputDate);
            // Định dạng theo yêu cầu
            const formattedDate = date.format('dddd, D/M/YYYY, HH:mm (Z)');
            // Viết hoa chữ cái đầu
            return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
        },        
        formatDate_nothu(inputDate) {
            const date = moment(inputDate);
            const formattedDate = date.format('DD/MM/YYYY');
            return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
        }

    },
}));

app.set('view engine', 'hbs');
app.set('views', './views');

app.use('/public', express.static('public'));
app.use('/uploads', express.static('uploads'));

app.set('trust proxy', 1) // trust first proxy
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {}
}))

app.use(async function (req, res, next) {
    if (!req.session.auth) {
        req.session.auth = false;
    }
    else {
        console.log(req.session.auth);
        console.log(req.session.authUser);
    }
    res.locals.auth = req.session.auth;
    res.locals.authUser = req.session.authUser;
    next();
});


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
        nowDate: new Date(),
    });

});

import article_listRouter from './routes/article_list.route.js'
app.use('/article_list', article_listRouter);

import article_detailRouter from './routes/article_detail.route.js'
app.use('/article_detail', article_detailRouter);

import subscriberRouter from './routes/subscriber/subscriber.route.js'
app.use('/subscriber', authSubscriber, subscriberRouter);

import writerRouter from './routes/writer/writer.route.js'
app.use('/writer', authWriter, writerRouter);

import editorRouter from './routes/editor/editor.route.js'
app.use('/editor', authEditor, editorRouter);

import adminRouter from './routes/admin/admin.route.js'
app.use('/admin', adminRouter);

import accountRouter from './routes/account.route.js'
app.use('/account', accountRouter);


app.listen(3000, function () {
    console.log('Server is running at http://localhost:3000');
});