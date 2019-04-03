// const path = require("path");
// const config = require("../config/config.json");

// module.exports.getAdminPage = (req, res) => {
//   res.render("admin/index.html");
// };

// module.exports.addArticle = (req, res) => {
//   const pathApi = "/api/blog";
//   const requestOptions = {
//     url: config.apiOptions.server + pathApi,
//     method: "POST",
//     json: {
//       title: req.body.title,
//       date: req.body.date,
//       text: req.body.text
//     }
//   };

//   http(requestOptions, (error, response, body) => {
//     if (error) console.log("admin.js response error", error);
//     console.log("admin.js http response body", body.message);
//     res.redirect("/admin");
//   });
// };
