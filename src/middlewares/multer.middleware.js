const multer = require("multer");
const path = require("path");
const uuid = require("uuid").v4();

const storage = multer.diskStorage({
    filename: (req, file, done) => {
        done(null, `${uuid}-${file.originalname}`);
    },
    destination: (req, file, done) => {
        done(null, path.resolve("./public/"));
    },
});

const upload = multer({
    storage,
});

module.exports = upload;
