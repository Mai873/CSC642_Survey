import logo from "./logo.svg";
import React, { useState } from "react";
import { DataSurveyForm } from "./Components/DataSurveyForm";
import "./App.css";
import { ViewData } from "./Components/ViewData";

const getDatafromLS = () => {
  const doc = localStorage.getItem("data");
  if (doc) {
    return JSON.parse(doc);
  } else {
    return [];
  }
};
function App() {
  const [data, setData] = useState(getDatafromLS());
  return (
    <div className='w-100'>
      <DataSurveyForm />
    </div>
  );
}

export default App;
