const asyncHandler = require("express-async-handler");
const multer = require("multer");
const path = require("path");
const Image = require("../models/userImageModel");
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
  const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
  const fileName = "uploadImage-" + uniqueSuffix + path.extname(file.originalname);
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

// @desc   Get Image
// @route  GET /image
// @access Private
const getImage = asyncHandler(async (req, res) => {
  const images = await Image.find({ user: req.user.id });
  if (images) {
    res.status(200).json(images);
  } else {
    res.status(404);
    throw new Error("Image not found");
  }
});


// @desc   Set Image
// @route  POST /api/image
// @access Private
const setImage = asyncHandler(async (req, res) => {
  upload.single("uploadImage")(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: "Image upload failed", error: err.message });
    }
    if (!req.file) {
      return res.status(400).json({ message: "Please select an image to upload" });
    }

    try {
      const imageUrl = await uploadToFirebaseStorage(req.file);
      const image = new Image({
        user: req.user.id,
        fileName: req.file.originalname,
        filePath: imageUrl,
      });

      await image.save();
      res.status(200).json({ image });
    } catch (error) {
      res.status(500).json({ message: "Failed to upload image", error: error.message });
    }
  });
});


// Update Image
// PUT /api/image/
// Private Access
const updateImage = asyncHandler(async (req, res) => {
  upload.single("uploadImage")(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: "Image upload failed", error: err.message });
    }
    if (!req.file) {
      return res.status(400).json({ message: "Please select an image to upload" });
    }

    try {
      const imageUrl = await uploadToFirebaseStorage(req.file);

      // Find the user's existing image in the database
      let image = await Image.findOne({ user: req.user.id });

      // If no image record exists, create a new one
      if (!image) {
        image = new Image({
          user: req.user.id,
          fileName: req.file.originalname,
          filePath: imageUrl,
        });
      } else {
        // Update the existing image's URL in the database
        image.fileName = req.file.originalname;
        image.filePath = imageUrl;
      }

      // Save the image record to the database
      await image.save();

      res.status(200).json({ image });
    } catch (error) {
      res.status(500).json({ message: "Failed to update image", error: error.message });
    }
  });
});


// @desc   Delete Image
// @route  DELETE /api/image/
// @access Private
const deleteImage = asyncHandler(async (req, res) => {
  const image = await Image.findById(req.params.id);
  if (image) {
    if (image.user.toString() === req.user._id.toString()) {
      // Delete the image from Firebase Storage
      const fileName = path.basename(image.filePath);
      await bucket.file(fileName).delete();

      // Delete the image from the database
      await image.remove();
      res.status(200).json({ message: "Image Deleted", deletedImage: image });
    } else {
      res.status(401);
      throw new Error("Not authorized to delete this Image");
    }
  } else {
    res.status(404);
    throw new Error("Image not found");
  }
});


module.exports = {
  getImage,
  setImage,
  updateImage,
  deleteImage,
};
