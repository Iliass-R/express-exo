const mongoose = require("mongoose");

const interventionSchema = new mongoose.Schema({
    motif: { type: String },
    date: { type: Date },
    lieu: { type: String, required: true },
    agent: { type: mongoose.Schema.Types.ObjectId, ref: 'Agent' },
});
module.exports = mongoose.model('Intervention', interventionSchema);