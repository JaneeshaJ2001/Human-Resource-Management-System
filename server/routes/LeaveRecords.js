const express = require("express");
const router = express.Router();
const db = require("../database/connection");
const dotenv = require("dotenv");
dotenv.config();
const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/", validateToken, (req, res) => {
  const query = "select * from leave_record";
  db.query(query, (err, data) => {
    if (err) {
      res.json({ error: err });
    } else {
      res.json(data);
    }
  });
});

router.get("/byId/:emp_id", validateToken, (req, res) => {
  const query = "select * from leave_record where emp_id = ?";
  db.query(query, [req.params.emp_id], (err, data) => {
    if (err) {
      res.json({ error: err });
    } else {
      res.json(data);
    }
  });
});

module.exports = router;
