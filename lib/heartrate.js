var mongoose = require("./db").mongoose;
var express = require("express");

var heartrateSchema = mongoose.Schema({
    timestamp: {
        type: Date,
        default: Date.now,
    },
    bps: {
        type: Number,
        min: 20,
        max: 300,
    },
    rrInt: [
        {
            type: Number,
            min: 25,
            max: 5000,
        },
    ],
    bodyLocation: String,
}, {
    strict: true,
});
var Heartrate = mongoose.model("Heartrate", heartrateSchema);

var router = express.Router();

router.get("/:bps", function (req, res, next) {
    var heartrate = new Heartrate({
        bps: req.params.bps
    });
    heartrate.save(function (err) {
        res.statue(err ? 500 : 200).end();
    });
});
router.post("/", function (req, res, next) {
    if(!req.body.bps) {
        res.status(400).end();
    }

    var heartrate = new Heartrate({
        bps: req.body.bps,
        rrInt: req.body.rrInt,
        bodyLocation: req.body.bodyLocation || undefined
    });
    heartrate.save(function (err) {
        res.status(err ? 500 : 200).end();
    });
});

router.get("/", function (req, res, next) {
    Heartrate.aggregate([{
        $group: {
            _id: {
                "$subtract": [{
                    "$subtract": ["$timestamp", new Date("1970-01-01")]
                }, {
                    "$mod": [{
                            "$subtract": ["$timestamp", new Date("1970-01-01")]
                        },
                        1000 * parseInt(req.param("bucketSizeSeconds"))
                    ]
                }]
            },
            bps: {
                $avg: "$bps"
            }
        }
    }, {
        $sort: {
            _id: 1
        }
    }, {
        $project: {
            _id: 0,
            timestamp: "$_id",
            bps: 1
        }
    }], function (err, results) {
        if(!!err) {
            console.error(err);
            return res.status(500).end();
        }
        res.json(results);
    });
});

module.exports = {
    Heartrate: Heartrate,
    router: router
};


