const { Schema, model } = require("mongoose");

const InformationSchema = new Schema(
  {
    idInformation:String,
    date_register: String,
    cases: String,
    deaths: String,
    refused: String,
    suspects: String,
  },
  {
    timestamps: true,
  }
);

module.exports = model("Information", InformationSchema);
