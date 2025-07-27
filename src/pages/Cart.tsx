import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Plus, Minus, Trash2, ShoppingCart, Heart } from "lucide-react";

const Cart = () => {
  const navigate = useNavigate();
  const { state, updateQuantity, removeItem, clearCart } = useCart();
  const { toast } = useToast();

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeItem(id);
      return;
    }
    updateQuantity(id, newQuantity);
  };

  const handleCheckout = () => {
    if (state.items.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Add some wines to your cart before checkout.",
        variant: "destructive"
      });
      return;
    }

    // Navigate to payment with cart data
    const cartData = encodeURIComponent(JSON.stringify(state));
    navigate(`/payment?type=cart&cartData=${cartData}`);
  };

  const deliveryFee = state.total > 0 ? 100 : 0;
  const grandTotal = state.total + deliveryFee;

  return (
    <div className="min-h-screen bg-gradient-silver py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button variant="ghost" onClick={() => navigate('/')} className="mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Shop
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-primary">Shopping Cart</h1>
            <p className="text-muted-foreground">
              {state.items.length} {state.items.length === 1 ? 'item' : 'items'} in your cart
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {state.items.length === 0 ? (
              <Card className="shadow-card">
                <CardContent className="flex flex-col items-center justify-center py-16">
                  <ShoppingCart className="h-16 w-16 text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold text-primary mb-2">Your cart is empty</h3>
                  <p className="text-muted-foreground mb-6">Add some wines to get started!</p>
                  <Button 
                    onClick={() => navigate('/')}
                    className="bg-gradient-wine hover:shadow-glow"
                  >
                    Continue Shopping
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <>
                {state.items.map((item) => (
                  <Card key={item.id} className="shadow-card">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        {item.image && (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                        )}
                        
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg text-primary">{item.name}</h3>
                          <Badge variant="outline" className="mb-2">
                            {item.type === 'ready-made' ? 'Ready-Made' : 'Custom Wine'}
                          </Badge>
                          
                          {item.alcohol && (
                            <p className="text-sm text-muted-foreground mb-1">
                              {item.alcohol} ABV
                            </p>
                          )}
                          
                          {item.ingredients && (
                            <div className="flex flex-wrap gap-1 mb-2">
                              {item.ingredients.slice(0, 3).map((ingredient) => (
                                <Badge key={ingredient} variant="secondary" className="text-xs">
                                  {ingredient}
                                </Badge>
                              ))}
                              {item.ingredients.length > 3 && (
                                <Badge variant="secondary" className="text-xs">
                                  +{item.ingredients.length - 3} more
                                </Badge>
                              )}
                            </div>
                          )}
                        </div>

                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="text-right">
                          <p className="font-bold text-lg text-wine-burgundy">
                            ₱{(item.price * item.quantity).toLocaleString()}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            ₱{item.price.toLocaleString()} each
                          </p>
                        </div>

                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                <div className="flex justify-between items-center">
                  <Button
                    variant="outline"
                    onClick={clearCart}
                    className="text-red-500 border-red-200 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear Cart
                  </Button>
                </div>
              </>
            )}
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card className="sticky top-8 shadow-premium">
              <CardHeader>
                <CardTitle className="flex items-center text-wine-burgundy">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Subtotal ({state.items.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                    <span>₱{state.total.toLocaleString()}</span>
                  </div>
                  
                  {state.total > 0 && (
                    <div className="flex justify-between">
                      <span>Delivery Fee</span>
                      <span>₱{deliveryFee}</span>
                    </div>
                  )}
                  
                  <Separator />
                  
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-wine-burgundy">₱{grandTotal.toLocaleString()}</span>
                  </div>
                </div>

                <Button 
                  onClick={handleCheckout}
                  disabled={state.items.length === 0}
                  className="w-full bg-gradient-wine hover:shadow-glow"
                >
                  Proceed to Checkout
                </Button>

                <div className="bg-gradient-card p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Heart className="h-4 w-4 text-wine-burgundy" />
                    <span className="font-medium text-sm">Social Impact</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Your purchase will help feed approximately{' '}
                    <strong>{Math.floor(grandTotal / 50)} street children</strong> for one day.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;