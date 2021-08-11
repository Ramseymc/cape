
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const chalk = require("chalk");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv").config();



const pool = require("./routes/connection");

const port = process.env.PORT || 3000;

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors({
  'allowedHeaders': ['sessionId', 'Content-Type', 'Authorization', 'authorization'],
  'exposedHeaders': ['sessionId'],
  // 'origin': ['https://cape-projects.co.za', 'https://www.cape-projects.co.za', 'https://cape-projectsbe.co.za', 'https://www.cape-projectsbe.co.za'],
  'origin': 'http://localhost:8080',
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'credentials': false,
  'preflightContinue': false
}));


app.use(express.static(path.join(__dirname, "/public")));


const salesRoutes = require("./routes/salesRoutes");

app.use( 
  salesRoutes
  );

app.listen(port, () => {
  console.log(chalk.bold.red(`Connor's App listening on port: ${port}`));
});


