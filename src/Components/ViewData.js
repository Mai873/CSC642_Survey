import React, { useState, useEffect } from "react";
import googleMap from "./googleMap";
// import { Icon, trash } from "react";
// import "";
const getDatafromLS = () => {
  const doc = localStorage.getItem("data");
  if (doc) {
    return JSON.parse(doc);
  } else {
    return [];
  }
};

export const ViewData = () => {
  const [fname, setFname] = useState("");
  const [lname, setlname] = useState("");
  const [data, setData] = useState(getDatafromLS());

  //   const deleteData = (isbn) => {
  //     const filteredData = data.filter((element, index) => {
  //       return element.isbn !== isbn;
  //     });
  //     setData(filteredData);
  //   };
    useEffect(() => { getDatafromLS();
    }, []);
  const handleRemoveAll = (e) => {
    localStorage.removeItem("data");
  };
  return (
    <div className="" style={{}}>
      <form
        className="mx-auto border"
        style={{
          boxShadow: " 2px 2px 20px rgba(0, 0, 0, 0.5)",
          background: "#fff",
          padding: "40px 25px",
          maxWidth: "650px",
          width: "100%",
          borderRadius: "25px",
        }}
      >
        <div className="table-responsive">
          <h1 className="fw-bold text-center mb-5">Survey Data</h1>

          <div>
            {data.slice(0, 1).map((doc) => (
              <div
                className="mx-auto text-center"
                style={{ borderBottom: "1px solid black", width: "100%" }}
              >
                <ul
                  className="list-group list-group-flush"
                  style={{ textAlign: "justify" }}
                >
                  <li className="list-group-item">
                    <label className="fw-bold">First Name :</label>
                    <span className="mx-2">{doc.fname}</span>
                  </li>

                  <li className="list-group-item">
                    <label className="fw-bold">Last Name :</label>
                    <span className="mx-2">{doc.lname}</span>
                  </li>
                  <li className="list-group-item">
                    <label className="fw-bold">Last Name :</label>
                    <span className="mx-2">{doc.email}</span>
                  </li>
                  <li className="list-group-item">
                    <label className="fw-bold">Email :</label>
                    <span className="mx-2">{doc.contact}</span>
                  </li>
                  <li className="list-group-item">
                    <label className="fw-bold">Address :</label>
                    <span className="mx-2">{doc.address}</span>
                  </li>
                  <li className="list-group-item">
                    <label className="fw-bold">Height(inches) :</label>
                    <span className="mx-2">{doc.inches}</span>
                  </li>
                  <li className="list-group-item">
                    <label className="fw-bold">Height (feet) :</label>
                    <span className="mx-2">{doc.feet}</span>
                  </li>
                  <li className="list-group-item">
                    <label className="fw-bold">Title :</label>
                    <span className="mx-2">{doc.title}</span>
                  </li>
                  <li className="list-group-item">
                    <label className="fw-bold">Service :</label>
                    <span className="mx-2">{doc.services}</span>
                  </li>
                  <li className="list-group-item">
                    <label className="fw-bold">Budget :</label>
                    <span className="mx-2">{doc.budget}</span>
                  </li>
                </ul>
                
                
                {/* <td>
                          <button
                            onClick={() => deleteData(data.isbn)}
                            className="btn btn-danger"
                          >
                            Delete
                          </button>
                         
                        </td> */}
              </div>
            ))}
          </div>
        </div>
      
    
        <button
          className="btn btn-danger btn-md my-3"
          onClick={(event) => handleRemoveAll(event)}
        >
          Remove All
        </button>
      </form>
    </div>
  );
};
