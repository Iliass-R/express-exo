const jwt = require("jsonwebtoken");
require ("dotenv").config();

secret = process.env.JWT_SIGN_SECRET;

module.exports = (req, res, next) => {
    try {
        console.log(req.headers.authorization);
        // Récupérer le token, qui se trouve dans le header. On split par les espaces et on récupère non pas le 0, mais le 1.
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, secret);
        const numAgent = decodedToken.numAgent;
        const grade = decodedToken.grade;
        if (numAgent && grade) {
            next();
        }
    } catch {
        res.status(401).json({ message: "Pas autorisé" });
    }
};
