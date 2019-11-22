var express = require("express");
var app = express();

var port = process.env.PORT || 3000;

//enables filenames to be included without .ejs in render method
app.set("view engine", "ejs");



app.get("/", function(req, res){

    res.render("landing");
});

app.get("/campgrounds", function(req, res){
  var campgrounds = [
    {name:"Varun Chillara", image:"https://pixabay.com/get/55e9d043485baa14f6da8c7dda793f7f1636dfe2564c704c722b78dd924ccc5a_340.jpg"},
    {name:"Varun Shravan", image:"https://pixabay.com/get/57e6d7454e53ae14f6da8c7dda793f7f1636dfe2564c704c722b78dd924ccc5a_340.jpg"},
    {name:"Shravan Varun", image:"https://pixabay.com/get/57e8dc414e5ba814f6da8c7dda793f7f1636dfe2564c704c722b78dd924ccc5a_340.jpg"}
  ]
  res.render("campgrounds");
});




app.listen(port, function () {
  console.log("Server Has Started!");
});