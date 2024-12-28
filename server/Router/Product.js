const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.get("/getAllProduct", (req, res) => {
  const sql = "SELECT * FROM product";
  db.query(sql, (err, result) => {
    if (err) return res.json({ Message: "Err  inside server " });
    return res.json(result);
  });
});
//tất cả loại sp
router.get("/categories", (req, res) => {
  const sql = "SELECT * FROM category";

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Lỗi truy vấn danh mục:", err.message);
      res.status(500).send("Lỗi server.");
    } else {
      res.json(results);
    }
  });
});
// Thêm API tìm kiếm sản phẩm
router.get("/products", (req, res) => {
  const { category_id, search } = req.query;

  let sql = "SELECT * FROM product";
  const params = [];

  // Nếu có tham số tìm kiếm, thêm điều kiện WHERE
  if (search) {
    sql += " WHERE ten LIKE ?";
    params.push(`%${search}%`);
  }

  // Nếu có category_id, thêm điều kiện lọc danh mục
  if (category_id) {
    sql += search ? " AND category_id = ?" : " WHERE category_id = ?";
    params.push(category_id);
  }

  db.query(sql, params, (err, results) => {
    if (err) {
      console.error("Lỗi truy vấn sản phẩm:", err.message);
      res.status(500).send("Lỗi server.");
    } else {
      res.json(results);
    }
  });
});

// số lượng không thể vượt sl tối đa
router.get("/api/product/:productId", (req, res) => {
  const productId = req.params.productId; // Lấy productId từ tham số URL

  // Truy vấn SQL để lấy thông tin sản phẩm theo productId
  const query = `SELECT * FROM product WHERE id = ?`;

  db.query(query, [productId], (err, result) => {
    if (err) {
      console.error("Lỗi khi truy vấn dữ liệu:", err);
      res.status(500).json({ error: "Đã có lỗi xảy ra" });
      return;
    }

    if (result.length > 0) {
      // Trả về thông tin sản phẩm
      res.status(200).json(result[0]);
    } else {
      res.status(404).json({ error: "Sản phẩm không tồn tại" });
    }
  });
});

module.exports = router;
