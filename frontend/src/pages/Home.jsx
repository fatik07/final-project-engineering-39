import React from "react";
import About from "../components/about/About";
import PopularBooks from "../components/popular-books/PopularBooks";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import Navbar from "../components/navbar/Navbar";
import Sponsor from "../components/sponsor/Sponsor";

function Home() {
  return (
    <>
      <Navbar />
      <Header />
      <Sponsor />
      <About />
      <PopularBooks />
      <Footer />
    </>
  );
}

export default Home;
