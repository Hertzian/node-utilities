const { upload } = require('../helpers/uploadImages')

exports.uploadForm = (req, res) => {
  return res.render('images')
}

exports.uploadAction = (req, res) => {
  upload(req, res, (err) => {
    if (err) return res.render('images', { msg: err })
    if (req.file == undefined) {
      return res.render('images', { msg: 'Error: No file selected' })
    } else {
      return res.render('images', {
        msg: 'File uploaded!',
        file: `/public/uploads/${req.file.filename}`
      })
    }
    return res.send('test')
  })
}
