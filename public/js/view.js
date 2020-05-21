$(document).ready(function() {
  // Getting a reference to the input field where user adds a new burger
  var $newItemInput = $("input.new-item");
  // Our new burgers will go inside the burgerContainer
  var $burgerContainer = $(".burger-container");
  // Adding event listeners for deleting, editing, and adding burgers
  $(document).on("click", "button.delete", eatBurger);
  $(document).on("submit", "#burger-form", insertBurger);

  // Our initial burgers array
  var burgers = [];

  // Getting burgers from database when page loads
  getBurgers();

  // This function resets the Burgers displayed with new Burgers from the database
  function initializeRows() {
    $burgerContainer.empty();
    var rowsToAdd = [];
    for (var i = 0; i < burgers.length; i++) {
      rowsToAdd.push(createNewRow(burgers[i]));
    }
    $burgerContainer.prepend(rowsToAdd);
  }

  // This function grabs Burgers from the database and updates the view
  function getBurgers() {
    $.get("/api/burgers", function(data) {
      burgers = data;
      initializeRows();
    });
  }

  // This function eats a burger when the user clicks the eat button
  function eatBurger(event) {
    event.stopPropagation();
    var id = $(this).data("id");
    $.ajax({
      method: "PUT",
      url: "/api/burgers/" + id
    }).then(getBurgers);
  }

  function createNewRow(burger) {
    var $newInputRow = $(
      [
        "<li class='list-group-item burger-item'>",
          "<span>",
            burger.text,
          "</span>",
          "<button class='delete btn btn-danger'>EAT</button>",
        "</li>"
      ].join("")
    );

    $newInputRow.find("button.delete").data("id", burger.id);
    $newInputRow.data("burger", burger);
    if (burger.complete) {
      $newInputRow.find("span").css("text-decoration", "line-through");
      $newInputRow.find("button.delete").css("display", "none");
    }
    return $newInputRow;
  }

  function insertBurger(event) {
    event.preventDefault();
    if ($newItemInput.val() === "") {
      return;
    }
    var burger = {
      text: $newItemInput.val().trim(),
      complete: false
    };

    $.post("/api/burgers", burger, getBurgers);
    $newItemInput.val("");
  }
});
