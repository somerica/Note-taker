var express = require ("express");
var path = require ("path");
var fs = require("fs");
const { urlencoded } = require("express");

var app = express();
var PORT = 3000;

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static('public'));


var savedNotes = JSON.parse(fs.readFileSync('./db/db.json'));
console.log(savedNotes)

app.get("/", function(req, res) {
    console.log()
    res.sendFile(path.join(__dirname, "/public/index.html"));
  });
  
  app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
  });
  
 
  app.get("/api/notes", function(req, res) {
    res.json(savedNotes);
  });
  
  app.post("/api/notes", function(req, res) {
    // Grab the new note from the form
    const newNote = req.body;
  
    // Push this note to the file
    savedNotes.push(newNote);
  
    // Take the data and stringify
    let saveData = JSON.stringify(savedNotes);
  
    // Write new data to file.
    fs.writeFileSync('./db/db.json', saveData)
  
    res.json(true);
  
  });
  
  app.delete("/api/notes/:id", function(req, res) {
    // Grab the id of note to delete
    var noteToDelete = req.params.id;
  
    // Get the index of the saved Note index
    const savedNotesIndex = savedNotes.findIndex(p => p.id == noteToDelete);
    
    // Remove that note from the file
    savedNotes.splice(savedNotesIndex, 1);
  
    return res.send();
  
  });
  
  // Starts the server to begin listening
  // =============================================================
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
  

