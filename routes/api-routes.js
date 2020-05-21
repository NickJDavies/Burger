// Dependencies
// =============================================================
var db = require("../models");
// =============================================================

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the burgers
  app.get("/api/burgers", function(req, res) {
    db.Burger.findAll({}).then(function(dbBurger) {
      res.json(dbBurger);
    });
  });

  // POST route for saving a new burger
  app.post("/api/burgers", function(req, res) {
    db.Burger.create({
      text: req.body.text,
      complete: req.body.complete
    }).then(function(dbBurger) {
      res.json(dbBurger);
    });
  });

  // put route for eating burgers
  app.put("/api/burgers/:id", function(req, res) {
    db.Burger.update({complete: true}, {
      where: {
        id: req.params.id
      }
    }).then(result => {
      res.json(result);
    }).catch(err => {
      console.log(err);
    })
  });
};