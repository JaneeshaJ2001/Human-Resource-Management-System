const express = require("express");
const router = express.Router();
const db = require("../database/connection");
const dotenv = require("dotenv");
dotenv.config();
const { validateToken } = require("../middlewares/AuthMiddleware");

router.post("/", validateToken, (req, res) => {
  const { dept_name, no_of_employees } = req.body;
  const query =
    "insert into department (dept_name, no_of_employees) values (?,?)";
  db.query(query, [dept_name, no_of_employees], (err, data) => {
    if (err) {
      res.json({ error: err });
    } else {
      res.json({ success: "department created successfully" });
    }
  });
});

router.get("/", validateToken, (req, res) => {
  const query = "select * from department_view";
  db.query(query, (err, data) => {
    if (err) {
      res.json({ error: err });
    } else {
      res.json(data);
    }
  });
});

router.put("/", validateToken, (req, res) => {
  const { dept_id, dept_name, no_of_employees } = req.body;
  const query =
    "update department set dept_name = ? , no_of_employees = ? where dept_id = ?";
  db.query(query, [dept_name, no_of_employees, dept_id], (err, data) => {
    if (err) {
      res.json({ error: err });
    } else {
      res.json({ success: "department updated successfully" });
    }
  });
});

router.delete("/", validateToken, (req, res) => {
  const { dept_id } = req.body;
  const query = "delete from department where dept_id = ?";
  db.query(query, [dept_id], (err, data) => {
    if (err) {
      res.json({ error: err });
    } else {
      res.json({ success: "department deleted successfully" });
    }
  });
});

router.put("/update", validateToken, (req, res) => {
  const { dept_id, dept_name, max_no_of_employees } = req.body;
  const query =
    "update department set dept_name = ? , no_of_employees = ? where dept_id = ?";
  db.query(query, [dept_name, max_no_of_employees, dept_id], (err, data) => {
    if (err) {
      res.json({ error: err });
    } else {
      res.json({ success: "department updated successfully" });
    }
  });
});

module.exports = router;
