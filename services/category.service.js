import db from '../ultis/db.js';
export default{
    async findAll() {
        try {
            // Lấy tất cả danh mục từ bảng Categories
            const categories = await db('Categories');
            const groupedCategories = {};

            // Duyệt qua tất cả danh mục để phân loại
            categories.forEach(category => {
                // Nếu là danh mục cấp 1 (không có parent_category_id)
                if (!category.parent_category_id) {
                    groupedCategories[category.category_id] = {
                        ...category,
                        children: [] // Mảng chứa danh mục con
                    };
                } else {
                    if (groupedCategories[category.parent_category_id]) {
                        groupedCategories[category.parent_category_id].children.push(category);
                    }
                }
            });

            // Chuyển kết quả từ object thành mảng và trả về
            return Object.values(groupedCategories);
        } catch (error) {
            console.error('Error fetching categories:', error);
            throw new Error('Unable to load categories');
        }
    },
}