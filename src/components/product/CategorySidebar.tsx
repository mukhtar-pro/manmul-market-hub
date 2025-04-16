
import { useState } from "react";
import { 
  ChevronDown, 
  ChevronRight, 
  Package,
  Home,
  Shirt,
  Smartphone,
  Utensils,
  BookOpen,
  Gamepad2,
  Baby,
  Car
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  children?: Category[];
}

interface CategoryItemProps {
  category: Category;
  level?: number;
  onSelect: (categoryId: string) => void;
  selectedCategory: string | null;
}

interface CategorySidebarProps {
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string) => void;
}

const CategoryItem = ({ 
  category, 
  level = 0, 
  onSelect,
  selectedCategory 
}: CategoryItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = category.children && category.children.length > 0;
  const isSelected = selectedCategory === category.id;
  
  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div 
        className={cn(
          "flex items-center py-2 px-3 text-sm rounded-md cursor-pointer mb-1 transition-colors",
          isSelected ? "bg-manmul-100 text-manmul-700" : "hover:bg-gray-100",
          level > 0 && "ml-6"
        )}
        onClick={() => {
          onSelect(category.id);
          if (hasChildren) {
            toggleOpen();
          }
        }}
      >
        <div className="mr-2">
          {category.icon}
        </div>
        <span className="flex-1">{category.name}</span>
        {hasChildren && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleOpen();
            }}
            className="focus:outline-none"
          >
            {isOpen ? (
              <ChevronDown size={16} />
            ) : (
              <ChevronRight size={16} />
            )}
          </button>
        )}
      </div>
      
      {hasChildren && isOpen && (
        <div className="ml-2">
          {category.children?.map((child) => (
            <CategoryItem
              key={child.id}
              category={child}
              level={level + 1}
              onSelect={onSelect}
              selectedCategory={selectedCategory}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const CategorySidebar = ({ selectedCategory, onSelectCategory }: CategorySidebarProps) => {
  // Mock category data
  const categories: Category[] = [
    {
      id: "electronics",
      name: "Electronics",
      icon: <Smartphone size={18} />,
      children: [
        { id: "smartphones", name: "Smartphones", icon: <Smartphone size={16} /> },
        { id: "laptops", name: "Laptops & Computers", icon: <Smartphone size={16} /> },
        { id: "audio", name: "Audio & Headphones", icon: <Smartphone size={16} /> },
      ]
    },
    {
      id: "fashion",
      name: "Fashion",
      icon: <Shirt size={18} />,
      children: [
        { id: "men", name: "Men's Clothing", icon: <Shirt size={16} /> },
        { id: "women", name: "Women's Clothing", icon: <Shirt size={16} /> },
        { id: "kids", name: "Kids' Clothing", icon: <Shirt size={16} /> },
      ]
    },
    {
      id: "home",
      name: "Home & Living",
      icon: <Home size={18} />,
      children: [
        { id: "furniture", name: "Furniture", icon: <Home size={16} /> },
        { id: "kitchen", name: "Kitchen & Dining", icon: <Utensils size={16} /> },
        { id: "decor", name: "Home Decor", icon: <Home size={16} /> },
      ]
    },
    {
      id: "food",
      name: "Food & Grocery",
      icon: <Utensils size={18} />,
    },
    {
      id: "books",
      name: "Books & Media",
      icon: <BookOpen size={18} />,
    },
    {
      id: "toys",
      name: "Toys & Games",
      icon: <Gamepad2 size={18} />,
    },
    {
      id: "baby",
      name: "Baby Products",
      icon: <Baby size={18} />,
    },
    {
      id: "automotive",
      name: "Automotive",
      icon: <Car size={18} />,
    },
    {
      id: "other",
      name: "Other Categories",
      icon: <Package size={18} />,
    }
  ];

  const handleSelectCategory = (categoryId: string) => {
    onSelectCategory(categoryId);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border">
      <h3 className="font-semibold text-gray-800 mb-4">Categories</h3>
      <div className="space-y-1">
        {categories.map((category) => (
          <CategoryItem
            key={category.id}
            category={category}
            onSelect={handleSelectCategory}
            selectedCategory={selectedCategory}
          />
        ))}
      </div>
    </div>
  );
};

export default CategorySidebar;
