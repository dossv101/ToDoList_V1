const express = require('express');
const https = require('https');
const bodyParser = require("body-parser");
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;
const db = new sqlite3.Database('db/ToDoList.db' , sqlite3.OPEN_READWRITE, (err)=> {
   if(err){
     console.log("Error Ocurred - " + err.message)
   }
   else
   {
     console.log("DataBase Connected")
   }
 });

 
var items = ["Buy Food", "Eat Food"];
app.set('view engine', 'ejs');
// app.use(bodyParser.urlencoded({
// extended: true
// }));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));
app.get('/', function(req, res) {
  // res.sendFile(__dirname + "/index.html");
  // res.send("Hello");
  var today = new Date();
  var currentday = today.getDate()
  var day = "";

  // if (today.getDate() === 6 || today.getDate() === 0) {
  // res.send(<h1>"Yay it is the weekend"</h1>);
  // res.write(<h1>"Yay it is the weekend"</h1>);
  // day = "Weekend";
  // res.render('list', {kindofday: day});
  // } else {
  // res.write(<h2>"I have to work today"</h2>);
  // res.write(<h2>"What a bummer!"</h2>);
  // res.send();
  // res.sendFile(__dirname + "/index.html");
  // day = "Weekday";
  // res.render('list', {kindofday: day});
  // }
  // switch (currentday) {
  //   case 0:
  //     day = "Sunday";
  //     break;
  //   case 1:
  //     day = "Monday";
  //     break;
  //   case 2:
  //     day = "Tuesday";
  //     break;
  //   case 3:
  //     day = "Wednesday";
  //     break;
  //   case 4:
  //     day = "Thursday";
  //     break;
  //   case 5:
  //     day = "Friday";
  //     break;
  //   case 6:
  //     day = "Saturday";
  //     break;
  //   default:
  //   console.log("Error The value of currentday =" + currentday );
  // }
  var options = {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  };
  var day = today.toLocaleDateString("en-US", options);
  res.render('list', {
    kindofday: day , newListItems: items
  });
});

app.post("/", function(req, res) {
  var item = req.body.newItem;
  items.push(item);
  console.log(item);
  // console.log(req.body.newItem);
  res.redirect("/");
})

app.listen(port, function() {
  console.log("Server is running on port " + port + ".");
})
