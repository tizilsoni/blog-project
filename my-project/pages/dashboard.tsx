import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../globalState/globalState";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Link from "next/link";
import { tokenAxiosInstance } from "../utils/axios";

export default function Dashboard() {
  const { state } = useContext(GlobalContext);
  const router = useRouter();
  const [post, setPost] = useState<any>([]);

  useEffect(() => {
    if (!state?.auth) router.push("/");
    console.log(state);

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
    <div className="space-y-20">
      <Navbar></Navbar>
      <h1
        className="text-5xl underline font-bold flex justify-center"
        id="user"
      >
        Welcome {state?.username || "User"}
      </h1>
      <div className="ml-4 grid grid-cols-2 gap-10">
        <div className="space-y-5">
          <h2 className="text-2xl font-bold flex justify-center">Your blogs</h2>
          <ul className="ml-10 list-disc space-y-3 text-center">
            {post.map((p) => (
              <li key={p.title}>{p.title}</li>
            ))}
            <li>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Corporis, eligendi.
            </li>
            <li>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Aspernatur, placeat.
            </li>
          </ul>
          <Link
            href="/wblog"
            className="text-2xl font-bold flex justify-center"
          >
            Write More Blogs
          </Link>
        </div>
        <div className="space-y-5">
          <h2 className="text-2xl font-bold flex justify-center">
            Edit Your Info
          </h2>
          <div className="grid grid-cols-2">
            <div className="ml-64 space-y-4">
              <h2>{state?.username || "Username"}</h2>
              <h2>{state?.email || "Email"}</h2>
              <h2>Password</h2>
            </div>
            <div className="space-y-4">
              <input></input>
              <br></br>
              <input></input>
              <br></br>
              <input></input>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
