const express = require("express");
const { registerUser, loginUser, getUserProfile } = require("../controllers/authController");
const { protect } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");
 
const router = express.Router();

router.post("/register", registerUser); 
router.post("/login", loginUser);         
router.get("/profile", protect, getUserProfile);   
 
router.post("/upload-image", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  res.status(200).json({ imageUrl: req.file.path }); 
});


module.exports = router;
