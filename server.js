const express = require("express");
const app = express();

const morgan = require("morgan");

// TODO: Connecting server to angular app (dist)
const path = require("path");
app.use(express.static(path.join(__dirname, "./dist/OnlineExam")));

// import admin and user Apis
const examinerApi = require("./src/backend/api/examinerApi");
const studentApi = require("./src/backend/api/studentApi");

// forword the request based on path to admin or user Apis

app.use("/examiner", examinerApi);
app.use("/student", studentApi);

// Morgan
app.use(morgan("dev"));

// Assign port no
// const port = 3000;
app.listen(process.env.PORT || 8080, () => console.log(`Server is running...`));
