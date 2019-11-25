var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp", {useUnifiedTopology: true, useNewUrlParser: true} );
var port = process.env.PORT || 3000;


//schema
var campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//   {name:"Varun Chillara",
//    image:"https://pixabay.com/get/55e9d043485baa14f6da8c7dda793f7f1636dfe2564c704c722b78dd924ccc5a_340.jpg"},
//   function(err, campground){
//     if(err){
//       console.log("error");
//     }else{
//       console.log("new campground");
//       console.log(campground);
//     }
//   }

// );

// var campgrounds = [
//   {name:"Varun Chillara", image:"https://pixabay.com/get/55e9d043485baa14f6da8c7dda793f7f1636dfe2564c704c722b78dd924ccc5a_340.jpg"},
//   {name:"Varun Shravan", image:"https://pixabay.com/get/57e6d7454e53ae14f6da8c7dda793f7f1636dfe2564c704c722b78dd924ccc5a_340.jpg"},
//   {name:"Shravan Varun", image:"https://pixabay.com/get/57e8dc414e5ba814f6da8c7dda793f7f1636dfe2564c704c722b78dd924ccc5a_340.jpg"}
// ];


app.use(bodyParser.urlencoded({extended:true}));

//enables filenames to be included without .ejs in render method
app.set("view engine", "ejs");



app.get("/", function(req, res){

    res.render("landing");
});


//INDEX -shows all campgrounds
app.get("/campgrounds", function(req, res){
  //get campgrounds from DB
  Campground.find({}, function(err, allCampgrounds){
    if(err){
      console.log(err);
    }else{
      res.render("index", {campgrounds:allCampgrounds});
    }
  });
  //res.render("campgrounds", {campgrounds:campgrounds});
});

//CREATE - add a new campground to the db
app.post("/campgrounds", function(req, res){
  
  //get data from from and add to campgrounds array
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  var newCampground = {name:name, image:image, description:desc};
  //campgrounds.push(newCampground);
  //create a new campground and save to db
  Campground.create(newCampground, function(err, newlyCreated){
    if(err){
      console.log(err);
    }else{
      res.redirect("/campgrounds");
    }
  });
});

//NEW - show form to create new campground
app.get("/campgrounds/new", function(req, res){
  res.render("new");

});

//SHOW - shows more about the campgrounds
app.get("/campgrounds/:id", function(req, res){
  Campground.findById(req.params.id, function (err,foundCampground){
    if(err){
      console.log(err);
    }else{
      res.render("show", {campground: foundCampground});
    }
    
  });
 
})

app.listen(port, function () {
  console.log("Server Has Started!");
});