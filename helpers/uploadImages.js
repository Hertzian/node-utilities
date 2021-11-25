const path = require('path')
const multer = require('multer')

//config image location
const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`)
  }
})

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  }
}).single('myImage')

const checkFileType = (file, cb) => {
  //Allowed ext
  const filetypes = /jpeg|jpg|png|gif/
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  //check mime
  const mimetype = filetypes.test(file.mimetype)
  if (extname && mimetype) return cb(null, true)
  return cb('Error: Images Only!')
}

module.exports = {
  upload
}
