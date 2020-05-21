// Dependencies
// =============================================================
const express = require("express");
// =============================================================
// =============================================================
const app = express();
const PORT = process.env.PORT || 8080;
// =============================================================


// sets up the server syncing
// =============================================================
const db = require("./models");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
// =============================================================

// Routes
// =============================================================
require("./routes/api-routes.js")(app);
// =============================================================

// syncing the models folder
// =============================================================
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
// =============================================================