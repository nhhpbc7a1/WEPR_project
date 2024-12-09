// Mock user database
const users = [
    { username: 'admin', password: 'password' },
    { username: 'user1', password: '123456' },
];

module.exports.validateUser = (username, password) => {
    return users.some(user => user.username === username && user.password === password);
};
''