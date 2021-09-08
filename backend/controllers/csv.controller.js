//endpoints

const db = require("../models");
const pool = require("../db");
const csv_field = db.csv;
const fs = require("fs");
const csv = require("fast-csv");
const CsvParser = require("json2csv").Parser;

const upload = async (req, res) => {
  temp = [];
  count = 0;
  error = "";
  //if file is empty
  if (req.file == undefined) {
    return res.status(400).send("Please upload a CSV file!");
  }
  try {
    let path = __basedir + "/csvs/" + req.file.filename;
    fs.createReadStream(path)
      .pipe(csv.parse({ headers: true }))
      .on("error", (error) => {
        throw error.message;
      })
      .on("data", (row) => {
        ++count;
        //if empty row
        if (!error) {
          if (!Object.keys(row).length) {
            error = "empty fields";
          }
          //if >4 fields
          if (Object.keys(row).length > 4) {
            error = "too many fields";
          }
          const { user_id, user_name, name, salary } = row;
          //if any column empty
          if (!user_id || !user_name || !name || !salary) {
            //console.log("x");
            error = "empty fields";
          }
          //if negative salary
          if (salary < 0) {
            error = "invalid salary";
          }
          //if comment
          if (user_id.charAt(0) != "#" && !error) {
            console.log(error);
            temp.push(row);
          }
        }
      })
      .on("end", () => {
        if (count == 0) {
          res.status(400).send("empty file");
        } else if (temp.length != count) {
          res.status(400).send(error);
        } else {
          temp.forEach(async (row) => {
            try {
              //add 1 data at a time to db
              const { user_id, user_name, name, salary } = row;
              const checkEntry = await pool.query(
                "SELECT * FROM csvs WHERE user_id = $1",
                [user_id]
              );

              if (checkEntry.rows.length) {
                const update = await pool.query(
                  "UPDATE csvs SET user_name =$1,name=$2,salary=$3 WHERE user_id = $4",
                  [user_name, name, salary, user_id]
                );
              } else {
                const newEntry = await pool.query(
                  "INSERT INTO csvs (user_id, user_name, name, salary) VALUES ($1, $2, $3, $4) RETURNING *",
                  [user_id, user_name, name, salary]
                );
              }
            } catch (e) {
              console.log(e);
              // res.json("error!");
              res.status(400).send("error");
            }
          });
          res.status(200).send({
            message: "upload success!",
          });
        }
      });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Could not upload the file: " + req.file.originalname,
    });
  }
};

const getcsvs = async (req, res) => {
  // const min_salary = req.params.min_salary;
  // const max_salary = req.params.max_salary;
  // const condition = req.params.condition;
  try {
    //get all csv
    const allUsers = await pool.query("SELECT * FROM csvs ");
    res.json(allUsers.rows);
  } catch (e) {
    console.log(e);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  upload,
  getcsvs,
};
