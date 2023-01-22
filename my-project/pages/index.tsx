import Head from "next/head";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";
import Footer from "../components/footer";
import Navbar from "../components/navbar";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Navbar></Navbar>
      <Head>
        <title>Blogs-short</title>
      </Head>
      <main className={styles.main}>
        <h1 className="mb-5 text-3xl font-bold underline">
          Welcome to blogs short!
        </h1>
        <div>
          <h2>Where you can Post your Blogs And show it to the world</h2>
        </div>
        <div>
          <h2 className="mt-5">Recent blogs</h2>
        </div>
      </main>
      <Footer></Footer>
    </>
  );
}
