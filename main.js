import express from 'express';
import numeral from 'numeral';
import {dirname, extname} from 'path';
import {fileURLToPath} from 'url';
import { engine } from 'express-handlebars';
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
        }
    },
}));

app.set('view engine', 'hbs');
app.set('views', './views');

app.use(express.static('public'));

app.get('/', function (req, res) {
    res.render('home');
});

import loginRouter from './routes/login.route.js'
app.use('/login', loginRouter);

import signupRouter from './routes/signup.route.js'
app.use('/signup', signupRouter);

import article_listRouter from './routes/article_list.route.js'
app.use('/article_list', article_listRouter);

import article_detailRouter from './routes/article_detail.route.js'
app.use('/article_detail', article_detailRouter);


app.listen(3000, function () {
    console.log('Server is running at http://localhost:3000');
});