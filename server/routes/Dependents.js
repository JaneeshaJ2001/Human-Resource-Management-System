const express = require("express");
const router = express.Router();
const db = require("../database/connection");
const dotenv = require("dotenv");
dotenv.config();
const { validateToken } = require("../middlewares/AuthMiddleware");

router.post("/", validateToken, (req, res) => {
  const {
    name,
    birth_date,
    gender,
    relationship,
    PB_number,
    street_name,
    city_name,
    country,
  } = req.body;
  const query = "call add_dependent(?,?,?,?,?,?,?,?,?)";
  db.query(
    query,
    [
      name,
      birth_date,
      gender,
      relationship,
      req.user.emp_id,
      PB_number,
      street_name,
      city_name,
      country,
    ],
    (err, data) => {
      if (err) {
        res.json({ error: err });
      } else {
        res.json({ success: "dependent added successfully" });
      }
    }
  );
});

router.get("/", validateToken, (req, res) => {
  const query = "select * from dependent";
  db.query(query, (err, data) => {
    if (err) {
      res.json({ error: err });
    } else {
      res.json(data);
    }
  });
});

router.get("/byId/:emp_id", validateToken, (req, res) => {
  const query = "select * from dependent where emp_id = ?";
  db.query(query, [req.params.emp_id], (err, data) => {
    if (err) {
      res.json({ error: err });
    } else {
      res.json(data);
    }
  });
});

router.delete("/", validateToken, (req, res) => {
  const query = "delete from dependent where dependent_id = ?";
  db.query(query, [req.body.dependent_id], (err, data) => {
    if (err) {
      res.json({ error: err });
    } else {
      res.json({ success: "dependent deleted successfully" });
    }
  });
});

router.put("/", validateToken, (req, res) => {
  const {
    dependent_id,
    name,
    birth_date,
    gender,
    relationship,
    PB_number,
    street_name,
    city_name,
    country,
  } = req.body;
  const query = "call update_dependent(?,?,?,?,?,?,?,?,?,?)";
  db.query(
    query,
    [
      dependent_id,
      name,
      birth_date,
      gender,
      relationship,
      req.user.emp_id,
      PB_number,
      street_name,
      city_name,
      country,
    ],
    (err, data) => {
      if (err) {
        res.json({ error: err });
      } else {
        res.json({ success: "dependent updated successfully" });
      }
    }
  );
});

module.exports = router;
