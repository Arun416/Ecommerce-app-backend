const multer = require('multer');
const path = require("path");
const fs = require('fs');


//image upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
         cb(null,'public/images');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname+"_"+Date.now() + path.extname(file.originalname));
    }
});

// checking file type
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb(new Error('Not an image! Please upload an image.', 400), false);
    }
};


exports.upload = multer({storage: storage,
     limits: {
        fileSize: 1024 * 1024 * 6
    }, 
    fileFilter: fileFilter 
 }); 