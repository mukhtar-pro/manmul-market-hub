
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import ShopCard from "@/components/shop/ShopCard";
import Pagination from "@/components/common/Pagination";
import { shops } from "@/data/mockData";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin } from "lucide-react";

const ShopsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCity, setSelectedCity] = useState<string>("all");
  const shopsPerPage = 6;
  
  // Filter shops by city
  const filteredShops = selectedCity === "all" 
    ? shops 
    : shops.filter(shop => shop.city === selectedCity);
  
  // Get unique cities
  const cities = Array.from(new Set(shops.map(shop => shop.city)));
  
  // Calculate shops for the current page
  const indexOfLastShop = currentPage * shopsPerPage;
  const indexOfFirstShop = indexOfLastShop - shopsPerPage;
  const currentShops = filteredShops.slice(indexOfFirstShop, indexOfLastShop);
  const totalPages = Math.ceil(filteredShops.length / shopsPerPage);
  
  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  
  // Handle city change
  const handleCityChange = (value: string) => {
    setSelectedCity(value);
    setCurrentPage(1); // Reset to first page when changing city
  };

  return (
    <MainLayout>
      <div className="manmul-container">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Browse Shops</h1>
        
        {/* Area/City Selector */}
        <div className="bg-white p-4 rounded-lg shadow-sm border mb-6">
          <div className="flex items-center">
            <MapPin size={18} className="mr-2 text-gray-500" />
            <h3 className="text-base font-medium text-gray-700 mr-4">Select Location:</h3>
            
            <Select value={selectedCity} onValueChange={handleCityChange}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select city" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Cities</SelectItem>
                {cities.map(city => (
                  <SelectItem key={city} value={city}>{city}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Shop listing */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {currentShops.map(shop => (
            <ShopCard 
              key={shop.id}
              id={shop.id}
              name={shop.name}
              avatar={shop.avatar}
              address={shop.address}
              city={shop.city}
              productCount={shop.productCount}
              followers={shop.followers}
              rating={Number(shop.rating)}
            />
          ))}
        </div>
        
        {/* Show message when no shops are found */}
        {currentShops.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-700 mb-2">No shops found</h3>
            <p className="text-gray-600">Try selecting a different city or checking back later.</p>
          </div>
        )}
        
        {/* Pagination */}
        {filteredShops.length > shopsPerPage && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </MainLayout>
  );
};

export default ShopsPage;
