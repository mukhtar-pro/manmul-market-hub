
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { 
  ShoppingBag, 
  Store, 
  Heart, 
  Clock,
  ArrowRight
} from "lucide-react";
import { products } from "@/data/mockData";
import ProductCard from "@/components/product/ProductCard";
import HomeCarousel from "@/components/home/HomeCarousel";

const Index = () => {
  const navigate = useNavigate();
  const featuredProducts = products.slice(0, 6);
  
  return (
    <MainLayout>
      <div className="manmul-container">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-manmul-100 to-green-50 rounded-lg p-8 mb-12">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-6 md:mb-0">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Welcome to ManMulShop
              </h1>
              <p className="text-lg text-gray-600 mb-6">
                Your one-stop destination for all your shopping needs. Browse through our wide range of products and find exactly what you're looking for.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" onClick={() => navigate("/products")}>
                  <ShoppingBag size={18} className="mr-2" />
                  Shop Now
                </Button>
                <Button variant="outline" size="lg" onClick={() => navigate("/shops")}>
                  <Store size={18} className="mr-2" />
                  Find Shops
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center md:justify-end">
              <img 
                src="/lovable-uploads/845c676e-9a0a-4fd5-81e1-0fe046b78a3a.png" 
                alt="ManMulShop Logo" 
                className="max-w-full max-h-72 object-contain"
              />
            </div>
          </div>
        </div>
        
        {/* Carousel Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Featured Promotions</h2>
          <HomeCarousel />
        </div>
        
        {/* Categories Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Browse Categories</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div 
              className="bg-blue-50 rounded-lg p-6 text-center cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => navigate("/products")}
            >
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag size={24} className="text-blue-600" />
              </div>
              <h3 className="font-medium text-gray-800">Products</h3>
              <p className="text-sm text-gray-600 mt-2">Browse all products</p>
            </div>
            
            <div 
              className="bg-purple-50 rounded-lg p-6 text-center cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => navigate("/shops")}
            >
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Store size={24} className="text-purple-600" />
              </div>
              <h3 className="font-medium text-gray-800">Shops</h3>
              <p className="text-sm text-gray-600 mt-2">Find nearby shops</p>
            </div>
            
            <div 
              className="bg-red-50 rounded-lg p-6 text-center cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => navigate("/healthcare")}
            >
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart size={24} className="text-red-600" />
              </div>
              <h3 className="font-medium text-gray-800">Healthcare</h3>
              <p className="text-sm text-gray-600 mt-2">Health products</p>
            </div>
            
            <div 
              className="bg-amber-50 rounded-lg p-6 text-center cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => navigate("/history")}
            >
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock size={24} className="text-amber-600" />
              </div>
              <h3 className="font-medium text-gray-800">Orders</h3>
              <p className="text-sm text-gray-600 mt-2">View your orders</p>
            </div>
          </div>
        </div>
        
        {/* Featured Products */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Featured Products</h2>
            <Button variant="ghost" onClick={() => navigate("/products")}>
              View All
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map(product => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                image={product.image || "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=2080&auto=format&fit=crop"}
                price={product.price}
                rating={Number(product.rating)}
                upvotes={product.upvotes}
              />
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
