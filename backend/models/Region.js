const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const RegionSchema = new Schema({
  name: {
    type: String,
    required: 'Please enter in name',
    trim: true
  },
  description: {
    type: String,
    required: 'Please enter in name',
    trim: true
  },
  lat: {
    type: Number,
    required: 'Please enter in name',
    trim: true
  },
  lng: {
    type: Number,
    required: 'Please enter in name',
    trim: true
  },
  img: {
      type: String,
      default: ''
  },
  sound: {
    type: String,
    default: ''
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Region = mongoose.model("regions", RegionSchema);