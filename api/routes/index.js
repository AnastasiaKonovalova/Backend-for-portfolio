var express = require("express");
var router = express.Router();

const blogController = require("../controllers/blog");

router.get("/blog", blogController.getArticles);
router.post("/blog", blogController.createArticle);
// router.put("/blog/:id", blogController.editArticle);
// router.delete("/blog/:id", blogController.deleteArticle);

module.exports = router;
