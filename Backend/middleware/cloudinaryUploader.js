const cloudinary = require("cloudinary").v2;

require("dotenv").config();


// Function to upload PDF to Cloudinary
function uploadPDFToCloudinary(pdfPath) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(pdfPath, { resource_type: "raw" }, (uploadError, uploadResult) => {
      if (uploadError) {
        reject(uploadError);
      } else {
        resolve(uploadResult);
      }
    });
  });
}

module.exports = uploadPDFToCloudinary;