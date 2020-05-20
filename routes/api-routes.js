// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the burgers
  app.get("/api/burgers", function(req, res) {
    // findAll returns all entries for a table when used with no options
    db.Burger.findAll({}).then(function(dbBurger) {
      // We have access to the burgers as an argument inside of the callback function
      res.json(dbBurger);
    });
  });

  // POST route for saving a new burger
  app.post("/api/burgers", function(req, res) {
    // create takes an argument of an object describing the item we want to
    // insert into our table. In this case we just we pass in an object with a text
    // and complete property
    db.Burger.create({
      text: req.body.text,
      complete: req.body.complete
    }).then(function(dbBurger) {
      // We have access to the new burger as an argument inside of the callback function
      res.json(dbBurger);
    });
  });

  // DELETE route for deleting burgers. We can get the id of the burger to be deleted from
  // req.params.id
  app.delete("/api/burgers/:id", function(req, res) {
    // Use the sequelize destroy method to delete a record from our table with the
    // id in req.params.id. res.json the result back to the user
    db.Burger.destroy({
      where: {
        id: req.params.id
      }
    }).then(result => {
      res.json(result);
    }).catch(err => {
      console.log(err);
    })
  });

  // PUT route for updating burgers. We can get the updated burger data from req.body
  app.put("/api/burgers", function(req, res) {
    // Use the sequelize update method to update a burger to be equal to the value of req.body
    // req.body will contain the id of the burger we need to update
    db.Burger.update({complete: req.body.complete, text: req.body.text}, {
      where: {
        id: req.body.id
      }
    }).then(result => {
      res.json(result);
    }).catch(err => {
      console.log(err)
    })
  });
};