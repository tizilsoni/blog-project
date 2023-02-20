import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import { axiosInstance } from "../../utils/axios";
import MarkdownPreview from "../../components/MarkdownPreview";

const Btemp = () => {
  const [data, setData] = useState<any>([]);
  const router = useRouter();
  const { postId } = router.query;

  useEffect(() => {
    if (!postId) {
      router.push("/");
      return;
    }

    axiosInstance
      .get(`/blog/${postId}`)
      .then((res) => setData(res.data))
      .catch((err) => router.push("/"));
  }, []);

  return (
    <>
      <Navbar></Navbar>
      <div className="scroll-smooth dark:bg-gray-900 dark:text-gray-50">
        <div className="py-10 w-2/3 mx-auto">
          <h1
            className="text-5xl font-bold underline flex justify-start"
            id="name"
          >
            {data.title}
          </h1>
          <div>
            <p className="mt-4 text-3xl flex justify-start" id="author">
              {data.topic}
            </p>
            <p className="mt-4 text-3xl flex justify-end" id="author">
              --{data.user?.username || "Username"}
            </p>
            <p className="flex justify-end" id="time">
              x min read
            </p>
          </div>
          <MarkdownPreview markdown={data.description} />
          <p className="flex justify-end" id="Created at">
            Written on {data.createdAt}
          </p>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default Btemp;
