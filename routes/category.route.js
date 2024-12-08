
import express from 'express';
import categoryService from '../services/category.service.js';
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const categories = await categoryService.findAll();
        console.log(categories);  // Debug categories

        res.render('home', { categories });
    } catch (error) {
        console.error('Error loading categories:', error);
        res.status(500).send('Internal Server Error');
    }
});

export default router;
