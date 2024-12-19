import fs from 'fs';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

const handleFileUpload = async (req, type, id) => {
    const image = req.file;
    if (!image) return null;

    // Tạo thư mục lưu ảnh cho id
    const uploadDir = path.normalize(path.join(__dirname, '..', 'public', 'images', `${type}`, `${id}`));

    // Kiểm tra xem thư mục đã tồn tại chưa, nếu chưa thì tạo thư mục
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });  // Thêm tùy chọn recursive để tránh lỗi
    }

    // Đường dẫn ảnh cần lưu
    const imagePath = path.join(uploadDir, 'main.jpg');

    // Di chuyển ảnh vào thư mục
    fs.renameSync(image.path, imagePath);

    return `/public/images/${type}/${id}/main.jpg`; // Trả về đường dẫn ảnh để lưu vào cơ sở dữ liệu
};

export default handleFileUpload;