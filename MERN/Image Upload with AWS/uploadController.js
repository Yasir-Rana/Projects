const { S3 } = require("aws-sdk");                                       // v2
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");   // v3
const asyncHandler = require("express-async-handler");

exports.uploadV2 = asyncHandler(async (req, res, next) => {
  const s3 = new S3();
  try {
    if (!req.file) {
      throw new Error('File Missing');
    }

    const { mimetype } = req.file;
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Body: req.file.buffer,
      Key: `uploads/${Date.now()}-image`,
      ContentType: mimetype,
    };

    const data = await s3.upload(params).promise();
    res.status(200).send(data);
  } catch (error) {
    next(error); 
  }
});




exports.uploadV3 = asyncHandler(async (req, res, next) => {
  const s3client = new S3Client();
  try {
    if (!req.file) {
      throw new Error('File Missing');
    }
  
  const { mimetype } = req.file;
  const key = `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/uploads/${Date.now()}-image`;
  const params = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Region: process.env.AWS_REGION,
    Body: req.file.buffer,
    Key: `uploads/${Date.now()}-image`,
    ContentType: mimetype,
  });

    const data = await s3client.send(params);
    const response = { key: key, ...data};
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

