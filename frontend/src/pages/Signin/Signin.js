import axios from "axios";
import React, { useState } from "react";
import style from "./Signin.module.scss";
import classNames from "classnames/bind";
import { Link, useNavigate } from "react-router-dom";
import Validation from "./SignInValidatiton";

const cx = classNames.bind(style);

export default function Signin() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleSwitch = () => {
    setShow(!show);
  };

  const [values, setValues] = useState({
    phone: "",
    password: "",
  });
  const [error, setError] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!values.phone || !values.password) {
      alert("Vui lòng điền đầy đủ số điện thoại và mật khẩu");
      return;
    }
    axios
      .post("http://localhost:8080/login", values)
      .then((res) => {
        if (res.data.success) {
          // Nếu đăng nhập thành công
          // Lưu thông tin vào localStorage
          localStorage.setItem("phone", values.phone);
          localStorage.setItem("ten", res.data.ten);
          localStorage.setItem("email", res.data.email);
          localStorage.setItem("diachi", res.data.diachi);
          localStorage.setItem("id", res.data.id);
          // Điều hướng đến trang /dat-lich
          navigate("/dat-lich");
          window.location.reload();
          alert("Đăng nhập thành công");
        } else {
          alert(res.data.message || "Số điện thoại hoặc mật khẩu sai");
        }
      })
      .catch((err) => {
        console.error(err);
        alert("Số điện thoại hoặc mật khẩu sai"); // Thông báo lỗi chung
      });
  };

  if (!localStorage.getItem("phone")) {
    return (
      <div className={cx("wrapper")}>
        <div className={cx("form-img")}>
          <img
            src={
              "https://t4.ftcdn.net/jpg/03/78/83/15/360_F_378831540_10ShB9tnvs2quli24qe53ljhvsL07gjz.jpg"
            }
            alt=""
          />
        </div>
        <div className={cx("form")}>
          <h3>ĐĂNG NHẬP</h3>
          <form action="" onSubmit={handleSubmit}>
            <div className={cx("form-input")}>
              <label htmlFor="phone">Số điện thoại </label>
              <input
                type="phone"
                placeholder="Số điện thoại "
                name="phone"
                id=""
                maxLength={10}
                onInput={(e) =>
                  (e.target.value = e.target.value.replace(/[^0-9]/g, ""))
                }
                onChange={(e) =>
                  setValues({ ...values, phone: e.target.value })
                }
              />
            </div>
            <div className={cx("form-input")}>
              <label htmlFor="password">Mật khẩu</label>
              <input
                type={show === false ? "password" : "text"}
                name="password"
                placeholder="Mật khẩu"
                id=""
                onChange={(e) =>
                  setValues({ ...values, password: e.target.value })
                }
              />
              {error.password && <span>{error.password}</span>}
              <div className={cx("action")}>
                <div className={cx("checkbox")}>
                  <p onClick={handleSwitch}>
                    {show === false ? "Hiển thị mật khẩu" : "Ẩn mật khẩu"}
                  </p>
                </div>
                <Link className={cx("link")} to="/quen-mat-khau">
                  Quên mật khẩu?
                </Link>
              </div>
            </div>
            <div className={cx("form-btn")}>
              <button className={cx("btn-signin")}>ĐĂNG NHẬP</button>
              <button
                className={cx("btn-signup")}
                onClick={() => navigate("/dang-ky-tai-khoan")}
              >
                ĐĂNG KÝ TÀI KHOẢN
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  } else {
    navigate("/dat-lich");
  }
}
