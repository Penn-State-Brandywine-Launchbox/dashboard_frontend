import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./index.css";





export default function App() {
  return (
    <BrowserRouter>
      <Routes>

      <Route path="/register" element={<Register />} />

        <Route path="/" element={<Layout />}>
          <Route index element={<Login />} />     


   
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.render(
<React.StrictMode>
  <App /> 
  </React.StrictMode>,  document.getElementById("root"));

