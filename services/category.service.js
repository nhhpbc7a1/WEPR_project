import db from '../ultis/db.js';
export default{
    async findAll() {
        try {
            return await db('categories');
        } catch (error) {
            console.error('Error fetching categories:', error);
            throw new Error('Unable to load categories');
        }
    },
}