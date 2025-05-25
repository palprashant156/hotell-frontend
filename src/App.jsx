import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import "./App.css";

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
    <div className="bill-bg">
      <div className="bill-container">
        <h1
          className="hotel-title animate-title"
          style={{ color: "#f55", marginBottom: 0 }}
        >
          HOTEL24X7
        </h1>
        <h2
          className="bill-room-type"
          style={{
            color: "#2e1ef7",
            margin: "1.2rem 0 0.5rem 0",
            fontSize: "2.5rem",
            fontWeight: 700,
          }}
        >
          Room Type
        </h2>
        <div
          className="bill-room-options"
          style={{
            display: "flex",
            gap: "2.5rem",
            justifyContent: "center",
            marginBottom: "2rem",
          }}
        >
          <label
            style={{
              fontFamily: "Luckiest Guy",
              fontSize: "1.5rem",
              color: "#111",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
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
              fontSize: "1.5rem",
              color: "#111",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
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
              fontSize: "1.5rem",
              color: "#111",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
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
            fontSize: "3rem",
            fontWeight: 400,
            margin: "1.5rem 0 1rem 0",
            color: "#111",
          }}
        >
          Food Type
        </h2>
        <div
          className="bill-food-options"
          style={{
            display: "flex",
            gap: "3rem",
            justifyContent: "center",
            marginBottom: "2rem",
          }}
        >
          <label
            style={{
              color: "#8e24aa",
              fontFamily: "Montserrat",
              fontWeight: 700,
              fontSize: "2rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
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
              fontSize: "2rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
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
              fontSize: "2rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
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
        <div className="bill-form">
          <div className="bill-form-row">
            <label>NO OF DAYS</label>
            <input
              type="number"
              min="1"
              className="bill-input"
              value={noOfDays}
              onChange={(e) => setNoOfDays(e.target.value)}
            />
            <button
              className="bill-calc-btn"
              type="button"
              onClick={handleCalculate}
            >
              CALCULATE
            </button>
          </div>
          <div className="bill-form-row">
            <label>NO OF PERSON</label>
            <input
              type="number"
              min="1"
              className="bill-input"
              value={noOfPerson}
              onChange={(e) => setNoOfPerson(e.target.value)}
            />
            <button
              className="bill-next-btn"
              type="button"
              onClick={handleNext}
            >
              NEXT
            </button>
          </div>
          <div className="bill-form-row">
            <label>NET PAY</label>
            <input type="text" className="bill-input" value={netPay} readOnly />
            <button
              className="bill-clear-btn"
              type="button"
              onClick={handleClear}
            >
              CLEAR
            </button>
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
    fetch("http://localhost:5001/api/customers")
      .then((res) => res.json())
      .then((data) => setCustomers(data))
      .catch((err) => console.error("Error fetching customers:", err));
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const deleteCustomer = async (customerId) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      try {
        const response = await fetch(
          `http://localhost:5001/api/delete-customer/${customerId}`,
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
      const res = await fetch("http://localhost:5001/api/save-customer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        navigate("/customer-list");
      } else {
        alert("Failed to save customer");
      }
    } catch (err) {
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
