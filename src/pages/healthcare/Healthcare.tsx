
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import MedicineCard from "@/components/healthcare/MedicineCard";
import Pagination from "@/components/common/Pagination";
import { medicines } from "@/data/mockData";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

const HealthcarePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const medicinesPerPage = 9;
  
  const { addItem } = useCart();
  
  // Get unique categories
  const categories = Array.from(new Set(medicines.map(medicine => medicine.category)));
  
  // Filter medicines by category and search query
  const filteredMedicines = medicines
    .filter(medicine => selectedCategory === "all" || medicine.category === selectedCategory)
    .filter(medicine => 
      searchQuery === "" || 
      medicine.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      medicine.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  
  // Calculate medicines for the current page
  const indexOfLastMedicine = currentPage * medicinesPerPage;
  const indexOfFirstMedicine = indexOfLastMedicine - medicinesPerPage;
  const currentMedicines = filteredMedicines.slice(indexOfFirstMedicine, indexOfLastMedicine);
  const totalPages = Math.ceil(filteredMedicines.length / medicinesPerPage);
  
  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  
  // Handle category change
  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    setCurrentPage(1); // Reset to first page when changing category
  };
  
  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is already handled by the filter above
    setCurrentPage(1); // Reset to first page when searching
  };

  // Handle add to cart
  const handleAddToCart = (medicine: any) => {
    addItem(
      {
        id: medicine.id,
        name: medicine.name,
        price: medicine.price,
        image: medicine.image,
        type: 'medicine'
      },
      1
    );
  };

  return (
    <MainLayout>
      <div className="manmul-container">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Healthcare Products</h1>
        
        {/* Search and Filter */}
        <div className="bg-white p-4 rounded-lg shadow-sm border mb-6">
          <div className="flex flex-col md:flex-row md:items-end space-y-4 md:space-y-0 md:space-x-4">
            {/* Search */}
            <div className="flex-1">
              <form onSubmit={handleSearch}>
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Search medications..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pr-12"
                  />
                  <Button 
                    type="submit"
                    size="icon"
                    variant="ghost" 
                    className="absolute right-0 top-0 h-full"
                  >
                    <Search size={18} />
                  </Button>
                </div>
              </form>
            </div>
            
            {/* Category Filter */}
            <div className="w-full md:w-auto">
              <div className="flex items-center">
                <Filter size={18} className="mr-2 text-gray-500" />
                
                <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
        
        {/* Medicine listing */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {currentMedicines.map(medicine => (
            <MedicineCard 
              key={medicine.id}
              id={medicine.id}
              name={medicine.name}
              image={medicine.image}
              price={medicine.price}
              category={medicine.category}
              description={medicine.description}
              inStock={medicine.inStock}
              requiresPrescription={medicine.requiresPrescription}
              onAddToCart={() => handleAddToCart(medicine)}
            />
          ))}
        </div>
        
        {/* Show message when no medicines are found */}
        {currentMedicines.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-700 mb-2">No medications found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
          </div>
        )}
        
        {/* Pagination */}
        {filteredMedicines.length > medicinesPerPage && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            totalItems={filteredMedicines.length}
          />
        )}
      </div>
    </MainLayout>
  );
};

export default HealthcarePage;
