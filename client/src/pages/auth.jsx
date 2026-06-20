import React, { useState } from "react";
import { loginAction, registerAction } from "../redux/actions/auth.js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [signUp, setSignUp] = useState(true);
  const [authData, setAuthData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChanceFunc = (e) => {
    setAuthData({ ...authData, [e.target.name]: e.target.value });
  };

  const authFunc = (e) => {
    e.preventDefault();
    if (signUp) {
      dispatch(registerAction(authData, navigate));
    } else {
      dispatch(loginAction(authData, navigate));
    }
  };

  console.log("authData", authData);

  return (
    <div className="w-full h-screen bg-gray-100 flex items-center justify-center fixed top-0 right-0 bottom-0 left-0 z-50">
      <div className="w-1/3 bg-white p-3">
        <h1 className="text-2xl font-semibold text-indigo-600 mb-4 text-center ">
          {signUp ? "Register" : "Login"}
        </h1>
        <div className="flex flex-col space-y-3 my-5">
          {signUp && (
            <input
              value={authData.username}
              name="username"
              onChange={onChanceFunc}
              type="text"
              placeholder="Username"
              className="input-style"
            />
          )}
          <input
            value={authData.email}
            name="email"
            onChange={onChanceFunc}
            type="email"
            placeholder="Email"
            className="input-style"
          />
          <input
            value={authData.password}
            name="password"
            onChange={onChanceFunc}
            type="password"
            placeholder="Password"
            className="input-style"
          />

          <div className="text-sm text-gray-600 text-center cursor-pointer mb-4">
            {signUp ? (
              <span
                onClick={() => {
                  setSignUp(false);
                }}
              >
                Daha önce giriş yaptınız mı?
              </span>
            ) : (
              <span
                onClick={() => {
                  setSignUp(true);
                }}
              >
                Kayıt olmak için tıklayınız.
              </span>
            )}
          </div>
          <div
            onClick={authFunc}
            className="cursor-pointer hover:bg-indigo-900 w-full p-2 text-center bg-indigo-600 text-white rounded-md"
          >
            {signUp ? "Kayıt Ol" : "Giriş Yap"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
