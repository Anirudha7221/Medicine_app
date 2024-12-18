const jwt = require('jsonwebtoken');

const auth = (req, res, next)=>{
    const token = req.headers['authorization']?.split('')[1];

    if (!token) return res.sendStatus(403).json({ message: 'Token required' });

    jwt.verify(token, process.env.JWT_SECRET, (err, user)=>{
        if(err) return res.sendStatus(403).json({ message: 'Invalid Token' });

        req.user=user;
        next();
    });
}

module.exports = auth;