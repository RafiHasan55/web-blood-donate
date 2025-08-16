import Banner from "../components/Banner";
import AboutUsPreview from "./AboutUsPreview";

import ContactUs from "./ContactUs";
import Faqs from "./Faqs";
import FeaturedSection from "./FeaturedSection";
import GallerySection from "./GallerySection";
import HowItWorks from "./HowItWorks";
import TestimonialSlider from "./TestimonialSlider";

const Home = () => {
  return (
    <>
      <Banner></Banner>

      <AboutUsPreview></AboutUsPreview>
      <HowItWorks></HowItWorks>
      <FeaturedSection></FeaturedSection>
      <GallerySection></GallerySection>
      <Faqs></Faqs>
      <TestimonialSlider></TestimonialSlider>
      <ContactUs></ContactUs>
    </>
  );
};

export default Home;
