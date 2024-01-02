const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { accessChat } = require("../controllers/chatControllers");

const router = express.Router();

router.route('/').post(accessChat);


module.exports = router;