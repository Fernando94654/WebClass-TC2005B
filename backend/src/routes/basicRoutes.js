const express = require("express");
const { root, marco, ping } = require("../controllers/basicController");

const router = express.Router();

router.get("/", root);
router.get("/marco", marco);
router.get("/ping", ping);

module.exports = router;
