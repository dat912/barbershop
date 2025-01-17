import React, { useEffect, useState } from "react";
import axios from "axios";
import numeral from "numeral";
import DatePicker from "react-datepicker";
import { Modal, Button, DropdownButton, Dropdown } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BsCash,
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsFillBellFill,
} from "react-icons/bs";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import "./App.css";

function Home() {
  const [product, setProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [user, setUser] = useState([]);
  const [nhanvien, setNhanvien] = useState([]);
  const [tongTienDonHang, setTongTienDonHang] = useState([]);
  const [tongTienBooking, setTongTienBooking] = useState({});
  const [showModal, setShowModal] = useState(false); //modal datlich
  const [showModalDonHang, setShowModalDonHang] = useState(false); //modal donhang
  const [filterType, setFilterType] = useState(""); // "ngày", "tháng", hoặc "quý"
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedMonth, setSelectedMonth] = useState(1); // Mặc định là tháng 1
  const [selectedQuarter, setSelectedQuarter] = useState(1); // Mặc định là quý 1
  // chọn năm trong thống kê
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear); // Năm mặc định là năm hiện tại

  useEffect(() => {
    fetchTongTienBooking("ngày", new Date());
    fetchTongTienDonHang("ngày", new Date());
  }, []);

  const fetchTongTienBooking = (type, value, year) => {
    let url = `http://localhost:8080/tongTienDatLich?filter=${type}`;

    if (type === "ngày") {
      url += `&date=${value.toISOString().split("T")[0]}`;
    } else if (type === "tháng") {
      url += `&month=${value}&year=${year}`;
    } else if (type === "quý") {
      url += `&quarter=${value}&year=${year}`;
    }

    axios.get(url).then((response) => {
      setTongTienBooking(response.data[0] || { total: 0 });
    });
  };
  const fetchTongTienDonHang = (type, value, year) => {
    let url = `http://localhost:8080/tongTienDonHang?filter=${type}`;

    if (type === "ngày") {
      url += `&date=${value.toISOString().split("T")[0]}`;
    } else if (type === "tháng") {
      url += `&month=${value}&year=${year}`;
    } else if (type === "quý") {
      url += `&quarter=${value}&year=${year}`;
    }

    axios.get(url).then((response) => {
      setTongTienDonHang(response.data[0] || { total: 0 });
    });
  };

  const handleSelectFilter = () => {
    if (filterType === "ngày") {
      fetchTongTienBooking("ngày", selectedDate);
    } else if (filterType === "tháng") {
      fetchTongTienBooking("tháng", selectedMonth, selectedYear);
    } else if (filterType === "quý") {
      fetchTongTienBooking("quý", selectedQuarter, selectedYear);
    }
    setShowModal(false);
  };
  const handleSelectFilterDonHang = () => {
    if (filterType === "ngày") {
      fetchTongTienDonHang("ngày", selectedDate);
    } else if (filterType === "tháng") {
      fetchTongTienDonHang("tháng", selectedMonth, selectedYear);
    } else if (filterType === "quý") {
      fetchTongTienDonHang("quý", selectedQuarter, selectedYear);
    }
    setShowModalDonHang(false);
  };

  useEffect(() => {
    axios.get("http://localhost:8080/countProducts").then((response) => {
      setProduct(response.data[0]);
    });
    axios.get("http://localhost:8080/countCategorys").then((response) => {
      setCategory(response.data[0]);
    });
    axios.get("http://localhost:8080/countUsers").then((response) => {
      setUser(response.data[0]);
    });
    axios.get("http://localhost:8080/countNhanVien").then((response) => {
      setNhanvien(response.data[0]);
    });
    axios.get("http://localhost:8080/tongTienDatLich").then((response) => {
      setTongTienBooking(response.data[0]);
    });

    axios.get("http://localhost:8080/tongTienDonHang").then((response) => {
      setTongTienDonHang(response.data[0]);
    });
  }, []);

  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  return (
    <main className="main-container font-monospace fw-bolder">
      <div className="main-cards">
        <div className="card">
          <div className="card-inner">
            <h3>PRODUCTS</h3>
            <BsFillArchiveFill className="card_icon" />
          </div>
          <h3>{product.soluong} Sản phẩm</h3>
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>CATEGORIES</h3>
            <BsFillGrid3X3GapFill className="card_icon" />
          </div>
          <h3>{category.soluong} Loại sản phẩm</h3>
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>KHÁCH HÀNG</h3>
            <BsPeopleFill className="card_icon" />
          </div>
          <h3>{user.soluong} Khách hàng</h3>
        </div>

        <div className="card">
          <div className="card-inner">
            <h3>NHÂN VIÊN</h3>
            <BsPeopleFill className="card_icon" />
          </div>
          <h3>{nhanvien.soluong} Nhân viên</h3>
        </div>

        <div className="card">
          <div className="card-inner">
            <h3>TOTAL Đặt lịch</h3>
            <BsCash
              className="card_icon"
              onClick={() => setShowModal(true)} // Mở modal khi nhấn icon
              style={{ cursor: "pointer" }}
            />
          </div>
          <h3>
            {numeral(tongTienBooking.total).format("0,0").replace(/,/g, ".")}{" "}
            VNĐ
          </h3>
        </div>

        <div className="card">
          <div className="card-inner">
            <h3>TOTAL Đơn hàng</h3>
            <BsCash
              className="card_icon"
              onClick={() => setShowModalDonHang(true)} // Mở modal khi nhấn icon
              style={{ cursor: "pointer" }}
            />
          </div>
          <h3>
            {numeral(tongTienDonHang.total).format("0,0").replace(/,/g, ".")}{" "}
            VNĐ
          </h3>
        </div>
      </div>
      {/* Modal TOTAL Đặt lịch */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton className="font-monospace fw-bolder">
          <Modal.Title>Chọn lọc cho tổng tiền Đặt lịch</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DropdownButton title="Chọn loại lọc" className="mb-3">
            <Dropdown.Item onClick={() => setFilterType("ngày")}>
              Theo Ngày
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setFilterType("tháng")}>
              Theo Tháng
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setFilterType("quý")}>
              Theo Quý
            </Dropdown.Item>
          </DropdownButton>

          {filterType === "ngày" && (
            <div>
              <h5>Chọn ngày:</h5>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                dateFormat="yyyy-MM-dd"
              />
            </div>
          )}

          {filterType === "tháng" && (
            <div>
              <h5>Chọn tháng:</h5>
              <DropdownButton title={`Tháng ${selectedMonth}`} className="mb-3">
                {[...Array(12).keys()].map((month) => (
                  <Dropdown.Item
                    key={month}
                    onClick={() => setSelectedMonth(month + 1)}
                  >
                    Tháng {month + 1}
                  </Dropdown.Item>
                ))}
              </DropdownButton>

              <h5>Chọn năm:</h5>
              <DropdownButton title={`Năm ${selectedYear}`} className="mb-3">
                {[...Array(10).keys()].map((year) => (
                  <Dropdown.Item
                    key={year}
                    onClick={() => setSelectedYear(currentYear - year)}
                  >
                    Năm {currentYear - year}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
            </div>
          )}

          {filterType === "quý" && (
            <div>
              <h5>Chọn quý:</h5>
              <DropdownButton title={`Quý ${selectedQuarter}`} className="mb-3">
                {[1, 2, 3, 4].map((quarter) => (
                  <Dropdown.Item
                    key={quarter}
                    onClick={() => setSelectedQuarter(quarter)}
                  >
                    Quý {quarter}
                  </Dropdown.Item>
                ))}
              </DropdownButton>

              <h5>Chọn năm:</h5>
              <DropdownButton title={`Năm ${selectedYear}`} className="mb-3">
                {[...Array(10).keys()].map((year) => (
                  <Dropdown.Item
                    key={year}
                    onClick={() => setSelectedYear(currentYear - year)}
                  >
                    Năm {currentYear - year}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSelectFilter}>
            Áp dụng
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Modal TOTAL Đơn hàng */}
      <Modal
        show={showModalDonHang}
        onHide={() => setShowModalDonHang(false)}
        centered
      >
        <Modal.Header closeButton className="font-monospace fw-bolder">
          <Modal.Title>Chọn lọc cho tổng tiền Đơn hàng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DropdownButton title="Chọn loại lọc" className="mb-3">
            <Dropdown.Item onClick={() => setFilterType("ngày")}>
              Theo Ngày
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setFilterType("tháng")}>
              Theo Tháng
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setFilterType("quý")}>
              Theo Quý
            </Dropdown.Item>
          </DropdownButton>

          {filterType === "ngày" && (
            <div>
              <h5>Chọn ngày:</h5>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                dateFormat="yyyy-MM-dd"
              />
            </div>
          )}

          {filterType === "tháng" && (
            <div>
              <h5>Chọn tháng:</h5>
              <DropdownButton title={`Tháng ${selectedMonth}`} className="mb-3">
                {[...Array(12).keys()].map((month) => (
                  <Dropdown.Item
                    key={month}
                    onClick={() => setSelectedMonth(month + 1)}
                  >
                    Tháng {month + 1}
                  </Dropdown.Item>
                ))}
              </DropdownButton>

              <h5>Chọn năm:</h5>
              <DropdownButton title={`Năm ${selectedYear}`} className="mb-3">
                {[...Array(10).keys()].map((year) => (
                  <Dropdown.Item
                    key={year}
                    onClick={() => setSelectedYear(currentYear - year)}
                  >
                    Năm {currentYear - year}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
            </div>
          )}

          {filterType === "quý" && (
            <div>
              <h5>Chọn quý:</h5>
              <DropdownButton title={`Quý ${selectedQuarter}`} className="mb-3">
                {[1, 2, 3, 4].map((quarter) => (
                  <Dropdown.Item
                    key={quarter}
                    onClick={() => setSelectedQuarter(quarter)}
                  >
                    Quý {quarter}
                  </Dropdown.Item>
                ))}
              </DropdownButton>

              <h5>Chọn năm:</h5>
              <DropdownButton title={`Năm ${selectedYear}`} className="mb-3">
                {[...Array(10).keys()].map((year) => (
                  <Dropdown.Item
                    key={year}
                    onClick={() => setSelectedYear(currentYear - year)}
                  >
                    Năm {currentYear - year}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSelectFilterDonHang}>
            Áp dụng
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="charts">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="pv" fill="#8884d8" />
            <Bar dataKey="uv" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="pv"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </main>
  );
}

export default Home;
