import React, { useState, useEffect } from "react";
import { View, ViewData } from "./ViewData";
import Recaptcha from "react-google-recaptcha";
import GoogleMap from "./googleMap";
// import { Link } from "react-router-dom";
// import "";

const getDatafromLS = () => {
  const doc = localStorage.getItem("data");
  if (doc) {
    return JSON.parse(doc);
  } else {
    return [];
  }
};
export const DataSurveyForm = () => {
  const [fname, setFname] = useState("");
  const [lname, setlname] = useState("");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("None");
  const [inches, setInches] = useState("");
  const [feet, setFeet] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [services, setServices] = useState("");
  const [budget, setBudget] = useState("");
  const [data, setData] = useState(getDatafromLS());
  const [isVerified, setIsVerified] = useState(false);
  const [isbn, setIsbn] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleServices = (event) => {
    setServices(event.target.value);
  };

  const verifyCallback = (response) => {
    if (response) {
      setIsVerified(true);
    }
  };
  const recaptchaLoaded = () => {
    console.log("capcha successfully loaded");
  };
  const handleRadio = (event) => {
    setTitle(event.target.value);
  };

  const handleBudget = (event) => {
    setBudget(event.target.value);
  };

  // useEffect(() => {
  //   // storing input name
  //   // console.log(errors, "llllllll");
  //   if (Object.keys(errors).length === 0 && isSubmit) {
  //     // alert("You have successfully subscribed!");
  //     console.log(data, "hi data");
  //     // setIsSubmit(true);
  //   }
  // }, [errors]);

  const validate = (values) => {
    const error = {};
    var pattern = new RegExp(/^[0-9\b]+$/);
    const regex =
      /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if (!values.fname.length > 3 || !values.fname.length < 40) {
      error.fname =
        "First Name length must be greater than 3 and less than 40 characters";
    }
    if (!values.lname.length > 3 || !values.lname.length < 40) {
      error.lname =
        "Last Name length must be greater than 3 and less than 40 characters";
    }
    if (!regex.test(values.email)) {
      error.email = "Plz Enter Valid Email";
    }
    if (
      !pattern.test(values.contact) ||
      !pattern.test(values.contact).length < 11
    ) {
      error.contact =
        "Plz Enter Valid Contact only numbers or Length must be equal to 10 characters";
    }
    if (!values.address.length < 40) {
      error.address = "Address Must be less than or equal to 40 characters";
    }
    return error;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // const { name, value } = e.target;

    let val = {
      isbn,
      fname,
      lname,
      email,
      contact,
      inches,
      feet,
      address,
      title,
      services,
      budget,
    };

    setErrors(validate(val));

    setData([...data, val]);

    setIsSubmit(true);
    // setErrors({});

    // setFname("");
    // setlname("");
    // setEmail("");
    // setContact("");
    // setInches("");
    // setFeet("");
    // setAddress("");
    // setTitle("");
    // setServices("");
    // setBudget("");
    // setErrors({});
  };

  useEffect(() => {
    // storing input name
    // console.log(errors, "llllllll");
    // if (Object.getOwnPropertyNames(errors).length === 0 && isSubmit) {
    localStorage.setItem("data", JSON.stringify(data));
    setErrors({});
    // alert("You have successfully subscribed!");
    // console.log(data, "hi data");
    // setIsSubmit(true);
    // }
  }, [data]);

  function getStorageValue(key, defaultValue) {}

  return (
    <>
      <div className="container my-5" style={{ width: "100%" }}>
        <>
          <form
            className="mx-auto border"
            onSubmit={(event) => handleSubmit(event)}
            autoComplete="off"
            style={{
              width: "100%",
              maxWidth: "700px",
              boxShadow: " 2px 2px 20px rgba(0, 0, 0, 0.5)",
              background: "#fff",
              padding: "40px 25px",
              borderRadius: "25px",
            }}
          >
            <h1 className="text-center">Data Survey</h1>
            <div className="">
              <div className="mb-3">
                <label for="exampleFormControlInput1" className="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  value={fname}
                  onChange={(e) => setFname(e.target.value)}
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="First Name"
                  required
                />
                <p style={{ color: "red" }}>{errors.fname}</p>
              </div>
              <div className="mb-3">
                <label for="exampleFormControlInput1" className="form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={lname}
                  onChange={(e) => setlname(e.target.value)}
                  id="exampleFormControlInput1"
                  placeholder="Last Name"
                  required
                />
                <p style={{ color: "red" }}>{errors.lname}</p>
              </div>
            </div>
            <div className="">
              <div className="mb-3">
                <label for="exampleFormControlInput1" className="form-label">
                  Email
                </label>

                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="exampleFormControlInput1"
                  placeholder="somene@example.com"
                  required
                />
                <p style={{ color: "red" }}>{errors.email}</p>
              </div>
              <div className="mb-3">
                <label for="exampleFormControlInput1" className="form-label">
                  Phone No
                </label>
                <input
                  type="tel"
                  className="form-control"
                  id="exampleFormControlInput1"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  //   placeholder="123-45-678"
                  //   pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                  required
                />
                <p style={{ color: "red" }}>{errors.contact}</p>
              </div>
            </div>
            <label for="exampleFormControlInput1" className="form-label">
              Title
            </label>
            <div className="mb-3">
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="inlineRadio1"
                  value="None"
                  onChange={(event) => handleRadio(event)}
                />
                <label className="form-check-label" for="inlineRadio1">
                  none
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="inlineRadio2"
                  value="Student"
                  onChange={(event) => handleRadio(event)}
                />
                <label className="form-check-label" for="inlineRadio2">
                  Student
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="inlineRadio3"
                  value="Teacher"
                  onChange={(event) => handleRadio(event)}
                />
                <label className="form-check-label" for="inlineRadio3">
                  Teacher
                </label>
              </div>
            </div>
            <label for="exampleFormControlInput1" className="form-label">
              Your Height
            </label>
            <div className="d-flex">
              <div className="input-group mb-3 w-50">
                <span
                  className="input-group-text"
                  id="inputGroup-sizing-default"
                >
                  Inches
                </span>
                <input
                  type="text"
                  className="form-control"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-default"
                  value={inches}
                  onChange={(e) => setInches(e.target.value)}
                  // required
                />
              </div>
              <div className="input-group mb-3 w-50 mx-2">
                <span
                  className="input-group-text"
                  id="inputGroup-sizing-default"
                >
                  Feet
                </span>
                <input
                  type="text"
                  className="form-control w-50"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-default"
                  value={feet}
                  onChange={(e) => setFeet(e.target.value)}
                  // required
                />
              </div>
            </div>
            <div className="d-flex">
              <select
                className="form-select w-50"
                aria-label="Default select example"
                value={services}
                onChange={(event) => handleServices(event)}
                required
              >
                <option selected>Check all services you require </option>

                <option value="Email">Email</option>
                <option value="Phone">Phone</option>
                <option value="Facebook">Facebook</option>
                <option value="Twitter">Twitter</option>
                <option value="Surface Email">Surface Mail</option>
                <option value="Personal Visit">Personal Visit</option>
              </select>

              <select
                className="form-select w-50 mx-2"
                aria-label="Default select example"
                value={budget}
                onChange={(event) => handleBudget(event)}
                required
              >
                <option selected>Your monthly budget for services </option>

                <option value="Less than $ 50">Less than $ 50</option>
                <option value="Between $50 and $100">
                  Between $50 and $100
                </option>
                <option value="Above $100">Above $100</option>
              </select>
            </div>
            <div className="mb-3 my-2">
              <label for="exampleFormControlTextarea1" className="form-label">
                Address
              </label>
              <textarea
                className="form-control"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                id="exampleFormControlTextarea1"
                rows="3"
                required
              ></textarea>
              <p style={{ color: "red" }}>{errors.address}</p>
            </div>
            <div className="form-check my-2">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckChecked"
                autoComplete="off"
                required
              />
              <label className="form-check-label" for="flexCheckChecked">
                I Agree to terms
              </label>
            </div>
            {/* 
            
            6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI
             */}
            <div style={{ width: "100px", paddingRight: "" }}>
              <Recaptcha
                sitekey="6LcDz2QdAAAAAL19WPuy8oB1WJTejl0gnNEG4LuB"
                render="explicit"
                onloadCallback={recaptchaLoaded}
                verifyCallback={verifyCallback}
              />
            </div>
            <input type="submit" className="btn btn-primary my-2" />
            {/* <a className="btn btn-outline-primary mx-2">View Data</a> */}
            <button
              type="button"
              className="btn btn-outline-primary my-2 mx-2"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              style={{ position: "relative", top: "", left: "" }}
            >
              View Data
            </button>
          </form>
        </>
      </div>

      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" style={{ maxWidth: "600px" }}>
          <div className="modal-content" style={{ borderRadius: "25px" }}>
            {data.length > 0 && <ViewData data={data} />}
            {data.length < 1 && (
              <div className="p-5">No Data are added yet</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
