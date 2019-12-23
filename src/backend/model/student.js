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
  email: {
    type: String,
    required: true
  },
  profileUrl: {
    type: String,
    default:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/1024px-User_icon_2.svg.png"
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
