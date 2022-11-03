const Favorite = require("../../../schemas/favorite.schema");
const { JSONResponse } = require("../../../utilities/response.utility");
const { ObjectId } = require("mongoose").Types;

class FavoriteController {
   /**
    *
    * ### Description
    * Gets all the favorites in the database
    * @param {Request} req
    * @param {Response} res
    * @param {Next} next
    */
   static getAllFavorites = async (req, res, next) => {
      try {

        if(req.query.userID){
            return this.getUserFavorite(req, res,req.query.userID)
        }else if(Object.keys(req.query).length > 0) throw new Error("Incorrect query parameter");
         let favorites = await Favorite.find();
         JSONResponse.success(res,"Retrieved all favorites successfully",favorites,201);
      } catch (error) {
         JSONResponse.error(res, "Error Retrieving favorites profiles", error, 404);
      }
   };

        /**
     * 
     * ### Description
     * Creates a favorite with the data that the user passes in the body.
     * @param {Request} req 
     * @param {Response} res 
     * @param {Next} next 
     */
    static createFavorite = async(req, res, next)=>{
        try{
            let data = req.body;
            if(Object.keys(data).length == 0) throw new Error("No data passed to create user profile");
            let favorite = await new Favorite(data)
            JSONResponse.success(res, "User favorite successfully created", favorite, 201);
        }catch(error){
            JSONResponse.error(res, "Error creating user favorites", error, 400);
        }
    }

        /**
     * 
     * ### Description
     * Gets the user favorite for a single user with the id that is passed in as a parameter, then updates the user with the data that is passed in the body.
     * @param {Request} req 
     * @param {Response} res 
     * @param {Next} next 
     */
    static updateUserFavorite = async(req, res, next)=>{
        try{
            let data = req.body;
            let id = req.params.id;
            // not letting user update password at this route;
            if(!ObjectId.isValid(id)) throw new Error("Invalid ID was passed as a parameter");
            if(Object.keys(data).length == 0) {
                return JSONResponse.success(res, "No data passed, file not updated",{}, 200);
            }
            let favorite = await Favorite.findOneAndUpdate({_id:id},data, {new:true});
            if(!favorite) throw new Error("User favorite not found with the ID");
            JSONResponse.success(res, "User favorite updated successfully", favorite, 200);
        }catch(error){
            JSONResponse.error(res, "Unable to update favorite profile", error, 404);
        }
    }

   /**
    *
    * ### Description
    * Gets the user profile for a single user with the id that is passed in as a parameter and deletes it, returning the user that was deleted.
    * @param {Request} req
    * @param {Response} res
    * @param {Next} next
    */
   static deleteUserFavorite = async (req, res, next) => {
      try {
         let id = req.params.id;
         if (!ObjectId.isValid(id))
            throw new Error("ID does not match any user profile in database");
         let favorite = await Favorite.findByIdAndDelete(id);
         if (!favorite) throw new Error("User favorite does not exist with this ID");
         JSONResponse.success(res, "Successfully deleted user favorite", user, 203);
      } catch (error) {
         JSONResponse.error(res, "Unable to delete user favorite", error, 404);
      }
   };

   /**
    *
    * ### Description
    * Gets the user profile for a single user with the id that is passed in as a parameter.
    * @param {Request} req
    * @param {Response} res
    * @param {Next} next
    */
   static getFavoriteById = async (req, res, next) => {
      try {
         let id = req.params.id;
         if (!ObjectId.isValid(id))
            throw new Error("Id is not a valid user profile in database");
         let favorite = await Favorite.findById(id);
         if (!favorite) throw new Error("User favorite not found with this id");
         JSONResponse.success(res, "Retrieved user favorite info", user, 200);
      } catch (error) {
         JSONResponse.error(res, "Unable to find user", error, 404);
      }
   };

   static getUserFavorite = async (req, res, userID) => {
    try{
        if(userID){
            let favorites = await Favorite.find({userID: userID});
            JSONResponse.success(res, "Retrieved user favorite info", favorites, 200)
        }else{
            JSONResponse.error(res, "Unable to find user favorite","No parameter was passed", 404)
        }
    }catch(error){
        JSONResponse.error(res, "Unable to find user favorite",error, 404);
    }
        
   }

}

module.exports = FavoriteController;
