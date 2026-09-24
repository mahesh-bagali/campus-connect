const mongoose = require("mongoose");
const eventSchema = new mongoose.Schema({
  title:String,
  category:String,
  date:String,
  time:String,
  location:String,
  description:String,
});

const Event = mongoose.model("event",eventSchema);
module.exports = Event;