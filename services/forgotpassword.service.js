import db from '../ultis/db.js';
import nodemailer from 'nodemailer';

// Cấu hình dịch vụ gửi email (sử dụng Gmail trong ví dụ này)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your-email@gmail.com',
        pass: 'your-email-password',
    },
});

// Sinh OTP ngẫu nhiên 4 chữ số
function generateOTP() {
    return Math.floor(1000 + Math.random() * 9000); // OTP 4 chữ số
}

// Gửi OTP qua email
function sendOTP(email, otp) {
    const mailOptions = {
        from: 'your-email@gmail.com',
        to: email,
        subject: 'Mã OTP để thay đổi mật khẩu',
        text: `Mã OTP của bạn là: ${otp}`,
    };

    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                return reject(err);
            }
            resolve(info.response);
        });
    });
}

export default {

    // Gửi OTP đến email của người dùng
    async sendOTPToEmail(email) {
        // Kiểm tra xem email có tồn tại trong cơ sở dữ liệu không
        const user = await db('users').where({ email }).first();
        if (!user) {
            throw new Error('Email không tồn tại');
        }

        const otp = generateOTP();

        // Lưu OTP vào cơ sở dữ liệu (có thể thêm thời gian hết hạn của OTP nếu muốn)
        await db('users').where({ email }).update({ otp });

        // Gửi OTP qua email
        await sendOTP(email, otp);

        return 'OTP đã được gửi đến email của bạn';
    },

    // Xác thực OTP và thay đổi mật khẩu
    async verifyOTPAndChangePassword(email, otp, newPassword) {
        const user = await db('users').where({ email }).first();
        if (!user) {
            throw new Error('Email không tồn tại');
        }

        if (user.otp !== otp) {
            throw new Error('Mã OTP không chính xác');
        }

        // Cập nhật mật khẩu mới
        await db('users').where({ email }).update({ password: newPassword, otp: null });

        return 'Mật khẩu đã được thay đổi thành công';
    }
};
