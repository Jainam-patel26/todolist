const express= require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

mongoose.connect("mongodb://0.0.0.0:27017/todolistDB");

const itemsSchema = {
    name: String
};

const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({
    name: "Welcome to the todo list!"
});

const item2 = new Item({
    name: "Hit the + button to add the new item"
});

const item3 = new Item({
    name: "<-- Hit this to delete an item."
})

const defaultItems = [item1, item2, item3];



app.get("/", function(req,res){
    
    var today = new Date();
    
    var options = {
        weekday:"long",
        day: "numeric",
        month:"long"
    };

    var day = today.toLocaleDateString("en-US", options);

async function getItems(){
    const Items = await Item.find({});
     return Items;
}
      
app.get("/", function (req, res) {
      
    var today = new Date();
      
    var options = { weekday: "long", day: "numeric", year: "numeric" , month: "numeric" };
      
    var day = today.toLocaleDateString("en-GB", options);
      
    getItems().then(function(FoundItems){
          
    res.render("list", {kindOfDay: day, newItem:FoundItems});
      
    });
      
    });

});

app.post("/", function(req, res){
    var item = req.body.newItem;
    
    items.push(item);

    res.redirect("/");
});

app.listen(3500, function(){
    console.log("Server started on port 3500");
});