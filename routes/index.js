var express = require("express");
const cheerio = require("cheerio");
var router = express.Router();

const worksController = require("../controllers/works");
const indexController = require("../controllers/index");

router.get("/works", worksController.getWorksPage);
router.get("/", indexController.getIndexPage);

module.exports = router;
