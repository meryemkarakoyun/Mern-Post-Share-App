import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { deletePostAction } from "../redux/actions/post";
import { toast } from "react-toastify";

const HomeCard = ({ post }) => {
  const dispatch = useDispatch();

  const updatePost = (id) => {
    dispatch({ type: "MODAL", payload: { open: true, updateId: id } });
  };

  const deletePost = (id) => {
    dispatch(deletePostAction(id));
    toast("Silme işlemi başarılı", {
      position: "top-right",
      autoClose: 5000,
    });
  };

  return (
    <div className="relative w-1/4 border border-gray-400 p-4 rounded-md bg-gray-50 ">
      <div className="text-xl font-semibold">{post?.title}</div>
      <div className="text-gray-600 mt-2">{post?.description}</div>
      <div className="flex items-center justify-between mt-4">
        <span className="text-sm text-gray-400">{post?.user}</span>
        <span className="text-sm text-gray-400">
          {post?.date?.substring(0, 10)}
        </span>
      </div>

      <div className="absolute top-2 right-2 flex space-x-3">
        <FiEdit
          onClick={() => updatePost(post._id)}
          className="cursor-pointer text-indigo-600 hover:text-indigo-900 transition"
          size={18}
          title="Güncelle"
        />
        <FiTrash2
          onClick={() => deletePost(post._id)}
          className="cursor-pointer text-gray-400 hover:text-red-700 transition"
          size={18}
          title="Sil"
        />
      </div>
    </div>
  );
};

export default HomeCard;
