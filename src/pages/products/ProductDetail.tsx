import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { 
  Star, 
  ThumbsUp, 
  ThumbsDown, 
  ShoppingCart, 
  Minus, 
  Plus, 
  ChevronLeft 
} from "lucide-react";
import { products, productFeedback } from "@/data/mockData";
import { useCart } from "@/contexts/CartContext";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  
  // Find the product by id
  const product = products.find(p => p.id === id);
  
  // If product not found
  if (!product) {
    return (
      <MainLayout>
        <div className="manmul-container text-center py-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h2>
          <p className="text-gray-600 mb-6">The product you're looking for doesn't exist or has been removed.</p>
          <Link to="/products">
            <Button>
              <ChevronLeft size={16} className="mr-2" />
              Back to Products
            </Button>
          </Link>
        </div>
      </MainLayout>
    );
  }
  
  // Filter feedback for this product - use id instead of productId
  const feedback = productFeedback.filter(item => item.id.includes(id || '')).slice(0, 5);
  
  // Handle add to cart
  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      type: 'product'
    }, quantity);
  };
  
  // Handle quantity change
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const increaseQuantity = () => {
    if (quantity < (product.stock || 10)) {
      setQuantity(quantity + 1);
    }
  };

  return (
    <MainLayout>
      <div className="manmul-container">
        {/* Back button */}
        <div className="mb-6">
          <Link to="/products" className="flex items-center text-manmul-600 hover:text-manmul-700">
            <ChevronLeft size={18} />
            <span className="ml-1">Back to Products</span>
          </Link>
        </div>
        
        {/* Product details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Product image */}
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="aspect-square bg-gray-100 rounded-md flex items-center justify-center overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="object-contain max-w-full max-h-full"
              />
            </div>
          </div>
          
          {/* Product info */}
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
            
            <div className="flex items-center mb-4">
              <div className="flex items-center mr-4">
                <Star size={16} className="text-yellow-500 fill-yellow-500 mr-1" />
                <span className="text-gray-700">{product.rating}</span>
              </div>
              
              <div className="flex items-center space-x-4">
                <button className="flex items-center text-gray-600 hover:text-blue-500 transition-colors">
                  <ThumbsUp size={16} className="mr-1" />
                  <span>{product.upvotes}</span>
                </button>
                
                <button className="flex items-center text-gray-600 hover:text-red-500 transition-colors">
                  <ThumbsDown size={16} className="mr-1" />
                  <span>12</span>
                </button>
              </div>
            </div>
            
            <div className="mb-4">
              <span className="text-3xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
              {product.price > 30 && (
                <span className="ml-2 text-sm text-green-600">Free Shipping</span>
              )}
            </div>
            
            <p className="text-gray-700 mb-6">{product.description}</p>
            
            <div className="mb-6">
              <div className="flex items-center">
                <span className="text-gray-700 mr-4">Stock:</span>
                <span className={`font-medium ${product.stock > 10 ? 'text-green-600' : 'text-orange-500'}`}>
                  {product.stock > 0 ? `${product.stock} available` : 'Out of stock'}
                </span>
              </div>
            </div>
            
            <div className="mb-6">
              <div className="flex items-center">
                <span className="text-gray-700 mr-4">Quantity:</span>
                <div className="flex items-center border rounded-md">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={decreaseQuantity}
                    disabled={quantity <= 1}
                    className="h-10 w-10 rounded-none"
                  >
                    <Minus size={16} />
                  </Button>
                  <span className="w-12 text-center">{quantity}</span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={increaseQuantity}
                    disabled={quantity >= (product.stock || 10)}
                    className="h-10 w-10 rounded-none"
                  >
                    <Plus size={16} />
                  </Button>
                </div>
              </div>
            </div>
            
            <Button 
              size="lg" 
              className="w-full md:w-auto"
              onClick={handleAddToCart}
            >
              <ShoppingCart size={18} className="mr-2" />
              Add to Cart
            </Button>
          </div>
        </div>
        
        {/* Customer Feedback */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Customer Feedback</h2>
          <Separator className="mb-6" />
          
          <div className="space-y-4">
            {feedback.length > 0 ? (
              feedback.map((item) => (
                <Card key={item.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-base">{item.userName}</CardTitle>
                        <CardDescription>
                          {new Date(item.date).toLocaleDateString()}
                        </CardDescription>
                      </div>
                      <div className="flex items-center">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star 
                            key={i}
                            size={16} 
                            className={i < item.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"} 
                          />
                        ))}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">{item.comment}</p>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="text-gray-600 text-center py-6">No feedback yet. Be the first to leave a review!</p>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProductDetail;
