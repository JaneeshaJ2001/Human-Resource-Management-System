const express = require("express");
const router = express.Router();
const db = require("../database/connection");
const dotenv = require("dotenv");
dotenv.config();
const { validateToken } = require("../middlewares/AuthMiddleware");

router.post("/", validateToken, (req, res) => {
  const {
    contact_name,
    relationship,
    PB_number,
    street_name,
    city_name,
    country,
    Mobile_phone,
    Home_phone,
  } = req.body;
  const query = "call add_emergency_contact(?,?,?,?,?,?,?,?,?)";
  db.query(
    query,
    [
      req.user.emp_id,
      contact_name,
      relationship,
      PB_number,
      street_name,
      city_name,
      country,
      Mobile_phone,
      Home_phone,
    ],
    (err, data) => {
      if (err) {
        res.json({ error: err });
      } else {
        res.json({ success: "emergency contact added successfully" });
      }
    }
  );
});

router.get("/", validateToken, (req, res) => {
  const query = "select emergency_details.emp_id, emergency_details.contact_name, emergency_details.relationship, emergency_details.Mobile_phone, emergency_details.Home_phone, address.PB_number, address.street_name, address.city_name, address.country, emergency_details.created_at, emergency_details.updated_at from emergency_details left join address on (emergency_details.address_id = address.address_id)";
  db.query(query, (err, data) => {
    if (err) {
      res.json({ error: err });
    } else {
      res.json(data);
    }
  });
});

router.get("/byId/:emp_id", validateToken, (req, res) => {
  const query = "select emergency_details.emp_id, emergency_details.contact_name, emergency_details.relationship, emergency_details.Mobile_phone, emergency_details.Home_phone, address.PB_number, address.street_name, address.city_name, address.country, emergency_details.created_at, emergency_details.updated_at from emergency_details left join address on (emergency_details.address_id = address.address_id) where emergency_details.emp_id = ?";
  db.query(query, [req.params.emp_id], (err, data) => {
    if (err) {
      res.json({ error: err });
    } else {
      res.json(data);
    }
  });
});

router.delete("/", validateToken, (req, res) => {
  const query = "delete from emergency_details where emp_id = ?";
  db.query(query, [req.user.emp_id], (err, data) => {
    if (err) {
      res.json({ error: err });
    } else {
      res.json({ success: "emergency contact deleted successfully" });
    }
  });
});

router.put("/", validateToken, (req, res) => {
  const {
    contact_name,
    relationship,
    PB_number,
    street_name,
    city_name,
    country,
    Mobile_phone,
    Home_phone,
  } = req.body;
  const query = "call update_emergency_contact(?,?,?,?,?,?,?,?,?)";
  db.query(
    query,
    [
      req.user.emp_id,
      contact_name,
      relationship,
      PB_number,
      street_name,
      city_name,
      country,
      Mobile_phone,
      Home_phone,
    ],
    (err, data) => {
      if (err) {
        res.json({ error: err });
      } else {
        res.json({ success: "emergency contact updated successfully" });
      }
    }
  );
});

module.exports = router;
