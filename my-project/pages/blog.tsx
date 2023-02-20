import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import Post from "../components/Post";
import axios from "axios";
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

  useEffect(() => {
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
    });
    //.catch((err) => alert(err.response.data.error));
  }, []);

  return (
    <div className="dark:bg-gray-800 dark:text-gray-50">
      <div className="mx-auto dark:bg-gray-900 space-y-5">
        {data.map((post, index) => (
          <Post
            topic={post.topic}
            title={post.title}
            description={post.description}
            postId={post._id}
            username={post.user.username}
            key={post._id}
          />
        ))}
      </div>
    </div>
  );
};

export default Blog;
