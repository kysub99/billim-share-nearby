
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, TrendingUp } from "lucide-react";

const PopularItems = () => {
  const popularItems = [
    {
      id: 1,
      title: "보쉬 전동드릴",
      price: 3000,
      rating: 4.8,
      reviews: 24,
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&h=200&fit=crop",
      category: "공구"
    },
    {
      id: 2,
      title: "4인용 텐트",
      price: 15000,
      rating: 4.9,
      reviews: 18,
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=300&h=200&fit=crop",
      category: "캠핑"
    },
    {
      id: 3,
      title: "빔프로젝터",
      price: 8000,
      rating: 4.7,
      reviews: 32,
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=300&h=200&fit=crop",
      category: "전자기기"
    }
  ];

  return (
    <div className="py-8">
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="w-6 h-6 text-orange-500" />
        <h2 className="text-2xl font-bold">인기 물품</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {popularItems.map((item) => (
          <Card key={item.id} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-0">
              <div className="aspect-video relative overflow-hidden rounded-t-lg">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <Badge className="absolute top-2 left-2 bg-orange-500 hover:bg-orange-600">
                  인기
                </Badge>
              </div>
              <div className="p-4">
                <Badge variant="outline" className="mb-2">
                  {item.category}
                </Badge>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-blue-600">
                    {item.price.toLocaleString()}원
                    <span className="text-sm text-gray-500 ml-1">/일</span>
                  </span>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                    <span className="text-sm font-medium">{item.rating}</span>
                    <span className="text-sm text-gray-500 ml-1">({item.reviews})</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PopularItems;
