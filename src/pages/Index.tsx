import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import BatchCards from "@/components/BatchCards";
import FacultySection from "@/components/FacultySection";
import ToppersSection from "@/components/ToppersSection";
import GallerySection from "@/components/GallerySection";
// import StudyMaterialSection from "@/components/StudyMaterialSection";
import ContactSection from "@/components/ContactSection";
import WhatsAppButton from "@/components/WhatsAppButton";
import Footer from "@/components/Footer";

const Index = () => (
  <>
    <Navbar />
    <HeroSection />
    <BatchCards />
    <FacultySection />
    <ToppersSection />
    <GallerySection />
    {/* <StudyMaterialSection /> */}
    <ContactSection />
    <Footer />
    <WhatsAppButton />
  </>
);

export default Index;
