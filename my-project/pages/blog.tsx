import React from "react";
import Link from "next/link";

import Post from "../components/Post";
import Btemp from "../components/btemp";
import Footer from "../components/footer";
import Navbar from "../components/navbar";

const Blog = () => {
  return (
    <div className="dark:bg-gray-800 dark:text-gray-50">
      <Navbar></Navbar>
      <div className="container mx-auto dark:bg-gray-900">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((id, index) => (
          <Post key={id} />
        ))}
        <Btemp></Btemp>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Blog;
