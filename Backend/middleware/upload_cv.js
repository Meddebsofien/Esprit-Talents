const fs = require('fs');
const path = require('path');

// Function to upload a PDF file
function uploadPDF(file) {
  const directoryPath = "C:/Users/Arwa Bougattaya/Documents/Esprit-Talents/Backend/uploads/";

  const fileName = file.originalname;
  console.log("fileName",fileName)
  const filePath = path.join(directoryPath, fileName);
  console.log("filePath",filePath)

  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, file.buffer, (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(filePath);
    });
  });
}

module.exports = {
  uploadPDF
};