var express = require("express");
var router = express.Router();

const blogController = require("../controllers/blog");
const worksController = require("../controllers/works");
const skillsController = require("../controllers/skills");

router.get("/blog", blogController.getArticles);
router.post("/blog", blogController.createArticle);
// router.put("/blog/:id", blogController.editArticle);
router.delete("/blog/:id", blogController.deleteArticle);

router.get("/works", worksController.getWorks);
router.post("/works", worksController.createWork);
// router.put("/works/:id", blogController.editWorks);
router.delete("/works/:id", worksController.deleteWork);

router.get("/skills", skillsController.getSkills);
router.post("/skills", skillsController.createSkill);
router.put("/skills", skillsController.editSkills);
router.put("/skills/:id", skillsController.deleteSkill);

module.exports = router;
