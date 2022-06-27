import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import About from "../components/about/About";
import PopularBooks from "../components/recent book/RecentBooks";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import Navbar from "../components/navbar/Navbar";
import Sponsor from "../components/sponsor/Sponsor";
import axios from "axios";
import GetCookie from "../hooks/GetCookie";

function Home() {
  const [articles, setArticles] = useState([]);
  let navigate = useNavigate();

  const checkToken = GetCookie("token");
  useEffect(() => {
    if (checkToken) {
      navigate("/home");
    } else {
      navigate(-1, { replace: true });
    }
  }, []);

  // fetch api
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
