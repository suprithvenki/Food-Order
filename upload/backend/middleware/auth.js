//middleware to decode the token

import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res.json({ success: false, message: "Not auhtorized login again" });
  }

  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    //we have set the token using user._id we should get the same when we decode that
    req.body.userId = token_decode.id;
    next();
  } catch (error) {
    console.log("Errors", error);
    res.json({ success: false, message: "Error" });
  }
};

export default authMiddleware;
