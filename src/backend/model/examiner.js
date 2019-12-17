// import mongoose
const mongoose = require("mongoose");

// Get schema object
const Schema = mongoose.Schema;

// Create Student schema
const examinerSchema = new Schema({
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
  request: {
    type: Array,
    default: []
  },

  examList: {
    type: Array,
    default: []
  },

  studentList: {
    type: Array,
    default: []
  },
  performance: {
    type: Array,
    default: []
  }
});

// Export Model of above Schema
const examinerModel = mongoose.model("Examiner", examinerSchema);
module.exports = examinerModel;
