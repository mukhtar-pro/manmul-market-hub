
import { Link } from "react-router-dom";
import { Store, MapPin, Package, Users, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

export interface ShopProps {
  id: string;
  name: string;
  avatar: string;
  address: string;
  city: string;
  productCount: number;
  followers: number;
  rating: number;
}

const ShopCard = ({
  id,
  name,
  avatar,
  address,
  city,
  productCount,
  followers,
  rating,
}: ShopProps) => {
  return (
    <Card className="flex flex-col hover:shadow-md transition-shadow">
      <CardContent className="pt-6">
        <div className="flex items-start">
          <div className="mr-4 flex-shrink-0">
            <div className="w-16 h-16 bg-gray-100 rounded-full overflow-hidden flex items-center justify-center border">
              {avatar ? (
                <img src={avatar} alt={name} className="w-full h-full object-cover" />
              ) : (
                <Store size={32} className="text-gray-400" />
              )}
            </div>
          </div>
          
          <div className="flex-1">
            <Link to={`/shops/${id}`} className="hover:underline">
              <h3 className="font-semibold text-lg text-gray-800">{name}</h3>
            </Link>
            
            <div className="flex items-center mt-1 text-sm text-gray-600">
              <MapPin size={14} className="mr-1" />
              <span>{city}</span>
            </div>
            
            <div className="grid grid-cols-3 gap-2 mt-3">
              <div className="flex flex-col items-center">
                <div className="flex items-center text-gray-700">
                  <Package size={14} className="mr-1" />
                  <span className="text-sm font-medium">{productCount}</span>
                </div>
                <span className="text-xs text-gray-500">Products</span>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="flex items-center text-gray-700">
                  <Users size={14} className="mr-1" />
                  <span className="text-sm font-medium">{followers}</span>
                </div>
                <span className="text-xs text-gray-500">Followers</span>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="flex items-center text-gray-700">
                  <Star size={14} className="mr-1 fill-yellow-500 text-yellow-500" />
                  <span className="text-sm font-medium">{rating}</span>
                </div>
                <span className="text-xs text-gray-500">Rating</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-0 flex justify-between">
        <Button variant="outline" size="sm" className="w-1/2">
          Follow
        </Button>
        <Button variant="default" size="sm" className="w-1/2 ml-2">
          <Link to={`/shops/${id}`} className="w-full">
            Visit Shop
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ShopCard;
