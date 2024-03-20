import multer from 'multer';

/*
Don't forget the enctype="multipart/form-data" in your form.

<form action="/profile" method="post" enctype="multipart/form-data">
  <input type="file" name="avatar" />
</form>
*/

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/temp")
    },
    filename: function (req, file, cb) {
      
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      const fileNameWithSuffix = file.originalname + '-' + uniqueSuffix
      cb(null, fileNameWithSuffix )
    }
  })
  
  export const upload = multer({ storage: storage, })
