import multer from 'multer';
import path from 'path';
import fs from 'fs';
const dir = './public/temp';

if (!fs.existsSync(dir)){
  fs.mkdirSync(dir, { recursive: true });
}


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, dir)
    },
    filename: function (req, file, cb) {
      
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      const filleNameWithoutExntension = file.originalname.split('.')[0]
      const fileNameWithSuffix =  filleNameWithoutExntension + '-' + uniqueSuffix + '.' + file.originalname.split('.')[1]
      cb(null, fileNameWithSuffix )
    }
  })
  
  export  const upload = multer({ storage: storage, })
