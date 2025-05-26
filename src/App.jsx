import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import "./App.css";

const API_URL = "https://hotell-backend.onrender.com";

function LoginPage() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      navigate("/bill");
    }, 1200); // fake animation
  };

  return (
    <div className="login-bg">
      <form className="login-container" onSubmit={handleLogin}>
        <h1 className="hotel-title animate-title">HOTEL 24X7</h1>
        <label className="login-label animate-label" htmlFor="userId">
          USER ID
        </label>
        <input
          className="login-input animate-input"
          id="userId"
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          autoComplete="username"
          required
        />
        <label className="login-label animate-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          className="login-input animate-input"
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
        />
        <button
          className={`login-btn animate-btn${
            isSubmitting ? " submitting" : ""
          }`}
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Logging in..." : "login"}
        </button>
      </form>
    </div>
  );
}

function BillPage() {
  // Room and food prices (example values)
  const ROOM_PRICES = { single: 1000, double: 1800, delux: 2500 };
  const FOOD_PRICES = { breakfast: 200, lunch: 400, dinner: 500 };

  const [roomType, setRoomType] = useState("single");
  const [foodType, setFoodType] = useState({
    breakfast: false,
    lunch: false,
    dinner: false,
  });
  const [noOfDays, setNoOfDays] = useState("");
  const [noOfPerson, setNoOfPerson] = useState("");
  const [netPay, setNetPay] = useState("");
  const navigate = useNavigate();

  const handleRoomTypeChange = (e) => {
    setRoomType(e.target.value);
  };

  const handleFoodTypeChange = (e) => {
    setFoodType({ ...foodType, [e.target.name]: e.target.checked });
  };

  const handleClear = () => {
    setRoomType("single");
    setFoodType({ breakfast: false, lunch: false, dinner: false });
    setNoOfDays("");
    setNoOfPerson("");
    setNetPay("");
  };

  const handleCalculate = () => {
    const days = parseInt(noOfDays, 10) || 0;
    const persons = parseInt(noOfPerson, 10) || 0;
    const roomCost = ROOM_PRICES[roomType] * days;
    const foodCost = Object.entries(foodType)
      .filter(([_, checked]) => checked)
      .reduce((sum, [type]) => sum + FOOD_PRICES[type] * days * persons, 0);
    setNetPay(roomCost + foodCost);
  };

  const handleNext = () => {
    navigate("/customer");
  };

  return (
    <div
      className="bill-bg"
      style={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "1rem",
      }}
    >
      <div
        className="bill-container"
        style={{
          width: "100%",
          maxWidth: "800px",
          padding: "1rem",
          background: "transparent",
        }}
      >
        <h1
          className="hotel-title animate-title"
          style={{
            color: "#f55",
            marginBottom: 0,
            fontSize: "clamp(2rem, 5vw, 3rem)",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
          }}
        >
          HOTEL24X7
        </h1>
        <h2
          className="bill-room-type"
          style={{
            color: "#2e1ef7",
            margin: "1.2rem 0 0.5rem 0",
            fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
            fontWeight: 700,
            textShadow: "1px 1px 3px rgba(0, 0, 0, 0.2)",
          }}
        >
          Room Type
        </h2>
        <div
          className="bill-room-options"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
            justifyContent: "center",
            marginBottom: "2rem",
          }}
        >
          <label
            style={{
              fontFamily: "Luckiest Guy",
              fontSize: "clamp(1rem, 3vw, 1.5rem)",
              color: "#111",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.5rem",
            }}
          >
            <input
              type="radio"
              name="roomType"
              value="single"
              checked={roomType === "single"}
              onChange={handleRoomTypeChange}
            />{" "}
            SINGLE
          </label>
          <label
            style={{
              fontFamily: "Luckiest Guy",
              fontSize: "clamp(1rem, 3vw, 1.5rem)",
              color: "#111",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.5rem",
            }}
          >
            <input
              type="radio"
              name="roomType"
              value="double"
              checked={roomType === "double"}
              onChange={handleRoomTypeChange}
            />{" "}
            DOUBLE
          </label>
          <label
            style={{
              fontFamily: "Luckiest Guy",
              fontSize: "clamp(1rem, 3vw, 1.5rem)",
              color: "#111",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.5rem",
            }}
          >
            <input
              type="radio"
              name="roomType"
              value="delux"
              checked={roomType === "delux"}
              onChange={handleRoomTypeChange}
            />{" "}
            DELUX
          </label>
        </div>
        <h2
          style={{
            fontSize: "clamp(1.5rem, 4vw, 3rem)",
            fontWeight: 400,
            margin: "1.5rem 0 1rem 0",
            color: "#111",
            textShadow: "1px 1px 3px rgba(0, 0, 0, 0.2)",
          }}
        >
          Food Type
        </h2>
        <div
          className="bill-food-options"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
            justifyContent: "center",
            marginBottom: "2rem",
          }}
        >
          <label
            style={{
              color: "#8e24aa",
              fontFamily: "Montserrat",
              fontWeight: 700,
              fontSize: "clamp(1rem, 3vw, 2rem)",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.5rem",
            }}
          >
            <input
              type="checkbox"
              name="breakfast"
              checked={foodType.breakfast}
              onChange={handleFoodTypeChange}
            />{" "}
            BREAKFAST
          </label>
          <label
            style={{
              color: "#8e24aa",
              fontFamily: "Montserrat",
              fontWeight: 700,
              fontSize: "clamp(1rem, 3vw, 2rem)",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.5rem",
            }}
          >
            <input
              type="checkbox"
              name="lunch"
              checked={foodType.lunch}
              onChange={handleFoodTypeChange}
            />{" "}
            LUNCH
          </label>
          <label
            style={{
              color: "#8e24aa",
              fontFamily: "Montserrat",
              fontWeight: 700,
              fontSize: "clamp(1rem, 3vw, 2rem)",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.5rem",
            }}
          >
            <input
              type="checkbox"
              name="dinner"
              checked={foodType.dinner}
              onChange={handleFoodTypeChange}
            />{" "}
            DINNER
          </label>
        </div>
        <div
          className="bill-form"
          style={{
            width: "100%",
            maxWidth: "600px",
            margin: "0 auto",
            padding: "0.5rem",
          }}
        >
          <div
            className="bill-form-row"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
              marginBottom: "1rem",
            }}
          >
            <label
              style={{
                fontSize: "clamp(1rem, 3vw, 1.2rem)",
                textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)",
              }}
            >
              NO OF DAYS
            </label>
            <div
              style={{
                display: "flex",
                gap: "0.5rem",
                flexWrap: "wrap",
                width: "100%",
              }}
            >
              <input
                type="number"
                min="1"
                className="bill-input"
                value={noOfDays}
                onChange={(e) => setNoOfDays(e.target.value)}
                style={{
                  flex: "1",
                  minWidth: "150px",
                  padding: "0.5rem",
                  borderRadius: "4px",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  background: "rgba(255, 255, 255, 0.2)",
                  backdropFilter: "blur(5px)",
                  color: "#000",
                }}
              />
              <button
                className="bill-calc-btn"
                type="button"
                onClick={handleCalculate}
                style={{
                  padding: "0.5rem 1rem",
                  fontSize: "clamp(0.9rem, 2.5vw, 1rem)",
                  whiteSpace: "nowrap",
                  minWidth: "120px",
                  background: "rgba(46, 30, 247, 0.8)",
                  border: "none",
                  borderRadius: "4px",
                  color: "white",
                  cursor: "pointer",
                  backdropFilter: "blur(5px)",
                }}
              >
                CALCULATE
              </button>
            </div>
          </div>
          <div
            className="bill-form-row"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
              marginBottom: "1rem",
            }}
          >
            <label
              style={{
                fontSize: "clamp(1rem, 3vw, 1.2rem)",
                textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)",
              }}
            >
              NO OF PERSON
            </label>
            <div
              style={{
                display: "flex",
                gap: "0.5rem",
                flexWrap: "wrap",
                width: "100%",
              }}
            >
              <input
                type="number"
                min="1"
                className="bill-input"
                value={noOfPerson}
                onChange={(e) => setNoOfPerson(e.target.value)}
                style={{
                  flex: "1",
                  minWidth: "150px",
                  padding: "0.5rem",
                  borderRadius: "4px",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  background: "rgba(255, 255, 255, 0.2)",
                  backdropFilter: "blur(5px)",
                  color: "#000",
                }}
              />
              <button
                className="bill-next-btn"
                type="button"
                onClick={handleNext}
                style={{
                  padding: "0.5rem 1rem",
                  fontSize: "clamp(0.9rem, 2.5vw, 1rem)",
                  whiteSpace: "nowrap",
                  minWidth: "120px",
                  background: "rgba(46, 30, 247, 0.8)",
                  border: "none",
                  borderRadius: "4px",
                  color: "white",
                  cursor: "pointer",
                  backdropFilter: "blur(5px)",
                }}
              >
                NEXT
              </button>
            </div>
          </div>
          <div
            className="bill-form-row"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
              marginBottom: "1rem",
            }}
          >
            <label
              style={{
                fontSize: "clamp(1rem, 3vw, 1.2rem)",
                textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)",
              }}
            >
              NET PAY
            </label>
            <div
              style={{
                display: "flex",
                gap: "0.5rem",
                flexWrap: "wrap",
                width: "100%",
              }}
            >
              <input
                type="text"
                className="bill-input"
                value={netPay}
                readOnly
                style={{
                  flex: "1",
                  minWidth: "150px",
                  padding: "0.5rem",
                  borderRadius: "4px",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  background: "rgba(255, 255, 255, 0.2)",
                  backdropFilter: "blur(5px)",
                  color: "#000",
                }}
              />
              <button
                className="bill-clear-btn"
                type="button"
                onClick={handleClear}
                style={{
                  padding: "0.5rem 1rem",
                  fontSize: "clamp(0.9rem, 2.5vw, 1rem)",
                  whiteSpace: "nowrap",
                  minWidth: "120px",
                  background: "rgba(46, 30, 247, 0.8)",
                  border: "none",
                  borderRadius: "4px",
                  color: "white",
                  cursor: "pointer",
                  backdropFilter: "blur(5px)",
                }}
              >
                CLEAR
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CustomerListPage() {
  const [customers, setCustomers] = useState([]);
  const navigate = useNavigate();

  const fetchCustomers = () => {
    fetch(`${API_URL}/api/customers`)
      .then((res) => res.json())
      .then((data) => setCustomers(data.data))
      .catch((err) => console.error("Error fetching customers:", err));
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const deleteCustomer = async (customerId) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      try {
        const response = await fetch(
          `${API_URL}/api/delete-customer/${customerId}`,
          {
            method: "DELETE",
          }
        );
        const data = await response.json();

        if (response.ok) {
          alert("Customer deleted successfully");
          fetchCustomers(); // Refresh the list
        } else {
          alert(data.error || "Failed to delete customer");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Error deleting customer");
      }
    }
  };

  return (
    <div className="customer-bg">
      <div
        className="customer-container"
        style={{ maxWidth: "900px", width: "100%" }}
      >
        <h1 className="hotel-title animate-title customer-title">HOTEL 24x7</h1>
        <h2 className="customer-subtitle">Customer Records</h2>
        <table
          style={{
            width: "100%",
            background: "rgba(255,255,255,0.85)",
            borderRadius: "10px",
            overflow: "auto",
          }}
        >
          <thead>
            <tr>
              <th>No of customer</th>
              <th>Customer Id</th>
              <th>Name</th>
              <th>Aadhar no</th>
              <th>Pan no</th>
              <th>Add person</th>
              <th>Phone no</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c, i) => (
              <tr key={i}>
                <td>{c.No_of_customer}</td>
                <td>{c.Customer_Id}</td>
                <td>{c.Name}</td>
                <td>{c.Aadhar_no}</td>
                <td>{c.Pan_no}</td>
                <td>{c.Add_person}</td>
                <td>{c.Phone_no}</td>
                <td>
                  <button
                    onClick={() => deleteCustomer(c._id)}
                    style={{
                      padding: "5px 10px",
                      backgroundColor: "#f44336",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CustomerDetailsPage() {
  const [form, setForm] = useState({
    noOfCustomer: "",
    customerId: "",
    name: "",
    aadhar: "",
    pan: "",
    addPerson: "",
    phone: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleReset = () => {
    setForm({
      noOfCustomer: "",
      customerId: "",
      name: "",
      aadhar: "",
      pan: "",
      addPerson: "",
      phone: "",
    });
  };

  const navigate = useNavigate();

  const handleSave = async () => {
    const payload = {
      No_of_customer: form.noOfCustomer,
      Customer_Id: form.customerId,
      Name: form.name,
      Aadhar_no: form.aadhar,
      Pan_no: form.pan,
      Add_person: form.addPerson,
      Phone_no: form.phone,
    };
    try {
      const res = await fetch(`${API_URL}/api/save-customer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok) {
        alert("Customer saved successfully");
        navigate("/customer-list");
      } else {
        alert(data.error || "Failed to save customer");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Error connecting to backend");
    }
  };

  return (
    <div className="customer-bg">
      <div className="customer-container">
        <h1
          className="hotel-title animate-title"
          style={{ color: "#f55", marginBottom: 0 }}
        >
          HOTEL 24x7
        </h1>
        <h2
          style={{
            color: "#2e1ef7",
            fontSize: "3rem",
            margin: "1rem 0 2rem 0",
            fontWeight: 700,
          }}
        >
          Customer details
        </h2>
        <form className="customer-form">
          <div className="customer-form-row">
            <label>No of customer</label>
            <input
              type="text"
              name="noOfCustomer"
              value={form.noOfCustomer}
              onChange={handleChange}
            />
          </div>
          <div className="customer-form-row">
            <label>Customer Id</label>
            <input
              type="text"
              name="customerId"
              value={form.customerId}
              onChange={handleChange}
            />
          </div>
          <div className="customer-form-row">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
            />
          </div>
          <div className="customer-form-row">
            <label>Aadhar no</label>
            <input
              type="text"
              name="aadhar"
              value={form.aadhar}
              onChange={handleChange}
            />
          </div>
          <div className="customer-form-row">
            <label>Pan no</label>
            <input
              type="text"
              name="pan"
              value={form.pan}
              onChange={handleChange}
            />
          </div>
          <div className="customer-form-row">
            <label>Add person</label>
            <input
              type="text"
              name="addPerson"
              value={form.addPerson}
              onChange={handleChange}
            />
          </div>
          <div className="customer-form-row">
            <label>Phone no</label>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
            />
          </div>
          <div className="customer-form-buttons">
            <button
              type="button"
              className="customer-btn save"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              type="button"
              className="customer-btn reset"
              onClick={handleReset}
            >
              Reset
            </button>
            <button
              type="button"
              className="customer-btn check"
              onClick={() => navigate("/customer-list")}
            >
              Check Record
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/bill" element={<BillPage />} />
        <Route path="/customer" element={<CustomerDetailsPage />} />
        <Route path="/customer-list" element={<CustomerListPage />} />
      </Routes>
    </Router>
  );
}

export default App;
