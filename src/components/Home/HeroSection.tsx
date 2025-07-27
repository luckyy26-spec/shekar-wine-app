import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroWine from "@/assets/hero-wine.jpg";
import premiumIngredients from "@/assets/premium-ingredients.jpg";
import customBlends from "@/assets/custom-blends.jpg";
import socialImpact from "@/assets/social-impact.jpg";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-hero">
        <div className="absolute inset-0 bg-black/40"></div>
        <img 
          src={heroWine} 
          alt="Premium Wine Collection" 
          className="w-full h-full object-cover mix-blend-overlay opacity-60"
        />
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 animate-float">
        <img src={premiumIngredients} alt="Premium" className="h-8 w-8 opacity-60 rounded" />
      </div>
      <div className="absolute bottom-32 right-20 animate-float" style={{ animationDelay: '1s' }}>
        <img src={customBlends} alt="Custom" className="h-6 w-6 opacity-50 rounded" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        <div className="animate-fade-in">
          {/* Logo */}
          <div className="mb-8">
            <img 
              src="/shekar-logos/shekar.png" 
              alt="Shekar" 
              className="h-24 mx-auto mb-4 animate-scale-in"
            />
          </div>

          {/* Tagline */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
            Craft Your Perfect
            <span className="block bg-gradient-to-r from-gold-accent to-silver-light bg-clip-text text-transparent">
              Wine Experience
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-silver-light mb-8 max-w-3xl mx-auto leading-relaxed">
            Create personalized wines with premium ingredients, or choose from our curated ready-made collection. 
            Every purchase helps feed street children.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-gradient-wine hover:shadow-glow text-lg px-8 py-4 group"
              onClick={() => document.getElementById('custom')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Create Custom Wine
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="border-silver-light text-wine-burgundy hover:bg-silver-light hover:text-primary text-lg px-8 py-4"
              onClick={() => document.getElementById('ready-made')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Browse Ready-Made
            </Button>
          </div>

          {/* Features */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 p-2">
                <img src={premiumIngredients} alt="Premium Ingredients" className="w-full h-full object-cover rounded-full" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Premium Ingredients</h3>
              <p className="text-silver-light">Fresh fruits, botanicals, and quality bases</p>
            </div>
            
            <div className="text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 p-2">
                <img src={customBlends} alt="Custom Blends" className="w-full h-full object-cover rounded-full" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Custom Blends</h3>
              <p className="text-silver-light">Personalized wine creation process</p>
            </div>
            
            <div className="text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 p-2">
                <img src={socialImpact} alt="Social Impact" className="w-full h-full object-cover rounded-full" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Social Impact</h3>
              <p className="text-silver-light">Every purchase feeds street children</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-silver-light rounded-full flex justify-center">
          <div className="w-1 h-3 bg-silver-light rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;