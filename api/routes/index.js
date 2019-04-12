var express = require("express");
var router = express.Router();

const blogController = require("../controllers/blog");
const worksController = require("../controllers/works");
const skillsController = require("../controllers/skills");
const userController = require("../controllers/user");

const isAdmin = (req, res, next) => {
  if (req.session.isAdmin) {
    return next();
  }
  res.redirect("/");
};

router.post("/user", userController.authorize);

router.get("/blog", blogController.getArticles);
router.post("/blog", isAdmin, blogController.createArticle);
// router.put("/blog/:id", blogController.editArticle);
router.delete("/blog/:id", isAdmin, blogController.deleteArticle);

router.get("/works", worksController.getWorks);
router.post("/works", isAdmin, worksController.createWork);
// router.put("/works/:id", blogController.editWorks);
router.delete("/works/:id", isAdmin, worksController.deleteWork);

router.get("/skills", skillsController.getSkills);
router.post("/skills", isAdmin, skillsController.createSkill);
router.put("/skills", isAdmin, skillsController.editSkills);
router.put("/skills/:id", isAdmin, skillsController.deleteSkill);

module.exports = router;
