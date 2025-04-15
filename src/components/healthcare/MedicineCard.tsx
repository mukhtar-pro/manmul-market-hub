
import { Link } from "react-router-dom";
import { Heart, ShoppingCart, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";

export interface MedicineProps {
  id: string;
  name: string;
  image: string;
  price: number;
  category: string;
  description: string;
  inStock: boolean;
  requiresPrescription: boolean;
}

const MedicineCard = ({
  id,
  name,
  image,
  price,
  category,
  inStock,
  requiresPrescription,
}: MedicineProps) => {
  const { toast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (requiresPrescription) {
      toast({
        title: "Prescription Required",
        description: "This medicine requires a prescription. Please consult with your healthcare provider.",
        variant: "destructive",
        duration: 3000,
      });
    } else {
      toast({
        title: "Added to cart",
        description: `${name} has been added to your cart.`,
        duration: 3000,
      });
    }
  };

  return (
    <Card className="h-full flex flex-col hover:shadow-md transition-shadow">
      <Link to={`/healthcare/${id}`}>
        <CardHeader className="p-0 pt-4 px-4 pb-2">
          <div className="aspect-square relative overflow-hidden rounded-md bg-gray-100 mb-2">
            <img
              src={image || "/placeholder.svg"}
              alt={name}
              className="object-cover w-full h-full"
            />
            {requiresPrescription && (
              <Badge className="absolute top-2 right-2 bg-blue-500 hover:bg-blue-600">
                Prescription
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-0 flex-1">
          <div className="mb-2">
            <Badge variant="outline" className="text-xs">
              {category}
            </Badge>
          </div>
          
          <h3 className="font-medium text-sm line-clamp-2 h-10">{name}</h3>
          
          <div className="mt-2 flex items-center justify-between">
            <span className="font-semibold text-lg">${price.toFixed(2)}</span>
            
            {!inStock && (
              <span className="text-xs text-red-500 flex items-center">
                <AlertCircle size={12} className="mr-1" />
                Out of stock
              </span>
            )}
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full"
            onClick={handleAddToCart}
            disabled={!inStock || requiresPrescription}
          >
            {requiresPrescription ? (
              <>
                <AlertCircle size={16} className="mr-2" />
                Prescription Required
              </>
            ) : (
              <>
                <ShoppingCart size={16} className="mr-2" />
                Add to Cart
              </>
            )}
          </Button>
        </CardFooter>
      </Link>
    </Card>
  );
};

export default MedicineCard;
