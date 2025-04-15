
import { Link } from "react-router-dom";
import { Star, ShoppingCart, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

export interface ProductProps {
  id: string;
  name: string;
  image: string;
  price: number;
  rating: number;
  upvotes: number;
  stock?: number;
}

const ProductCard = ({ 
  id, 
  name, 
  image, 
  price, 
  rating, 
  upvotes 
}: ProductProps) => {
  const { toast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    toast({
      title: "Added to cart",
      description: `${name} has been added to your cart.`,
      duration: 3000,
    });
  };

  return (
    <Card className="h-full flex flex-col hover:shadow-md transition-shadow">
      <Link to={`/products/${id}`}>
        <CardHeader className="p-0 pt-4 px-4 pb-2">
          <div className="aspect-square relative overflow-hidden rounded-md bg-gray-100 mb-2">
            <img
              src={image || "/placeholder.svg"}
              alt={name}
              className="object-cover w-full h-full"
            />
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-0 flex-1">
          <h3 className="font-medium text-sm line-clamp-2 h-10">{name}</h3>
          
          <div className="flex items-center mt-2">
            <div className="flex items-center">
              <Star 
                size={14} 
                className="text-yellow-500 fill-yellow-500 mr-1" 
              />
              <span className="text-sm text-gray-600">{rating}</span>
            </div>
            <div className="flex items-center ml-3">
              <ThumbsUp size={14} className="text-blue-500 mr-1" />
              <span className="text-sm text-gray-600">{upvotes}</span>
            </div>
          </div>
          
          <div className="mt-2">
            <span className="font-semibold text-lg">${price.toFixed(2)}</span>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full"
            onClick={handleAddToCart}
          >
            <ShoppingCart size={16} className="mr-2" />
            Add to Cart
          </Button>
        </CardFooter>
      </Link>
    </Card>
  );
};

export default ProductCard;
