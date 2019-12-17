const express = require("express");
// Create express routes
const studentApp = express.Router();

// import and init db
const db = require("../db/database");
db.initDb("Student");

// body-parser
const bp = require("body-parser");
studentApp.use(bp.json());

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const util = require("util");

const Student = require("../model/student");
const Examiner = require("../model/examiner");

// const verifyToken = require("../middleware/verifyToken");

//TODO: Registration
studentApp.post("/register", (req, res) => {
  Student.findOne({ username: req.body.username.toLowerCase() })
    .then(studentObj => {
      if (studentObj === null) {
        // again check into Examiner Database

        Examiner.findOne({ username: req.body.username.toLowerCase() })
          .then(Obj => {
            if (Obj === null) {
              //  Hashing passsword
              let password = req.body.password;
              bcrypt
                .hash(password, 8)
                .then(hashedPassword => {
                  req.body.password = hashedPassword;
                  // Create Product Document
                  const studentDoc = new Student({
                    name: req.body.name,
                    username: req.body.username.toLowerCase(),
                    mobile: req.body.mobile,
                    instituteName: req.body.instituteName,
                    password: req.body.password
                  });
                  studentDoc
                    .save()
                    .then(() => {
                      res.json({
                        message: `${req.body.name} is registered succesfully`
                      });
                    })
                    .catch(err => {
                      console.log(`error in Registering studentDoc ${err}`);
                    });
                })
                .catch(err => {
                  console.log(`error in Hashing ${err}`);
                });
            } else {
              res.json({
                message: `${req.body.username} is already registered`
              });
            }
          })
          .catch(err => {
            console.log("err in finding user during registration", err);
          });
      } else {
        res.json({
          message: `${req.body.username} is already registered`
        });
      }
    })
    .catch(err => {
      console.log("err in finding user during registration", err);
    });
});

//TODO: Login
studentApp.post("/login", (req, res) => {
  Student.findOne({ username: req.body.username.toLowerCase() })
    .then(studentObj => {
      if (studentObj === null) {
        res.json({
          message: `Invalid Username ${req.body.username}`
        });
      } else {
        bcrypt
          .compare(req.body.password, studentObj.password)
          .then(result => {
            if (result == false) {
              // invalid password
              res.json({ message: "Invalid Password" });
            } else {
              const jwtSign = util.promisify(jwt.sign);
              jwtSign({ username: studentObj.username }, "wasim", {
                expiresIn: "1h"
              })
                .then(jwtoken => {
                  res.json({
                    token: jwtoken,
                    username: studentObj.username,
                    message: "Logged in successfully"
                  });
                })
                .catch(err => {
                  console.log(
                    `error in generating jwt token during Login ${err}`
                  );
                });
            }
          })
          .catch(err => {
            console.log(`error in Comparing Hashing duing Login ${err}`);
          });
      }
    })
    .catch(err => {
      console.log("err in finding user during Login", err);
    });
});

//TODO: Get Examiner Data
studentApp.get("/searchExaminer/:username", (req, res) => {
  Examiner.findOne({ username: req.params.username.toLowerCase() })
    .exec()
    .then(examinerObj => {
      if (examinerObj === null) {
        res.json({
          message: `Incorrect Examiner ID`
        });
      } else {
        res.json({ message: examinerObj });
      }
    })
    .catch(err => {
      console.log(`error in findOne duing getting profile ${err}`);
    });
});

//TODO: Send request to Examiner
studentApp.put("/sendRequestToSir/:examinerId", (req, res) => {
  Examiner.findOne({
    $and: [
      { username: req.params.examinerId },
      {
        studentList: {
          $elemMatch: {
            batchId: req.body.batchId.toLowerCase()
          }
        }
      }
    ]
  })
    .then(examinerObj => {
      if (examinerObj === null) {
        res.json({
          message: `Invalid Batch ID`
        });
      } else {
        Examiner.updateOne(
          { username: req.params.examinerId },
          {
            $addToSet: {
              request: req.body
            }
          }
        )
          .then(() => {
            res.json({
              message: "Request Send Successfully"
            });
          })
          .catch(err => {
            console.log("error in updating request array of Examiner", err);
          });
      }
    })
    .catch(err => {
      console.log("error in finding Examiner", err);
    });
  // update request Array of Examiner
});

