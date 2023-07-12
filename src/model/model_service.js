const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reportSchema = new Schema({
  REPORT_TYPE: {
    GUID: String,
    NAME: String
  },
  DESCRIPTION: String,
  NAME: String,
  LONG: Number,
  LAT: Number,
  ADDRESS: String,
  STATUS: String,
  TIMESTAMP: Number,
  IMAGE: String,
  COMPANY: String,
  AREA: String,
  DISTRICT: String,
  TYPE: String
},{versionKey:false});

const Report = mongoose.model('report', reportSchema);

module.exports = Report;
