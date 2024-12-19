// services/signup.service.js

// Giả lập database người dùng
const users = [];

// Hàm tạo tài khoản mới
export const registerUser = (email, password) => {
  const userExists = users.find((u) => u.email === email);
  if (userExists) {
    return false; // Tài khoản đã tồn tại
  }
  users.push({ email, password });
  return true; // Đăng ký thành công
};
