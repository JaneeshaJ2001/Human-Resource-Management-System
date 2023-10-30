const express = require("express");
const router = express.Router();
const db = require("../database/connection");
const dotenv = require("dotenv");
dotenv.config();
const { validateToken } = require("../middlewares/AuthMiddleware");

router.post("/", validateToken, (req, res) => {
  const emp_id = req.user.emp_id;
  const {contact_number} = req.body;

  const query = "insert into contact (emp_id, contact_number) values (?,?)";
  db.query(query, [emp_id, contact_number], (err, data) => {
    if (err) {
      res.json({error: err});
    } else {
      res.json({ success: "contact added successfully" });
    }
  });
});

router.get("/", validateToken, (req, res) => {
  const query = "select * from contact";
  db.query(query, (err, data) => {
    if (err) {
      res.json({ error: err });
    } else {
      res.json(data);
    }
  });
});

router.get("/byEmpId/:emp_id", validateToken, (req, res) => {
  const query = "select * from contact where emp_id = ? order by created_at" ;
  db.query(query, [req.params.emp_id], (err, data) => {
    if (err) {
      res.json({ error: err });
    } else {
      res.json(data);
    }
  });
});

router.put("/", validateToken, (req, res) => {
  const { old_number, new_number } = req.body;
  const query =
    "update contact set contact_number = ? where emp_id = ? and contact_number = ?";
  db.query(query, [new_number, req.user.emp_id, old_number], (err, data) => {
    if (err) {
      res.json({ error: err });
    } else {
      res.json({ success: "contact changed successfully" });
    }
  });
});

router.delete("/", validateToken, (req, res) => {
  const { contact_number } = req.body;
  const query = "delete from contact where emp_id = ? and contact_number = ?";
  db.query(query, [req.user.emp_id, contact_number], (err, data) => {
    if (err) {
      res.json({ error: err });
    } else {
      res.json({ success: "contact deleted successfully" });
    }
  });
});

module.exports = router;
