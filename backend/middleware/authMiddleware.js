const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded.id;
            next();
        } catch (err) {
            res.status(401).json({ message: 'Unauthorized' });
        }
    } else {
        res.status(401).json({ message: 'No token provided' });
    }
};

module.exports = { protect };
