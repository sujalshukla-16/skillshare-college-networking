export const getProfile = async (req, res) => {
  try {
    res.json(req.user); // already decoded from token
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
