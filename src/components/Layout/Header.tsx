import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Menu, X, ShoppingCart, Heart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getItemCount } = useCart();
  const { favorites } = useFavorites();
  const navigate = useNavigate();

  const itemCount = getItemCount();
  const favoriteCount = favorites.length;

  const menuItems = [
    { name: "Home", href: "#home" },
    { name: "Ready-Made Wines", href: "#ready-made" },
    { name: "Custom Wine", href: "#custom" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "Charity", href: "#charity" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-card">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img 
              src="/shekar-logos/s-logo.png" 
              alt="Shekar Logo" 
              className="h-10 w-auto"
            />
            <span className="text-xl font-bold bg-gradient-wine bg-clip-text text-transparent">
              Shekar
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-foreground hover:text-wine-burgundy transition-colors duration-300 relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-wine-burgundy transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm" 
              className="relative"
              onClick={() => navigate('/cart')}
            >
              <Heart className="h-5 w-5" />
              {favoriteCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-wine-burgundy text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {favoriteCount}
                </span>
              )}
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="relative"
              onClick={() => navigate('/cart')}
            >
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-wine-burgundy text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Button>
            <Button className="bg-gradient-wine hover:shadow-glow">
              Order Now
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col space-y-4">
              {menuItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-foreground hover:text-wine-burgundy transition-colors duration-300 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <div className="flex items-center space-x-4 pt-4">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="relative"
                  onClick={() => navigate('/cart')}
                >
                  <Heart className="h-5 w-5" />
                  {favoriteCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-wine-burgundy text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                      {favoriteCount}
                    </span>
                  )}
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="relative"
                  onClick={() => navigate('/cart')}
                >
                  <ShoppingCart className="h-5 w-5" />
                  {itemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-wine-burgundy text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                      {itemCount}
                    </span>
                  )}
                </Button>
                <Button className="bg-gradient-wine hover:shadow-glow flex-1">
                  Order Now
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;