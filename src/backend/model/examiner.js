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

  email: {
    type: String,
    required: true
  },
  profileUrl: {
    type: String,
    default:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/1024px-User_icon_2.svg.png"
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
