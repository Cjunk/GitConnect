/* SERVER  
    APPLICATION TITLE: 
    GROUP:   
    DATE:   
    DESCRIPTION:*/
// ********************************************************************************************************************
// SET UP THE INCLUDES
require("dotenv").config();
//commented out for now - was causing an error with something I was doing - Danny

// const { exit } = require("process");
const SERVER_COMMS_TAB_SPACING = 10
const express = require("express");
const expressSession = require("express-session");
const pgSession = require("connect-pg-simple")(expressSession);
const db = require("./server/db/db");
const bodyParser = require('body-parser');
let API_CALLS = 0
// ********************************************************************************************************************
// CONSTANTS
const appSecretKey = process.env.EXPRESS_SESSION_SECRET_KEY;
const PORT = process.env.PORT || 3000;
const app = express(); // Initialise the app
// ********************************************************************************************************************
// SET UP THE APP

app.use("/", (req, res, next) => {
 
  // 3 paramaters = middleware
  if (
    !req.path.startsWith("/js/") &&
    !req.path.startsWith("/css/") &&
    !req.path.startsWith("/api/session") &&
    !req.path.startsWith("/img/gclogo.png") &&
    !req.path.startsWith("/tmp/") &&
    !req.path.startsWith("/utils/")
  ) {
   
    // console.log(`PARAMS 2: ${req.client.on}`);  
    
    console.log("*************************************************************");
    console.log("API CALLS TO SERVER = ", ++API_CALLS);    
    console.log(`SERVER COMMUNICATION on ${new Date()} `);
    console.log(
      `METHOD = ${req.method.padEnd(SERVER_COMMS_TAB_SPACING)} PATH = ${req.path.padEnd(
        SERVER_COMMS_TAB_SPACING
      )} COOKIE id: ${req} `
    );
    console.log(`originalUrl: ${req.originalUrl.padEnd(SERVER_COMMS_TAB_SPACING)}`);  
    console.log(`accept: ${req.cookies}`);
    console.log(`PATH = ${req.path}`);
    console.log(`PARAMETERS = `);
    // console.log(req);
    console.log(`COOKIE id: ${req}`); 
    console.log("*************************************************************");
  }

    next();  
});

function dd(){
  console.log("Hellow world")
}

app.use((err, req, res, next) => {
  // 4 parameters = error handeler
  console.log(`I am ERROR middleware ${new Date()} ${req.method} ${req.path}`);
  console.log(err);
  res.status(500).json({ message: req });
  next();
});
app.use(express.urlencoded({ extended: false }));
app.use(express.static("client")); // to use the 'client' folder to serve the home html
app.use(express.json());
app.use(bodyParser.json());
app.use(
  expressSession({
    secret: appSecretKey,
    cookie: { maxAge: 200000000 },
    resave: false,
    saveUninitialized: true,
    store: new pgSession({
      pool: db,
      createTableIfMissing: true,
    }),
  })
);
const usersController = require("./server/controllers/users");
const sessionController = require("./server/controllers/sessions");
const gitHubController = require("./server/controllers/github");
const projectController = require("./server/controllers/projects");
const profileController = require("./server/controllers/profiles");
const cloudinaryController = require("./server/controllers/cloudinary");

app.use("/api/users", usersController);
app.use("/api/session", sessionController);
app.use("/api/gitConnect", gitHubController);
app.use("/api/projects", projectController);
app.use("/api/profiles", profileController);
app.use("/api/userimages", cloudinaryController);
// ********************************************************************************************************************
// DEVELOPER comms
if (process.env.DATABASE) {
  app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
  });
  console.log(`DATABASE ONLINE: ${process.env.DATABASE}`);
} else {
  console.log(
    "No Database has been setup. Go to the .env file and place the database name"
  );
}

