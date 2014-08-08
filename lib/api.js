var express = require("express"),
    router = express.Router();

router.use("/heartrate", require("./heartrate").router);

module.exports.router = router;

