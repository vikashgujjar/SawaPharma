import React from "react";
import Banner from "./Components/Home";
import Services from "./Components/Services";
import AboutUsSection from "./Components/AboutUs";
import ProductCategory from "./Components/ProductCategory";
import Footer from "./Components/Footer";
import Testimonials from "./Components/Testimonial";
import ContactSection from "./Components/ContactSection";
import Gallery from "./Components/OurGallary";

const page = () => {
  return (
    <>
      <Banner />
      <Services />
      <AboutUsSection />
      <ProductCategory />
      <ContactSection />
      <Testimonials />
      <Gallery />
    
    </>
  );
};

export default page;
