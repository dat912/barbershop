const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.get("/countProducts", (req, res) => {
  const sql = "SELECT COUNT(*) AS soluong FROM product";
  db.query(sql, (err, result) => {
    if (err) return res.json({ Message: "Err  inside server " });
    return res.json(result);
  });
});

router.get("/countCategorys", (req, res) => {
  const sql = "SELECT COUNT(*) AS soluong FROM category";
  db.query(sql, (err, result) => {
    if (err) return res.json({ Message: "Err  inside server " });
    return res.json(result);
  });
});

router.get("/countUsers", (req, res) => {
  const sql = "SELECT COUNT(*) AS soluong FROM user";
  db.query(sql, (err, result) => {
    if (err) return res.json({ Message: "Err  inside server " });
    return res.json(result);
  });
});

router.get("/countNhanVien", (req, res) => {
  const sql = "SELECT COUNT(*) AS soluong FROM nhanvien";
  db.query(sql, (err, result) => {
    if (err) return res.json({ Message: "Err  inside server " });
    return res.json(result);
  });
});

router.get("/tongTienDatLich", (req, res) => {
  const { filter, date, month, quarter, year } = req.query;
  let sql;

  switch (filter) {
    case "ngày":
      sql = `SELECT SUM(tongtien) AS total FROM datlich WHERE ngay = '${date}'`;
      break;
    case "tháng":
      sql = `SELECT SUM(tongtien) AS total FROM datlich WHERE MONTH(ngay) = ${month} AND YEAR(ngay) = ${year}`;
      break;
    case "quý":
      sql = `SELECT SUM(tongtien) AS total FROM datlich WHERE QUARTER(ngay) = ${quarter} AND YEAR(ngay) = ${year}`;
      break;
    default:
      sql = "SELECT SUM(tongtien) AS total FROM datlich";
  }

  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ message: "Error inside server" });
    res.status(200).json(result);
  });
});

router.get("/tongTienDonHang", (req, res) => {
  const { filter, date, month, quarter, year } = req.query;
  let sql;

  switch (filter) {
    case "ngày":
      sql = `SELECT SUM(tongtien) AS total FROM donhang WHERE DATE(created_at) = '${date}'`;
      break;
    case "tháng":
      sql = `SELECT SUM(tongtien) AS total FROM donhang WHERE MONTH(created_at) = ${month} AND YEAR(created_at) = ${year}`;
      break;
    case "quý":
      sql = `SELECT SUM(tongtien) AS total FROM donhang WHERE QUARTER(created_at) = ${quarter} AND YEAR(created_at) = ${year}`;
      break;
    default:
      sql = "SELECT SUM(tongtien) AS total FROM donhang";
  }

  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ message: "Error inside server" });
    res.status(200).json(result);
  });
});

module.exports = router;
