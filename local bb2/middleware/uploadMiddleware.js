const multer = require('multer')

const upload = multer({
  dest: './public/upload'
})

module.exports = upload