import admin from "firebase-admin";

const authMiddleware = async (req, res, next) => {
  // Get the token from the cookie
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized", error: error.message });
  }
};

export default authMiddleware;
