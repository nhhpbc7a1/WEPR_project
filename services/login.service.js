import db from '../ultis/db.js';
export default{
    async addAccount({ role_id, username, password, fullname, email, phone_number, birth_date }) {
        try {
          const hashedPassword = await bcrypt.hash(password, saltRounds);
          const [accountId] = await db('Accounts').insert({
            role_id,
            username,
            password: hashedPassword,
          });
    
          const [userId] = await db('Users').insert({
            account_id: accountId,
            fullname,
            email,
            phone_number,
            birth_date,
          });
    
          return { accountId, userId };
        } catch (error) {
          console.error('Lỗi khi thêm tài khoản:', error);
          throw new Error('Không thể tạo tài khoản.');
        }
      },

}