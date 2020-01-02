const aws = require('aws-sdk')

module.exports = {
  signAndUpload: (req, res) => {
    const bucket = req.app.get('bucket')
    const accessId = req.app.get('accessKeyId')
    const secretKey = req.app.get('secretAccessKey')
    const {filename, type} = req.query

    aws.config = {
      region: 'us-west-1',
      accessKeyId: accessId,
      secretAccessKey: secretKey,
    }

    const s3 = new aws.S3()
    const s3Params = {
      Bucket: bucket,
      Key: filename,
      Expires: 60,
      ContentType: type,
      ACL: 'public-read'
    }

    s3.getSignedUrl('putObject', s3Params, (err, data) => {
      if (err) {
        console.log(err)
        return res.end()
      } 
      
      return res.send({
        signedRequest: data,
        url: `https://${bucket}.s3.amazonaws.com/${filename}`
      })
    })
  }
}