// server/config/gcsStorage.js
const { Storage } = require('@google-cloud/storage');
const storage = new Storage({ keyFilename: 'path/to/your-service-account.json' });
const bucket = storage.bucket(process.env.GCS_BUCKET_NAME);

module.exports = { storage, bucket };
