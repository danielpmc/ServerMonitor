const Router = require("express").Router();
const db = require("quick.db");
const isSnowflake = require(process.cwd() + "/util/isSnowflake.js");

Router.get("/", (req, res) => {

  res.render('index.ejs',  { layout: false,
    user: req.isAuthenticated() ? req.user : null
});
});

Router.get("/Node1", (req, res) => {
  res.render('node1.ejs',  { layout: false,
    user: req.isAuthenticated() ? req.user : null
});
});

Router.get("/Node2", (req, res) => {
  res.render('node2.ejs',  { layout: false,
    user: req.isAuthenticated() ? req.user : null
});
});

Router.get("/Node3", (req, res) => {
  res.render('node3.ejs',  { layout: false,
    user: req.isAuthenticated() ? req.user : null
});
});

Router.get("/Node4", (req, res) => {
  res.render('node4.ejs',  { layout: false,
    user: req.isAuthenticated() ? req.user : null
});
});

module.exports = Router;