const Router = require("express").Router();
const db = require("quick.db");
const isSnowflake = require(process.cwd() + "/util/isSnowflake.js");

Router.get("/", checkAuth, (req, res) => {
    let bots = db.get(`${req.user.id}.bots`);
    res.render("admin.ejs", { user: req.isAuthenticated() ? req.user : null, bots, db });
});
  
Router.post("/", checkAuth, (req, res) => {
      
    let data = req.body;
    console.log(data); 
        
});

//Settings page
Router.get("/settings", checkAuth, (req, res) => {
    let bots = db.get(`${req.user.id}.bots`);
    res.render("admin-settings.ejs", { user: req.isAuthenticated() ? req.user : null, bots, db });
});
  
Router.post("/settings", checkAuth, (req, res) => {
      
    let data = req.body;
    console.log(data); 
        
});

//Requests/tickets page
Router.get("/requests", checkAuth, (req, res) => {
  let bots = db.get(`${req.user.id}.bots`);
  res.render("requests-admin.ejs", { user: req.isAuthenticated() ? req.user : null, bots, db });
});

Router.post("/requests", checkAuth, (req, res) => {
    
  let data = req.body;
  console.log(data); 
      
});

module.exports = Router;

/*
 * Authorization check, if not authorized return them to the login page.
 */
function checkAuth(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    req.session.backURL = req.url;

    res.redirect("/login?redirect=/me");
  }
}