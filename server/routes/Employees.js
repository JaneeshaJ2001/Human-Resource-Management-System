const express = require("express");
const router = express.Router();
const db = require("../database/connection");
const dotenv = require("dotenv");
dotenv.config();
const { validateToken } = require("../middlewares/AuthMiddleware");

router.post("/add", (req, res) => {
  const {
    first_name,
    last_name,
    birth_date,
    PB_number,
    street_name,
    city_name,
    country,
    branch_name,
    job_title,
    pay_grade,
    dept_name,
    emp_status_name,
    SupervisorId,
    marital_status,
  } = req.body;
  const query = "call add_employee(?,?,?,?,?,?,?,?,?,?,?,?,?,?,@emp_id)";
  db.query(
    query,
    [
      first_name,
      last_name,
      birth_date,
      PB_number,
      street_name,
      city_name,
      country,
      branch_name,
      job_title,
      pay_grade,
      dept_name,
      emp_status_name,
      SupervisorId,
      marital_status,
    ],
    (err, data) => {
      if (err) {
        res.json({ error: err });
      } else {
        db.query("select @emp_id", (err, data) => {
          if (err) {
            res.json({ error: err });
          } else {
            res.json(data);
          }
        });
      }
    }
  );
});

router.get("/", validateToken, (req, res) => {
  const query = "select * from employee_info_view";
  db.query(query, (err, data) => {
    if (err) {
      res.json({ error: err });
    } else {
      res.json(data);
    }
  });
});

router.get("/byId/:emp_id", validateToken, (req, res) => {
  const query = "select * from employee_info_view where emp_id = ?";
  db.query(query, [req.params.emp_id], (err, data) => {
    if (err) {
      res.json({ error: err });
    } else {
      res.json(data);
    }
  });
});

router.get("/bySupervisorId/:supervisor_id", validateToken, (req, res) => {
  const query = "select * from employee_info_view where SupervisorId = ?";
  db.query(query, [req.params.supervisor_id], (err, data) => {
    if (err) {
      res.json({ error: err });
    } else {
      res.json(data);
    }
  });
});

router.put("/", validateToken, (req, res) => {
  const {
    emp_id,
    first_name,
    last_name,
    birth_date,
    PB_number,
    street_name,
    city_name,
    country,
    branch_name,
    job_title,
    pay_grade,
    dept_name,
    emp_status_name,
    SupervisorId,
    marital_status,
  } = req.body;
  const query = "call update_employee(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
  db.query(
    query,
    [
      emp_id,
      first_name,
      last_name,
      birth_date,
      PB_number,
      street_name,
      city_name,
      country,
      branch_name,
      job_title,
      pay_grade,
      dept_name,
      emp_status_name,
      SupervisorId,
      marital_status,
    ],
    (err, data) => {
      if (err) {
        res.json({ error: err });
      } else {
        res.json({ success: "user updated successfully" });
      }
    }
  );
});

module.exports = router;
