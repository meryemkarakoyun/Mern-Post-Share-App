import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import HomeCard from "../components/home-card";
import { getPostsAction } from "../redux/actions/post";

const Home = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(getPostsAction());
  }, [dispatch]);

  console.log("posts", posts);
  return (
    <div className="flex items-center m-5 flex-wrap gap-5 ">
      {posts?.length > 0 ? (
        posts.map((post, i) => <HomeCard key={post._id || i} post={post} />)
      ) : (
        <div className="w-full  text-center text-gray-500 mt-10">
          Henüz post yok. İlk postunuzu oluşturun!
        </div>
      )}
    </div>
  );
};

export default Home;
