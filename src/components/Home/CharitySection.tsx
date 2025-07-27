import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Users, Gift, ArrowRight } from "lucide-react";

const CharitySection = () => {
  return (
    <section id="charity" className="py-20 bg-gradient-hero relative overflow-hidden">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/60"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Making a Difference Together
          </h2>
          <p className="text-xl text-silver-light max-w-3xl mx-auto">
            Every purchase from Shekar helps feed street children in the Philippines. 
            Join our mission to create positive impact while enjoying premium wines.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Impact Stats */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <CardHeader className="text-center">
              <Users className="h-12 w-12 text-gold-accent mx-auto mb-4" />
              <CardTitle className="text-3xl font-bold">2,500+</CardTitle>
              <CardDescription className="text-silver-light">
                Children Fed This Year
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <CardHeader className="text-center">
              <Heart className="h-12 w-12 text-gold-accent mx-auto mb-4" />
              <CardTitle className="text-3xl font-bold">₱850,000</CardTitle>
              <CardDescription className="text-silver-light">
                Total Donations Raised
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <CardHeader className="text-center">
              <Gift className="h-12 w-12 text-gold-accent mx-auto mb-4" />
              <CardTitle className="text-3xl font-bold">50+</CardTitle>
              <CardDescription className="text-silver-light">
                Partner Organizations
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Donation Options */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Want to Help More?
            </h3>
            <p className="text-silver-light">
              You can make additional donations to directly support our street children feeding program.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Donation Tiers */}
            <Card className="bg-gradient-card shadow-premium hover:shadow-glow transition-all duration-300">
              <CardHeader className="text-center">
                <CardTitle className="text-xl text-wine-burgundy">Feed 5 Children</CardTitle>
                <div className="text-3xl font-bold text-primary">₱250</div>
                <CardDescription>
                  Provides nutritious meals for 5 children for one day
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  className="w-full bg-gradient-wine hover:shadow-glow"
                  onClick={() => window.location.href = '/payment?type=donation&amount=250'}
                >
                  <Heart className="mr-2 h-4 w-4" />
                  Donate ₱250
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card shadow-premium hover:shadow-glow transition-all duration-300 border-2 border-gold-accent">
              <CardHeader className="text-center">
                <div className="bg-gold-accent text-white px-3 py-1 rounded-full text-sm font-medium mb-2 inline-block">
                  Most Popular
                </div>
                <CardTitle className="text-xl text-wine-burgundy">Feed 20 Children</CardTitle>
                <div className="text-3xl font-bold text-primary">₱1,000</div>
                <CardDescription>
                  Provides nutritious meals for 20 children for one day
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  className="w-full bg-gradient-wine hover:shadow-glow"
                  onClick={() => window.location.href = '/payment?type=donation&amount=1000'}
                >
                  <Heart className="mr-2 h-4 w-4" />
                  Donate ₱1,000
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card shadow-premium hover:shadow-glow transition-all duration-300">
              <CardHeader className="text-center">
                <CardTitle className="text-xl text-wine-burgundy">Feed 50 Children</CardTitle>
                <div className="text-3xl font-bold text-primary">₱2,500</div>
                <CardDescription>
                  Provides nutritious meals for 50 children for one day
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  className="w-full bg-gradient-wine hover:shadow-glow"
                  onClick={() => window.location.href = '/payment?type=donation&amount=2500'}
                >
                  <Heart className="mr-2 h-4 w-4" />
                  Donate ₱2,500
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8">
            <Button 
              variant="outline" 
              size="lg" 
              className="border-white text-maroon hover:bg-white hover:text-primary"
              onClick={() => window.location.href = '/payment?type=custom-donation'}
            >
              Custom Donation Amount
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Impact Story */}
        <div className="mt-16 max-w-4xl mx-auto">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-8">
              <div className="text-center">
                <h4 className="text-2xl font-bold text-white mb-4">Our Impact Story</h4>
                <p className="text-silver-light leading-relaxed">
                  "Through Shekar's wine sales and direct donations, we've been able to provide over 
                  100,000 meals to street children across Metro Manila. Every bottle sold and every 
                  donation received goes directly to feeding programs that ensure these children 
                  receive nutritious meals and hope for a better future."
                </p>
                <div className="mt-6">
                  <p className="text-gold-accent font-semibold">— Maria Santos, Program Director</p>
                  <p className="text-silver-light text-sm">Children's Hope Foundation</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CharitySection;