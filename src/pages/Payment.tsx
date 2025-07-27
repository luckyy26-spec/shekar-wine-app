import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  CreditCard, 
  MapPin, 
  User, 
  Mail, 
  Phone, 
  Heart,
  Truck,
  Receipt,
  Share2,
  Download,
  CheckCircle,
  ArrowLeft
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Payment = () => {
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  
  const [paymentStep, setPaymentStep] = useState(1); // 1: Details, 2: Payment, 3: Confirmation
  const [customerInfo, setCustomerInfo] = useState({
    fullName: "",
    email: "",
    contactNumber: "",
    address: "",
    specialInstructions: ""
  });
  const [deliveryOption, setDeliveryOption] = useState("standard");
  const [printReceipt, setPrintReceipt] = useState(false);
  const [sharePayment, setSharePayment] = useState(false);

  // Get payment type and data from URL params
  const paymentType = searchParams.get('type') || 'wine';
  const amount = searchParams.get('amount') || '1000';
  const cartDataParam = searchParams.get('cartData');
  const wineDataParam = searchParams.get('wineData');
  
  // Parse cart or wine data
  const cartData = cartDataParam ? JSON.parse(decodeURIComponent(cartDataParam)) : null;
  const wineData = wineDataParam ? JSON.parse(decodeURIComponent(wineDataParam)) : null;
  
  const isDonation = paymentType === 'donation' || paymentType === 'custom-donation';
  const isCart = paymentType === 'cart' && cartData;
  const isCustomWine = paymentType === 'custom' && wineData;
  
  const baseAmount = isCart ? cartData.total : parseInt(amount);
  const deliveryFee = isDonation ? 0 : (deliveryOption === 'express' ? 200 : 100);
  const total = baseAmount + deliveryFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (paymentStep === 1) {
      // Validate customer info
      if (!customerInfo.fullName || !customerInfo.email || !customerInfo.contactNumber || !customerInfo.address) {
        toast({
          title: "Missing Information",
          description: "Please fill in all required fields.",
          variant: "destructive"
        });
        return;
      }
      setPaymentStep(2);
    } else if (paymentStep === 2) {
      // Process payment (simulate GCash payment)
      setPaymentStep(3);
      toast({
        title: "Payment Successful!",
        description: `Your ${isDonation ? 'donation' : 'order'} has been confirmed. Thank you for helping feed street children!`,
      });
    }
  };

  const goBack = () => {
    if (paymentStep > 1) {
      setPaymentStep(paymentStep - 1);
    } else {
      window.history.back();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-silver py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button variant="ghost" onClick={goBack} className="mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-primary">
              {isDonation ? 'Make a Donation' : isCart ? 'Complete Your Order' : isCustomWine ? 'Order Custom Wine' : 'Complete Your Order'}
            </h1>
            <p className="text-muted-foreground">
              Step {paymentStep} of 3 - {paymentStep === 1 ? 'Customer Information' : paymentStep === 2 ? 'Payment' : 'Confirmation'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {paymentStep === 1 && (
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="mr-2 h-5 w-5 text-wine-burgundy" />
                    Customer Information
                  </CardTitle>
                  <CardDescription>
                    Please provide your contact and delivery information
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="fullName">Full Name *</Label>
                        <Input
                          id="fullName"
                          value={customerInfo.fullName}
                          onChange={(e) => setCustomerInfo({...customerInfo, fullName: e.target.value})}
                          placeholder="Enter your full name"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={customerInfo.email}
                          onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                          placeholder="Enter your email"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="contactNumber">Contact Number *</Label>
                      <Input
                        id="contactNumber"
                        value={customerInfo.contactNumber}
                        onChange={(e) => setCustomerInfo({...customerInfo, contactNumber: e.target.value})}
                        placeholder="+63 9XX XXX XXXX"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="address">Complete Address *</Label>
                      <Textarea
                        id="address"
                        value={customerInfo.address}
                        onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})}
                        placeholder="Enter your complete delivery address"
                        className="min-h-20"
                        required
                      />
                    </div>

                    {!isDonation && (
                      <div>
                        <Label htmlFor="delivery">Delivery Option</Label>
                        <Select value={deliveryOption} onValueChange={setDeliveryOption}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="standard">Standard Delivery (3-5 days) - ₱100</SelectItem>
                            <SelectItem value="express">Express Delivery (1-2 days) - ₱200</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    <div>
                      <Label htmlFor="instructions">Special Instructions (Optional)</Label>
                      <Textarea
                        id="instructions"
                        value={customerInfo.specialInstructions}
                        onChange={(e) => setCustomerInfo({...customerInfo, specialInstructions: e.target.value})}
                        placeholder="Any special delivery instructions..."
                        className="min-h-16"
                      />
                    </div>

                    <Button type="submit" className="w-full bg-gradient-wine hover:shadow-glow">
                      Continue to Payment
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}

            {paymentStep === 2 && (
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCard className="mr-2 h-5 w-5 text-wine-burgundy" />
                    GCash Payment
                  </CardTitle>
                  <CardDescription>
                    Complete your payment using GCash
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* GCash Payment Section */}
                    <div className="bg-gradient-card p-6 rounded-lg border-2 border-wine-burgundy">
                      <div className="flex items-center justify-center mb-4">
                        <div className="bg-wine-burgundy text-white px-4 py-2 rounded-lg font-bold">
                          GCash
                        </div>
                      </div>
                      <div className="text-center space-y-4">
                        <div>
                          <p className="font-semibold">Send payment to:</p>
                          <p className="text-lg font-mono bg-white p-2 rounded border">
                            +63 917 123 4567
                          </p>
                          <p className="text-sm text-muted-foreground">Shekar Wine Co.</p>
                        </div>
                        
                        <div>
                          <p className="font-semibold">Amount to Send:</p>
                          <p className="text-3xl font-bold text-wine-burgundy">
                            ₱{total.toLocaleString()}
                          </p>
                        </div>

                        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                          <p className="text-sm font-medium text-yellow-800">
                            📱 Instructions:
                          </p>
                          <ol className="text-sm text-yellow-700 mt-2 space-y-1 text-left">
                            <li>1. Open your GCash app</li>
                            <li>2. Select "Send Money"</li>
                            <li>3. Enter the number above</li>
                            <li>4. Enter the exact amount: ₱{total.toLocaleString()}</li>
                            <li>5. Add reference: "{isDonation ? 'DONATION' : 'WINE'}-{Date.now().toString().slice(-6)}"</li>
                            <li>6. Complete the transaction</li>
                          </ol>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="receipt" 
                          checked={printReceipt}
                          onCheckedChange={(checked) => setPrintReceipt(checked === true)}
                        />
                        <Label htmlFor="receipt">Email me a receipt</Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="share" 
                          checked={sharePayment}
                          onCheckedChange={(checked) => setSharePayment(checked === true)}
                        />
                        <Label htmlFor="share">Allow sharing this payment to inspire others</Label>
                      </div>
                    </div>

                    <Button 
                      onClick={handleSubmit} 
                      className="w-full bg-gradient-wine hover:shadow-glow"
                    >
                      Confirm Payment Sent
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {paymentStep === 3 && (
              <Card className="shadow-card">
                <CardHeader className="text-center">
                  <div className="mx-auto bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <CardTitle className="text-2xl text-green-600">
                    {isDonation ? 'Donation Successful!' : 'Order Confirmed!'}
                  </CardTitle>
                  <CardDescription>
                    Thank you for helping feed street children!
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-gradient-card p-4 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-medium">Transaction ID:</p>
                        <p className="font-mono">{isDonation ? 'DON' : 'ORD'}-{Date.now().toString().slice(-8)}</p>
                      </div>
                      <div>
                        <p className="font-medium">Amount Paid:</p>
                        <p className="text-wine-burgundy font-bold">₱{total.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="font-medium">Payment Method:</p>
                        <p>GCash</p>
                      </div>
                      <div>
                        <p className="font-medium">Date:</p>
                        <p>{new Date().toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>

                  {!isDonation && (
                    <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                      <h4 className="font-medium text-blue-800 mb-2">
                        <Truck className="inline h-4 w-4 mr-1" />
                        What's Next?
                      </h4>
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>• Your order will be processed within 24 hours</li>
                        <li>• You'll receive an email confirmation shortly</li>
                        <li>• Estimated delivery: {deliveryOption === 'express' ? '1-2 days' : '3-5 days'}</li>
                        <li>• Track your order via email updates</li>
                      </ul>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-4">
                    {printReceipt && (
                      <Button variant="outline" className="flex-1">
                        <Download className="mr-2 h-4 w-4" />
                        Download Receipt
                      </Button>
                    )}
                    
                    {sharePayment && (
                      <Button variant="outline" className="flex-1">
                        <Share2 className="mr-2 h-4 w-4" />
                        Share Impact
                      </Button>
                    )}
                    
                    <Button 
                      className="flex-1 bg-gradient-wine hover:shadow-glow"
                      onClick={() => window.location.href = '/'}
                    >
                      Continue Shopping
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="space-y-6">
            <Card className="sticky top-8 shadow-premium">
              <CardHeader>
                <CardTitle className="flex items-center text-wine-burgundy">
                  {isDonation ? (
                    <Heart className="mr-2 h-5 w-5" />
                  ) : (
                    <Receipt className="mr-2 h-5 w-5" />
                  )}
                  {isDonation ? 'Donation Summary' : isCart ? 'Cart Summary' : isCustomWine ? 'Custom Wine Summary' : 'Order Summary'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Order Items Display */}
                {isCart && cartData?.items && (
                  <div className="space-y-3 mb-4">
                    <h4 className="font-medium text-sm">Order Items:</h4>
                    {cartData.items.map((item: any, index: number) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span>{item.name} (x{item.quantity})</span>
                        <span>₱{(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                )}
                
                {isCustomWine && wineData && (
                  <div className="space-y-3 mb-4">
                    <h4 className="font-medium text-sm">Custom Wine Details:</h4>
                    <div className="text-sm space-y-1">
                      <p><strong>Name:</strong> {wineData.name}</p>
                      <p><strong>Main Flavor:</strong> {wineData.flavor}</p>
                      <p><strong>Alcohol:</strong> {wineData.alcoholPercentage}%</p>
                      <p><strong>Bottle Size:</strong> {wineData.bottle}</p>
                      {wineData.fruits?.length > 0 && (
                        <p><strong>Fruits:</strong> {wineData.fruits.join(', ')}</p>
                      )}
                      {wineData.necklace && (
                        <p><strong>Add-on:</strong> {wineData.necklace}</p>
                      )}
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>{isDonation ? 'Donation Amount' : 'Subtotal'}</span>
                    <span>₱{baseAmount.toLocaleString()}</span>
                  </div>
                  
                  {!isDonation && (
                    <div className="flex justify-between">
                      <span>Delivery Fee</span>
                      <span>₱{deliveryFee}</span>
                    </div>
                  )}
                  
                  <Separator />
                  
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-wine-burgundy">₱{total.toLocaleString()}</span>
                  </div>
                </div>

                <div className="bg-gradient-card p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Heart className="h-4 w-4 text-wine-burgundy" />
                    <span className="font-medium text-sm">Social Impact</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Your {isDonation ? 'donation' : 'purchase'} will help feed approximately{' '}
                    <strong>{Math.floor(total / 50)} street children</strong> for one day.
                  </p>
                </div>

                {paymentStep === 1 && customerInfo.fullName && (
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Customer Information</h4>
                    <div className="text-sm space-y-1">
                      <p><strong>Name:</strong> {customerInfo.fullName}</p>
                      <p><strong>Email:</strong> {customerInfo.email}</p>
                      <p><strong>Phone:</strong> {customerInfo.contactNumber}</p>
                      {customerInfo.address && (
                        <p><strong>Address:</strong> {customerInfo.address.substring(0, 50)}...</p>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Security Badge */}
            <Card className="shadow-card">
              <CardContent className="p-4">
                <div className="text-center space-y-2">
                  <div className="text-green-600">
                    <CheckCircle className="h-8 w-8 mx-auto" />
                  </div>
                  <p className="text-sm font-medium">Secure Payment</p>
                  <p className="text-xs text-muted-foreground">
                    Your payment is protected by GCash's secure payment system
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

export default Payment;