import React from "react";
import logo from "../../assets/logo-barber.png";
import { Link } from "react-router-dom";

export default function Success() {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-75bg-light font-monospace fw-bolder">
      <div className="mb-5">
        <img
          src={logo}
          alt="Logo"
          className="img-fluid"
          style={{ maxWidth: "550px" }}
        />
      </div>
      <p className="text-success font-monospace fs-3">Đặt thành công</p>
      <Link to="/" className="btn btn-primary mt-3">
        TRỞ VỀ
      </Link>
    </div>
  );
}
