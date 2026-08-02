import Navbar from "../../components/Landing/Navbar/Navbar";
import Hero from "../../components/Landing/Hero/Hero";
import Stats from "../../components/Landing/Stats/Stats";
import Features from "../../components/Landing/Features/Features";
import HowItWorks from "../../components/Landing/HowItWorks/HowItWorks";
import DashboardShowcase from "../../components/Landing/DashboardShowcase/DashboardShowcase";
import TechStack from "../../components/Landing/TechStack/TechStack";
import FAQ from "../../components/Landing/FAQ/FAQ";
import CTA from "../../components/Landing/CTA/CTA";
import Footer from "../../components/Landing/Footer/Footer";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Stats />
      <Features />
      <HowItWorks />
      <DashboardShowcase />
      <TechStack />
      <FAQ />
      <CTA />
      <Footer />
    </>
  );
}

export default Home;