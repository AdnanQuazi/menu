require("dotenv").config();
const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address : {
    type : String
  },
  menu : [String],
  socials : {
    instagram : {
        type : String
    },
    whatsapp : {
        type : String
    },
    facebook : {
        type : String
    },
    
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ProfileData = new mongoose.model("ProfileData", profileSchema);

module.exports = ProfileData;
