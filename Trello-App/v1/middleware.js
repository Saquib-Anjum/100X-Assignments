import jwt from "jsonwebtoken";
function authMiddleware(req, res, next) {
  const { token } = req.headers;

  const decoded = jwt.verify(token, "secret");
  const userId = decoded.userId;
  if (userId) {
    req.userId;
    next();
  } else {
    return res.ststus(400).json({
      success: false,
      message: "Invalid token",
    });
  }
}
export default authMiddleware;
