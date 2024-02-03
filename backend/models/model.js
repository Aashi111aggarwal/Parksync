
import mongoose from "mongoose";

const imageSchema = mongoose.Schema({
    imagePath: {
        type: String,
        required: true,
    },
    selectedOption: {
        type: String,
        required: true,
    },
});

const Image = mongoose.model('image', imageSchema);

export default {Image};
