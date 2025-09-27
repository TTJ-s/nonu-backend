const AWS = require('aws-sdk');
const responseMaker = require('../../../helpers/responseMaker');

const counsellorUploadController = async (req, res) => {
  try {
    // const { mimetype, buffer } = req.file;
    responseMaker(
      res,
      200,
      'File uploaded successfully',
      {
        url: 'https://i.guim.co.uk/img/media/327aa3f0c3b8e40ab03b4ae80319064e401c6fbc/377_133_3542_2834/master/3542.jpg',
        imageKey: 'cat',
      },
      false
    );
    // const params = {
    //   Bucket: process.env.AWS_BUCKET_NAME,
    //   Key: `NONU_${Date.now()}`,
    //   Body: buffer,
    //   ContentType: mimetype,
    // };
    // const s3 = new AWS.S3({
    //   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    //   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    //   region: process.env.AWS_REGION,
    // });
    // s3.upload(params, (err, data) => {
    //   if (err) {
    //     responseMaker(res, 500, 'Error uploading file', null, err);
    //   } else {
    //     responseMaker(
    //       res,
    //       200,
    //       'File uploaded successfully',
    //       { url: data.Location, imageKey: data.Key },
    //       false
    //     );
    //   }
    // });
  } catch (error) {
    responseMaker(res, 500, `Internal Server Error ${error}`, null, error);
  }
};

module.exports = counsellorUploadController;
