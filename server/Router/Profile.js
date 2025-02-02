const express = require("express");
const router = express.Router();
const db = require("../config/db");

// API lấy thông tin user
router.get("/user/:id", (req, res) => {
  const userId = req.params.id;
  const query = "SELECT id, email, ten, diachi, phone FROM user WHERE id = ?";

  db.query(query, [userId], (err, result) => {
    if (err) {
      res
        .status(500)
        .json({ error: "Đã có lỗi xảy ra trong quá trình truy vấn" });
      return;
    }
    if (result.length === 0) {
      res.status(404).json({ message: "Không tìm thấy user" });
      return;
    }
    res.json(result[0]);
  });
});

// API cập nhật thông tin user
router.put("/userUpdate/:id", (req, res) => {
  const id = req.params.id;
  const { ten, phone, email, diachi } = req.body;

  const sql =
    "UPDATE user SET `ten` = ?, `phone` = ?, `email` = ?,`diachi` = ? WHERE id = ?";
  db.query(sql, [ten, phone, email, diachi, id], (error, result) => {
    if (error) return res.json({ Status: false, Error: "Query Error" + error });
    return res.json({ Status: true, Result: result });
  });
});

// API lấy lịch đặt của user
router.get("/bookings/:userId", (req, res) => {
  const id = req.params.userId;

  // const query = 'SELECT chinhanh.tenchinhanh AS TenChiNhanh,dichvu.tendichvu AS TenDichVu,nhanvien.ten AS TenNhanVien,datlich.ngay AS Ngay,datlich.gio AS Gio,datlich.tongtien AS TongTien,trangthai.ten AS TenTrangThai FROM datlich JOIN chinhanh ON datlich.idchinhanh = chinhanh.id JOIN dichvu ON datlich.iddichvu = dichvu.id JOIN nhanvien ON datlich.idnhanvien = nhanvien.id JOIN trangthai ON datlich.idtrangthai = trangthai.id Where iduser=? ';
  const query = `
      SELECT 
          datlich.id AS id,
          chinhanh.tenchinhanh AS TenChiNhanh,
          dichvu.tendichvu AS TenDichVu,
          nhanvien.ten AS TenNhanVien,
          datlich.ngay AS Ngay,
          datlich.gio AS Gio, 
          datlich.tongtien AS TongTien,
          trangthai.ten AS TenTrangThai
      FROM datlich
      JOIN chinhanh ON datlich.idchinhanh = chinhanh.id
      JOIN dichvu ON datlich.iddichvu = dichvu.id 
      JOIN nhanvien ON datlich.idnhanvien = nhanvien.id
      JOIN trangthai ON datlich.idtrangthai = trangthai.id
      WHERE iduser = ?
      ORDER BY datlich.id DESC `;
  db.query(query, [id], (error, results) => {
    if (error) {
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
});

router.get("/hoadon/:userId", (req, res) => {
  const id = req.params.userId;

  const query = `
      SELECT 
    donhang.id AS madonhang,
    product.ten AS tensanpham,
    chitietdonhang.soluong,
    chitietdonhang.gia,
    chitietdonhang.tongtien,
    user.ten AS tenuser,
    status.ten AS tentrangthai,
    donhang.diachi,
    donhang.created_at,
    donhang.tongtien AS tongtienhoadon
FROM 
    donhang
JOIN 
    chitietdonhang ON donhang.id = chitietdonhang.donhang_id
JOIN 
    user ON donhang.user_id = user.id
JOIN 
    status ON donhang.status_id = status.id
JOIN 
    product ON chitietdonhang.product_id = product.id
WHERE 
    user_id = ?
ORDER BY donhang.created_at DESC`;
  db.query(query, [id], (error, results) => {
    if (error) {
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
});

router.put("/huylich", (req, res) => {
  const { id } = req.body;

  const query = `
    UPDATE datlich 
    SET idtrangthai = 4 
    WHERE id = ?`;

  db.query(query, [id], (error, results) => {
    if (error) {
      console.error("Lỗi cơ sở dữ liệu:", error);
      return res
        .status(500)
        .json({ error: "Lỗi cơ sở dữ liệu khi cập nhật trạng thái." });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "Không tìm thấy lịch để hủy." });
    }

    res.json({ message: "Lịch đã được hủy thành công." });
  });
});

module.exports = router;
