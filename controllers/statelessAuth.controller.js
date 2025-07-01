export const statelessLogin = (req, res) => {
  res.json({
    success: true,
    message: "Bypassed login via state",
    user: req.user || null, // coming from token validation middleware
  });
};