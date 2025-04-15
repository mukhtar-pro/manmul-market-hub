
import { useState } from "react";
import { Link } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  CreditCard,
  CheckCircle2
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import { products, medicines } from "@/data/mockData";

// Mock cart items combining products and medicines
const initialCartItems = [
  {
    id: "cart-1",
    productId: products[0].id,
    name: products[0].name,
    price: products[0].price,
    image: products[0].image,
    quantity: 1,
    type: "product"
  },
  {
    id: "cart-2",
    productId: products[3].id,
    name: products[3].name,
    price: products[3].price,
    image: products[3].image,
    quantity: 2,
    type: "product"
  },
  {
    id: "cart-3",
    productId: medicines[1].id,
    name: medicines[1].name,
    price: medicines[1].price,
    image: medicines[1].image,
    quantity: 1,
    type: "medicine"
  }
];

const CartPage = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const { toast } = useToast();
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  
  // Calculate totals
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const shippingCost = subtotal > 100 ? 0 : 10;
  const total = subtotal + shippingCost;
  
  // Handle quantity change
  const handleQuantityChange = (id: string, change: number) => {
    setCartItems(prevItems => 
      prevItems.map(item => {
        if (item.id === id) {
          const newQuantity = Math.max(1, item.quantity + change);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };
  
  // Handle remove item
  const handleRemoveItem = (id: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    
    toast({
      title: "Item removed",
      description: "The item has been removed from your cart.",
      duration: 3000,
    });
  };
  
  // Handle checkout
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast({
        title: "Empty Cart",
        description: "Your cart is empty. Add some items before checkout.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    
    setIsProcessingPayment(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessingPayment(false);
      setCartItems([]);
      
      toast({
        title: "Payment Successful",
        description: "Your order has been placed successfully!",
        duration: 5000,
      });
    }, 2000);
  };

  return (
    <MainLayout>
      <div className="manmul-container">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Your Shopping Cart</h1>
        
        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm border">
                {/* Header */}
                <div className="p-4 border-b">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium text-gray-800">
                      Cart ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})
                    </h3>
                  </div>
                </div>
                
                {/* Items */}
                <div className="divide-y">
                  {cartItems.map((item) => (
                    <div key={item.id} className="p-4 flex">
                      <div className="mr-4">
                        <div className="w-20 h-20 bg-gray-100 rounded-md overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <div>
                            <h4 className="font-medium text-gray-800">{item.name}</h4>
                            <div className="text-sm text-gray-500 mt-1">
                              Type: {item.type === 'product' ? 'Product' : 'Medicine'}
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <div className="font-medium">${(item.price * item.quantity).toFixed(2)}</div>
                            <div className="text-sm text-gray-500 mt-1">${item.price.toFixed(2)} each</div>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center mt-4">
                          <div className="flex items-center">
                            <Button 
                              variant="outline" 
                              size="icon" 
                              className="h-8 w-8" 
                              onClick={() => handleQuantityChange(item.id, -1)}
                            >
                              <Minus size={14} />
                            </Button>
                            <span className="mx-3">{item.quantity}</span>
                            <Button 
                              variant="outline" 
                              size="icon" 
                              className="h-8 w-8" 
                              onClick={() => handleQuantityChange(item.id, 1)}
                            >
                              <Plus size={14} />
                            </Button>
                          </div>
                          
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleRemoveItem(item.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 size={16} className="mr-1" />
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border p-4 sticky top-24">
                <h3 className="font-semibold text-lg mb-4">Order Summary</h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">
                      {shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}
                    </span>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between">
                    <span className="font-semibold">Total</span>
                    <span className="font-semibold">${total.toFixed(2)}</span>
                  </div>
                </div>
                
                <Button 
                  className="w-full mt-6"
                  size="lg"
                  onClick={handleCheckout}
                  disabled={isProcessingPayment}
                >
                  {isProcessingPayment ? (
                    <>Processing...</>
                  ) : (
                    <>
                      <CreditCard size={18} className="mr-2" />
                      Proceed to Checkout
                    </>
                  )}
                </Button>
                
                <div className="mt-4 text-center">
                  <Link to="/products" className="text-manmul-600 hover:text-manmul-700 text-sm">
                    <ShoppingBag size={16} className="inline mr-1" />
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
            <div className="w-16 h-16 bg-manmul-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingBag size={24} className="text-manmul-600" />
            </div>
            
            <h3 className="text-lg font-medium text-gray-800 mb-2">Your cart is empty</h3>
            <p className="text-gray-600 mb-6">Looks like you haven't added anything to your cart yet.</p>
            
            <Button asChild>
              <Link to="/products">
                <ShoppingBag size={18} className="mr-2" />
                Start Shopping
              </Link>
            </Button>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default CartPage;
