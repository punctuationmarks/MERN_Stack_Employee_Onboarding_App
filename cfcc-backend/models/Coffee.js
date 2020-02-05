const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CoffeeSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  region: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Coffee = mongoose.model("coffee", CoffeeSchema);
