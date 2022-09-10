const { Schema, model } = require('mongoose');

const reportSchema = new Schema({
    _id: Schema.Types.ObjectId,
    reportName: String,
    reportID: String,
    reportGrund: String
    
   
});
module.exports = model("Report", reportSchema, "reports");