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
      .get("/blog")
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
      <div className="container mx-auto grid grid-cols-2 gap-10 divide-x">
        <div className="space-y-5">
          <h2 className="text-2xl font-bold flex justify-center">Your blogs</h2>
          <ul className="list-disc space-y-3 text-start">
            {!post.length ? (
              <>
                <h1 className="text-center text-xl mb-3">
                  Wow Such Empty! Write To get Started
                </h1>
              </>
            ) : (
              <>
                {post.map((p) => (
                  <li className="text-xl mx-40" key={p.title}>
                    {p.title}
                  </li>
                ))}
              </>
            )}
          </ul>
          <div className="grid grid-cols-2 gap-7">
            <Link
              href="/wblog"
              className="text-2xl text-center font-bold border-solid border-2 border-sky-900 rounded-full"
            >
              Write More Blogs
            </Link>
            <Link
              href="/modify"
              className="text-2xl text-center font-bold border-solid border-2 border-sky-900 rounded-full"
            >
              Edit/Modify Blogs
            </Link>
          </div>
        </div>
        <div className="space-y-5">
          <h2 className="text-2xl font-bold flex justify-center">
            Edit Your Info
          </h2>
          <div className="grid grid-cols-3">
            <div className="space-y-4 text-end">
              <h2>Username :</h2>
              <h2>Email :</h2>
            </div>
            <div className="space-y-4 text-center">
              <h2>{state?.username || "Username"}</h2>
              <h2>{state?.email || "Email"}</h2>
              <h2>Change Password</h2>
            </div>
            <div className="space-y-4">
              <input placeholder="New username"></input>
              <br></br>
              <input placeholder="New Email"></input>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
