const express = require("express");
const router = express.Router();
const shiftController = require("../controllers/shiftController");

router.get("/shifts", shiftController.getShifts);
router.post("/shifts", shiftController.addPersonAndBackup);
router.delete('/shifts/:id', shiftController.removePerson);

module.exports = router;
