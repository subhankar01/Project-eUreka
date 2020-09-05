const express = require("express");
const router = express.Router();
const requireLogin = require("../middleware/requireLogin");
const {
    pneumonia,
    heart,
    cancer
} = require("../controllers/prediction");

router.get("/pneumonia",requireLogin,pneumonia);
router.post("/heart",requireLogin,heart);
router.get("/cancer",requireLogin,cancer);

module.exports = router;