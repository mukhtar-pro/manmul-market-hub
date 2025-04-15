
import { useParams, Link } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { 
  Store, 
  MapPin, 
  Package, 
  Users, 
  Star, 
  ChevronLeft,
  Share2
} from "lucide-react";
import { shops, products, shopFeedback } from "@/data/mockData";
import ProductCard from "@/components/product/ProductCard";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

const ShopDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  
  // Find the shop by id
  const shop = shops.find(s => s.id === id);
  
  // If shop not found
  if (!shop) {
    return (
      <MainLayout>
        <div className="manmul-container text-center py-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Shop Not Found</h2>
          <p className="text-gray-600 mb-6">The shop you're looking for doesn't exist or has been removed.</p>
          <Link to="/shops">
            <Button>
              <ChevronLeft size={16} className="mr-2" />
              Back to Shops
            </Button>
          </Link>
        </div>
      </MainLayout>
    );
  }
  
  // Get shop products (just using a slice of all products for demo)
  const shopProducts = products.slice(0, 6);
  
  // Filter feedback for this shop
  const feedback = shopFeedback.slice(0, 5); // Just showing 5 feedback items
  
  // Handle follow shop
  const handleFollowShop = () => {
    toast({
      title: "Shop Followed",
      description: `You are now following ${shop.name}`,
      duration: 3000,
    });
  };

  return (
    <MainLayout>
      <div className="manmul-container">
        {/* Back button */}
        <div className="mb-6">
          <Link to="/shops" className="flex items-center text-manmul-600 hover:text-manmul-700">
            <ChevronLeft size={18} />
            <span className="ml-1">Back to Shops</span>
          </Link>
        </div>
        
        {/* Shop Header */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="flex flex-col md:flex-row">
            <div className="mr-6 mb-4 md:mb-0">
              <div className="w-24 h-24 bg-gray-100 rounded-full overflow-hidden flex items-center justify-center border">
                {shop.avatar ? (
                  <img src={shop.avatar} alt={shop.name} className="w-full h-full object-cover" />
                ) : (
                  <Store size={48} className="text-gray-400" />
                )}
              </div>
            </div>
            
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{shop.name}</h1>
                  <div className="flex items-center mt-2">
                    <MapPin size={16} className="text-gray-500 mr-1" />
                    <span className="text-gray-700">{shop.address}</span>
                  </div>
                </div>
                
                <div className="flex space-x-3 mt-4 md:mt-0">
                  <Button onClick={handleFollowShop}>
                    Follow Shop
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share2 size={18} />
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="bg-gray-50 rounded-md p-3 text-center">
                  <div className="flex items-center justify-center text-gray-800 mb-1">
                    <Package size={16} className="mr-1" />
                    <span className="font-semibold">{shop.productCount}</span>
                  </div>
                  <span className="text-xs text-gray-600">Products</span>
                </div>
                
                <div className="bg-gray-50 rounded-md p-3 text-center">
                  <div className="flex items-center justify-center text-gray-800 mb-1">
                    <Users size={16} className="mr-1" />
                    <span className="font-semibold">{shop.followers}</span>
                  </div>
                  <span className="text-xs text-gray-600">Followers</span>
                </div>
                
                <div className="bg-gray-50 rounded-md p-3 text-center">
                  <div className="flex items-center justify-center text-gray-800 mb-1">
                    <Star size={16} className="mr-1 fill-yellow-500 text-yellow-500" />
                    <span className="font-semibold">{shop.rating}</span>
                  </div>
                  <span className="text-xs text-gray-600">Rating</span>
                </div>
              </div>
              
              <div className="mt-4">
                <p className="text-gray-700">{shop.description}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Shop Products */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">Shop Products</h2>
            <Link to="/products" className="text-manmul-600 hover:text-manmul-700 text-sm font-medium">
              View All
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {shopProducts.map(product => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                image={product.image}
                price={product.price}
                rating={Number(product.rating)}
                upvotes={product.upvotes}
              />
            ))}
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

export default ShopDetail;
