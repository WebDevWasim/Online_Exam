const express = require("express");
// Create express routes
const examinerApp = express.Router();

// import and init db
const db = require("../db/database");
db.initDb("Examiner");

// body-parser
const bp = require("body-parser");
examinerApp.use(bp.json());

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const util = require("util");

const Examiner = require("../model/examiner");
const Student = require("../model/student");
const verifyToken = require("../middleware/verifyToken");

// TODO:PHOTO UPLOAD ================================================================
// Multer import
const multer = require("multer");

// import cloudinary
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");

// configuring cloudinary
cloudinary.config({
  cloud_name: "wasimkhan",
  api_key: "928417319282593",
  api_secret: "eqPsb8yk8e4CoB9fcZnKK6Ba1Pg"
});

// inform multer-storage-cloudinary to save photo to cloudinary
const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: "Online Exam",
  allowedFormats: ["jpg", "png"],
  filename: function(req, file, cb) {
    cb(undefined, file.fieldname + "_" + Date.now());
  }
});

// Multer configure
let upload = multer({ storage: storage });

// ALL HTTP REQUESTS

// TODO: Registration
examinerApp.post("/register", (req, res) => {
  Examiner.findOne({ username: req.body.username.toLowerCase() })
    .then(examinerObj => {
      if (examinerObj === null) {
        Student.findOne({ username: req.body.username.toLowerCase() })
          .then(userObj => {
            if (userObj === null) {
              //  Hashing passsword==============
              let password = req.body.password;
              bcrypt
                .hash(password, 8)
                .then(hashedPassword => {
                  req.body.password = hashedPassword;
                  // Create Product Document
                  const examinerDoc = new Examiner({
                    name: req.body.name,
                    username: req.body.username.toLowerCase(),
                    mobile: req.body.mobile,
                    instituteName: req.body.instituteName,
                    password: req.body.password,
                    email: req.body.email
                  });
                  examinerDoc
                    .save()
                    .then(() => {
                      res.json({
                        message: `registered succesfully`
                      });
                    })
                    .catch(err => {
                      console.log(`error in Registering ExaminerDoc ${err}`);
                    });
                })
                .catch(err => {
                  console.log(`error in Hashing ${err}`);
                });
            } else {
              res.json({
                message: `already registered`
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

// TODO: Login
examinerApp.post("/login", (req, res) => {
  Examiner.findOne({ username: req.body.username.toLowerCase() })
    .then(studentObj => {
      if (studentObj === null) {
        res.json({
          message: `Invalid Username`
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

// TODO: Get Examiner Details
examinerApp.get("/getExaminerDetails/:examinerId", (req, res) => {
  Examiner.findOne({
    username: req.params.examinerId
  })
    .then(examinerObj => {
      res.json({
        message: examinerObj
      });
    })
    .catch(err => {
      console.log(`error in getting examiner details ${err}`);
    });
});

// TODO: Update Student Details
examinerApp.put("/updateExaminerDetails/:examinerId", (req, res) => {
  Examiner.updateOne(
    {
      username: req.params.examinerId
    },
    {
      $set: {
        instituteName: req.body.instituteName,
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile
      }
    }
  )
    .then(() => {
      res.json({
        message: "Examiner Profile Updated Successfully"
      });
    })
    .catch(err => {
      console.log(`error in getting Examiner details ${err}`);
    });
});

// TODO: Update Student Profile Photo
examinerApp.put("/updateExaminerPhoto", upload.single("photo"), (req, res) => {
  req.body = JSON.parse(req.body.examinerObj);

  Examiner.updateOne(
    { username: req.body.username },
    {
      $set: {
        profileUrl: req.file.secure_url
      }
    }
  )
    .then(() => {
      res.json({
        message: "Profile Photo Updated Successfully"
      });
    })
    .catch(err => {
      console.log(`error in Updating profile Picture ${err}`);
    });
});

// TODO: Adding New Batch
examinerApp.put("/addbatch/:username", (req, res) => {
  Examiner.findOne({
    studentList: {
      $elemMatch: {
        batchId: req.body.batchId.toLowerCase()
      }
    }
  })
    .then(examinerObj => {
      if (examinerObj === null) {
        Examiner.updateOne(
          { username: req.params.username },
          {
            $addToSet: {
              // FIXME: Fix This
              studentList: {
                batchName: req.body.batchName.toLowerCase(),
                batchId: req.body.batchId.toLowerCase(),
                student: req.body.student,
                exam: req.body.exam
              }
              // studentList: req.body
            }
          }
        )
          .then(() => {
            res.json({
              message: "New Batch Created Successfully"
            });
          })
          .catch(err => {
            console.log("error in updating studentList array of Examiner", err);
          });
      } else {
        res.json({
          message: `Batch Id ${req.body.batchId} is taken. Please Choose Another One...`
        });
      }
    })
    .catch(err => {
      console.log(`error in finding Batch Id ${err}`);
    });
});

// TODO: Update the Batch
examinerApp.put("/updateBatch", (req, res) => {
  Examiner.updateOne(
    {
      studentList: {
        $elemMatch: {
          batchId: req.body.batchId
        }
      }
    },
    {
      $set: {
        "studentList.$.batchName": req.body.batchName
      }
    }
  )
    .then(() => {
      res.json({
        message: "Batch Updated Successfully"
      });
    })
    .catch(err => {
      console.log("error in updating studentList array of Examiner", err);
    });
});

// TODO: Delete A Batch FIXME: Pending
examinerApp.put("/deleteBatch", (req, res) => {
  // removing batch from examinerList in Examiner Collection
  Examiner.updateOne(
    {
      studentList: {
        $elemMatch: {
          batchId: req.body.batchId
        }
      }
    },
    { $pull: { studentList: { batchId: req.body.batchId } } }
  )
    .then(() => {
      // removing batch instance from examList in Examiner Collection FIXME: Failed
      // Examiner.updateMany(
      //   {
      //     studentList: {
      //       $elemMatch: {
      //         batchId: req.body.batchId
      //       }
      //     }
      //   },

      //   { $pull: { "examList.$.batch": req.body.batchId } }
      // )
      //   .then(() => {
      //     // removing batch instance from performance in Examiner Collection FIXME: Failed
      //     Examiner.updateMany(
      //       {
      //         studentList: {
      //           $elemMatch: {
      //             batchId: req.body.batchId
      //           }
      //         }
      //       },

      //       { $pull: { "performance.$.batch": req.body.batchId } }
      //     )
      //       .then(() => {
      //         // removing batch instance from examinerList in students Collection FIXME: Failed
      //         Student.updateMany(
      //           {},
      //           { $pull: { "examinerList.$.batch": req.body.batchId } }
      //         )
      //           .then(() => {
      //             // removing batch from performance in students Collection FIXME: Failed
      //             Student.updateMany(
      //               {},
      //               { $pull: { performance: { batchId: req.body.batchId } } }
      //             )
      //               .then(() => {
                      res.json({
                        message: "Batch Removed Successfully"
                      });
        //             })
        //             .catch(err => {
        //               console.log(
        //                 `error in removing batch from performance in students Collection ${err}`
        //               );
        //             });
        //         })
        //         .catch(err => {
        //           console.log(
        //             `error in removing batch instance from examinerList in students Collection ${err}`
        //           );
        //         });
        //     })
        //     .catch(err => {
        //       console.log(
        //         `error in removing batch instance from performance in Examiner Collection ${err}`
        //       );
        //     });
        // })
        // .catch(err => {
        //   console.log(
        //     `error in removing batch instance from examList in Examiner Collection ${err}`
        //   );
        // });
    })
    .catch(err => {
      console.log(`error in removing batch from Examiner StudentList ${err}`);
    });
});

// TODO: Get All Batches
examinerApp.get("/fetchbatch/:username", (req, res) => {
  Examiner.findOne({ username: req.params.username })
    .then(examinerObj => {
      res.json({ message: examinerObj["studentList"] });
    })
    .catch(err => {
      console.log(`error in find duing fetching Batches ${err}`);
    });
});

// TODO: List of Students by Batch
examinerApp.get("/getStudents/:batchId", (req, res) => {
  Examiner.findOne({
    studentList: {
      $elemMatch: {
        batchId: req.params.batchId.toLowerCase()
      }
    }
  })
    .then(examinerObj => {
      let batch = examinerObj["studentList"].filter(batchObj => {
        return batchObj["batchId"] == req.params.batchId.toLowerCase();
      });

      res.json({
        message: batch[0].student
      });
    })
    .catch(err => {
      console.log(`error in fin ${err}`);
    });
});

// TODO: Get Students Details
examinerApp.get("/getStudentsDetails/:studentId", (req, res) => {
  Student.findOne({ username: req.params.studentId })
    .then(studentObj => {
      res.json({
        message: studentObj
      });
    })
    .catch(err => {
      console.log(`error in finding student Id ${err}`);
    });
});

// TODO: Remove student From Batch
examinerApp.put("/removeStudent/:batchId", (req, res) => {
  Examiner.updateOne(
    {
      studentList: {
        $elemMatch: {
          batchId: req.params.batchId.toLowerCase()
        }
      }
    },
    { $pull: { "studentList.$.student": req.body.studentId } }
  )
    .then(() => {
      Student.updateOne(
        {
          $and: [
            { username: req.body.studentId },
            {
              examinerList: {
                $elemMatch: {
                  examinerId: req.body.examinerId
                }
              }
            }
          ]
        },

        { $pull: { "examinerList.$.batch": req.params.batchId.toLowerCase() } }
      )
        .then(() => {
          res.json({
            message: "Student removed from the batch"
          });
        })
        .catch(err => {
          console.log(
            `error in removing batch from examinerList in students Collection ${err}`
          );
        });
    })
    .catch(err => {
      console.log(`error in removing student from batch ${err}`);
    });
});

// TODO: List of Pending Requests
examinerApp.get("/getRequests/:examinerId", (req, res) => {
  Examiner.findOne({
    username: req.params.examinerId
  })
    .then(examinerObj => {
      res.json({
        message: examinerObj["request"]
      });
    })
    .catch(err => {
      console.log(`error in fin ${err}`);
    });
});

// TODO: Reject Aproval Request
examinerApp.put("/rejectRequest/:examinerId", (req, res) => {
  Examiner.updateOne(
    { username: req.params.examinerId },
    {
      $pull: {
        request: { studentId: req.body.studentId, batchId: req.body.batchId }
      }
    }
  )
    .then(() => {
      res.json({
        message: "Request Rejected"
      });
    })
    .catch(err => {
      console.log(`error in removing request from request Array ${err}`);
    });
});

// TODO: Approve Student Requests
examinerApp.put("/approveRequest/:examinerId", (req, res) => {
  // Delete from Request Array
  Examiner.updateOne(
    { username: req.params.examinerId },
    {
      $pull: {
        request: { studentId: req.body.studentId, batchId: req.body.batchId }
      }
    }
  )
    .then(() => {
      //  Add student Id to the perticular batch's student Array
      Examiner.updateOne(
        {
          "studentList.batchId": req.body.batchId
        },
        { $addToSet: { "studentList.$.student": req.body.studentId } }
      )
        .then(() => {
          // Find examinerId is present in examinerList in students collection
          Student.findOne({
            $and: [
              { username: req.body.studentId },
              {
                examinerList: {
                  $elemMatch: {
                    examinerId: req.params.examinerId
                  }
                }
              }
            ]
          })
            .then(studentObj => {
              if (studentObj === null) {
                // set new examiner Id with batch
                Student.updateOne(
                  { username: req.body.studentId },
                  {
                    $addToSet: {
                      examinerList: {
                        examinerId: req.params.examinerId,
                        batch: [req.body.batchId]
                      }
                    }
                  }
                )
                  .then(() => {
                    res.json({
                      message: "Student added to the batch"
                    });
                  })
                  .catch(err => {
                    console.log(
                      `error in seting examinerId in students collection ${err}`
                    );
                  });
              } else {
                // we have to update batch array of perticular examinerId
                Student.updateOne(
                  {
                    $and: [
                      { username: req.body.studentId },
                      {
                        examinerList: {
                          $elemMatch: {
                            examinerId: req.params.examinerId
                          }
                        }
                      }
                    ]
                  },

                  {
                    $addToSet: {
                      "examinerList.$.batch": req.body.batchId
                    }
                  }
                )
                  .then(() => {
                    res.json({
                      message: "Student added to the batch"
                    });
                  })
                  .catch(err => {
                    console.log(
                      `error in updating batch in students collection ${err}`
                    );
                  });
              }
            })
            .catch(err => {
              console.log(
                `error in finding examinerId in students collection ${err}`
              );
            });
        })
        .catch(err => {
          console.log(`error in adding student in the batch ${err}`);
        });
    })
    .catch(err => {
      console.log(`error in removing request from request Array ${err}`);
    });
});

//TODO: Get Examiner studentList and examList
examinerApp.get("/getExaminer/:examinerId", (req, res) => {
  Examiner.findOne(
    {
      username: req.params.examinerId
    },
    { _id: 0, studentList: 1, examList: 1, performance: 1 }
  )
    .then(examinerObj => {
      let batchArr = [];
      examinerObj["studentList"].forEach(batchObj => {
        batchArr.push(batchObj["batchId"]);
      });

      res.json({
        batch: batchArr,
        exam: examinerObj["examList"],
        performance: examinerObj["performance"]
      });
    })
    .catch(err => {
      console.log(`error in findOne batch Array ${err}`);
    });
});

// TODO: Adding New Exam
examinerApp.put("/addExam/:username", (req, res) => {
  Examiner.findOne({
    $and: [
      { username: req.params.username },
      {
        examList: {
          $elemMatch: {
            examname: req.body.examname.toLowerCase()
          }
        }
      }
    ]
  })

    .then(examinerObj => {
      if (examinerObj === null) {
        Examiner.updateOne(
          { username: req.params.username },
          {
            $addToSet: {
              examList: {
                examname: req.body.examname.toLowerCase(),
                duration: req.body.duration,
                totalQuestion: req.body.totalQuestion,
                batch: req.body.batch,
                result: [],
                questions: []
              }
            }
          }
        )
          .then(() => {
            res.json({
              message: "New Exam Created Successfully"
            });
          })
          .catch(err => {
            console.log("error in updating examList array of Examiner", err);
          });
      } else {
        res.json({
          message: `Exam Name ${req.body.examname} Already exist`
        });
      }
    })
    .catch(err => {
      console.log(`error in finding examname  ${err}`);
    });
});

// TODO: Remove Exam
examinerApp.put("/removeExam", (req, res) => {
  Examiner.updateOne(
    {
      $and: [
        { username: req.body.examinerId },
        {
          examList: {
            $elemMatch: {
              examname: req.body.examname
            }
          }
        }
      ]
    },

    { $pull: { examList: { examname: req.body.examname } } }
  )
    .then(() => {
      res.json({
        message: "Exam Removed"
      });
    })
    .catch(err => {
      console.log(`error in removing exam from examList ${err}`);
    });
});

// TODO: Update the Exam
examinerApp.put("/updateExam/:username", (req, res) => {
  Examiner.updateOne(
    {
      $and: [
        { username: req.params.username },
        {
          examList: {
            $elemMatch: {
              examname: req.body.examname
            }
          }
        }
      ]
    },
    {
      $set: {
        "examList.$.duration": req.body.duration,
        "examList.$.batch": req.body.batch,
        "examList.$.totalQuestion": req.body.totalQuestion
      }
    }
  )

    .then(() => {
      res.json({
        message: "Exam Updated Successfully"
      });
    })
    .catch(err => {
      console.log("error in updating examList array of Examiner", err);
    });
});

// TODO: Get the Exam / all questions from Exam List
examinerApp.get("/getExamQuestions/:examinerId/:examname", (req, res) => {
  Examiner.findOne({
    $and: [
      { username: req.params.examinerId },
      {
        examList: {
          $elemMatch: {
            examname: req.params.examname
          }
        }
      }
    ]
  })

    .then(examinerObj => {
      let examList = examinerObj["examList"];
      let exam = examList.filter(examObj => {
        return examObj["examname"] == req.params.examname;
      });

      res.json({
        message: exam[0].questions
      });
    })
    .catch(err => {
      console.log("error in finding exam details ", err);
    });
});

// TODO: Adding New Question
examinerApp.put("/addQuestion/:examinerId/:examname", (req, res) => {
  Examiner.updateOne(
    {
      $and: [
        { username: req.params.examinerId },
        {
          examList: {
            $elemMatch: {
              examname: req.params.examname
            }
          }
        }
      ]
    },
    {
      // open-exam component
      $addToSet: { "examList.$.questions": req.body }
    }
  )
    .then(() => {
      res.json({
        message: "New Question Added Successfully"
      });
    })
    .catch(err => {
      console.log("error in updating QUESTION array of Examiner", err);
    });
});

// TODO: Update the Question Paper
examinerApp.put("/updateQuestion/:username/:examname", (req, res) => {
  Examiner.findOne(
    {
      username: req.params.username
    },
    { examList: 1, _id: 0 }
  )
    .then(examinerObj => {
      let toSet;
      // Updating Examiner Perticular batch exam rasult array
      examinerObj["examList"].map((examListData, examListIndex) => {
        if (examListData["examname"] === req.params.examname) {
          examListData["questions"].map((questionsData, questionsIndex) => {
            if (questionsData["qid"] === req.body.qid) {
              toSet =
                "examList." + examListIndex + ".questions." + questionsIndex;

              Examiner.updateOne(
                {
                  $and: [
                    {
                      username: req.params.username
                    },
                    {
                      examList: {
                        $elemMatch: {
                          questions: { $elemMatch: { qid: req.body.qid } }
                        }
                      }
                    }
                  ]
                },
                { $set: { [`${toSet}`]: req.body } }
              )
                .then(() => {
                  res.json({
                    message: "New Question Updated Successfully"
                  });
                })
                .catch(err => {
                  console.log("error in updating question of Examiner", err);
                });
            }
          });
        }
      });
    })
    .catch(err => {
      console.log(
        `error in FINDING during result to Examiner Perticular batch exam rasult array ${err}`
      );
    });
});

// TODO: Delete Question
examinerApp.put("/removeQuestion", (req, res) => {
  Examiner.updateOne(
    {
      $and: [
        { username: req.body.username },
        { "examList.questions.qid": { $in: [req.body.qid] } }
      ]
    },

    {
      $pull: {
        "examList.$.questions": { qid: { $in: [req.body.qid] } }
      }
    }
  )
    .then(() => {
      res.json({
        message: "Question Removed"
      });
    })
    .catch(err => {
      console.log(`error in removing question from examList ${err}`);
    });
});

// TODO: Publish the Exam
examinerApp.put("/publishExam", (req, res) => {
  Examiner.findOne({
    $and: [
      { username: req.body.examinerId },
      {
        examList: {
          $elemMatch: {
            examname: req.body.examname
          }
        }
      }
    ]
  })
    .then(examinerObj => {
      // console.log(examinerObj);

      let examList = examinerObj["examList"];
      let examObj = examList.filter(examObj => {
        return examObj["examname"] === req.body.examname;
      });
      let exam = examObj[0];

      // add the exam obj to performance array
      Examiner.updateOne(
        {
          username: req.body.examinerId
        },
        {
          $addToSet: {
            performance: {
              examname: exam.examname,
              batch: exam.batch,
              duration: exam.duration,
              questions: exam.questions,
              result: exam.result
            }
          }
        }
      )
        .then(() => {
          for (let batch of exam["batch"]) {
            // Add exam to to the perticular batch array exam
            Examiner.updateOne(
              {
                "studentList.batchId": batch
              },
              { $addToSet: { "studentList.$.exam": exam } }
            )
              .then(() => {})
              .catch(err => {
                console.log(
                  "error in  Add exam to to the perticular batch array exam",
                  err
                );
              });
          }
          // Remove from exam list
          Examiner.updateOne(
            {
              $and: [
                { username: req.body.examinerId },
                {
                  examList: {
                    $elemMatch: {
                      examname: req.body.examname
                    }
                  }
                }
              ]
            },

            { $pull: { examList: { examname: req.body.examname } } }
          )
            .then(() => {
              res.json({
                message: "Exam Published... Go to Performance"
              });
            })
            .catch(err => {
              console.log(`error in removing exam from examList ${err}`);
            });
        })
        .catch(err => {
          console.log("error in updating performance array of Examiner", err);
        });
    })
    .catch(err => {
      console.log(`error in finding examname  ${err}`);
    });
});

// TODO: Get the Exam >  all questions/batches from Performance array
examinerApp.get(
  "/getPerformanceArrayDetails/:examinerId/:examname",
  (req, res) => {
    Examiner.findOne({
      $and: [
        { username: req.params.examinerId },
        {
          performance: {
            $elemMatch: {
              examname: req.params.examname
            }
          }
        }
      ]
    })

      .then(examinerObj => {
        let examList = examinerObj["performance"];
        let exam = examList.filter(examObj => {
          return examObj["examname"] == req.params.examname;
        });

        res.json({
          questions: exam[0].questions,
          batches: exam[0].batch
        });
      })
      .catch(err => {
        console.log("error in finding exam details ", err);
      });
  }
);

// TODO: Remove exam from performance array and perticular batches
examinerApp.put("/removePerformanceExam", (req, res) => {
  // Remove Exam from Performance array
  Examiner.updateOne(
    {
      $and: [
        { username: req.body.examinerId },
        {
          performance: {
            $elemMatch: {
              examname: req.body.examname
            }
          }
        }
      ]
    },

    { $pull: { performance: { examname: req.body.examname } } }
  )
    .then(() => {
      // Remove exam from perticular batch

      let batch = req.body.batch;

      for (let i = 0; i < batch.length; i++) {
        Examiner.updateOne(
          {
            $and: [
              { username: req.body.examinerId },
              { "studentList.exam.examname": { $in: [req.body.examname] } }
            ]
          },

          {
            $pull: {
              "studentList.$.exam": { examname: { $in: [req.body.examname] } }
            }
          }
        )
          .then(() => {
            res.json({
              message: "Exam Removed"
            });
          })
          .catch(err => {
            console.log(`error in removing question from examList ${err}`);
          });
      }
    })
    .catch(err => {
      console.log(`error in removing exam from performance ${err}`);
    });
});

// TODO: Get Batch wise Result
examinerApp.get("/getBatchResult/:batchId/:examname", (req, res) => {
  Examiner.findOne({
    studentList: {
      $elemMatch: {
        batchId: req.params.batchId
      }
    }
  })
    .then(examinerObj => {
      let batch = examinerObj["studentList"].filter(batchObj => {
        return batchObj["batchId"] == req.params.batchId;
      });

      let examArr = batch[0]["exam"];
      let exam = examArr.filter(examObj => {
        return examObj["examname"] == req.params.examname;
      });
      let resultArr = exam[0]["result"];
      res.json({
        message: {
          batchId: req.params.batchId,
          allResult: resultArr
        }
      });
    })
    .catch(err => {
      console.log(`error in finding batch wise result ${err}`);
    });
});
// export examinerApp
module.exports = examinerApp;
