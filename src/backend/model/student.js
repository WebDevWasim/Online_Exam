// import mongoose
const mongoose = require("mongoose");

// Get schema object
const Schema = mongoose.Schema;

// Create Student schema
const studentSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },

  instituteName: {
    type: String,
    required: true
  },
  mobile: {
    type: Number,
    required: true
  },

  password: {
    type: String,
    required: true
  },

  examinerList: {
    type: Array,
    default: []
  },
  performance: {
    type: Array,
    default: []
  }
});

// Export Model of above Schema
const studentModel = mongoose.model("Student", studentSchema);
module.exports = studentModel;
