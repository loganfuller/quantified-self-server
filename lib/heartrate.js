var mongoose = require("./db").mongoose;

var heartrateSchema = mongoose.Schema({
        timestamp: { type: Date, default: Date.now },
        bps: Number,
        bodyLocation: String
    }),
    Heartrate = mongoose.model("Heartrate", heartrateSchema);

module.exports = {
    Heartrate: Heartrate,
    routes: function(server) {
        server.get("/heartrate/:bps", function(req, res, next) {
            var heartrate = new Heartrate({ bps: req.params.bps });
            heartrate.save(function(err) {
                res.send(err ? 500 : 200);
                next(err);
            });
        });
        server.post("/heartrate", function(req, res, next) {
            if(!req.params.bps) {
                res.send(400);
                return next();
            }

            var heartrate = new Heartrate({
                bps: req.params.bps,
                bodyLocation: req.params.bodyLocation || undefined
            });
            heartrate.save(function(err) {
                res.send(err ? 500 : 200);
                next(err);
            });
        });
    }
};

