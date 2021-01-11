const fs = require('fs')
const path = require('path')
const sharp = require('sharp')
const sizeOf = require('image-size')

fs.readdir(path.join(__dirname, 'img/input'), (err, files) => {
  if (err) throw err

  files.forEach(el => {

    const ext = path.extname(el)?.substr(1)
    const isImage = ['png', 'jpeg', 'jpg', 'gif', 'tiff', 'bmp', 'webp'].some(el => el === ext)

    if (isImage) {
      const { height, width } = sizeOf(path.join(__dirname, 'img/input', el))
      let typeUrl
      
      if ( height <= 300 && width <= 300) {
        typeUrl = '300'
      } else if ( height <= 500 && width <= 500) {
        typeUrl = '500'
      } else if ( height <= 800 && width <= 800) {
        typeUrl = '800'
      } else if ( height <= 1000 && width <= 1000) {
        typeUrl = '1000'
      } else {
        typeUrl = 'default'
      }

      fs.readdir(path.join(__dirname, 'img/output'), (err, images) => {
        if (err) throw err
        if (!images.includes(typeUrl)) {
          fs.mkdir(path.join(__dirname, 'img/output', typeUrl), err => {
            if (err) throw err
          })
        }
      })

      sharp(path.join(__dirname, 'img/input', el))
      .resize(100, 50)
      .toFile(path.join(__dirname, `img/output/${typeUrl}`, el), err => {
        if (err) throw err
      })
    }
  })
})
