var express = require ("express");
var path = require ("path");
var fs = require("fs");
const { urlencoded } = require("express");

var app = express();
var PORT = 3000;

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static('public'));


app.listen(PORT,function(){

});

var savedNotes = JSON.parse(fs.readFileSync(__dirname+'/db/db.json'));
console.log(savedNotes)

app.get("/", function(req, res) {
    console.log(__dirname)
    res.sendFile(path.join(__dirname, "/public/index.html"));
});
  
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});
  
  
  
app.get("/api/notes", function(req, res) {
    res.json(savedNotes);
});