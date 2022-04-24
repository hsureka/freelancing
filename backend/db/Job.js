const mongoose = require("mongoose");

let schema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    jobDescription: {
        type: String,
        validate: {
          validator: function (v) {
            return v.split(" ").filter((ele) => ele != "").length <= 250;
          },
          msg: "Statement of purpose should not be greater than 250 words",
        },
    },
    employerDescription: {
        type: String,
        validate: {
          validator: function (v) {
            return v.split(" ").filter((ele) => ele != "").length <= 250;
          },
          msg: "Statement of purpose should not be greater than 250 words",
        },
    },
    
    location: {
      type: String,
      required: true,
    },
    
    skillsets: [String],
    
    salary: {
      type: Number,
      validate: [
        {
          validator: Number.isInteger,
          msg: "Salary should be an integer",
        },
        {
          validator: function (value) {
            return value >= 0;
          },
          msg: "Salary should be positive",
        },
      ],
    },
    rating: {
      type: Number,
      max: 5.0,
      default: -1.0,
      validate: {
        validator: function (v) {
          return v >= -1.0 && v <= 5.0;
        },
        msg: "Invalid rating",
      },
    },
  },
  { collation: { locale: "en" } }
);

module.exports = mongoose.model("jobs", schema);