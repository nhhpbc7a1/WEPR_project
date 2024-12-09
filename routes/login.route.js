import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.render('login', { layout: false }); // Chỉ render file login.hbs
});

export default router;
