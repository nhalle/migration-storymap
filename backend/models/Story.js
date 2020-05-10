const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const Marker= new Schema({
  description: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  lat: {
    type: Number,
    required: true
  },
  lng: {
    type: Number,
    required: true
  },
  img: {
    type: String,
    default: ''
  },
  sound: {
    type: String,
    default: ''
  }
});

var StorySchema = new Schema({
  regionid: {
    type: Schema.Types.ObjectId,
    ref: "regions",
    required: true
  },
  description: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  img: {
    type: String,
    default: ''
  },
  
  markers:[Marker]
});

module.exports = Story = mongoose.model("stories", StorySchema);