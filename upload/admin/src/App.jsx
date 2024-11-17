import React from "react";
import Navbar from "./Components/Navbar/Navbar";
import Sidebar from "./Components/Sidebar/Sidebar";
import { Routes, Route } from "react-router-dom";
import AddItem from "./pages/Add/AddItem";
import ListItems from "./pages/List/ListItems";
import Orders from "./pages/Orders/Orders";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const url = "http://localhost:5000";
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />
        <Routes>
          <Route path="/add" element={<AddItem url={url} />} />

          <Route path="/list" element={<ListItems url={url} />} />

          <Route path="/orders" element={<Orders url={url} />} />

          

        </Routes>
      </div>
    </div>
  );
};

export default App;
