import db from '../ultis/db.js';

export default {
    findByUsername(username) {
        return db('users')
           .where('username', username)
           .first();
    },
    findByEmail(email) {
        return db('users')
           .where('email', email)
           .first();
    },

    findUserByAccountID(username) {
        return db('users')
           .where('username', username)
           .first();
    },
    add_user(entity) {
        return db('users')
            .insert(entity)
            .then(() => {
                return db('users')
                   .max('user_id as id')
                   .first();
            })
           .then(result => {
                return result.id;  // Trả về user_id của bản ghi mới
            });
    }
};