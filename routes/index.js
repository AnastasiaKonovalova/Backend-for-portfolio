var express = require("express");
var router = express.Router();

const aboutController = require("../controllers/about");
const blogController = require("../controllers/blog");
const worksController = require("../controllers/works");
const indexController = require("../controllers/index");

router.get("/about", aboutController.getAboutPage);
router.get("/blog", blogController.getBlogPage);

router.get("/works", worksController.getWorksPage);
router.post("/works", worksController.sendMail);

router.get("/", indexController.getIndexPage);
router.post("/", indexController.authorize);

module.exports = router;