//TODO: Get examinerList from student collection
studentApp.get("/getExaminerList/:username", (req, res) => {
  Student.findOne(
    { username: req.params.username.toLowerCase() },
    { _id: 0, examinerList: 1 }
  )
    .then(studentObj => {
      res.json({ message: studentObj });
    })
    .catch(err => {
      console.log(`error in findOne duing getting examinerList ${err}`);
    });
});

//TODO: Get batch array
studentApp.get("/getExaminerBatch/:examinerId/:studentId", (req, res) => {
  Student.findOne(
    {
      username: req.params.studentId
    },
    { _id: 0, examinerList: 1 }
  )
    .then(studentObj => {
      let batch = studentObj["examinerList"].filter(batchObj => {
        return batchObj["examinerId"] == req.params.examinerId;
      });

      res.json({
        message: batch[0].batch
      });
    })
    .catch(err => {
      console.log(`error in findOne batch Array ${err}`);
    });
});

// TODO: Get Batch Details
studentApp.get("/getBatchDetails/:examinerId/:batchId", (req, res) => {
  Examiner.findOne({
    username: req.params.examinerId
  })
    .then(examinerObj => {
      let batch = examinerObj["studentList"].filter(batchObj => {
        return batchObj["batchId"] == req.params.batchId.toLowerCase();
      });

      res.json({
        message: batch[0]
      });
    })
    .catch(err => {
      console.log(`error in fin ${err}`);
    });
});

// TODO: Get Batch wise Exams
studentApp.get("/getBatchExam/:batchId/:studentId", (req, res) => {
  Examiner.findOne({
    studentList: {
      $elemMatch: {
        batchId: req.params.batchId
      }
    }
  })
    .then(examinerObj => {
      let batch = examinerObj["studentList"].filter(batchObj => {
        return batchObj["batchId"] == req.params.batchId.toLowerCase();
      });

      let examArr = batch[0]["exam"];
      Student.findOne(
        {
          username: req.params.studentId
        },
        { performance: 1, _id: 0 }
      ).then(studentObj => {
        let performanceArr = studentObj["performance"];
        res.json({
          exam: examArr,
          performance: performanceArr
        });
      });
    })
    .catch(err => {
      console.log(`error in finding batch wise exam ${err}`);
    });
});

// TODO: Add result to student Performance and Examiner Perticular batch exam rasult array
studentApp.put("/addResult", (req, res) => {
  Student.updateOne(
    { username: req.body.studentId },
    {
      $push: {
        performance: req.body
      }
    }
  )
    .then(() => {
      // Finding Examiner Object
      Examiner.findOne(
        {
          studentList: {
            $elemMatch: { batchId: req.body.batchId }
          }
        },
        { studentList: 1, _id: 0 }
      )
        .then(examinerObj => {
          let toSet;
          // Updating Examiner Perticular batch exam rasult array
          examinerObj["studentList"].map(
            (studentListData, studentListIndex) => {
              if (studentListData["batchId"] === req.body.batchId) {
                studentListData["exam"].map((examData, examIndex) => {
                  if (examData["examname"] === req.body.examname) {
                    toSet =
                      "studentList." +
                      studentListIndex +
                      ".exam." +
                      examIndex +
                      ".result";

                    Examiner.updateOne(
                      {
                        studentList: {
                          $elemMatch: {
                            exam: {
                              $elemMatch: { examname: req.body.examname }
                            }
                          }
                        }
                      },
                      { $push: { [`${toSet}`]: req.body } }
                    )
                      .then(() => {
                        res.json({
                          message:
                            "Answer Submitted...Go to Performance to Check Result"
                        });
                      })
                      .catch(err => {
                        console.log(
                          `error in adding result to Examiner Perticular batch exam rasult array ${err}`
                        );
                      });
                  }
                });
              }
            }
          );
        })
        .catch(err => {
          console.log(
            `error in FINDING during result to Examiner Perticular batch exam rasult array ${err}`
          );
        });
    })
    .catch(err => {
      console.log(`error in adding result to student Performance ${err}`);
    });
});

// TODO: Get All Performance
studentApp.get("/getPerformance/:studentId", (req, res) => {
  Student.findOne(
    {
      username: req.param.studentId
    },
    { performance: 1, _id: 0 }
  )
    .then(studentObj => {
      res.json({
        performance: studentObj["performance"]
      });
    })
    .catch(err => {
      console.log(`error in getting performance ${err}`);
    });
});

// export studentApp
module.exports = studentApp;
