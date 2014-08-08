var mongoose = require("./db").mongoose,
    express = require("express");

var heartrateSchema = mongoose.Schema({
        timestamp: { type: Date, default: Date.now },
        bps: Number,
        bodyLocation: String
    }),
    Heartrate = mongoose.model("Heartrate", heartrateSchema);

var router = express.Router();

router.get("/:bps", function(req, res, next) {
    var heartrate = new Heartrate({ bps: req.params.bps });
    heartrate.save(function(err) {
        res.statue(err ? 500 : 200).end();
    });
});
router.post("/", function(req, res, next) {
    if(!req.body.bps) {
        res.status(400).end();
    }

    var heartrate = new Heartrate({
        bps: req.body.bps,
        bodyLocation: req.body.bodyLocation || undefined
    });
    heartrate.save(function(err) {
        res.status(err ? 500 : 200).end();
    });
});

module.exports = {
    Heartrate: Heartrate,
    router: router
};

