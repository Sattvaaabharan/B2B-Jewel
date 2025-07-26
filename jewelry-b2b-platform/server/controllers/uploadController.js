const s3 = require('../config/gcsStorage');

exports.uploadDocument = async (req, res, next) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: `${Date.now()}_${req.file.originalname}`, // Unique file name
    Body: req.file.buffer,
    ContentType: req.file.mimetype,
  };

  s3.upload(params, (err, data) => {
    if (err) {
      console.error('S3 upload error:', err);
      return next(err);
    }
    res.json({ url: data.Location });
  });
};
