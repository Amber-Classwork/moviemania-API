const { JSONResponse } = require("../../utilities/response.utility");

const router = require("express").Router();


router.use("/authenticate", require("./routes/auth.routes"));
router.use("/users", require("./routes/user.routes"));
router.use("/favorites", require("./routes/favorite.routes"));
router.use("/tmdb_movies", require("./routes/tmdb.routes"));
router.use("/movies", require("./routes/movie.routes"));

router.all("/",(req, res, next)=>{
    JSONResponse.success(res, "API Endpoint working Successfully", {
        routes:{
            users: "/api/v1/users",
            authenticate: "/api/v1/authenticate",
            favorites: "/api/v1/favorites",
            movies: "/api/v1/movies",
            tmdb_movies: "/api/v1/tmdb_movies",
        }
    });
    next();
})
module.exports = router;