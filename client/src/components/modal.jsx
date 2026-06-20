import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { createPostAction, updatePostAction } from "../redux/actions/post";

const Modal = () => {
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.modal);
  const { open, updateId } = modal;

  const { posts } = useSelector((state) => state.posts);
  console.log("modal", modal);

  const [postData, setPostData] = useState({
    user: "",
    title: "",
    description: "",
  });

  useEffect(() => {
    if (updateId) {
      const selectedPost = posts.find((p) => p._id === updateId);

      if (selectedPost) {
        setPostData({
          user: selectedPost.user,
          title: selectedPost.title,
          description: selectedPost.description,
        });
      }
    } else {
      setPostData({
        user: "",
        title: "",
        description: "",
      });
    }
  }, [updateId, posts]);

  if (!open) return null;

  const onChangeFunc = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };

  const postCreate = () => {
    if (updateId) {
      dispatch(updatePostAction(updateId, postData));
    } else {
      dispatch(createPostAction(postData));
    }

    dispatch({ type: "MODAL", payload: { open: false, updateId: null } });
  };

  return (
    <div
      onClick={() =>
        dispatch({ type: "MODAL", payload: { open: false, updateId: null } })
      }
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white w-1/3 p-5 rounded-md shadow-lg"
      >
        <IoClose
          onClick={() =>
            dispatch({
              type: "MODAL",
              payload: { open: false, updateId: null },
            })
          }
          size={26}
          className="absolute top-3 right-3 cursor-pointer text-gray-500 hover:text-red-500"
        />
        <h1 className="text-2xl font-semibold text-indigo-600 text-center mb-5">
          {updateId ? "Postu Güncelle" : "Post Paylaş"}
        </h1>

        <div className="flex flex-col space-y-4">
          <input
            value={postData.user}
            name="user"
            onChange={onChangeFunc}
            type="text"
            placeholder="User"
            className="input-style"
          />

          <input
            value={postData.title}
            name="title"
            onChange={onChangeFunc}
            type="text"
            placeholder="Title"
            className="input-style"
          />

          <textarea
            value={postData.description}
            name="description"
            onChange={onChangeFunc}
            placeholder="Description"
            className="input-style resize-none h-24"
          />

          <div
            onClick={postCreate}
            className="cursor-pointer bg-indigo-600 hover:bg-indigo-900 text-white text-center p-2 rounded-md"
          >
            {updateId ? " Güncelle" : " Paylaş"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
