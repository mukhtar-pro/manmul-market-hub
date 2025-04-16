
import { useState } from "react";
import { 
  Filter, 
  ChevronDown,
  SlidersHorizontal
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

export interface FilterOptions {
  sortBy: string;
  priceRange: string;
  rating: string;
}

interface FilterBarProps {
  filters: FilterOptions;
  onFilterChange: (key: keyof FilterOptions, value: string) => void;
}

const FilterBar = ({ filters, onFilterChange }: FilterBarProps) => {
  const isMobile = useIsMobile();

  const handleSortChange = (value: string) => {
    onFilterChange('sortBy', value);
  };

  const handlePriceRangeChange = (value: string) => {
    onFilterChange('priceRange', value);
  };

  const handleRatingChange = (value: string) => {
    onFilterChange('rating', value);
  };

  return (
    <div className="bg-white p-3 rounded-lg shadow-sm flex flex-col sm:flex-row items-center justify-between mb-4 border">
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
        {!isMobile && (
          <Button variant="outline" size="sm" className="h-9">
            <SlidersHorizontal size={16} className="mr-2" />
            <span className="text-sm">More Filters</span>
          </Button>
        )}
      </div>
    </div>
  );
};

export default FilterBar;
