const express = require("express"); 
const router = express.Router(); 

//Import all of the controlller modules 
const coachController = require("../controllers/coachController"); 
const playerController = require("../controllers/playerController"); 
const sportController = require("../controllers/sportController"); 
const teamController = require("../controllers/teamController"); 

const multer = require("multer"); 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage });

//Now, provide directions as to which module to go to in the PLAYER controller module to handle the url request. 
router.get("/", playerController.index); 
router.get("/player/create", playerController.playerCreateGET); 
router.post("/player/create", upload.single('uploaded_image'), playerController.playerCreatePOST); 
router.get("/player/:id/delete", playerController.playerDeleteGET); 
router.post("/player/:id/delete", playerController.playerDeletePOST); 
router.get("/player/:id/update", playerController.playerUpdateGET); 
router.post("/player/:id/update", upload.single('uploaded_image'), playerController.playerUpdatePOST); 
router.get("/player/:id", playerController.playerDetail);
router.get("/players", playerController.playerList); 

router.get("/coach/create", coachController.coachCreateGET); 
router.post("/coach/create", upload.single('uploaded_image'), coachController.coachCreatePOST); 
router.get("/coach/:id/delete", coachController.coachDeleteGET); 
router.post("/coach/:id/delete", coachController.coachDeletePOST); 
router.get("/coach/:id/update", coachController.coachUpdateGET); 
router.post("/coach/:id/update",upload.single('uploaded_image'), coachController.coachUpdatePOST); 
router.get("/coach/:id", coachController.coachDetail);
router.get("/coaches", coachController.coachList); 

router.get("/sport/create", sportController.sportCreateGET); 
router.post("/sport/create", upload.single('uploaded_image'),  sportController.sportCreatePOST); 
router.get("/sport/:id/delete", sportController.sportDeleteGET); 
router.post("/sport/:id/delete", sportController.sportDeletePOST); 
router.get("/sport/:id/update", sportController.sportUpdateGET); 
router.post("/sport/:id/update", upload.single('uploaded_image'),  sportController.sportUpdatePOST); 
router.get("/sport/:id", sportController.sportDetail);
router.get("/sports", sportController.sportList); 

router.get("/team/create", teamController.teamCreateGET); 
router.post("/team/create", upload.single('uploaded_image'), teamController.teamCreatePOST); 
router.get("/team/:id/delete", teamController.teamDeleteGET); 
router.post("/team/:id/delete", teamController.teamDeletePOST); 
router.get("/team/:id/update", teamController.teamUpdateGET); 
router.post("/team/:id/update", upload.single('uploaded_image'), teamController.teamUpdatePOST); 
router.get("/team/:id", teamController.teamDetail);
router.get("/teams", teamController.teamList); 

module.exports = router; 