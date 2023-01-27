import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../utils/axios";

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
    <div className="py-10 w-2/3 mx-auto">
      <h1 className="text-5xl font-bold underline flex justify-start" id="name">
        {data.title}
      </h1>
      <div>
        <p className="mt-4 text-3xl flex justify-start" id="author"></p>
        <p className="flex justify-end" id="time">
          x min read
        </p>
      </div>
      <p className="mt-4 text-2xl">{data.description}</p>
    </div>
  );
};

export default Btemp;
