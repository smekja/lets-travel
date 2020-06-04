let Email = require("../models/email.js").Email;
let uniqid = require("uniqid");
let express = require("express");
let router = express.Router();
let authMiddleware = require("../middleware/auth.js");

router.get("/", authMiddleware, async (req,resp) => {
    resp.send(await Email.find());
});
router.post("/", async (req,resp) => {
    let reqBody = req.body;
    let newRequest = new Email({
        id: uniqid(),
        email: reqBody.email,
        name: reqBody.name,
        text: reqBody.text,
        date: new Date()
    })
    await newRequest.save()
    resp.send("Accepted");
});
router.delete("/:id", authMiddleware, async (req,resp) => {
    await Email.deleteOne({id: req.params.id})
    resp.send("Deleted.")
});

module.exports = router;