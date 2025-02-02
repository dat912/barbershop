import axios from "axios";
import React, { useEffect, useState } from "react";
//import { useNavigate } from "react-router-dom";
const Employee = () => {
  const [emailError, setEmailError] = useState("");
  const [passError, setPassError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [employees, setEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // 'add' or 'edit'
  const [currentEmployee, setCurrentEmployee] = useState({
    ten: "",
    email: "",
    password: "",
    phone: "",
    id_vaitro: "",
    idchinhanh: "",
  });
  const [listChiNhanh, setListChiNhanh] = useState([]);
  const [listVaiTro, setListVaiTro] = useState([]);
  const [selectedChiNhanh, setSelectedChiNhanh] = useState("");
  const [selectedVaiTro, setSelectedVaitro] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target; // Lấy tên và giá trị từ đối tượng sự kiện
    setCurrentEmployee((prevEmployee) => ({
      ...prevEmployee,
      [name]: value, // Cập nhật giá trị tương ứng với tên trường
    }));
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/getEmployee")
      .then((result) => {
        if (result.data) {
          setEmployees(result.data);
        } else {
          alert(result.data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios.get("http://localhost:8080/getChiNhanhAll").then((response) => {
      setListChiNhanh(response.data);
    });
    axios.get("http://localhost:8080/getVaiTroAll").then((response) => {
      setListVaiTro(response.data);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !currentEmployee.ten ||
      !currentEmployee.email ||
      !currentEmployee.password ||
      !currentEmployee.phone ||
      !currentEmployee.id_vaitro ||
      !currentEmployee.idchinhanh
    ) {
      alert("Vui lòng điền đầy đủ thông tin");
      return;
    }
    console.log(currentEmployee);
    try {
      if (modalMode === "add") {
        // Gửi yêu cầu POST để thêm mới
        const response = await axios.post(
          "http://localhost:8080/addEmployee",
          currentEmployee
        );
        if (response.data === "Email hoặc phone đã tồn tại") {
          alert("Email hoặc số điện thoại đã tồn tại, vui lòng kiểm tra lại.");
        } else {
          alert("Thêm nhân viên thành công");
          console.log(response.data);
          setShowModal(false);
          resetForm();
          window.location.reload();
        }
      } else {
        // Gửi yêu cầu PUT để cập nhật
        const response = await axios.put(
          `http://localhost:8080/editEmployee/${currentEmployee.employee_id}`,
          {
            ten: currentEmployee.ten,
            email: currentEmployee.email,
            phone: currentEmployee.phone,
            id_vaitro: currentEmployee.id_vaitro,
            idchinhanh: currentEmployee.idchinhanh,
          }
        );

        if (response.data.Status) {
          alert("Cập nhật nhân viên thành công!");
          setShowModal(false);
          resetForm();
          window.location.reload();
        } else {
          alert(response.data.Error || "Có lỗi xảy ra khi cập nhật nhân viên");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Có lỗi xảy ra khi xử lý yêu cầu. Vui lòng thử lại.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xoá không?")) {
      try {
        // Chú ý: Trước đây bạn đang dùng employees.id thay vì id được truyền vào
        const response = await axios.delete(
          `http://localhost:8080/deleteEmployee/${id}`
        );

        if (response.data) {
          alert("Xoá  thành công!");
          // Cập nhật state để remove nhân viên đã xóa
          setEmployees(employees.filter((emp) => emp.id !== id));
          window.location.reload();
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status >= 500) {
            alert("Không thể xóa nhân viên này!");
          } else {
            alert(error.response.data.message || "Có lỗi xảy ra khi xóa ");
          }
        } else {
          alert("Không thể kết nối đến server");
        }
        console.error("Error deleting employee:", error);
      }
    }
  };

  const handleEdit = (employee) => {
    setCurrentEmployee(employee);
    setModalMode("edit");
    setShowModal(true);
  };

  const resetForm = () => {
    setCurrentEmployee({
      ten: "",
      email: "",
      password: "",
      phone: "",
      id_vaitro: "",
      idchinhanh: "",
    });
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="font-monospace fw-bolder">Employee Management</h2>
        <button
          className="btn btn-success"
          onClick={() => {
            setModalMode("add");
            resetForm();
            setShowModal(true);
          }}
        >
          Add Employee
        </button>
      </div>

      {/* Employee List */}
      <div className="table-responsive font-monospace ">
        <table className="table table-striped table-hover">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Chi Nhanh</th>
              <th>Vai Trò</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((e, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{e.ten}</td>
                <td>{e.email}</td>
                <td>{e.phone}</td>
                <td>{e.tenchinhanh}</td>
                <td>{e.tenVaiTro}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm me-2"
                    onClick={() => handleEdit(e)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => handleDelete(e.employee_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bootstrap Modal for Add/Edit Employee */}
      <div
        className={`modal fade ${showModal ? "show" : ""}`}
        style={{ display: showModal ? "block" : "none" }}
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered font-monospace fw-bolder">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title font-monospace fw-bolder">
                {modalMode === "add" ? "Add Employee" : "Edit Employee"}
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setShowModal(false)}
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={currentEmployee.ten}
                    onChange={(e) =>
                      setCurrentEmployee({
                        ...currentEmployee,
                        ten: e.target.value,
                      })
                    }
                    placeholder="Enter Name"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={currentEmployee.email}
                    onChange={(e) => {
                      const email = e.target.value;
                      const emailRegex =
                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

                      if (!emailRegex.test(email)) {
                        setEmailError("Email không hợp lệ");
                      } else {
                        setEmailError("");
                      }

                      setCurrentEmployee({
                        ...currentEmployee,
                        email: e.target.value,
                      });
                    }}
                    placeholder="Enter Email"
                  />
                  {emailError && (
                    <span style={{ color: "red" }}>{emailError}</span>
                  )}
                </div>

                {modalMode === "add" && (
                  <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      value={currentEmployee.password}
                      onChange={(e) => {
                        setCurrentEmployee({
                          ...currentEmployee,
                          password: e.target.value,
                        });
                      }}
                      placeholder="Enter Password"
                    />
                  </div>
                )}

                <div className="mb-3">
                  <label className="form-label">Số điện thoại </label>
                  <input
                    type="text"
                    className="form-control"
                    value={currentEmployee.phone}
                    maxLength={10}
                    onChange={(e) =>
                      setCurrentEmployee({
                        ...currentEmployee,
                        phone: e.target.value,
                      })
                    }
                    onInput={(e) => {
                      e.target.value = e.target.value.replace(/[^0-9]/g, "");
                      if (!e.target.value.startsWith("0")) {
                        e.target.value = "0" + e.target.value;
                      }
                      e.target.value = e.target.value.slice(0, 10);
                      if (e.target.value.length < 10) {
                        setPhoneError("Số điện thoại phải có đủ 10 chữ số.");
                      } else {
                        setPhoneError("");
                      }
                      setCurrentEmployee({
                        ...currentEmployee,
                        phone: e.target.value,
                      });
                    }}
                    placeholder="Enter Số điện thoại"
                  />
                  {phoneError && (
                    <span style={{ color: "red" }}>{phoneError}</span>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label">Chi Nhánh</label>
                  <select
                    className="form-select"
                    name="idchinhanh"
                    value={currentEmployee.idchinhanh}
                    onChange={(e) => {
                      handleInputChange(e);
                    }}
                    required
                  >
                    <option value="">Chọn chi nhánh</option>
                    {listChiNhanh.map((chinhanh) => (
                      <option key={chinhanh.id} value={chinhanh.id}>
                        {chinhanh.tenchinhanh}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Vai Trò</label>
                  <select
                    className="form-select"
                    name="id_vaitro"
                    value={currentEmployee.id_vaitro}
                    onChange={(e) => {
                      handleInputChange(e);
                    }}
                    required
                  >
                    <option value="">Chọn vai trò</option>
                    {listVaiTro.map((vaitro) => (
                      <option key={vaitro.id} value={vaitro.id}>
                        {vaitro.tenVaiTro}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="modal-footer px-0 pb-0">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    {modalMode === "add" ? "Add Employee" : "Update Employee"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        {showModal && <div className="modal fade show"></div>}
      </div>
    </div>
  );
};

export default Employee;
