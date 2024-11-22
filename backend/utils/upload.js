//upload.js
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");

// Create storage engine
export function upload() {
  const mongodbUrl = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_USER_PWD}@dbcompunet.x67fx.mongodb.net/?retryWrites=true&w=majority&appName=DBCompunet`;
  const storage = new GridFsStorage({
    url: mongodbUrl,
    file: (req, file) => {
      return new Promise((resolve, _reject) => {
        const fileInfo = {
          filename: file.originalname,
          bucketName: "filesBucket",
        };
        resolve(fileInfo);
      });
    },
  });

  return multer({ storage });
}

module.exports = { upload };