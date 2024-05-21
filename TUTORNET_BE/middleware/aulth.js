const jwt = require ('jsonwebtoken');


/** auth middleware */
module.exports.authMiddleware = (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ error: 'No token provided' });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET || 'ssgdmmsjmjfjsmgfh,jsfv,');
        req.user = decodedToken;
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ error: 'Authentication failed!' });
    }
};
