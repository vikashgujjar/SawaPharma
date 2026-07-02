import React from "react";
import Banner from "./Components/Home";
import StatsSection from "./Components/StatsSection";
import AboutUsSection from "./Components/AboutUs";
import ManufacturingProcess from "./Components/ManufacturingProcess";
import Services from "./Components/Services";
import ContactSection from "./Components/ContactSection";
import Gallery from "./Components/OurGallary";
import WhyChooseUs from "./Components/WhyChoose";
import ExploreMarket from "./Components/ExploreMarket";
import Testimonials from "./Components/Testimonial";
import Faq from "./Components/Faq";
import ServiceDetails from "./Components/ServiceDetails";

const page = () => {
  return (
    <>
      <Banner />
      <StatsSection />
      <AboutUsSection />
      <ManufacturingProcess />
      <WhyChooseUs />
      <Services />
      <ExploreMarket />
      <Testimonials />
      <Gallery />
      <Faq/>
      <ServiceDetails />
      <ContactSection />
    </>
  );
};

export default page;
