// services/login.service.js

// Giả lập database người dùng
const users = [
    { email: "admin@example.com", password: "123456" },
    { email: "user@example.com", password: "654321" }
  ];
  
  // Hàm xác thực thông tin đăng nhập
  export const loginUser = (email, password) => {
    const user = users.find((u) => u.email === email && u.password === password);
    return user ? true : false;
  };
  