import { Routes, Route, Navigate, Link } from "react-router-dom";
import Home from "./pages/home";
import Auth from "./pages/auth";
import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import useToken from "./hooks/useToken";
import Navbar from "./components/navbar";
import Modal from "./components/modal";

function App() {
  //   const [token] = useToken();

  //   console.log(token?.token, "token");
  //   return (
  //     <>
  //       {token?.token && <Navbar />}
  //       <Modal />
  //       <Routes>
  //         <Route
  //           path="/"
  //           element={!token?.token ? <Link to={"/auth"} /> : <Home />}
  //         />
  //         <Route path="/auth" element={<Auth />} />

  //         {/* <Route path="/register" element={<h1>Register</h1>} /> */}
  //       </Routes>
  //       <ToastContainer />
  //     </>
  //   );
  // }

  const authUser = JSON.parse(localStorage.getItem("auth"));

  const tokenString = authUser?.token;

  console.log("App.jsx içindeki token:", tokenString);

  return (
    <>
      {tokenString && <Navbar />}

      <Modal />

      <Routes>
        <Route
          path="/"
          element={tokenString ? <Home /> : <Navigate to="/auth" replace />}
        />

        <Route path="/auth" element={<Auth />} />
      </Routes>

      <ToastContainer />
    </>
  );
}
export default App;
