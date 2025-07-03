
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Heart, Clock } from "lucide-react";
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
  onClick?: () => void;
}

const ProductCard = ({ product, onClick }: ProductCardProps) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  return (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer group" onClick={onClick}>
      <CardContent className="p-0">
        <div className="aspect-video relative overflow-hidden rounded-t-lg">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* 찜하기 버튼 */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 bg-white/80 hover:bg-white"
            onClick={handleLikeClick}
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
          </Button>
          
          {/* 상태 배지 */}
          <div className="absolute top-2 left-2">
            {product.isAvailable ? (
              <Badge className="bg-green-500 hover:bg-green-600">
                대여가능
              </Badge>
            ) : (
              <Badge variant="secondary" className="bg-gray-500 text-white">
                <Clock className="w-3 h-3 mr-1" />
                예약중
              </Badge>
            )}
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <Badge variant="outline">{product.category}</Badge>
            <div className="flex items-center text-sm text-gray-500">
              <MapPin className="w-3 h-3 mr-1" />
              {product.distance}
            </div>
          </div>
          
          <h3 className="font-semibold text-lg mb-2 line-clamp-1">{product.title}</h3>
          
          <div className="flex items-center mb-3">
            <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
            <span className="text-sm font-medium">{product.rating}</span>
            <span className="text-sm text-gray-500 ml-1">({product.reviewCount})</span>
            <span className="text-sm text-gray-500 ml-2">• {product.owner}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <span className="text-2xl font-bold text-blue-600">
                {product.price.toLocaleString()}원
              </span>
              <span className="text-sm text-gray-500 ml-1">/{product.priceUnit}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
