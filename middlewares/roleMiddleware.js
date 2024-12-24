module.exports = (roles) => {
    return (req, res, next) => {
        const userRole = req.session.role;
        if (roles.includes(userRole)) {
            return next();
        }else{
            return res.status(401).send('Unauthorized');
        }
    }
}