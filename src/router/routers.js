const router = require("express").Router();

//const empController = require("./../controller/empController");
const gradescontroller = require("./../controller/gradesconroller");

//router.post("/save", empController.add);
router.post("/savegrades", gradescontroller.save1);
router.get("/getall", gradescontroller.get1);
//router.post("/addgrade",gradescontroller.add2)

router.post("/saveEmp", gradescontroller.add1);
router.post("/getSubString", gradescontroller.getSubStringItem);
router.get("/isfield",gradescontroller.isExists)

module.exports = router;
