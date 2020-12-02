const { Schema, model } = require("mongoose");

const MonthMapSchema = new Schema(
  {
    idMonthMap:String,
    month:String,
    path: String,
  },
  {
    timestamps: true,
  }
);

module.exports = model("MonthMap", MonthMapSchema);
