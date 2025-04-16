
import { useState } from "react";
import { 
  Filter, 
  ChevronDown,
  SlidersHorizontal,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

export interface FilterOptions {
  sortBy: string;
  priceRange: string;
  rating: string;
  availability?: string;
  brand?: string[];
  minPrice?: number;
  maxPrice?: number;
}

interface FilterBarProps {
  filters: FilterOptions;
  onFilterChange: (key: keyof FilterOptions, value: any) => void;
  activeFilters?: string[];
  onRemoveFilter?: (filter: string) => void;
  onMoreFiltersClick?: () => void;
  showMoreFiltersInline?: boolean;
}

const FilterBar = ({ 
  filters, 
  onFilterChange, 
  activeFilters = [],
  onRemoveFilter = () => {},
  onMoreFiltersClick,
  showMoreFiltersInline = false
}: FilterBarProps) => {
  const isMobile = useIsMobile();
  const [brandOptions, setBrandOptions] = useState<string[]>(filters.brand || []);
  const [priceRange, setPriceRange] = useState<number[]>([
    filters.minPrice || 0,
    filters.maxPrice || 1000
  ]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSortChange = (value: string) => {
    onFilterChange('sortBy', value);
  };

  const handlePriceRangeChange = (value: string) => {
    onFilterChange('priceRange', value);
  };

  const handleRatingChange = (value: string) => {
    onFilterChange('rating', value);
  };

  const handleAvailabilityChange = (value: string) => {
    onFilterChange('availability', value);
  };

  const handleSliderChange = (value: number[]) => {
    setPriceRange(value);
  };

  const handleApplyPriceRange = () => {
    onFilterChange('minPrice', priceRange[0]);
    onFilterChange('maxPrice', priceRange[1]);
  };

  const handleBrandToggle = (brand: string) => {
    const newBrands = brandOptions.includes(brand)
      ? brandOptions.filter(b => b !== brand)
      : [...brandOptions, brand];
    
    setBrandOptions(newBrands);
  };

  const handleApplyBrands = () => {
    onFilterChange('brand', brandOptions);
  };

  const formatPrice = (value: number) => {
    return `$${value}`;
  };
  
  const handleMoreFiltersClick = () => {
    if (showMoreFiltersInline) {
      if (onMoreFiltersClick) onMoreFiltersClick();
    } else {
      setIsDialogOpen(true);
    }
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  return (
    <div className="bg-white p-3 rounded-lg shadow-sm flex flex-col space-y-3 mb-4 border">
      <div className="flex flex-col sm:flex-row items-center justify-between">
        <div className="flex items-center mb-2 sm:mb-0">
          <Filter size={18} className="mr-2 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">Filters:</span>
        </div>

        <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
          {/* Sort By Filter */}
          <Select value={filters.sortBy} onValueChange={handleSortChange}>
            <SelectTrigger className="w-full sm:w-40 h-9 text-sm">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Rating</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
            </SelectContent>
          </Select>

          {/* Price Range Filter - Dropdown for Mobile */}
          {isMobile ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="w-full flex justify-between items-center h-9"
                >
                  <span className="text-sm">Price Range</span>
                  <ChevronDown size={14} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48">
                <DropdownMenuRadioGroup value={filters.priceRange} onValueChange={handlePriceRangeChange}>
                  <DropdownMenuRadioItem value="all">All Prices</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="under25">Under $25</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="25to50">$25 to $50</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="50to100">$50 to $100</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="over100">Over $100</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Select value={filters.priceRange} onValueChange={handlePriceRangeChange}>
              <SelectTrigger className="w-40 h-9 text-sm">
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="under25">Under $25</SelectItem>
                <SelectItem value="25to50">$25 to $50</SelectItem>
                <SelectItem value="50to100">$50 to $100</SelectItem>
                <SelectItem value="over100">Over $100</SelectItem>
              </SelectContent>
            </Select>
          )}

          {/* Rating Filter - Dropdown for Mobile */}
          {isMobile ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="w-full flex justify-between items-center h-9"
                >
                  <span className="text-sm">Rating</span>
                  <ChevronDown size={14} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48">
                <DropdownMenuRadioGroup value={filters.rating} onValueChange={handleRatingChange}>
                  <DropdownMenuRadioItem value="all">All Ratings</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="4plus">4+ Stars</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="3plus">3+ Stars</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="2plus">2+ Stars</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="1plus">1+ Stars</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Select value={filters.rating} onValueChange={handleRatingChange}>
              <SelectTrigger className="w-40 h-9 text-sm">
                <SelectValue placeholder="Rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Ratings</SelectItem>
                <SelectItem value="4plus">4+ Stars</SelectItem>
                <SelectItem value="3plus">3+ Stars</SelectItem>
                <SelectItem value="2plus">2+ Stars</SelectItem>
                <SelectItem value="1plus">1+ Stars</SelectItem>
              </SelectContent>
            </Select>
          )}

          {/* Advanced Filters Button */}
          <Button 
            variant="outline" 
            size="sm" 
            className="h-9"
            onClick={handleMoreFiltersClick}
          >
            <SlidersHorizontal size={16} className="mr-2" />
            <span className="text-sm">More Filters</span>
          </Button>
          
          {/* Advanced Filters Dialog */}
          {!showMoreFiltersInline && (
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Advanced Filters</DialogTitle>
                </DialogHeader>
                
                <div className="py-4 space-y-6">
                  {/* Availability Filter */}
                  <div>
                    <h4 className="text-sm font-medium mb-3">Availability</h4>
                    <Select value={filters.availability || 'all'} onValueChange={handleAvailabilityChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="All Items" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Items</SelectItem>
                        <SelectItem value="in-stock">In Stock</SelectItem>
                        <SelectItem value="out-of-stock">Out of Stock</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {/* Custom Price Range Slider */}
                  <div>
                    <h4 className="text-sm font-medium mb-3">Price Range</h4>
                    <Slider
                      defaultValue={priceRange}
                      max={1000}
                      step={5}
                      onValueChange={handleSliderChange}
                      className="mb-6"
                    />
                    <div className="flex justify-between">
                      <span>{formatPrice(priceRange[0])}</span>
                      <span>{formatPrice(priceRange[1])}</span>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-2 w-full"
                      onClick={handleApplyPriceRange}
                    >
                      Apply Price Range
                    </Button>
                  </div>
                  
                  {/* Brand Filters */}
                  <div>
                    <h4 className="text-sm font-medium mb-3">Brands</h4>
                    <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
                      {['Apple', 'Samsung', 'Sony', 'LG', 'Asus', 'Dell', 'HP', 'Lenovo'].map((brand) => (
                        <div key={brand} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`brand-${brand}`} 
                            checked={brandOptions.includes(brand)}
                            onCheckedChange={() => handleBrandToggle(brand)}
                          />
                          <label 
                            htmlFor={`brand-${brand}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {brand}
                          </label>
                        </div>
                      ))}
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-3 w-full"
                      onClick={handleApplyBrands}
                    >
                      Apply Brand Filters
                    </Button>
                  </div>
                </div>
                
                <DialogClose asChild>
                  <Button className="w-full mt-2" onClick={handleDialogClose}>Done</Button>
                </DialogClose>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
      
      {/* Active filters */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-2">
          {activeFilters.map((filter) => (
            <Badge 
              key={filter} 
              variant="secondary"
              className="flex items-center gap-1 px-3 py-1"
            >
              {filter}
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-4 w-4 p-0 hover:bg-transparent"
                onClick={() => onRemoveFilter(filter)}
              >
                <X size={12} />
              </Button>
            </Badge>
          ))}
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-xs h-6"
            onClick={() => {
              // Reset all filters
              onFilterChange('sortBy', 'featured');
              onFilterChange('priceRange', 'all');
              onFilterChange('rating', 'all');
              onFilterChange('availability', 'all');
              onFilterChange('brand', []);
              onFilterChange('minPrice', 0);
              onFilterChange('maxPrice', 1000);
              setBrandOptions([]);
              setPriceRange([0, 1000]);
            }}
          >
            Clear All
          </Button>
        </div>
      )}
    </div>
  );
};

export default FilterBar;
