import express from 'express';
import { loginUser } from '../services/login.service.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.render('login');
});

router.post('/', (req, res) => {
  const { email, password } = req.body;
  const isValid = loginUser(email, password);
  if (isValid) {
    res.redirect('/details'); // Đăng nhập thành công
  } else {
    res.send("Sai thông tin đăng nhập!");
  }
});

export default router;
