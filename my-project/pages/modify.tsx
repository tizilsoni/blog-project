import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import { GlobalContext } from "../globalState/globalState";
import { axiosInstance, tokenAxiosInstance } from "../utils/axios";

const Modify = () => {
  const { state } = useContext(GlobalContext);
  const router = useRouter();
  const [post, setPost] = useState<any>([]);

  function sendProps(
    title: string,
    topic: string,
    description: string,
    id: string
  ) {
    router.push({
      pathname: "/wblog",
      query: {
        title,
        topic,
        description,
        id,
      },
    });
  }

  function delPost(postId: string) {
    axiosInstance
      .delete(`/del/${postId}`)
      .then(() => {
        alert("Post Deleted");
        router.reload();
      })
      .catch((err) => router.reload());
  }

  useEffect(() => {
    if (!state?.auth) router.push("/");

    tokenAxiosInstance(state.token)
      .get("/blog", {
        headers: {
          token: state?.token,
        },
      })
      .then((res) => {
        setPost(res.data);
      })
      .catch((err) => {
        alert("No Data Found");
        console.log(err);
      });
  }, []);

  return (
    <>
      <Navbar></Navbar>
      <div className="scroll-smooth dark:bg-gray-900 dark:text-gray-50 h-auto">
        <div className="container mx-auto bg-gray-800 space-y-10">
          <h1 className="text-4xl font-bold text-center">Your Blogs</h1>
          {post.map((p) => (
            <>
              <li className="grid grid-cols-6 space-y-4 gap-8" key={p.title}>
                <p className="mt-4 text-end">{p.title || "Wow Such Empty"}</p>
                <p className="text-center">{p.topic}</p>
                <p className="text-start col-span-2">{p.description}</p>
                <button
                  className="text-end"
                  onClick={() =>
                    sendProps(p.title, p.topic, p.description, p._id)
                  }
                >
                  Edit
                </button>
                <button className="text-start" onClick={() => delPost(p._id)}>
                  Delete
                </button>
                <button className="text-center"></button>
              </li>
            </>
          ))}
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default Modify;
