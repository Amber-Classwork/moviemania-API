const router = require('express').Router();
const MovieController = require("../controllers/movie.controller");
const awsStorage = require("../../../utilities/s3.utility");



router
    .route("/")
    .get( MovieController.getAllCustomMovies)
    .post(awsStorage.uploadFileToS3.fields([{name: "image", maxCount:1}, {name:"video_url", maxCount: 1}]),MovieController.createMovie);


router
    .route("/:id")
    .get(MovieController.getCustomMovieById)
    .patch(awsStorage.uploadFileToS3.fields([{name: "image", maxCount:1}, {name:"video_url", maxCount: 1}]),MovieController.updateCustomMovie)
    .delete(MovieController.deleteCustomMovie)

module.exports = router;