const express = require("express");
const router = express.Router();
const db = require("../database/connection");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const { validateToken } = require("../middlewares/AuthMiddleware");

router.post("/register", (req, res) => {
  const { username, password, emp_id, role_id } = req.body;
  const query =
    "insert into account (username,password,emp_id,role_id) values (?,?,?,?); select account.username from account order by account.username desc limit 1;";
  bcrypt.hash(password, 10).then((hashedPassword) => {
    db.query(
      query,
      [username, hashedPassword, emp_id, role_id],
      (err, data) => {
        if (err) {
          res.json({ error: err });
        } else {
          res.json(data[1][0]);
        }
      }
    );
  });
});
router.get("/register", (req, res) => {
  const query =
    "select account.username from account order by account.username desc limit 1";
  db.query(query, (err, data) => {
    if (err) {
      res.json({ error: err });
    } else {
      res.json(data);
    }
  });
});

router.get("/validateAuth", validateToken, (req, res) => {
  res.json(req.user);
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  const query = "select * from account where username = ?";
  db.query(query, username, (err, data) => {
    if (err) {
      res.json({ error: err });
    } else {
      if (data.length === 0) {
        res.json({ error: "user not found" });
      } else {
        bcrypt.compare(password, data[0].password).then((match) => {
          if (!match) {
            res.json({ error: "wrong username or password" });
          } else {
            const accessToken = sign(
              {
                username: username,
                emp_id: data[0].emp_id,
                role_id: data[0].role_id,
              },
              process.env.JWT_SECRET
            );
            res.json({
              accessToken: accessToken,
              username: username,
              emp_id: data[0].emp_id,
              role_id: data[0].role_id,
            });
          }
        });
      }
    }
  });
});

router.put("/changepassword", validateToken, (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const query = "select * from account where username = ?";
  db.query(query, req.user.username, (err, data) => {
    if (err) {
      res.json({ error: err });
    } else {
      bcrypt.compare(oldPassword, data[0].password).then((match) => {
        if (!match) {
          res.json({ error: "wrong old password" });
        } else {
          bcrypt.hash(newPassword, 10).then((hashedPassword) => {
            const query =
              "update account set `password` = ? where username = ?";
            db.query(
              query,
              [hashedPassword, req.user.username],
              (err, result) => {
                if (err) {
                  res.json({ error: err });
                } else {
                  res.json({ username: data[0].username });
                }
              }
            );
          });
        }
      });
    }
  });
});

module.exports = router;
