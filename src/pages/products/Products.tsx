
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCart } from "@/contexts/CartContext";

const ProductsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterOptions>({
    sortBy: "featured",
    priceRange: "all",
    rating: "all"
  });
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [moreFiltersOpen, setMoreFiltersOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  
  const isMobile = useIsMobile();
  const { addItem } = useCart();
  
  const filterByCategory = (products: any[]) => {
    if (!selectedCategory) return products;
    return products.filter(product => {
      if (product.category === selectedCategory) return true;
      
      const parentCategories: Record<string, string[]> = {
        "Electronics": ["smartphones", "laptops", "audio"],
        "Fashion": ["men", "women", "kids"],
        "Home": ["furniture", "kitchen", "decor"],
      };
      
      return Object.entries(parentCategories).some(([parent, children]) => {
        return (parent === product.category && children.includes(selectedCategory));
      });
    });
  };
  
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
  
  const filterByAvailability = (products: any[]) => {
    if (!filters.availability || filters.availability === 'all') return products;
    return products.filter(product => {
      if (filters.availability === 'in-stock') return product.inStock !== false;
      if (filters.availability === 'out-of-stock') return product.inStock === false;
      return true;
    });
  };
  
  const filterByBrand = (products: any[]) => {
    if (!filters.brand || !filters.brand.length) return products;
    return products.filter(product => 
      filters.brand!.includes(product.brand || '')
    );
  };
  
  const filterByPriceMinMax = (products: any[]) => {
    if (filters.minPrice === undefined && filters.maxPrice === undefined) return products;
    
    return products.filter(product => {
      const price = product.price;
      const minOk = filters.minPrice === undefined || price >= filters.minPrice;
      const maxOk = filters.maxPrice === undefined || price <= filters.maxPrice;
      return minOk && maxOk;
    });
  };
  
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
  
  const applyAllFilters = () => {
    return sortProducts(
      filterByPriceMinMax(
        filterByBrand(
          filterByAvailability(
            filterByRating(
              filterByPriceRange(
                filterByCategory(products)
              )
            )
          )
        )
      )
    );
  };
  
  const filteredProducts = applyAllFilters();
  
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  
  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId === selectedCategory ? null : categoryId);
    setCurrentPage(1);
  };
  
  const handleFilterChange = (key: keyof FilterOptions, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
    
    // Update active filters
    updateActiveFilters({ ...filters, [key]: value });
  };
  
  const updateActiveFilters = (newFilters: FilterOptions) => {
    const activeFiltersList: string[] = [];
    
    if (newFilters.sortBy !== 'featured') {
      const sortLabels: Record<string, string> = {
        'price-low': 'Price: Low to High',
        'price-high': 'Price: High to Low',
        'rating': 'Highest Rated',
        'newest': 'Newest First'
      };
      activeFiltersList.push(`Sort: ${sortLabels[newFilters.sortBy] || newFilters.sortBy}`);
    }
    
    if (newFilters.priceRange !== 'all') {
      const priceLabels: Record<string, string> = {
        'under25': 'Under $25',
        '25to50': '$25 to $50',
        '50to100': '$50 to $100',
        'over100': 'Over $100'
      };
      activeFiltersList.push(`Price: ${priceLabels[newFilters.priceRange]}`);
    }
    
    if (newFilters.rating !== 'all') {
      const ratingLabels: Record<string, string> = {
        '4plus': '4+ Stars',
        '3plus': '3+ Stars',
        '2plus': '2+ Stars',
        '1plus': '1+ Stars'
      };
      activeFiltersList.push(`Rating: ${ratingLabels[newFilters.rating]}`);
    }
    
    if (newFilters.availability && newFilters.availability !== 'all') {
      activeFiltersList.push(`Availability: ${newFilters.availability === 'in-stock' ? 'In Stock' : 'Out of Stock'}`);
    }
    
    if (newFilters.brand && newFilters.brand.length) {
      activeFiltersList.push(`Brands: ${newFilters.brand.join(', ')}`);
    }
    
    if (newFilters.minPrice !== undefined || newFilters.maxPrice !== undefined) {
      const minPrice = newFilters.minPrice !== undefined ? `$${newFilters.minPrice}` : '$0';
      const maxPrice = newFilters.maxPrice !== undefined ? `$${newFilters.maxPrice}` : 'any';
      activeFiltersList.push(`Price Range: ${minPrice} - ${maxPrice}`);
    }
    
    setActiveFilters(activeFiltersList);
  };

  const handleRemoveFilter = (filter: string) => {
    // Parse the filter string to determine what to reset
    if (filter.startsWith('Sort:')) {
      handleFilterChange('sortBy', 'featured');
    } else if (filter.startsWith('Price:') && !filter.startsWith('Price Range:')) {
      handleFilterChange('priceRange', 'all');
    } else if (filter.startsWith('Rating:')) {
      handleFilterChange('rating', 'all');
    } else if (filter.startsWith('Availability:')) {
      handleFilterChange('availability', 'all');
    } else if (filter.startsWith('Brands:')) {
      handleFilterChange('brand', []);
    } else if (filter.startsWith('Price Range:')) {
      handleFilterChange('minPrice', undefined);
      handleFilterChange('maxPrice', undefined);
    }
  };

  const handleItemsPerPageChange = (value: number) => {
    setItemsPerPage(value);
    setCurrentPage(1);
  };
  
  const handleMoreFiltersClick = () => {
    setMoreFiltersOpen(!moreFiltersOpen);
  };

  const handleAddToCart = (product: any) => {
    addItem(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        type: 'product'
      },
      1
    );
  };
  
  useEffect(() => {
    setCurrentPage(1);
    updateActiveFilters(filters);
  }, [selectedCategory, filters.sortBy, filters.priceRange, filters.rating]);

  return (
    <MainLayout>
      <div className="manmul-container">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Browse Products</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
          
          <div className="col-span-1 md:col-span-3">
            <FilterBar 
              filters={filters}
              onFilterChange={handleFilterChange}
              activeFilters={activeFilters}
              onRemoveFilter={handleRemoveFilter}
              onMoreFiltersClick={handleMoreFiltersClick}
              showMoreFiltersInline={false}
            />
            
            {moreFiltersOpen && (
              <div className="bg-white p-4 rounded-lg shadow-sm border mb-4">
                <h3 className="text-base font-medium mb-3">Advanced Filters</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Brand</label>
                    <Select
                      value={filters.brand && filters.brand.length === 1 ? filters.brand[0] : ""}
                      onValueChange={(value) => {
                        if (value === "all") {
                          handleFilterChange('brand', []);
                        } else {
                          handleFilterChange('brand', [value]);
                        }
                      }}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="All Brands" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Brands</SelectItem>
                        <SelectItem value="samsung">Samsung</SelectItem>
                        <SelectItem value="apple">Apple</SelectItem>
                        <SelectItem value="sony">Sony</SelectItem>
                        <SelectItem value="lg">LG</SelectItem>
                        <SelectItem value="dell">Dell</SelectItem>
                        <SelectItem value="hp">HP</SelectItem>
                        <SelectItem value="lenovo">Lenovo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Availability</label>
                    <Select
                      value={filters.availability || "all"}
                      onValueChange={(value) => handleFilterChange('availability', value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Any Condition" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Any Availability</SelectItem>
                        <SelectItem value="in-stock">In Stock</SelectItem>
                        <SelectItem value="out-of-stock">Out of Stock</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="flex justify-end mt-4">
                  <Button 
                    variant="outline" 
                    className="mr-2"
                    onClick={() => setMoreFiltersOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={() => setMoreFiltersOpen(false)}>
                    Apply Filters
                  </Button>
                </div>
              </div>
            )}
            
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
                    onAddToCart={() => handleAddToCart(product)}
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
                    setActiveFilters([]);
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            )}
            
            {filteredProducts.length > 0 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                itemsPerPage={itemsPerPage}
                onItemsPerPageChange={handleItemsPerPageChange}
                itemsPerPageOptions={[6, 12, 24, 48]}
                totalItems={filteredProducts.length}
              />
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProductsPage;
