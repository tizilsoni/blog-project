import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Btemp = () => {
  const [data, setData] = useState<any>([]);
  const router = useRouter();
  const id = router.query;

  useEffect(() => {
    axios({
      method: "GET",
      url: "http://localhost:5000/sblog",
      params: {
        id: ir,
      },

      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      console.log(ir);
      setData(res.data);
      console.log(res.data);
    });
    //.catch((err) => alert(err.response.data.error));
  }, []);
  return (
    <div className="py-10 w-2/3 mx-auto">
      <h1 className="text-5xl font-bold underline flex justify-start" id="name">
        {data.title}
      </h1>
      <div>
        <p className="mt-4 text-3xl flex justify-start" id="author">
          {data.user}
        </p>
        <p className="flex justify-end" id="time">
          x min read
        </p>
      </div>
      <p className="mt-4 text-2xl">{data.description}</p>
    </div>
  );
};

export default Btemp;
