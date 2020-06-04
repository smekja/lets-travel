let User = require("../models/users").User;
let express = require("express");
let router = express.Router();
let bcrypt = require("bcrypt");
let auth = require("../controllers/auth");

router.post("/login", async (req, resp) => {
    let email = req.body.email;
    let password = req.body.password;
    let user = await User.findOne().where({email: email});
    if(user) {
        let comparisonResult = await bcrypt.compare(password, user.password);
        if (comparisonResult) {
            let token = auth.generateToken(user);
            resp.cookie("auth_token", token);
            resp.send({
                redirectURL: "/admin"
            });
        }else {
            resp.status(400);
            resp.send("Rejected.");
        }
    } else {
        resp.status(400);
        resp.send("Rejected.");
    }
})
router.post("/register", async (req, resp) => {
    let email = req.body.email;
    let password = req.body.password;
    let user = await User.findOne().where({email: email}).where({password: password});
    if(!user) {
        let encryptedPass = await bcrypt.hash(password, 12);
        let newUser = new User({
            email: email,
            password: encryptedPass
        })
        await newUser.save();
        resp.send("Done.");
    } else {
        resp.send(`Email already used. ${user}`);
    }
})
module.exports = router;