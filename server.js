const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config()

const app = express();

const regions = require("./backend/routes/regions");
const stories = require("./backend/routes/stories");
const admin = require("./backend/routes/admin");

// DB Config
require("./backend/models/db");

// Build and use a router which will handle all AdminBro routes
app.use('/admin', admin)
app.use("/api/regions", regions);
app.use("/api/stories", stories);

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

app.use((req,res,next) => {
  const error=new Error('Not found');
  error.status=404;
  next(error);
})

app.use((error,req,res,next)=>{
  res.status(error.status || 500);
  res.json({
      error : {
          message: error.message 
      }
  });
});


// Serve static assets (build folder) if in production
if (process.env.NODE_ENV === "production") {
    // Set static folder
    app.use(express.static("client/build"));
  
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
  }
  
  const port = process.env.PORT || 3001;
  
  app.listen(port, () => console.log(`Server up and running on port ${port} !`));