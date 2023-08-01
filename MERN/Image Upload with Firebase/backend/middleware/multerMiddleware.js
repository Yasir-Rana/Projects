const path = require('path');
const multer = require('multer');
const admin = require("firebase-admin");
const serviceAccount = require("../serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "store-images-e992d.appspot.com",
});


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const bucket = admin.storage().bucket();

const uploadToFirebaseStorage = async (file) => {
  const fileName = "uploadImage-" + Date.now() + path.extname(file.originalname);
  const fileUpload = bucket.file(fileName);
  const stream = fileUpload.createWriteStream({
    metadata: {
      contentType: file.mimetype,
    },
  });

  return new Promise((resolve, reject) => {
    stream.on("error", (error) => {
      reject(error);
    });
    stream.on("finish", () => {
      const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(fileName)}?alt=media`;
      resolve(imageUrl);
    });
    stream.end(file.buffer);
  });
};


module.exports = {
  upload,
  uploadToFirebaseStorage
}
