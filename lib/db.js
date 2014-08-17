var mongoose = require("mongoose"),
    config = require("stockpiler")({
        envPrefix: "QS",
        envMap: {
            "PORT": "PORT",
            "MONGOHQ_URL": "MONGODB__URL"
        }
    }),
    mongoUri = config.mongodb.url;

mongoose.connect(mongoUri);

var db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));

module.exports = {
    db: db,
    mongoose: mongoose
};

