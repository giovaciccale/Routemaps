const bcrypt = require('bcrypt');
const User = require("../model/userModel");
const nodemailer = require('nodemailer');
const path = require('path');
require('dotenv').config();

let transporter;

// Immediately invoked function to set up nodemailer and handlebars
(async () => {
    try {
        const hbs = await import('nodemailer-express-handlebars');

        // Setup nodemailer transport
        transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        const handlebarOptions = {
            viewEngine: {
                extname: '.hbs',
                partialsDir: path.join(__dirname, '../../views/partials'),
                layoutsDir: path.join(__dirname, '../views/layouts'),
                defaultLayout: false,
            },
            viewPath: path.join(__dirname, '../../views/user'),
            extName: '.hbs',
        };

        // Register handlebars as the template engine for nodemailer
        transporter.use('compile', hbs.default(handlebarOptions));
        console.log("Nodemailer with Handlebars configured successfully");

    } catch (error) {
        console.error('Error configuring nodemailer-express-handlebars:', error);
    }
})();

// Renders the authentication prompt page
const authPromptPage = (req, res) => {
    res.render('user/authPrompt')
};


// Renders the login page for users 
const loginPage = (req, res) => {
    res.render('user/login');
};


// login verification 
const loginBtn = async (req, res) => {
    try {
        const { email, password } = req.body;

        const exist = await User.findOne({ email });
        if (!exist) {

            return res.render('user/login', { err: 'User does not exist' });
        }

        const pass = await bcrypt.compare(password, exist.password);
        if (!pass) {

            return res.render('user/login', { err: 'Incorrect password' });
        }

        if (exist.isBlocked) {
            return res.render('user/login', { err: 'You are blocked' });
        }

        req.session.userId = exist._id;
        req.session.loginMethod = 'email';

        return res.redirect("/");
        // return res.status(200).json({ message: 'Login successful', userId: exist._id });

    } catch (err) {
        console.log("Login error:", err);
        return res.render('user/login', { err: 'An error occurred during login' });
    }
};




// Renders the signup page for new users to register
const signupPage = (req, res) => {
    res.render('user/signup')
};



//user logout and clears the session
const logoutBtn = (req, res) => {
    delete req.session.userId;
    res.redirect('/login');
};
//demo login function
const demoLogin = async (req, res) => {
    try {
        const demoUser = await User.findOne({ email: 'demo@yourapp.com' });

        if (!demoUser) {
            return res.status(400).send('Demo user not available');
        }

        req.session.userId = demoUser._id;
        return res.redirect('/');
    } catch (err) {
        console.error("Demo login error: ", err);
        return res.status(500).send('Internal Server Error');
    }
};
// page for blocked users
const blocked = (req, res) => {
    res.render('user/blocked');
};


module.exports = {
    authPromptPage,
    loginPage,
    loginBtn,
    signupPage,
    demoLogin,
    blocked,
    logoutBtn
};