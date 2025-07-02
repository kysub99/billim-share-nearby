
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Clock, Heart } from "lucide-react";
import { useState } from "react";

interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
  priceUnit: string;
  location: string;
  distance: string;
  rating: number;
  reviewCount: number;
  image: string;
  owner: string;
  isAvailable: boolean;
}

interface ProductCardProps {
  product: Product;
  onRentRequest: () => void;
  onReservationRequest: () => void;
  onLocationClick: () => void;
}

const ProductCard = ({ product, onRentRequest, onReservationRequest, onLocationClick }: ProductCardProps) => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 bg-white border-0 shadow-md">
      <div className="relative">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-48 object-cover"
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 bg-white/80 hover:bg-white"
          onClick={() => setIsLiked(!isLiked)}
        >
          <Heart className={`w-4 h-4 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
        </Button>
        <Badge
          className={`absolute top-2 left-2 ${
            product.isAvailable 
              ? 'bg-green-500 hover:bg-green-600' 
              : 'bg-gray-500 hover:bg-gray-600'
          }`}
        >
          {product.isAvailable ? '대여가능' : '대여중'}
        </Badge>
      </div>
      
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-lg line-clamp-1">{product.title}</h3>
          <Badge variant="outline" className="text-xs shrink-0">
            {product.category}
          </Badge>
        </div>
        
        <div className="flex items-center text-gray-600 text-sm mb-2">
          <button 
            onClick={onLocationClick}
            className="flex items-center hover:text-blue-600 transition-colors"
          >
            <MapPin className="w-4 h-4 mr-1" />
            <span className="hover:underline">{product.location} • {product.distance}</span>
          </button>
        </div>
        
        <div className="flex items-center mb-3">
          <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
          <span className="text-sm font-medium">{product.rating}</span>
          <span className="text-sm text-gray-500 ml-1">({product.reviewCount})</span>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-2xl font-bold text-blue-600">
              {product.price.toLocaleString()}원
            </span>
            <span className="text-gray-500 ml-1">/{product.priceUnit}</span>
          </div>
          <div className="text-sm text-gray-500">
            {product.owner}님
          </div>
        </div>
        
        <div className="space-y-2">
          {product.isAvailable ? (
            <Button 
              className="w-full"
              onClick={onRentRequest}
            >
              대여 요청하기
            </Button>
          ) : (
            <>
              <Button 
                className="w-full"
                variant="outline"
                onClick={onReservationRequest}
              >
                <Clock className="w-4 h-4 mr-2" />
                예약하기
              </Button>
              <div className="text-xs text-center text-gray-500">
                현재 대여 중이지만 예약 가능합니다
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
