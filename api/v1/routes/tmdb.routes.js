const router = require('express').Router();
const MovieController = require("../controllers/movie.controller");


router
    .route("/")
    .get(MovieController.getAllMovies)

router
    .route("/:id")
    .get(MovieController.getMovieByID);

module.exports = router;