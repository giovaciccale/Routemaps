const User = require('../model/userModel')

const checkSession = async (req, res, next) => {
    try {
        const userId = req.session.userId;

        if (!userId) {
            return res.redirect('/login');
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.redirect('/login');
        }

        if (user.isBlocked) {
            return res.redirect('/blocked');
        }
        next();
    } catch (err) {
        console.error('Error in checkSession middleware:', err);
        res.redirect('/error');
    }
};
const isLogin = (req, res, next) => {
    if (req.session.userId) {
        res.redirect('/orders');
    } else {
        next();
    }
};




module.exports = {
    isLogin,
    checkSession,
}