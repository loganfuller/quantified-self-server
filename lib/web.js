var express = require("express"),
    router = express.Router();

router.use(express.static(__dirname + "/../public"));

module.exports.router = router;

