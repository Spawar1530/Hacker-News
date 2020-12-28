var mongoose = require("mongoose");
//History schema for storing history of user
var historySchema = new mongoose.Schema({
   query: String,
   tag: {
       type: String,
       enum: ['story', 'comment'], 
    },
    by: {
        type: String,
        enum: ['date', 'popularity'], 
    },
    dateRange: {
        type: String,
        enum: ['all', 'last24h', 'pastWeek', 'pastMonth', 'pastYear'], 
    },
    time : { type : Date, default: Date.now }
});
var History = mongoose.model("History", historySchema);
module.exports = History;