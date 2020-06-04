let express = require("express");
let app = express();
let mongoose = require("mongoose");
let multer = require("multer");
let postsRouter = require("./routes/posts.js");
let callbackRequestRouter = require("./routes/callback-request.js");    
let emailRouter = require("./routes/email.js");
let usersRouter = require("./routes/user.js");
let cookieParser = require("cookie-parser");
let auth = require("./controllers/auth");
let Post = require("./models/posts").Post;
app.set("view engine", "ejs");

mongoose.connect("mongodb+srv://smekja:bnmbnmbnm@mycluster-9xxtp.mongodb.net/travels", { useNewUrlParser: true });
app.use(express.json());

let imageStorage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "public/images"), 
    filename: (req, file, cb) => cb(null, file.originalname)
});
app.use(multer({storage: imageStorage}).single("imageFile"));

app.use(express.static("public"));
app.use(cookieParser());
app.use("/posts", postsRouter);
app.use("/callback-request", callbackRequestRouter);
app.use("/email", emailRouter);
app.use("/users", usersRouter);

app.get("/sight", async (req, resp) => {
    let id = req.query.id;
    let post = await Post.findOne({id: id});
    resp.render("sight", {
        title: post.title,
        imageURL: post.imageURL,
        date: post.date,
        text: post.text
    })
})

app.get("/admin", (req,resp) => {
    let token = req.cookies["auth_token"];
    if(token && auth.checkToken(token)) {
        resp.render("admin");
    }else {
        resp.redirect("/login");
    }

})
app.get("/login", (req, resp) => {
    resp.render("login");
})
app.listen(3000, () => console.log("Listening 3000..."));