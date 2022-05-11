const express = require('express');
const bcrypt = reguire('bcryptjs');
require('dotenv').config();
const router = express.Router();
const { User } = require('../models');





router.get('/login', (req, res) => {
    res.render('auth/login.ejs')
})



router.post('/login', async (req, res) => {
    try {
        const foundUser = await User.findOne({ email: req.body.email });

        if (!foundUser) return res.send("The password or the username is invalid");

        const match = await bcrypt.compare(req.body.password, foundUser.password);

        if (!match) return res.send("The password or the username is invalid");

        req.session.currentUser = {
            id: foundUser._id,
            username: foundUser.username,
        };

        res.redirect("/streamDream");
    } catch (error) {
        req.err = err;
        res.send(err);
    }
});



router.get('/register', (req, res) => {
    res.render('auth/register.ejs')
});



router.post('/register', async (req, res) => {
    try {
        const foundUser = await User.exists({ email: req.body.email})
        if (foundUser) {
            return res.redirect('/login')
        }
        const salt = await bcrypt.genSalt(process.env.SALT_ROUNDS);
        const hash = await bcrypt.hash(req.body.password, salt);
        req.body.password = hash;

        const newUser = await User.create(req.body);

        return res.redirect('/login')
    } catch (error) {
        console.log(error);
        req.error = error;
        return next();
    }
})


router.get('/logout', async (req, res) => {
    try {
        await req.session.destroy();
        return res.redirect('/login');

    } catch (error) {
        return res.send(error)
    }
});



module.exports = router
