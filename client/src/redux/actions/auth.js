import axios from "axios";
import { toast } from "react-toastify";

export const registerAction = (authData, navigate) => async (dispatch) => {
  try {
    const { data } = await axios.post("/api/auth/register", authData);

    dispatch({
      type: "REGISTER",
      payload: data,
    });

    if (data?.token) {
      localStorage.setItem("auth", JSON.stringify(data));
    }

    navigate("/");
    window.location.reload();
  } catch (error) {
    toast(error?.response?.data?.msg || "Bir hata oluştu", {
      position: "top-right",
      autoClose: 5000,
    });
  }
};

export const loginAction = (authData, navigate) => async (dispatch) => {
  try {
    const { data } = await axios.post("/api/auth/login", authData);

    dispatch({
      type: "LOGIN",
      payload: data,
    });

    if (data?.token) {
      localStorage.setItem("auth", JSON.stringify(data));
    }

    navigate("/");
    window.location.reload();
  } catch (error) {
    toast(error?.response?.data?.msg || "Bir hata oluştu", {
      position: "top-right",
      autoClose: 5000,
    });
  }
};
