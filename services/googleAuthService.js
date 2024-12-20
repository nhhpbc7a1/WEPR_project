import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client(
    '27591522593-3vh6610g3n58hreubc5o3eatbv52ohi7.apps.googleusercontent.com',
    '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', // Thay YOUR_CLIENT_SECRET bằng secret của bạn
    'http://localhost:3000/account/google/callback'   
);

async function verifyGoogleToken(idToken) {
    try {
        const ticket = await client.verifyIdToken({
            idToken: idToken,
            audience: '27591522593-3vh6610g3n58hreubc5o3eatbv52ohi7.apps.googleusercontent.com',
        });
        return ticket.getPayload();
    } catch (error) {
        throw new Error('Xác thực Google thất bại');
    }
}

async function getTokenFromCode(code) {
    try {
        const { tokens } = await client.getToken(code); // Lấy token từ mã code
        client.setCredentials(tokens); // Thiết lập token cho client nếu cần dùng tiếp
        return tokens; 
    } catch (error) {
        throw new Error('Không thể lấy token từ mã code');
    }
}

export default {
    verifyGoogleToken,
    getTokenFromCode
};