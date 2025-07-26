const { bucket } = require('../config/gcsStorage');
const { v4: uuidv4 } = require('uuid');

exports.uploadDocument = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ msg: 'No file uploaded' });

    const blob = bucket.file(`${uuidv4()}_${req.file.originalname}`);
    const blobStream = blob.createWriteStream({
      resumable: false,
      metadata: {
        contentType: req.file.mimetype,
      },
    });

    blobStream.on('error', (err) => {
      console.error('Upload error:', err);
      res.status(500).json({ msg: 'Upload failed', error: err.message });
    });

    blobStream.on('finish', () => {
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
      res.status(200).json({ url: publicUrl });
    });

    blobStream.end(req.file.buffer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error', error: error.message });
  }
};
