const express = require("express");
const router = express.Router();
const db = require("../database/connection");
const dotenv = require("dotenv");
dotenv.config();
const { validateToken } = require("../middlewares/AuthMiddleware");

router.post("/", validateToken, (req, res) => {
  const { leave_type_name, reason, start_date, end_date } = req.body;
  const query = "call add_leave_application(?,?,?,?,?)";
  db.query(
    query,
    [req.user.emp_id, leave_type_name, reason, start_date, end_date],
    (err, data) => {
      if (err) {
        res.json({ error: err });
      } else {
        res.json({ success: "leave application added successfully" });
      }
    }
  );
});

router.get("/byId/:emp_id", validateToken, (req, res) => {
  const query = "select * from leave_application where emp_id = ?";
  db.query(query, [req.params.emp_id], (err, data) => {
    if (err) {
      res.json({ error: err });
    } else {
      res.json(data);
    }
  });
});

router.get("/bySupervisorId/:supervisor_id", validateToken, (req, res) => {
  const query = "select * from leave_application where supervisor_id = ?";
  db.query(query, [req.params.supervisor_id], (err, data) => {
    if (err) {
      res.json({ error: err });
    } else {
      res.json(data);
    }
  });
});

router.put("/", validateToken, (req, res) => {
  const { req_id, req_status } = req.body;
  const query = "update leave_application set req_status = ? where req_id = ?";
  db.query(query, [req_status, req_id], (err, data) => {
    if (err) {
      res.json({ error: err });
    } else {
      res.json({ success: "leave status updated successfully" });
    }
  });
});

module.exports = router;
