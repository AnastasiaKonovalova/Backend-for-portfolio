var express = require("express");
var router = express.Router();

const aboutController = require("../controllers/about");
const blogController = require("../controllers/blog");
const worksController = require("../controllers/works");
const indexController = require("../controllers/index");
const adminController = require("../controllers/admin");

router.get("/about", aboutController.getAboutPage);
router.get("/blog", blogController.getBlogPage);
router.get("/works", worksController.getWorksPage);
router.get("/", indexController.getIndexPage);
router.get("/admin", adminController.getAdminPage);

module.exports = router;
