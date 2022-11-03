const router = require('express').Router();
const FavoriteController = require('../controllers/favorite.controller');
const Middleware = require('../middlewares/middleware');
router
    .route("/")
        .get(Middleware.isAuthenticated,FavoriteController.getAllFavorites)
        .post(FavoriteController.createFavorite)



router
    .route("/:id")
        .all(Middleware.isAuthenticated, Middleware.isUserOrSuperAdmin)
        .get(FavoriteController.getFavoriteById)
        .patch(FavoriteController.updateUserFavorite)
        .delete(FavoriteController.deleteUserFavorite)
    
module.exports = router;