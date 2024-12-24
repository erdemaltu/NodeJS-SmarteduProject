module.exports = (roles) => {
    return (req, res, next) => {
        const userRole = req.body.role;
        if (roles.includes(userRole)) {
            return next();
        }else{
            return res.status(401).send('Unauthorized');
        }
    }
}