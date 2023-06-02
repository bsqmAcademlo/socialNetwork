const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");

const config = require("../config");
const db = require("./utils/database");
const initModels = require("./models/initModels");

const routerUsers = require("./modules/users/users.router");
const routerPosts = require("./modules/posts/posts.router");
const routerAuth = require("./auth/auth.router");
const routerFollows = require("./modules/follows/follows.router");

db.authenticate()
    .then(() => console.log("Database Authenticated!!!"))
    .catch((err) => console.log(err));

db.sync()
    .then(() => console.log("Database Synced!!!"))
    .catch((err) => console.log(err));

initModels();

app.use(express.json());
app.use(cors());

const PORT = config.PORT;

app.get("/", (req, res) => {
    res.json({ message: "Hola mundo" });
});

const upload = require("./middlewares/multer.middleware");

app.get("/api/v1/uploads/:filename", (req, res) => {
    const fileName = req.params.filename;
    const pathFile = path.resolve(`./public/${fileName}`);
    res.status(200).sendFile(pathFile);
});

app.post("/api/v1/add-file", upload.single("profile_img"), (req, res) => {
    res.status(200).json({
        message: req.file,
    });
});

app.use("/api/v1", routerUsers);
app.use("/api/v1", routerAuth);
app.use("/api/v1", routerPosts);
app.use("/api/v1", routerFollows);

app.listen(PORT, () => {
    console.log(`app listen in the http://localhost:${PORT}`);
});
