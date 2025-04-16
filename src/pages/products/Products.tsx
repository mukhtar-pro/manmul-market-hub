
import { useState, useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
import CategorySidebar from "@/components/product/CategorySidebar";
import FilterBar, { FilterOptions } from "@/components/product/FilterBar";
import ProductCard from "@/components/product/ProductCard";
import Pagination from "@/components/common/Pagination";
import { products } from "@/data/mockData";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const ProductsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterOptions>({
    sortBy: "featured",
    priceRange: "all",
    rating: "all"
  });
  
  const isMobile = useIsMobile();
  const productsPerPage = 12;
  
  // Filter products by category
  const filterByCategory = (products: any[]) => {
    if (!selectedCategory) return products;
    return products.filter(product => product.category === selectedCategory);
  };
  
  // Filter products by price range
  const filterByPriceRange = (products: any[]) => {
    switch (filters.priceRange) {
      case "under25":
        return products.filter(product => product.price < 25);
      case "25to50":
        return products.filter(product => product.price >= 25 && product.price < 50);
      case "50to100":
        return products.filter(product => product.price >= 50 && product.price < 100);
      case "over100":
        return products.filter(product => product.price >= 100);
      default:
        return products;
    }
  };
  
  // Filter products by rating
  const filterByRating = (products: any[]) => {
    switch (filters.rating) {
      case "4plus":
        return products.filter(product => product.rating >= 4);
      case "3plus":
        return products.filter(product => product.rating >= 3);
      case "2plus":
        return products.filter(product => product.rating >= 2);
      case "1plus":
        return products.filter(product => product.rating >= 1);
      default:
        return products;
    }
  };
  
  // Sort products
  const sortProducts = (products: any[]) => {
    switch (filters.sortBy) {
      case "price-low":
        return [...products].sort((a, b) => a.price - b.price);
      case "price-high":
        return [...products].sort((a, b) => b.price - a.price);
      case "rating":
        return [...products].sort((a, b) => b.rating - a.rating);
      case "newest":
        return [...products].sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
      default:
        return products;
    }
  };
  
  // Apply all filters
  const filteredProducts = sortProducts(
    filterByRating(
      filterByPriceRange(
        filterByCategory(products)
      )
    )
  );
  
  // Calculate products for the current page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  
  // Handle category selection
  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId === selectedCategory ? null : categoryId);
    setCurrentPage(1); // Reset to first page when changing category
  };
  
  // Handle filter changes
  const handleFilterChange = (key: keyof FilterOptions, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1); // Reset to first page when changing filters
  };
  
  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, filters]);

  return (
    <MainLayout>
      <div className="manmul-container">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Browse Products</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Category Sidebar - Hidden on mobile */}
          {!isMobile ? (
            <div className="col-span-1">
              <CategorySidebar 
                selectedCategory={selectedCategory}
                onSelectCategory={handleCategorySelect}
              />
            </div>
          ) : (
            <Sheet>
              <SheetTrigger asChild>
                <Button 
                  variant="outline" 
                  className="mb-4 flex items-center"
                >
                  <Filter size={18} className="mr-2" />
                  Categories
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>Categories</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <CategorySidebar 
                    selectedCategory={selectedCategory}
                    onSelectCategory={handleCategorySelect}
                  />
                </div>
              </SheetContent>
            </Sheet>
          )}
          
          {/* Main Content */}
          <div className="col-span-1 md:col-span-3">
            {/* Filter Bar */}
            <FilterBar 
              filters={filters}
              onFilterChange={handleFilterChange}
            />
            
            {/* Products Grid */}
            {currentProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {currentProducts.map((product) => (
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
            ) : (
              <div className="bg-white border rounded-lg p-8 text-center">
                <h3 className="text-lg font-medium mb-2">No products found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your filters or selecting a different category</p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSelectedCategory(null);
                    setFilters({
                      sortBy: "featured",
                      priceRange: "all",
                      rating: "all"
                    });
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            )}
            
            {/* Pagination */}
            {filteredProducts.length > 0 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProductsPage;
