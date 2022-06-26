import React, { useEffect, useState } from "react";
import About from "../components/about/About";
import PopularBooks from "../components/recent book/RecentBooks";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import Navbar from "../components/navbar/Navbar";
import Sponsor from "../components/sponsor/Sponsor";
import axios from "axios";

function Home() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await axios.get("http://localhost:8008/Get", {
          withCredentials: true,
        });
        setArticles(res.data.data);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    };
    fetchArticle();
  }, []);

  const getArticle = () => {
    return articles;
  };

  return (
    <>
      <Navbar />
      <Header />
      <Sponsor />
      <About />
      <PopularBooks getArticle={getArticle} />
      <Footer />
    </>
  );
}

export default Home;
