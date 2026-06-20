import axios from "axios";
import { toast } from "react-toastify";

export const getPostsAction = () => async (dispatch) => {
  try {
    const user = JSON.parse(localStorage.getItem("auth"));
    const token = user?.token;

    const { data } = await axios.get("/api/post/getPosts", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({
      type: "GET_POSTS",
      payload: data,
    });
  } catch (error) {
    toast.error("Postlar alınamadı", {
      position: "top-right",
      autoClose: 5000,
    });
  }
};

export const createPostAction = (postData) => async (dispatch) => {
  try {
    const { data } = await axios.post("/api/post/createPost", postData);

    dispatch({
      type: "CREATE_POST",
      payload: data,
    });

    toast.success("Post başarıyla paylaşıldı", {
      position: "top-right",
      autoClose: 3000,
    });
  } catch (error) {
    toast.error(error.response?.data?.msg || "Post paylaşılırken hata oluştu", {
      position: "top-right",
      autoClose: 5000,
    });
  }
};

export const updatePostAction = (id, postData) => async (dispatch) => {
  try {
    const { data } = await axios.patch(`/api/post/updatePost/${id}`, postData);

    dispatch({
      type: "UPDATE_POST",
      payload: data,
    });

    toast.success("Post güncellendi");
  } catch (error) {
    toast.error("Post güncellenemedi");
  }
};

export const deletePostAction = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/post/deletePost/${id}`);

    dispatch({
      type: "DELETE_POST",
      payload: id,
    });

    toast.success("Post silindi");
  } catch (error) {
    toast.error("Post silinemedi");
  }
};
