const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schoolSchema = new Schema({
    image: {
        type: String
    },
    name: {
        type: String,
        required: true
    },
    about: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    admission: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("school", schoolSchema);