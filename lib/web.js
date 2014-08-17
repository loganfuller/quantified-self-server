var express = require("express"),
    router = express.Router();

router.use("/static", express.static(__dirname + "/../public"));
router.get(/\/(heartrate|medication|sleep|bloodpressure)?\/?$/i, function(req, res, next) {
    res.sendFile("index.html", { root: __dirname + "/../public/" });
});

module.exports.router = router;

