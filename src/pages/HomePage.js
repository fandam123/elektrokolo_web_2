import React from "react";
import HeroSection from "../components/HeroSection";
import ComparisonSection from "../components/ComparisonSection";
import CompatibilitySection from "../components/CompatibilitySection";
import ConfiguratorSection from "../components/ConfiguratorSection";
import TestimonialsSection from "../components/TestimonialsSection";
import FAQSection from "../components/FAQSection";

const HomePage = ({ navigateTo, onOrder }) => {
  return (
    <div className="w-full">
      <HeroSection navigateTo={navigateTo} />
      <ComparisonSection />
      <CompatibilitySection navigateTo={navigateTo} />
      <ConfiguratorSection navigateTo={navigateTo} onOrder={onOrder} />
      <TestimonialsSection />
      <FAQSection />
    </div>
  );
};

export default HomePage;
