import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

import "./index.css";





export default function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Login />} />     

      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

        <Route path="/dashboard" element={<Dashboard />}>



   
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.render(
<React.StrictMode>
  <App /> 
  </React.StrictMode>,  document.getElementById("root"));

