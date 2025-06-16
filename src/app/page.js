import React from "react";
import Banner from "./Components/Home";
import Services from "./Components/Services";
import AboutUsSection from "./Components/AboutUs";
import ContactSection from "./Components/ContactSection";
import Gallery from "./Components/OurGallary";

const page = () => {
  return (
    <>
      <Banner />
      <AboutUsSection />
      <Services />
      <ContactSection />
      <Gallery />
    </>
  );
};

export default page;
