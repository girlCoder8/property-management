const checkAuth = (req, res, next) => {
    if (req.session.isAuth) {
        next();
    }
    else {
        res.status(401).send("Not Authorized")
    }
}

module.exports = checkAuth;