const express = require("express");
const router = express.Router();
const db = require("../database/connection");
const dotenv = require("dotenv");
dotenv.config();
const { validateToken } = require("../middlewares/AuthMiddleware");

router.post("/", (req, res) => {
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

  const query =
    "call add_employee(?,?,?,?,?,?,?,?,?,?,?,?,?,?,@emp_id); select @emp_id as emp_id;";
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
        res.json(data[1][0]);
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

router.get("/byJobTitle/:job_title", (req, res) => {
  const query = "select * from employee_info_view where job_title = ?";
  db.query(query, [req.params.job_title], (err, data) => {
    if (err) {
      res.json({ error: err });
    } else {
      res.json(data);
    }
  });
});

router.get("/byPayGrade/:pay_grade", (req, res) => {
  const query = "select * from employee_info_view where pay_grade = ?";
  db.query(query, [req.params.pay_grade], (err, data) => {
    if (err) {
      res.json({ error: err });
    } else {
      res.json(data);
    }
  });
});

router.get("/byDept/:dept_name", (req, res) => {
  const query = "select * from employee_info_view where dept_name = ?";
  db.query(query, [req.params.dept_name], (err, data) => {
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

router.get("/superVisors", validateToken, (req, res) => {
  const query =
    "select emp_id from employee_info_view where SupervisorId is null";
  db.query(query, (err, data) => {
    if (err) {
      res.json({ error: err });
    } else {
      res.json(data);
    }
  });
});

// router.get("/subOrdinates", validateToken, (req, res) => {
//   const query = "select emp_id from employee where SupervisorId = ?";
//   dn.query(query, [req.user.emp_id], (err, data) => {
//     if (err) {
//       res.json({ error: err });
//     } else {
//       res.json(data);
//     }
//   });
// });

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
