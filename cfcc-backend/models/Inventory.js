const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const InventorySchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  title: {
    type: String,
    required: true
  },
  supplier: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Inventory = mongoose.model("inventory", InventorySchema);
