import React, { useState, useEffect } from "react";

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5001/api/customers")
      .then((res) => res.json())
      .then((data) => setCustomers(data));
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #dbe6e4cc 0%, #b3c0d1cc 100%)",
        padding: "2rem",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          width: "100%",
          padding: "2rem",
          background: "rgba(255, 255, 255, 0.95)",
          borderRadius: "20px",
          boxShadow: "0 8px 32px rgba(31, 38, 135, 0.15)",
        }}
      >
        <h1
          style={{
            color: "#2e1ef7",
            fontSize: "3rem",
            marginBottom: "1rem",
            textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
            fontFamily: "'Luckiest Guy', cursive",
          }}
        >
          HOTEL 24x7
        </h1>
        <h2
          style={{
            color: "#f55",
            fontSize: "2rem",
            marginBottom: "2rem",
            fontWeight: "600",
          }}
        >
          Customer Records
        </h2>
        <table
          style={{
            width: "100%",
            background: "white",
            borderRadius: "10px",
            overflow: "hidden",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr
              style={{
                background: "linear-gradient(135deg, #2e1ef7 0%, #f55 100%)",
                color: "white",
              }}
            >
              <th style={{ padding: "1rem", textAlign: "left" }}>
                No of customer
              </th>
              <th style={{ padding: "1rem", textAlign: "left" }}>
                Customer Id
              </th>
              <th style={{ padding: "1rem", textAlign: "left" }}>Name</th>
              <th style={{ padding: "1rem", textAlign: "left" }}>Aadhar no</th>
              <th style={{ padding: "1rem", textAlign: "left" }}>Pan no</th>
              <th style={{ padding: "1rem", textAlign: "left" }}>Add person</th>
              <th style={{ padding: "1rem", textAlign: "left" }}>Phone no</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c, i) => (
              <tr
                key={i}
                style={{
                  background: i % 2 === 0 ? "#f8f9fa" : "white",
                  transition: "background-color 0.3s ease",
                }}
              >
                <td style={{ padding: "1rem", borderBottom: "1px solid #eee" }}>
                  {c.No_of_customer}
                </td>
                <td style={{ padding: "1rem", borderBottom: "1px solid #eee" }}>
                  {c.Customer_Id}
                </td>
                <td style={{ padding: "1rem", borderBottom: "1px solid #eee" }}>
                  {c.Name}
                </td>
                <td style={{ padding: "1rem", borderBottom: "1px solid #eee" }}>
                  {c.Aadhar_no}
                </td>
                <td style={{ padding: "1rem", borderBottom: "1px solid #eee" }}>
                  {c.Pan_no}
                </td>
                <td style={{ padding: "1rem", borderBottom: "1px solid #eee" }}>
                  {c.Add_person}
                </td>
                <td style={{ padding: "1rem", borderBottom: "1px solid #eee" }}>
                  {c.Phone_no}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerList;
