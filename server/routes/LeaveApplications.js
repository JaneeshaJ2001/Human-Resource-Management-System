const express = require("express");
const router = express.Router();
const db = require("../database/connection");
const dotenv = require("dotenv");
dotenv.config();
const { validateToken } = require("../middlewares/AuthMiddleware");
const { route } = require("./LeaveRecords");

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
  const query = "select * from leave_application_view where emp_id = ?";
  db.query(query, [req.params.emp_id], (err, data) => {
    if (err) {
      res.json({ error: err });
    } else {
      res.json(data);
    }
  });
});

router.get("/bySupervisorId/:supervisor_id", validateToken, (req, res) => {
  const query = "select * from leave_application_view where supervisor_id = ?";
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

router.put("/delete", validateToken, (req, res) => {
  const { req_id } = req.body;
  const query = "delete from leave_application where req_id = ? ;";
  db.query(query, [req_id], (err, data) => {
    if (err) {
      res.json({ error: err });
    } else {
      res.json({ success: "leave status deleted successfully" });
    }
  });
});

router.get("/leaveCount", validateToken, (req, res) => {
  const query = "select * from leave_count_per_employee_view where emp_id = ?";
  db.query(query, [req.user.emp_id], (err, data) => {
    if (err) {
      res.json({ error: err });
    } else {
      res.json(data);
    }
  });
});

router.get("/byDeptTime/:start_range&:end_range&:dept_name", (req, res) => {
  const { start_range, end_range, dept_name } = req.params;
  const query = `select 
  leave_type_name, 
  sum(greatest(datediff(least(end_date,?),greatest(start_date,?)),0)) as total_days_within_range, 
  dept_name 
  from leave_application_view where req_status = "Accepted" and dept_name = ? 
  group by leave_type_name, dept_name having total_days_within_range > 0;`;
  db.query(query, [end_range, start_range, dept_name], (err, data) => {
    if (err) {
      res.json({ error: err });
    } else {
      res.json(data);
    }
  });
});

router.get("/yearlyCount", validateToken, (req, res) => {
  const query = "select * from yearly_leave_count_view where emp_id = ?";
  db.query(query, [req.user.emp_id], (err, data) => {
    if (err) {
      res.json({ error: err });
    } else {
      res.json(data);
    }
  });
});

module.exports = router;
