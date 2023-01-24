const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const agentSchema = new mongoose.Schema({
    numAgent: { type: Number, unique: true },
    grade: { type: String },
    password: { type: String }
});
agentSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Agent', agentSchema);