import jwt from "jsonwebtoken";

export const generateAuthToken = (userId, res) => {
  const token = jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.cookie("authToken", token, {
    httpOnly: true,
    secure: true,        // ✅ ALWAYS true on Render
    sameSite: "none",    // ✅ REQUIRED
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return token;
};