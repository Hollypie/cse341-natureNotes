const authMiddleware = (req, res, next) => {
    if (!req.user && !req.session.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    next();
}

module.exports = authMiddleware;