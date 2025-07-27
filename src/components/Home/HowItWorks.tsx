import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, CheckCircle } from "lucide-react";
import step1 from "@/assets/steps/step1.jpg";
import step2 from "@/assets/steps/step2.jpg";
import step3 from "@/assets/steps/step3.jpg";
import step4 from "@/assets/steps/step4.jpg";

const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      id: 1,
      title: "Choose Your Ingredients",
      description: "Select from our premium collection of fruits, botanicals, and flavor profiles. Our interactive guide helps you create the perfect blend based on your taste preferences.",
      image: step1,
      duration: "2-3 minutes",
      features: ["50+ Premium Ingredients", "Flavor Compatibility Guide", "Personalized Recommendations"]
    },
    {
      id: 2,
      title: "Customize Your Blend",
      description: "Our master blenders craft your unique wine using traditional methods combined with modern techniques. Watch your creation come to life through our transparent process.",
      image: step2,
      duration: "7-10 days",
      features: ["Expert Craftsmanship", "Quality Control", "Custom Alcohol Content"]
    },
    {
      id: 3,
      title: "Premium Packaging",
      description: "Your custom wine is carefully bottled in premium glass containers with personalized labels. Choose from our selection of elegant bottle options.",
      image: step3,
      duration: "1-2 days",
      features: ["Premium Glass Bottles", "Custom Labels", "Gift Packaging Available"]
    },
    {
      id: 4,
      title: "Delivered to You",
      description: "Fast, secure delivery straight to your doorstep. Track your order in real-time and enjoy your perfectly crafted custom wine experience.",
      image: step4,
      duration: "1-3 days",
      features: ["Real-time Tracking", "Secure Packaging", "Doorstep Delivery"]
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary">
            How It Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From selection to delivery, experience the journey of creating your perfect custom wine 
            in just four simple steps.
          </p>
        </div>

        {/* Interactive Step Navigation */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <Button
                  variant={activeStep === index ? "default" : "outline"}
                  className={`relative h-16 px-6 rounded-full transition-all duration-500 ${
                    activeStep === index 
                      ? "bg-gradient-wine shadow-glow scale-110" 
                      : "hover:border-wine-burgundy hover:text-wine-burgundy"
                  }`}
                  onClick={() => setActiveStep(index)}
                >
                  <div className="text-center">
                    <div className="text-lg font-bold">
                      {step.id}
                    </div>
                    <div className="text-xs hidden md:block">
                      Step {step.id}
                    </div>
                  </div>
                  {activeStep === index && (
                    <div className="absolute -top-2 -right-2">
                      <CheckCircle className="h-6 w-6 text-gold-accent bg-white rounded-full" />
                    </div>
                  )}
                </Button>
                {index < steps.length - 1 && (
                  <ChevronRight className="h-6 w-6 text-muted-foreground mx-4 hidden md:block" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Active Step Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="order-2 lg:order-1">
            <Card className="overflow-hidden shadow-premium">
              <div className="relative">
                <img
                  src={steps[activeStep].image}
                  alt={steps[activeStep].title}
                  className="w-full h-80 md:h-96 object-cover animate-fade-in"
                  key={activeStep} // Force re-render for animation
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="bg-wine-burgundy px-3 py-1 rounded-full text-sm font-medium">
                    {steps[activeStep].duration}
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2 animate-fade-in" key={activeStep}>
            <div className="bg-gradient-card p-8 rounded-2xl shadow-card">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-gradient-wine text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold">
                  {steps[activeStep].id}
                </div>
                <h3 className="text-3xl font-bold text-primary">
                  {steps[activeStep].title}
                </h3>
              </div>
              
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                {steps[activeStep].description}
              </p>

              <div className="space-y-3">
                <h4 className="text-lg font-semibold text-primary mb-3">Key Features:</h4>
                {steps[activeStep].features.map((feature, index) => (
                  <div 
                    key={feature} 
                    className="flex items-center space-x-3 animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CheckCircle className="h-5 w-5 text-wine-burgundy flex-shrink-0" />
                    <span className="text-foreground">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <Button 
                  className="bg-gradient-wine hover:shadow-glow w-full md:w-auto"
                  onClick={() => {
                    if (activeStep < steps.length - 1) {
                      setActiveStep(activeStep + 1);
                    } else {
                      document.getElementById('custom')?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  {activeStep < steps.length - 1 ? "Next Step" : "Start Creating"}
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-12">
          <div className="bg-silver-light rounded-full h-2 overflow-hidden">
            <div 
              className="bg-gradient-wine h-full transition-all duration-1000 ease-out"
              style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
            ></div>
          </div>
          <div className="text-center mt-4 text-muted-foreground">
            Step {activeStep + 1} of {steps.length}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;