//upload csv to server middleware

const multer = require("multer");

// const csvFilter = (req, file, cb) => {
//   if (file.mimetype.includes("csv")) {
//     cb(null, true);
//   } else {
//     cb("Please upload only csv file.", false);
//   }
// };

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/csvs/");
  },
  filename: (req, file, cb) => {
    console.log(file.originalname);
    cb(null, `${Date.now()}-bezkoder-${file.originalname}`);
  },
});

//var uploadFile = multer({ storage: storage, fileFilter: csvFilter });
var uploadFile = multer({ storage: storage });
module.exports = uploadFile;