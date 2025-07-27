import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { 
  Wine, 
  AlertTriangle, 
  Plus, 
  Minus, 
  ShoppingCart, 
  Sparkles,
  Heart,
  Package
} from "lucide-react";

// Import ingredient images
import grapesImg from "@/assets/ingredients/grapes.jpg";
import appleImg from "@/assets/ingredients/apple.jpg";
import bananaImg from "@/assets/ingredients/banana.jpg";
import lemonImg from "@/assets/ingredients/lemon.jpg";
import mangoImg from "@/assets/ingredients/mango.jpg";
import bitterMelonImg from "@/assets/ingredients/bitter-melon.jpg";
import chocolateImg from "@/assets/ingredients/chocolate.jpg";
import gingerImg from "@/assets/ingredients/ginger.jpg";
import milkImg from "@/assets/ingredients/milk.jpg";

const CustomWineBuilder = () => {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { toast } = useToast();
  
  const [wineName, setWineName] = useState("");
  const [selectedFlavor, setSelectedFlavor] = useState<string | null>(null);
  const [selectedFruits, setSelectedFruits] = useState<string[]>([]);
  const [selectedVegetables, setSelectedVegetables] = useState<string[]>([]);
  const [selectedOthers, setSelectedOthers] = useState<string[]>([]);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [alcoholPercentage, setAlcoholPercentage] = useState([10]);
  const [quantity, setQuantity] = useState(1);
  const [selectedBottle, setSelectedBottle] = useState("1000ml");
  const [selectedNecklace, setSelectedNecklace] = useState<string | null>(null);
  const [incompatibleMessage, setIncompatibleMessage] = useState("");

  // Ingredient data with compatibility rules
  const flavors = [
    {
      id: "sweet",
      name: "Sweet & Fruity",
      image: grapesImg,
      description: "Rich, fruity notes with natural sweetness",
      taste: "Smooth, well-balanced with hints of berries and honey",
      benefits: "Rich in antioxidants, promotes heart health"
    },
    {
      id: "dry",
      name: "Dry & Crisp",
      image: lemonImg,
      description: "Clean, refreshing with citrus undertones",
      taste: "Sharp, acidic finish with mineral notes",
      benefits: "Aids digestion, low in sugar content"
    },
    {
      id: "herbal",
      name: "Herbal & Earthy",
      image: gingerImg,
      description: "Complex botanical blend with earthy notes",
      taste: "Robust flavor with herbal complexity",
      benefits: "Anti-inflammatory properties, digestive aid"
    }
  ];

  const fruits = [
    {
      id: "apple",
      name: "Apple",
      image: appleImg,
      description: "Crisp and sweet",
      incompatible: [],
      note: "Generally safe"
    },
    {
      id: "banana",
      name: "Banana",
      image: bananaImg,
      description: "Creamy tropical flavor",
      incompatible: ["milk", "orange-peel", "grapes", "lemon", "watermelon", "cucumber"],
      note: "Not applicable to: Milk, Orange Peel, Grapes, Lemon, Watermelon, Cucumber"
    },
    {
      id: "grapes",
      name: "Grapes",
      image: grapesImg,
      description: "Classic wine base",
      incompatible: ["milk", "banana"],
      note: "Not applicable to: Milk, Banana"
    },
    {
      id: "lemon",
      name: "Lemon",
      image: lemonImg,
      description: "Zesty citrus flavor",
      incompatible: ["milk", "coffee", "cucumber", "tomato"],
      note: "Not applicable to: Milk, Coffee, Cucumber, Tomato"
    },
    {
      id: "mango-carabao",
      name: "Mango (Carabao)",
      image: mangoImg,
      description: "Sweet Filipino mango",
      incompatible: ["milk-when-unripe"],
      note: "Not applicable to: Milk when unripe or sour"
    }
  ];

  const vegetables = [
    {
      id: "bitter-melon",
      name: "Bitter Melon (Ampalaya)",
      image: bitterMelonImg,
      description: "Unique bitter flavor",
      incompatible: ["milk", "chocolate", "coffee"],
      note: "Not applicable to: Milk, Chocolate, Coffee"
    },
    {
      id: "carrots",
      name: "Carrots",
      image: appleImg, // Placeholder
      description: "Sweet and earthy",
      incompatible: [],
      note: "Generally safe"
    }
  ];

  const others = [
    {
      id: "chocolate",
      name: "Chocolate",
      image: chocolateImg, // Placeholder
      description: "Rich cocoa flavor",
      incompatible: ["bitter-melon", "moringa", "sweet-potato", "ginger"],
      note: "Not applicable to: Bitter Melon, Moringa, Sweet Potato Leaves, Ginger"
    },
    {
      id: "milk",
      name: "Milk",
      image: milkImg,
      description: "Creamy dairy base",
      incompatible: ["banana", "lemon", "orange-peel", "tangerine", "grapes", "tomato", "cucumber", "papaya", "bitter-melon"],
      note: "Not applicable to: Many fruits and vegetables"
    },
    {
      id: "ginger",
      name: "Ginger",
      image: gingerImg,
      description: "Spicy warming flavor",
      incompatible: ["chocolate"],
      note: "Not applicable to: Chocolate"
    }
  ];

  const addOns = [
    {
      id: "jasmine-tea",
      name: "Jasmine Tea",
      image: grapesImg, // Placeholder
      description: "Floral aromatic tea",
      incompatible: [],
      note: "Generally safe"
    },
    {
      id: "lemongrass",
      name: "Lemongrass (Tanglad)",
      image: gingerImg, // Placeholder
      description: "Citrusy herbal flavor",
      incompatible: ["milk"],
      note: "Not applicable to: Milk"
    }
  ];

  const bottles = [
    { id: "1000ml", name: "1000ml Glass Storage Jar", price: 50 },
    { id: "1500ml", name: "1500ml Red Cherry Jar", price: 75 },
    { id: "3000ml", name: "3000ml Large Jar", price: 150 },
    { id: "3800ml", name: "3800ml Premium Jar", price: 200 }
  ];

  const necklaces = [
    { id: "potion-sugar", name: "Potion Sugar", price: 100, description: "Small color change with glittery effect" },
    { id: "magical-honey", name: "Magical Honey", price: 120, description: "Small color change effect" },
    { id: "poisonous-flower", name: "Deadly Poisonous Sweeten Flower", price: 150, description: "Small color change effect" },
    { id: "criminal-wine", name: "Criminal Wine 4% Alcohol", price: 200, description: "Classic small addition" }
  ];

  // Helper functions
  const checkCompatibility = (newItem: string, category: 'fruits' | 'vegetables' | 'others' | 'addOns') => {
    const allSelected = [...selectedFruits, ...selectedVegetables, ...selectedOthers, ...selectedAddOns];
    const allIngredients = [...fruits, ...vegetables, ...others, ...addOns];
    
    const newIngredient = allIngredients.find(item => item.id === newItem);
    if (!newIngredient) return true;

    for (const selectedId of allSelected) {
      if (newIngredient.incompatible.includes(selectedId)) {
        return false;
      }
    }
    return true;
  };

  const handleIngredientSelect = (itemId: string, category: 'fruits' | 'vegetables' | 'others' | 'addOns') => {
    const setters = {
      fruits: setSelectedFruits,
      vegetables: setSelectedVegetables,
      others: setSelectedOthers,
      addOns: setSelectedAddOns
    };

    const getters = {
      fruits: selectedFruits,
      vegetables: selectedVegetables,
      others: selectedOthers,
      addOns: selectedAddOns
    };

    const currentSelection = getters[category];
    const setter = setters[category];

    if (currentSelection.includes(itemId)) {
      setter(currentSelection.filter(id => id !== itemId));
      setIncompatibleMessage("");
    } else {
      if (checkCompatibility(itemId, category)) {
        setter([...currentSelection, itemId]);
        setIncompatibleMessage("");
      } else {
        setIncompatibleMessage("Can't mix with other selected ingredients");
      }
    }
  };

  const calculatePrice = () => {
    let basePrice = 1000; // Base price
    
    // Add pricing for fruits
    basePrice += selectedFruits.length * 150;
    
    // Add pricing for vegetables  
    basePrice += selectedVegetables.length * 100;
    
    // Add pricing for others
    basePrice += selectedOthers.length * 200;
    
    // Add pricing for add-ons
    basePrice += selectedAddOns.length * 100;
    
    // Bottle size pricing
    const bottlePricing = {
      "1000ml": 0,
      "1500ml": 300,
      "3000ml": 800,
      "3800ml": 1200
    };
    basePrice += bottlePricing[selectedBottle as keyof typeof bottlePricing] || 0;
    
    // Necklace add-on pricing
    if (selectedNecklace) {
      const necklacePricing = {
        "potion-sugar": 150,
        "magical-honey": 200,
        "poisonous-flower": 250,
        "criminal-wine": 300
      };
      basePrice += necklacePricing[selectedNecklace as keyof typeof necklacePricing] || 0;
    }
    
    return basePrice * quantity;
  };

  const totalPrice = calculatePrice();

  const handleAddToCart = () => {
    if (!selectedFlavor) {
      toast({
        title: "Please select a main flavor",
        description: "Choose a main flavor to proceed with your custom wine.",
        variant: "destructive"
      });
      return;
    }

    const customWineItem = {
      id: `custom-${Date.now()}`,
      name: wineName || "Custom Wine",
      price: totalPrice,
      quantity: 1,
      type: 'custom' as const,
      customDetails: {
        mainFlavor: selectedFlavor,
        fruits: selectedFruits,
        vegetables: selectedVegetables,
        others: selectedOthers,
        addOns: selectedAddOns,
        alcoholPercentage: alcoholPercentage[0],
        bottleSize: selectedBottle,
        necklaceAddOn: selectedNecklace
      }
    };

    addItem(customWineItem);
    toast({
      title: "Added to Cart!",
      description: `Your custom wine has been added to cart.`,
    });
  };

  const handleOrderNow = () => {
    if (!selectedFlavor) {
      toast({
        title: "Please select a main flavor",
        description: "Choose a main flavor to proceed with your custom wine.",
        variant: "destructive"
      });
      return;
    }

    const customWineData = {
      name: wineName || "Custom Wine",
      flavor: selectedFlavor,
      fruits: selectedFruits,
      vegetables: selectedVegetables,
      others: selectedOthers,
      addOns: selectedAddOns,
      alcoholPercentage: alcoholPercentage[0],
      quantity,
      bottle: selectedBottle,
      necklace: selectedNecklace,
      totalPrice
    };
    
    // Navigate to payment with custom wine data
    const wineData = encodeURIComponent(JSON.stringify(customWineData));
    navigate(`/payment?type=custom&wineData=${wineData}&amount=${totalPrice}`);
  };

  const getMoodClassification = () => {
    if (alcoholPercentage[0] <= 3) return "Non-Alcoholic";
    if (alcoholPercentage[0] <= 8) return "Light & Refreshing";
    if (alcoholPercentage[0] <= 15) return "Moderate & Balanced";
    return "Strong & Bold";
  };

  return (
    <section id="custom" className="py-20 bg-gradient-silver">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary">
            Create Your Custom Wine
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Design your perfect wine blend with our interactive builder. Choose ingredients, 
            customize alcohol content, and create something uniquely yours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Builder Panel */}
          <div className="lg:col-span-2 space-y-8">
            {/* Wine Name */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Wine className="mr-2 h-5 w-5 text-wine-burgundy" />
                  Wine Name
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Label htmlFor="wine-name">Give your wine a unique name</Label>
                <Input
                  id="wine-name"
                  value={wineName}
                  onChange={(e) => setWineName(e.target.value)}
                  placeholder="Enter your wine name..."
                  className="mt-2"
                />
              </CardContent>
            </Card>

            {/* Main Flavor */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Main Flavor Characteristic</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {flavors.map((flavor) => (
                    <div
                      key={flavor.id}
                      className={`relative cursor-pointer rounded-lg border-2 transition-all duration-300 ${
                        selectedFlavor === flavor.id
                          ? "border-wine-burgundy bg-wine-burgundy/10"
                          : "border-border hover:border-wine-burgundy/50"
                      }`}
                      onClick={() => setSelectedFlavor(flavor.id)}
                    >
                      <div className="p-4">
                        <img
                          src={flavor.image}
                          alt={flavor.name}
                          className="w-full h-32 object-cover rounded-lg mb-3 animate-float"
                        />
                        <h3 className="font-semibold text-primary">{flavor.name}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{flavor.description}</p>
                        <div className="mt-3 space-y-2 text-xs">
                          <div><strong>Taste:</strong> {flavor.taste}</div>
                          <div><strong>Benefits:</strong> {flavor.benefits}</div>
                        </div>
                      </div>
                      {selectedFlavor === flavor.id && (
                        <div className="absolute top-2 right-2">
                          <Sparkles className="h-6 w-6 text-gold-accent" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Fruits */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Fruits</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {fruits.map((fruit) => {
                    const isSelected = selectedFruits.includes(fruit.id);
                    const isCompatible = checkCompatibility(fruit.id, 'fruits');
                    
                    return (
                      <div
                        key={fruit.id}
                        className={`relative cursor-pointer rounded-lg border-2 transition-all duration-300 ${
                          isSelected
                            ? "border-wine-burgundy bg-wine-burgundy/10"
                            : !isCompatible
                            ? "border-red-300 bg-red-50 opacity-50 cursor-not-allowed"
                            : "border-border hover:border-wine-burgundy/50"
                        }`}
                        onClick={() => isCompatible && handleIngredientSelect(fruit.id, 'fruits')}
                      >
                        <div className="p-3">
                          <img
                            src={fruit.image}
                            alt={fruit.name}
                            className={`w-full h-20 object-cover rounded-lg mb-2 ${
                              isSelected ? 'animate-float' : ''
                            }`}
                          />
                          <h4 className="font-medium text-sm text-primary">{fruit.name}</h4>
                          <p className="text-xs text-muted-foreground">{fruit.description}</p>
                        </div>
                        {isSelected && (
                          <div className="absolute top-1 right-1">
                            <Sparkles className="h-4 w-4 text-gold-accent" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Vegetables */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Vegetables</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {vegetables.map((vegetable) => {
                    const isSelected = selectedVegetables.includes(vegetable.id);
                    const isCompatible = checkCompatibility(vegetable.id, 'vegetables');
                    
                    return (
                      <div
                        key={vegetable.id}
                        className={`relative cursor-pointer rounded-lg border-2 transition-all duration-300 ${
                          isSelected
                            ? "border-wine-burgundy bg-wine-burgundy/10"
                            : !isCompatible
                            ? "border-red-300 bg-red-50 opacity-50 cursor-not-allowed"
                            : "border-border hover:border-wine-burgundy/50"
                        }`}
                        onClick={() => isCompatible && handleIngredientSelect(vegetable.id, 'vegetables')}
                      >
                        <div className="p-3">
                          <img
                            src={vegetable.image}
                            alt={vegetable.name}
                            className={`w-full h-20 object-cover rounded-lg mb-2 ${
                              isSelected ? 'animate-float' : ''
                            }`}
                          />
                          <h4 className="font-medium text-sm text-primary">{vegetable.name}</h4>
                          <p className="text-xs text-muted-foreground">{vegetable.description}</p>
                        </div>
                        {isSelected && (
                          <div className="absolute top-1 right-1">
                            <Sparkles className="h-4 w-4 text-gold-accent" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Others */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Others (Drinks, Botanicals, Grains)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {others.map((other) => {
                    const isSelected = selectedOthers.includes(other.id);
                    const isCompatible = checkCompatibility(other.id, 'others');
                    
                    return (
                      <div
                        key={other.id}
                        className={`relative cursor-pointer rounded-lg border-2 transition-all duration-300 ${
                          isSelected
                            ? "border-wine-burgundy bg-wine-burgundy/10"
                            : !isCompatible
                            ? "border-red-300 bg-red-50 opacity-50 cursor-not-allowed"
                            : "border-border hover:border-wine-burgundy/50"
                        }`}
                        onClick={() => isCompatible && handleIngredientSelect(other.id, 'others')}
                      >
                        <div className="p-3">
                          <img
                            src={other.image}
                            alt={other.name}
                            className={`w-full h-20 object-cover rounded-lg mb-2 ${
                              isSelected ? 'animate-float' : ''
                            }`}
                          />
                          <h4 className="font-medium text-sm text-primary">{other.name}</h4>
                          <p className="text-xs text-muted-foreground">{other.description}</p>
                        </div>
                        {isSelected && (
                          <div className="absolute top-1 right-1">
                            <Sparkles className="h-4 w-4 text-gold-accent" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Add-ons */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Add-ons (1-3 options)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {addOns.map((addon) => {
                    const isSelected = selectedAddOns.includes(addon.id);
                    const isCompatible = checkCompatibility(addon.id, 'addOns');
                    const canSelect = selectedAddOns.length < 3 || isSelected;
                    
                    return (
                      <div
                        key={addon.id}
                        className={`relative cursor-pointer rounded-lg border-2 transition-all duration-300 ${
                          isSelected
                            ? "border-wine-burgundy bg-wine-burgundy/10"
                            : !isCompatible || !canSelect
                            ? "border-red-300 bg-red-50 opacity-50 cursor-not-allowed"
                            : "border-border hover:border-wine-burgundy/50"
                        }`}
                        onClick={() => isCompatible && canSelect && handleIngredientSelect(addon.id, 'addOns')}
                      >
                        <div className="p-3">
                          <img
                            src={addon.image}
                            alt={addon.name}
                            className={`w-full h-20 object-cover rounded-lg mb-2 ${
                              isSelected ? 'animate-float' : ''
                            }`}
                          />
                          <h4 className="font-medium text-sm text-primary">{addon.name}</h4>
                          <p className="text-xs text-muted-foreground">{addon.description}</p>
                        </div>
                        {isSelected && (
                          <div className="absolute top-1 right-1">
                            <Sparkles className="h-4 w-4 text-gold-accent" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Alcohol Percentage & Mood */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Alcohol Percentage & Mood</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <Label>Alcohol Percentage: {alcoholPercentage[0]}%</Label>
                    <Slider
                      value={alcoholPercentage}
                      onValueChange={setAlcoholPercentage}
                      max={50}
                      min={0}
                      step={1}
                      className="mt-2"
                    />
                  </div>
                  <div className="bg-gradient-card p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Mood Classification:</span>
                      <Badge className="bg-wine-burgundy hover:bg-wine-burgundy">
                        {getMoodClassification()}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Bottle Selection */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Package className="mr-2 h-5 w-5 text-wine-burgundy" />
                  Bottle Options
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {bottles.map((bottle) => (
                    <div
                      key={bottle.id}
                      className={`cursor-pointer rounded-lg border-2 p-4 transition-all duration-300 ${
                        selectedBottle === bottle.id
                          ? "border-wine-burgundy bg-wine-burgundy/10"
                          : "border-border hover:border-wine-burgundy/50"
                      }`}
                      onClick={() => setSelectedBottle(bottle.id)}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">{bottle.name}</h4>
                          <p className="text-wine-burgundy font-semibold">+₱{bottle.price}</p>
                        </div>
                        {selectedBottle === bottle.id && (
                          <Sparkles className="h-5 w-5 text-gold-accent" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Wine Mixture Necklaces */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Wine Mixture Necklaces (Optional)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {necklaces.map((necklace) => (
                    <div
                      key={necklace.id}
                      className={`cursor-pointer rounded-lg border-2 p-4 transition-all duration-300 ${
                        selectedNecklace === necklace.id
                          ? "border-wine-burgundy bg-wine-burgundy/10"
                          : "border-border hover:border-wine-burgundy/50"
                      }`}
                      onClick={() => setSelectedNecklace(selectedNecklace === necklace.id ? null : necklace.id)}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">{necklace.name}</h4>
                          <p className="text-sm text-muted-foreground">{necklace.description}</p>
                          <p className="text-wine-burgundy font-semibold">+₱{necklace.price}</p>
                        </div>
                        {selectedNecklace === necklace.id && (
                          <Sparkles className="h-5 w-5 text-gold-accent" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Summary Panel */}
          <div className="space-y-6">
            <Card className="sticky top-24 shadow-premium">
              <CardHeader>
                <CardTitle className="text-center text-wine-burgundy">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {wineName && (
                  <div>
                    <h3 className="font-bold text-lg text-primary">{wineName}</h3>
                    <Separator className="my-2" />
                  </div>
                )}

                {selectedFlavor && (
                  <div>
                    <h4 className="font-medium text-sm text-wine-burgundy">Main Flavor:</h4>
                    <p className="text-sm">{flavors.find(f => f.id === selectedFlavor)?.name}</p>
                  </div>
                )}

                {(selectedFruits.length > 0 || selectedVegetables.length > 0 || selectedOthers.length > 0) && (
                  <div>
                    <h4 className="font-medium text-sm text-wine-burgundy">Ingredients:</h4>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {[...selectedFruits, ...selectedVegetables, ...selectedOthers].map(id => {
                        const allIngredients = [...fruits, ...vegetables, ...others];
                        const ingredient = allIngredients.find(i => i.id === id);
                        return (
                          <Badge key={id} variant="secondary" className="text-xs">
                            {ingredient?.name}
                          </Badge>
                        );
                      })}
                    </div>
                  </div>
                )}

                {selectedAddOns.length > 0 && (
                  <div>
                    <h4 className="font-medium text-sm text-wine-burgundy">Add-ons:</h4>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {selectedAddOns.map(id => {
                        const addon = addOns.find(a => a.id === id);
                        return (
                          <Badge key={id} variant="outline" className="text-xs">
                            {addon?.name}
                          </Badge>
                        );
                      })}
                    </div>
                  </div>
                )}

                <div>
                  <h4 className="font-medium text-sm text-wine-burgundy">Alcohol Content:</h4>
                  <p className="text-sm">{alcoholPercentage[0]}% - {getMoodClassification()}</p>
                </div>

                <div>
                  <h4 className="font-medium text-sm text-wine-burgundy">Bottle:</h4>
                  <p className="text-sm">{bottles.find(b => b.id === selectedBottle)?.name}</p>
                </div>

                {selectedNecklace && (
                  <div>
                    <h4 className="font-medium text-sm text-wine-burgundy">Necklace:</h4>
                    <p className="text-sm">{necklaces.find(n => n.id === selectedNecklace)?.name}</p>
                  </div>
                )}

                <Separator />

                <div className="flex items-center justify-between">
                  <Label>Quantity:</Label>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center">{quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <Separator />

                <div className="text-center">
                  <p className="text-2xl font-bold text-wine-burgundy">
                    ₱{totalPrice.toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Your purchase helps feed street children
                  </p>
                </div>

                {incompatibleMessage && (
                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      {incompatibleMessage}
                    </AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Button 
                    className="w-full bg-gradient-wine hover:shadow-glow"
                    onClick={handleAddToCart}
                    disabled={!selectedFlavor}
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add to Cart - ₱{totalPrice.toLocaleString()}
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={handleOrderNow}
                    disabled={!selectedFlavor}
                  >
                    Order Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomWineBuilder;
