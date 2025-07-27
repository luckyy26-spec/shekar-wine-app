import Header from "@/components/Layout/Header";
import HeroSection from "@/components/Home/HeroSection";
import ReadyMadeWines from "@/components/Home/ReadyMadeWines";
import HowItWorks from "@/components/Home/HowItWorks";
import CustomWineBuilder from "@/components/CustomWine/CustomWineBuilder";
import CharitySection from "@/components/Home/CharitySection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <ReadyMadeWines />
        <HowItWorks />
        <CustomWineBuilder />
        <CharitySection />
      </main>
    </div>
  );
};

export default Index;
