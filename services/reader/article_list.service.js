import db from '../../ultis/db.js';

export default {
    findAll() {
        try {
            return db('Articles');
        } catch (error) {
            console.error('Error fetching articles:', error);
            throw new Error('Unable to fetch articles');
        }
    }
}