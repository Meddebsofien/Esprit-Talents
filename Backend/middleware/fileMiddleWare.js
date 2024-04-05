const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { cloudinary } = require("./cloudinaryConfig");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: (req, file) => {
    return {
      resource_type: "auto",
      folder: "Esprit_Platform",
      public_id: file.originalname,
    };
  },
});

const upload = multer({ storage: storage }).fields([
  { name: "cv", maxCount: 1 }, // Accepts 1 file with field name 'cv'
  { name: "motivationLetter", maxCount: 1 }, // Accepts 1 file with field name 'motivationLetter'
]);

const uploadFileToCloudinary = (req, res, next) => {
  try {
    console.log("*************************");

    upload(req, res, (err) => {
      console.log(req.body);

      if (err) {
        throw new Error("Error uploading file");
      }

      req.body.cvUpload = req.files["cv"][0].path;
      req.body.motivationLetterUpload = req.files["motivationLetter"][0].path;
      next();
    });
  } catch (error) {
    return res.status(500).json({ message: "Error uploading file" });
  }
};

module.exports = uploadFileToCloudinary;
