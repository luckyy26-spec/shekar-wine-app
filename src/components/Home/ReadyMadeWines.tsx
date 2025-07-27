import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, ShoppingCart, Heart, Star } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useToast } from "@/hooks/use-toast";
import wineCollection from "@/assets/wine-collection.jpg";

const ReadyMadeWines = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { toast } = useToast();

  const wines = [
    {
      id: 1,
      name: "Ruby Elegance",
      description: "Rich red wine blend with notes of cherry and oak",
      price: 1500,
      alcohol: "12%",
      rating: 4.8,
      image: wineCollection,
      badge: "Bestseller",
      ingredients: ["Red Grapes", "Cherry", "Oak Infusion"],
    },
    {
      id: 2,
      name: "Golden Sunset",
      description: "Crisp white wine with citrus and tropical notes",
      price: 1200,
      alcohol: "11%",
      rating: 4.6,
      image: wineCollection,
      badge: "New",
      ingredients: ["White Grapes", "Lemon", "Mango"],
    },
    {
      id: 3,
      name: "Midnight Blush",
      description: "Sophisticated rosé with floral undertones",
      price: 1350,
      alcohol: "10%",
      rating: 4.7,
      image: wineCollection,
      badge: "Limited",
      ingredients: ["Rosé Grapes", "Rose Petals", "Strawberry"],
    },
    {
      id: 4,
      name: "Forest Mystique",
      description: "Herbal wine blend with botanical complexity",
      price: 1600,
      alcohol: "13%",
      rating: 4.9,
      image: wineCollection,
      badge: "Premium",
      ingredients: ["Grapes", "Moringa", "Ginger"],
    },
    {
      id: 5,
      name: "Tropical Paradise",
      description: "Exotic fruit wine with vibrant tropical flavors",
      price: 1400,
      alcohol: "9%",
      rating: 4.5,
      image: wineCollection,
      badge: "Seasonal",
      ingredients: ["Mango", "Papaya", "Coconut Water"],
    },
    {
      id: 6,
      name: "Harvest Moon",
      description: "Traditional blend with earthy and robust character",
      price: 1750,
      alcohol: "14%",
      rating: 4.8,
      image: wineCollection,
      badge: "Classic",
      ingredients: ["Red Grapes", "Rice Wine", "Hibiscus"],
    }
  ];

  const itemsPerView = 3;
  const maxSlide = Math.ceil(wines.length / itemsPerView) - 1;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev >= maxSlide ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev <= 0 ? maxSlide : prev - 1));
  };

  const handleAddToCart = (wine: typeof wines[0]) => {
    const cartItem = {
      id: `ready-made-${wine.id}`,
      name: wine.name,
      price: wine.price,
      quantity: 1,
      type: 'ready-made' as const,
      image: wine.image,
      alcohol: wine.alcohol,
      ingredients: wine.ingredients,
    };

    addItem(cartItem);
    toast({
      title: "Added to Cart!",
      description: `${wine.name} has been added to your cart.`,
    });
  };

  const handleToggleFavorite = (wine: typeof wines[0]) => {
    const favoriteItem = {
      id: `ready-made-${wine.id}`,
      name: wine.name,
      price: wine.price,
      type: 'ready-made' as const,
      image: wine.image,
    };

    toggleFavorite(favoriteItem);
    toast({
      title: isFavorite(`ready-made-${wine.id}`) ? "Removed from Favorites" : "Added to Favorites",
      description: `${wine.name} ${isFavorite(`ready-made-${wine.id}`) ? 'removed from' : 'added to'} your favorites.`,
    });
  };

  const currentWines = wines.slice(
    currentSlide * itemsPerView,
    (currentSlide + 1) * itemsPerView
  );

  return (
    <section id="ready-made" className="py-20 bg-gradient-silver">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary">
            Ready-Made Wine Collection
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover our curated selection of premium wines, crafted with the finest ingredients 
            and perfected by our master blenders.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-premium hover:shadow-glow"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-premium hover:shadow-glow"
            onClick={nextSlide}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          {/* Wine Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mx-12">
            {currentWines.map((wine, index) => (
              <Card 
                key={wine.id} 
                className="overflow-hidden bg-gradient-card shadow-card hover:shadow-premium transition-all duration-500 group animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative">
                  <img
                    src={wine.image}
                    alt={wine.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500 brightness-110 contrast-110"
                  />
                  {wine.badge && (
                    <Badge className="absolute top-4 left-4 bg-wine-burgundy hover:bg-wine-burgundy">
                      {wine.badge}
                    </Badge>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`absolute top-4 right-4 ${
                      isFavorite(`ready-made-${wine.id}`)
                        ? 'bg-wine-burgundy text-white hover:bg-wine-burgundy/90'
                        : 'bg-white/90 hover:bg-white text-wine-burgundy'
                    }`}
                    onClick={() => handleToggleFavorite(wine)}
                  >
                    <Heart className={`h-4 w-4 ${isFavorite(`ready-made-${wine.id}`) ? 'fill-current' : ''}`} />
                  </Button>
                </div>

                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl text-primary group-hover:text-wine-burgundy transition-colors">
                        {wine.name}
                      </CardTitle>
                      <div className="flex items-center space-x-2 mt-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(wine.rating)
                                  ? "text-gold-accent fill-current"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                          <span className="text-sm text-muted-foreground ml-1">
                            ({wine.rating})
                          </span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {wine.alcohol} ABV
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-wine-burgundy">
                        ₱{wine.price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <CardDescription className="text-sm text-muted-foreground">
                    {wine.description}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-primary mb-2">Key Ingredients:</p>
                      <div className="flex flex-wrap gap-1">
                        {wine.ingredients.map((ingredient) => (
                          <Badge key={ingredient} variant="secondary" className="text-xs">
                            {ingredient}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button 
                        className="flex-1 bg-gradient-wine hover:shadow-glow group"
                        onClick={() => handleAddToCart(wine)}
                      >
                        <ShoppingCart className="h-4 w-4 mr-2 group-hover:animate-bounce" />
                        Add to Cart
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon"
                        className={isFavorite(`ready-made-${wine.id}`) ? 'border-wine-burgundy bg-wine-burgundy text-white' : ''}
                        onClick={() => handleToggleFavorite(wine)}
                      >
                        <Heart className={`h-4 w-4 ${isFavorite(`ready-made-${wine.id}`) ? 'fill-current' : ''}`} />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Carousel Indicators */}
          <div className="flex justify-center space-x-2 mt-8">
            {[...Array(maxSlide + 1)].map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "bg-wine-burgundy scale-125"
                    : "bg-silver hover:bg-silver-dark"
                }`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <Button 
            size="lg" 
            variant="outline" 
            className="border-wine-burgundy text-wine-burgundy hover:bg-wine-burgundy hover:text-white"
          >
            View All Wines
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ReadyMadeWines;