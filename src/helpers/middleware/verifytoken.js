const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const headerAuth = req.headers.authorization || "";

  if (!headerAuth) {
    return res.status(401).json("No esta autenticado");
  }
  const token = headerAuth;
  jwt.verify(token, process.env.JWT_SCRE, (err, user) => {
    if (err) { 
      return res.status(403).json("Token inválido");
    }
    req.user = user;
    next();
  });
};

const verifyTokenAutorizationAdminUser = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      return next();
    }
    return res.status(403).json("No tiene permitido hacer esto");
  });
};

module.exports = { verifyToken, verifyTokenAutorizationAdminUser };