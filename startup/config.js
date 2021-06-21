const dotenv = require('dotenv');
dotenv.config();

module.exports = function() {
    if(!process.env.vidly_jwtPrivateKey) {
        throw new Error('FATAL ERROR: JWT private key is not defined');
    }
    
}