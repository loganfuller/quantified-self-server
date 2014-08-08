var mongoose = require("mongoose"),
    mongoUri = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL ||
        process.env.MONGODB_URL || "mongodb://localhost/quantified";

mongoose.connect(mongoUri);

var db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));

module.exports = {
    db: db,
    mongoose: mongoose
};

