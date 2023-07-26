const path=require('path')
const multer=require('multer')
// const storage=multer.diskStorage(
//     {
//         destination:'./storage/image',
//         filename:(req,file,cb)=>{
//             return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)

//         }
//     }
// )

const storage = multer.diskStorage({
    destination: './storage/image',
    filename: (req, file, cb) => {
      cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
  });

const upload=multer({
    storage:storage,
    limits:{

        fileSize:10000000,
    }
    
})
module.exports.upload=upload