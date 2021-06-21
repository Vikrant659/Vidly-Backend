const {User} = require('../../../models/user');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
require("dotenv").config();

describe('user.generateAuthenticationToken', () => {
    it('should return a valid JWT', () => {
        const payload = { 
            _id: new mongoose.Types.ObjectId().toHexString(),
            isAdmin: true
        };
        
        const user = new User(payload);
        const token = user.generateAuthenticationToken();
        const decode = jwt.verify(token, process.env.vidly_jwtPrivateKey);
        // console.log(decode);
        expect(decode).toMatchObject(payload);
    });
});