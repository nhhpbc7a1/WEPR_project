import express from 'express';
import articleDetailService from '../services/article_detail.service.js';

const router = express.Router();

// router.get('/',async function (req, res)
// {
//     const list = await articleDetailService.findAll(); 
//     console.log(list);
//     res.render('vwProduct/list',{
//         products: list
//     })
// });



export default router;
