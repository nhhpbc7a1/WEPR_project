import axios from 'axios';

const FACEBOOK_APP_ID = '451779097775725'; // Thay bằng App ID của bạn
const FACEBOOK_APP_SECRET = '798617e9b4e88c4e26416ac23f967dc4'; // Thay bằng App Secret của bạn
const FACEBOOK_REDIRECT_URI = 'http://localhost:3000/account/auth/facebook'; 

class FacebookAuthService {
  // Lấy thông tin người dùng từ Facebook bằng access token
  static async getUserData(accessToken) {
    try {
      const response = await axios.get(`https://graph.facebook.com/me`, {
        params: {
          access_token: accessToken,
          fields: 'id,name,email', 
        },
      });
      return response.data; 
    } catch (error) {
      throw new Error('Xác thực Facebook thất bại: ' + error.message);
    }
  }
 
}

export default FacebookAuthService;