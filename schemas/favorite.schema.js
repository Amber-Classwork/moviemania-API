const {Schema, model} = require("mongoose");

const favoriteSchema = new Schema({
    userID : {type:Schema.Types.ObjectId, ref:"User"},
    movieId: {type: Number, required: true},
});


module.exports = model("Favorite", favoriteSchema);

