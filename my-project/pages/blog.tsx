import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import Post from "../components/Post";
import axios from "axios";
import Pagination from "../components/Pagination";
import { userAgent } from "next/server";

type Post = {
  _id: string;
  topic: string;
  title: string;
  description: string;
  user: { username: string };
};

const Blog = () => {
  const [data, setData] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  useEffect(() => {
    setLoading(true);
    axios({
      method: "GET",
      url: "http://localhost:5000/latest",
      //params: {
      //  limit: 5,
      //},

      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      setData(res.data);
      setLoading(false);
    });
    //.catch((err) => alert(err.response.data.error));
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="dark:bg-gray-800 dark:text-gray-50">
      <div className="mx-auto dark:bg-gray-900 space-y-5">
        {currentPosts.map((post, index) => (
          <Post
            topic={post.topic}
            title={post.title}
            description={post.description}
            postId={post._id}
            username={post.user.username}
            key={post._id}
            loading={loading}
          />
        ))}
      </div>
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={data.length}
        paginate={paginate}
      />
    </div>
  );
};

export default Blog;
