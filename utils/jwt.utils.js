const jwt = require('jsonwebtoken');
require ('dotenv').config();

const secret = process.env.JWT_SIGN_SECRET;

module.exports = {
    generateTokenForUser: function(userData) {
        return jwt.sign({
            numAgent: userData.numAgent,
            grade: userData.grade
        },
        secret,{
            expiresIn: '24h'
        })
    }
};