const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

 
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "profile_images",  
    allowed_formats: ["jpeg", "png", "jpg"],   
    public_id: (req, file) => `${Date.now()}-${file.originalname}`,  
  },
});
 
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only .jpeg, .jpg and .png formats are allowed"), false);
  }
};
 
const upload = multer({ storage, fileFilter });

module.exports = upload; 