const express = require("express");
const router = express.Router();
const db = require("../database/connection");
const dotenv = require("dotenv");
dotenv.config();
const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/", validateToken,(req, res) => {
  const query = "select * from custom_attributes";
  db.query(query, (err, data) => {
    if (err) {
      res.json({ error: err });
    } else {
      res.json(data);
    }
  });
});

router.get("/byEmpId/:emp_id", validateToken, (req, res) => {
  const query = `select 
    custom_attribute_value.emp_id, custom_attribute_value.attribute_id, 
    custom_attributes.attribute_name, custom_attributes.description, custom_attribute_value.value as attribute_value 
    from custom_attribute_value left join custom_attributes 
    on (custom_attribute_value.attribute_id = custom_attributes.attribute_id) where custom_attribute_value.emp_id = ?`;
  db.query(query, [req.params.emp_id], (err, data) => {
    if (err) {
      res.json({ error: err });
    } else {
      res.json(data);
    }
  });
});

router.post("/", validateToken, (req, res) => {
  const { attribute_id, attribute_value, emp_id } = req.body;
  const query =
    "insert into custom_attribute_value (emp_id, attribute_id, value) values (?,?,?)";
  db.query(query, [emp_id, attribute_id, attribute_value], (err, data) => {
    if (err) {
      res.json({ error: err });
    } else {
      res.json({ success: "custom attribute for employee added successfully" });
    }
  });
});

router.post("/add", validateToken, (req, res) => {
  const { attribute_name, description } = req.body;
  const query =
    "insert into custom_attributes (attribute_name, description) values (?,?)";
  db.query(query, [attribute_name, description], (err, data) => {
    if (err) {
      res.json({ error: err });
    } else {
      res.json({ success: "custom attributes added successfully" });
    }
  });
});
router.put("/update", validateToken, (req, res) => {
  const { attribute_id, attribute_name, description } = req.body;
  const query =
    "update custom_attributes set attribute_name = ?, description = ? where attribute_id = ?";
  db.query(query, [attribute_name, description, attribute_id], (err, data) => {
    if (err) {
      res.json({ error: err });
    } else {
      res.json({ success: "custom attributes updated successfully" });
    }
  });
});
router.put("/delete", validateToken, (req, res) => {
  const { attribute_id } = req.body;
  const query = "delete from custom_attributes where attribute_id = ?";
  db.query(query, [attribute_id], (err, data) => {
    if (err) {
      res.json({ error: err });
    } else {
      res.json({ success: "custom attributes deleted successfully" });
    }
  });
});

module.exports = router;
