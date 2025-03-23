const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const captainSchema = new mongoose.Schema({
    fullName: {
        firstName: {
          type: String,
          required: true,
          minlength: [3, "First name must be at least 3 characters long"],
        },
        lastName: {
          type: String,
          minlength: [3, "Last name must be at least 3 characters long"],
        },
      },
      email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        minlength: [5, "Email must be at least 5 characters long"],
      },
      password: {
        type: String,
        required: true,
        select: false,
      },
      socketId: {
        type: String,
      },
      status: {
        type: String,
        enum: ["active", "inactive"],
        default: "inactive",
      },
      vehicle: {
        color: {
          type: String,
          minlength: [3, "Color must be at least 3 characters long"],
          required: true,
        },
        plateNumber: {
          type: String,
          required: true,
          minlength: [3, "Plate number must be at least 3 characters long"],
        },
        capacity: {
          type: Number,
          required: true,
          min: [1, "Capacity must be at least 1"],
        },
        vehicleType: {
          type: String,
          required: true,
          enum: ["car", "bike", "auto"],
        },
      },
      // location: {
      //   ltd:{
      //       type: Number,
      //   },
      //   lng:{
      //       type: Number,
      //   }
      // },
      location: {
        type: {
          type: String,
          enum: ['Point'],
        },
        coordinates: {
          type: [Number], // [longitude, latitude] - MongoDB uses this order
        }
      }
});

captainSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id}, process.env.JWT_SECRET, { expiresIn: '24h' });  // Token expires in 24 hours
    return token;
};

captainSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

captainSchema.statics.hashPassword = async function(password) {
    return await bcrypt.hash(password, 10);
};

const captainModel = mongoose.model("captain", captainSchema);
module.exports = captainModel;


