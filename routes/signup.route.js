import express from 'express';
import { registerUser } from '../services/signup.service.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.render('signup');
});

router.post('/', (req, res) => {
  const { email, password } = req.body;
  const success = registerUser(email, password);
  if (success) {
    res.redirect('/login'); // Đăng ký thành công, chuyển sang login
  } else {
    res.send("Email đã tồn tại, vui lòng chọn email khác!");
  }
});

export default router;
