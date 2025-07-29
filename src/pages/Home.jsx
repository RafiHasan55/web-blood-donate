import Banner from "../components/Banner";
import AboutUsPreview from "./AboutUsPreview";

import ContactUs from "./ContactUs";
import FeaturedSection from "./FeaturedSection";
import GallerySection from "./GallerySection";
import HowItWorks from "./HowItWorks";

const Home = () => {
  return (
    <>
      <Banner></Banner>

      <AboutUsPreview></AboutUsPreview>
      <HowItWorks></HowItWorks>
      <FeaturedSection></FeaturedSection>
      <GallerySection></GallerySection>
      <ContactUs></ContactUs>
    </>
  );
};

export default Home;
