
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, TrendingUp, Fire, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface PopularItem {
  id: number;
  title: string;
  category: string;
  price: number;
  priceUnit: string;
  rating: number;
  reviewCount: number;
  image: string;
  rentCount: number;
  trendingScore: number;
}

const PopularItems = () => {
  const navigate = useNavigate();

  const popularItems: PopularItem[] = [
    {
      id: 1,
      title: "보쉬 전동드릴",
      category: "공구",
      price: 3000,
      priceUnit: "일",
      rating: 4.8,
      reviewCount: 24,
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&h=200&fit=crop",
      rentCount: 87,
      trendingScore: 95
    },
    {
      id: 2,
      title: "4인용 텐트",
      category: "캠핑",
      price: 15000,
      priceUnit: "일",
      rating: 4.9,
      reviewCount: 18,
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=300&h=200&fit=crop",
      rentCount: 63,
      trendingScore: 88
    },
    {
      id: 3,
      title: "빔프로젝터",
      category: "전자기기",
      price: 8000,
      priceUnit: "일",
      rating: 4.7,
      reviewCount: 31,
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=300&h=200&fit=crop",
      rentCount: 92,
      trendingScore: 91
    },
    {
      id: 4,
      title: "DSLR 카메라",
      category: "카메라",
      price: 12000,
      priceUnit: "일",
      rating: 4.6,
      reviewCount: 15,
      image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=300&h=200&fit=crop",
      rentCount: 45,
      trendingScore: 82
    }
  ];

  // 시즌별 추천 아이템 (현재 겨울 시즌)
  const seasonalItems = [
    {
      id: 5,
      title: "전기매트",
      category: "생활용품",
      price: 2000,
      priceUnit: "일",
      rating: 4.5,
      reviewCount: 8,
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop",
      reason: "겨울철 난방비 절약"
    },
    {
      id: 6,
      title: "스키 장비 세트",
      category: "운동용품",
      price: 25000,
      priceUnit: "일",
      rating: 4.7,
      reviewCount: 12,
      image: "https://images.unsplash.com/photo-1551524164-6cf64ac2c4d6?w=300&h=200&fit=crop",
      reason: "스키 시즌 필수템"
    }
  ];

  const handleItemClick = (id: number) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="space-y-8">
      {/* 실시간 인기 상품 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Fire className="w-5 h-5 text-red-500" />
            실시간 인기 상품
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {popularItems.map((item, index) => (
              <div
                key={item.id}
                className="relative cursor-pointer group"
                onClick={() => handleItemClick(item.id)}
              >
                <div className="aspect-square bg-white rounded-lg overflow-hidden shadow-sm group-hover:shadow-md transition-shadow">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2">
                    <Badge className="bg-red-500 hover:bg-red-600">
                      #{index + 1}
                    </Badge>
                  </div>
                  <div className="absolute top-2 right-2">
                    <Badge variant="secondary" className="bg-black/70 text-white">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      {item.trendingScore}
                    </Badge>
                  </div>
                </div>
                
                <div className="mt-3 space-y-1">
                  <h3 className="font-medium text-sm line-clamp-1">{item.title}</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                      <span className="text-xs text-gray-600">{item.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-xs text-gray-500">
                      <Eye className="w-3 h-3" />
                      <span>{item.rentCount}</span>
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-blue-600">
                    {item.price.toLocaleString()}원/{item.priceUnit}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 시즌 추천 상품 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-500" />
            겨울 시즌 추천
            <Badge variant="outline" className="text-xs">HOT</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {seasonalItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center space-x-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleItemClick(item.id)}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">{item.title}</h3>
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                      <span className="text-sm">{item.rating}</span>
                      <span className="text-sm text-gray-500 ml-1">({item.reviewCount})</span>
                    </div>
                  </div>
                  <p className="text-sm text-blue-600 mb-1">{item.reason}</p>
                  <p className="font-semibold text-blue-600">
                    {item.price.toLocaleString()}원/{item.priceUnit}
                  </p>
                </div>
                <Button size="sm" variant="outline">
                  보기
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 카테고리별 인기 상품 */}
      <Card>
        <CardHeader>
          <CardTitle>카테고리별 인기 상품</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { category: "공구", count: 234, icon: "🔧" },
              { category: "캠핑", count: 156, icon: "⛺" },
              { category: "전자기기", count: 189, icon: "📱" },
              { category: "카메라", count: 87, icon: "📷" }
            ].map((cat) => (
              <div
                key={cat.category}
                className="text-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
              >
                <div className="text-2xl mb-2">{cat.icon}</div>
                <h3 className="font-medium mb-1">{cat.category}</h3>
                <p className="text-sm text-gray-600">{cat.count}개 상품</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PopularItems;
