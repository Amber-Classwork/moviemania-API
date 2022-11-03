const {Schema, model} = require("mongoose");

const movieSchema = new Schema({
    title: {type: String, required:[true, "No title provided"]},
    description: {type: String, required:[true, "No description was provided"]},
    image: {type: String, required:[true, "No image was provided"]},
    release_date: {type: String, required:[true, "Release date is a required field"]},
    video_url: {type: String},
    genre: [
        {
            type: String, 
            enum: {values:["ACTION", "ADVENTURE", "COMEDY", "HORROR"], message: '{VALUE} is not supported, the values should be either["ACTION", "ADVENTURE", "COMEDY", "HORROR"]'}
        }
    ]
});


module.exports = model("Movie", movieSchema);

