const express = require("express");
const router = express.Router();

const dashboardController = require("../controller/DashboardController");

router.get("/", dashboardController.index);

router.post("/bayar", dashboardController.bayar);

router.post("/s", dashboardController.ko);

router.get("/in", dashboardController.insert);

module.exports = router;
