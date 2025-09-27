const AWS = require('aws-sdk');
const responseMaker = require('../../../helpers/responseMaker');

const uploadController = async (req, res) => {
  try {
    const { mimetype, buffer } = req.file;
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `NONU_${Date.now()}`,
      Body: buffer,
      ContentType: mimetype,
    };
    const s3 = new AWS.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
    });
    s3.upload(params, (err, data) => {
      if (err) {
        return responseMaker(res, 500, 'Error uploading file', null, err);
      } else {
        return responseMaker(
          res,
          200,
          'File uploaded successfully',
          { url: data.Location, imageKey: data.Key },
          false
        );
      }
    });
  } catch (error) {
    return responseMaker(
      res,
      500,
      `Internal Server Error ${error}`,
      null,
      error
    );
  }
};

module.exports = uploadController;
