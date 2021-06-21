const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const {User, validate} = require('../models/user');
const express = require('express');
const router = express.Router();

router.get('/me', auth, async (req, res) => {
    console.log(req);
    const user = await User.findById(req.user.id).select('-password');
    console.log(user);
    res.send(user);
});

router.post('/', async (req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if(user) res.status(400).send('User already registered');

    user = new User (_.pick(req.body, ['name','email','password']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    user = await user.save();

    const token = user.generateAuthenticationToken();
    res.header('x-auth-token', token).send(_.pick(user, ['_id','name','email']));
});

module.exports = router;