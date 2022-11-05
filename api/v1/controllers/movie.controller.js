const { JSONResponse } = require("../../../utilities/response.utility");
const Movie = require("../../../schemas/movie.schema");
const axios = require("axios");
const {TMDB_KEY} = process.env;

class MovieController{


    static getAllMovies = async(req, res, next)=>{
        try{
            let response = await axios.get(`https://api.themoviedb.org/3/discover/movie/?api_key=${TMDB_KEY}&append_to_response=videos`);
            JSONResponse.success(res, "Successfully retrieved all movies", response.data, 200);
        }catch(error){
            JSONResponse.error(res, "Unable to retrieve movies", error, 404);
        }
        
    }

    static getMovieByID = async(req, res, next)=>{
        try{
            let id = req.params.id;
            let response = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB_KEY}&append_to_response=videos&language=en-US`
            );
            JSONResponse.success(res, "Successfully retrieved Movie", response.data, 200);
        }catch(error){
            JSONResponse.error(res, "Unable to retrieve movie ", error, 404)
        }
    }


    static createMovie = async(req, res, next)=>{
        try{
            let data = req.body;
            if(Object.keys(data).length == 0)throw new Error("No data to create movie");
            console.log(req.files);
            data.video_url = (req.files["video_url"]) ? req.files["video_url"][0].location : undefined;
            data.image = (req.files["image"]) ? req.files["image"][0].location : undefined;
            let movie = await Movie.create(data);
            JSONResponse.success(res, "Successfully created custom Movie", movie, 201)
        }catch(error){
            JSONResponse.error(res, "Unable to create custom movie", error, 400);
        }
    }


    static getAllCustomMovies = async(req, res, next)=>{
        try{
            let movies = await Movie.find();
            JSONResponse.success(res, "Successfully retrieved all custom movies", movies, 200)
        }catch(error){
            JSONResponse.error(res, "Unable to retrieve custom movies", error, 404);
        }
    }

    static getCustomMovieById = async(req, res, next)=>{
        try{
            let id = req.params.id;
            let movie = await Movie.findById(id);
            if(!movie) throw new Error("No movie found with this id");
            JSONResponse.success(res, "Successfully retrieved custom movie", movie, 200);

        }catch(error){
            JSONResponse.error(res, "Unable to retrieve custom movie", error, 404);
        }
    }

    static updateCustomMovie = async(req, res, next)=>{
        try{
            let id = req.params.id;
            let data = req.body;
            if(Object.keys(data).length == 0) throw new Error("No data passed to update movie");
            data.video_url = (req.files["video_url"]) ? req.files["video_url"].location : undefined;
            data.image = (req.files["image"]) ? req.files["image"].location : undefined;
            let movie = await Movie.findByIdAndUpdate(id, data, {new:true});
            if(!movie) throw new Error("No movie found with this id");
            JSONResponse.success(res, "Successfully updated custom movie", movie, 200);
        }catch(error){
            JSONResponse.error(res, "Unable to update custom movie", error, 400);
        }
    }

    static deleteCustomMovie = async(req, res, next)=>{
        try{
            let id = req.paramas.id;
            let movie = await Movie.findByIdAndDelete(id);
            if(!movie) throw new Error("No movie found with this id");
            JSONResponse.success(res, "Successfully deleted custom movie", movie, 200);
        }catch(error){
            JSONResponse.error(res, "Unable to delete custom movie", error, 400);
        }
    }
}


module.exports = MovieController;