const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function(app){
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Header",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.get("/api/test/user", [authJwt.verifyToken], controller.userAccess);
    app.get("/api/test/merchant", [authJwt.verifyToken], controller.merchantAccess );
}