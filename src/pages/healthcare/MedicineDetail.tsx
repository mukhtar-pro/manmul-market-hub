
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { 
  Star, 
  ThumbsUp, 
  ShoppingCart, 
  Minus, 
  Plus, 
  ChevronLeft,
  AlertCircle
} from "lucide-react";
import { medicines, medicineFeedback } from "@/data/mockData";
import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const MedicineDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const { toast } = useToast();
  
  // Find the medicine by id
  const medicine = medicines.find(m => m.id === id);
  
  // If medicine not found
  if (!medicine) {
    return (
      <MainLayout>
        <div className="manmul-container text-center py-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Medicine Not Found</h2>
          <p className="text-gray-600 mb-6">The medicine you're looking for doesn't exist or has been removed.</p>
          <Link to="/healthcare">
            <Button>
              <ChevronLeft size={16} className="mr-2" />
              Back to Healthcare
            </Button>
          </Link>
        </div>
      </MainLayout>
    );
  }
  
  // Mock feedback for this medicine
  const feedback = medicineFeedback?.filter(f => f.medicineId === id) || [];
  
  // Handle add to cart
  const handleAddToCart = () => {
    toast({
      title: "Added to cart",
      description: `${quantity} ${quantity > 1 ? 'items' : 'item'} added to your cart`,
      duration: 3000,
    });
  };
  
  // Handle quantity change
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const increaseQuantity = () => {
    if (quantity < (medicine.inStock ? 10 : 0)) {
      setQuantity(quantity + 1);
    }
  };

  return (
    <MainLayout>
      <div className="manmul-container">
        {/* Back button */}
        <div className="mb-6">
          <Link to="/healthcare" className="flex items-center text-manmul-600 hover:text-manmul-700">
            <ChevronLeft size={18} />
            <span className="ml-1">Back to Healthcare</span>
          </Link>
        </div>
        
        {/* Medicine details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Medicine image */}
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="aspect-square bg-gray-100 rounded-md flex items-center justify-center overflow-hidden">
              <img
                src={medicine.image}
                alt={medicine.name}
                className="object-contain max-w-full max-h-full"
              />
            </div>
          </div>
          
          {/* Medicine info */}
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{medicine.name}</h1>
            
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge className="bg-blue-500 hover:bg-blue-600">
                {medicine.category}
              </Badge>
              
              {medicine.requiresPrescription && (
                <Badge className="bg-red-500 hover:bg-red-600">
                  <AlertCircle size={12} className="mr-1" />
                  Requires Prescription
                </Badge>
              )}
            </div>
            
            <div className="mb-4">
              <span className="text-3xl font-bold text-gray-900">${medicine.price.toFixed(2)}</span>
            </div>
            
            <p className="text-gray-700 mb-6">{medicine.description}</p>
            
            <div className="mb-6">
              <div className="flex items-center">
                <span className="text-gray-700 mr-4">Availability:</span>
                <span className={`font-medium ${medicine.inStock ? 'text-green-600' : 'text-red-500'}`}>
                  {medicine.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
            </div>
            
            {medicine.inStock && (
              <>
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
                        disabled={quantity >= 10}
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
              </>
            )}
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
              <p className="text-gray-600 text-center py-6">No feedback yet for this medication.</p>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default MedicineDetail;
