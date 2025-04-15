
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import CategorySidebar from "@/components/product/CategorySidebar";
import FilterBar from "@/components/product/FilterBar";
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
  const isMobile = useIsMobile();
  const productsPerPage = 12;
  
  // Calculate products for the current page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(products.length / productsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <MainLayout>
      <div className="manmul-container">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Browse Products</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Category Sidebar - Hidden on mobile */}
          {!isMobile ? (
            <div className="col-span-1">
              <CategorySidebar />
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
                  <CategorySidebar />
                </div>
              </SheetContent>
            </Sheet>
          )}
          
          {/* Main Content */}
          <div className="col-span-1 md:col-span-3">
            {/* Filter Bar */}
            <FilterBar />
            
            {/* Products Grid */}
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
            
            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProductsPage;
