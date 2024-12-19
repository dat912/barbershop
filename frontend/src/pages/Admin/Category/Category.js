import axios from "axios";
import React, { useEffect, useState } from "react";

const Category = () => {
  const [showModal, setShowModal] = useState(false);

  const [modalMode, setModalMode] = useState("add"); // 'add' or 'edit'
  const [currentCategory, setCurrentCategory] = useState({
    ten: "",
  });

  const [Category, setCategory] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/getCategoryAll")
      .then((result) => {
        if (result.data) {
          setCategory(result.data);
        } else {
          alert(result.data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(currentCategory);
    if (!currentCategory.ten) {
      alert("Vui lòng điền đầy đủ thông tin");
      return;
    }

    try {
      if (modalMode === "add") {
        const response = await axios.post(
          "http://localhost:8080/addCategory",
          currentCategory
        );
        if (response.data === "Tên category đã tồn tại") {
          alert("Tên category đã tồn tại.");
        } else {
          alert("Thêm category thành công");
          console.log(response.data);
          setShowModal(false);
          resetForm();
          window.location.reload();
        }
      } else {
        // Gửi yêu cầu PUT để cập nhật
        axios
          .put(
            `http://localhost:8080/editCategory/${currentCategory.id}`,
            currentCategory
          )
          .then((result) => {
            if (result.data === "Tên category đã tồn tại") {
              alert("Tên category đã tồn tại.");
            } else {
              alert("Cập nhật thành công!");

              setShowModal(false);
              resetForm();
              window.location.reload();
            }
          })
          .catch((err) => console.log(err));
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
          `http://localhost:8080/deleteCategory/${id}`
        );

        if (response.data) {
          alert("Xoá category thành công!");
          // Cập nhật state để remove nhân viên đã xóa
          setCategory(Category.filter((emp) => emp.id !== id));
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status >= 500) {
            alert("Lỗi hệ thống. Vui lòng thử lại sau!");
          } else {
            alert(error.response.data.message || "Có lỗi xảy ra khi xóa");
          }
        } else {
          alert("Không thể kết nối đến server");
        }
        console.error("Error deleting:", error);
      }
    }
  };

  const handleEdit = (Category) => {
    setCurrentCategory(Category);
    setModalMode("edit");
    setShowModal(true);
  };

  const resetForm = () => {
    setCurrentCategory({
      ten: "",
    });
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="font-monospace fw-bolder ">Quản lý Category</h2>
        <button
          className="btn btn-success"
          onClick={() => {
            setModalMode("add");
            resetForm();
            setShowModal(true);
          }}
        >
          Add Category
        </button>
      </div>

      <div className="table-responsive font-monospace ">
        <table className="table table-striped table-hover">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Tên Category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {Category.map((e, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{e.ten}</td>

                <td>
                  <button
                    className="btn btn-info btn-sm me-2"
                    onClick={() => handleEdit(e)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => handleDelete(e.id)}
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
                {modalMode === "add" ? "Add Category" : "Edit Category"}
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
                  <label className="form-label">Tên Category</label>
                  <input
                    type="text"
                    className="form-control"
                    value={currentCategory.ten}
                    onChange={(e) =>
                      setCurrentCategory({
                        ...currentCategory,
                        ten: e.target.value,
                      })
                    }
                    placeholder="Enter tên category"
                  />
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
                    {modalMode === "add" ? "Add Category" : "Update Category"}
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

export default Category;
