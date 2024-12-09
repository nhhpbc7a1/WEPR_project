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
        formatDate: (date) => {
            if (!date) return 'Không rõ ngày';
            return moment(date).format('DD/MM/YYYY'); // Bạn có thể thay đổi format ở đây
        },
        section: hbs_sections(),
    },
}));

app.set('view engine', 'hbs');
app.set('views', './views');

app.use('/public', express.static('public'));

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

import adminRouter from './routes/admin/admin.route.js'
app.use('/admin', adminRouter);


app.listen(3000, function () {
    console.log('Server is running at http://localhost:3000');
});