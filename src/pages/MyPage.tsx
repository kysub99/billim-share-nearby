
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Heart, Clock, MapPin, MessageCircle, Settings } from "lucide-react";
import Header from "@/components/Header";
import { useNavigate } from "react-router-dom";

const MyPage = () => {
  const navigate = useNavigate();
  const [userRating] = useState(4.8);
  const [userTemp] = useState(36.5);

  // 샘플 데이터
  const rentedItems = [
    {
      id: 1,
      title: "보쉬 전동드릴",
      owner: "김철수",
      rentDate: "2024-01-15",
      returnDate: "2024-01-17",
      status: "사용중",
      price: 3000,
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&h=200&fit=crop"
    },
    {
      id: 2,
      title: "4인용 텐트",
      owner: "이영희",
      rentDate: "2024-01-10",
      returnDate: "2024-01-12",
      status: "반납완료",
      price: 15000,
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=300&h=200&fit=crop"
    }
  ];

  const lentItems = [
    {
      id: 3,
      title: "빔프로젝터",
      renter: "박민수",
      rentDate: "2024-01-12",
      returnDate: "2024-01-14",
      status: "대여중",
      price: 8000,
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=300&h=200&fit=crop"
    }
  ];

  const wishList = [
    {
      id: 4,
      title: "접이식 사다리",
      owner: "최영수",
      price: 4000,
      distance: "1.5km",
      image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=300&h=200&fit=crop"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "사용중":
      case "대여중":
        return "bg-blue-500";
      case "반납완료":
        return "bg-green-500";
      case "예약중":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  const getTempColor = (temp: number) => {
    if (temp >= 37.0) return "text-green-600";
    if (temp >= 36.0) return "text-blue-600";
    return "text-gray-600";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* 사용자 정보 카드 */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Avatar className="w-20 h-20">
                  <AvatarImage src="" />
                  <AvatarFallback className="text-2xl">홍길동</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-2xl font-bold">홍길동님</h2>
                  <div className="flex items-center mt-2">
                    <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                    <span className="font-medium">{userRating}</span>
                    <span className="text-gray-500 ml-1">(15개 리뷰)</span>
                  </div>
                  <div className="flex items-center mt-1">
                    <span className="text-sm text-gray-600">빌림 온도: </span>
                    <span className={`font-bold ml-1 ${getTempColor(userTemp)}`}>
                      {userTemp}°C
                    </span>
                  </div>
                </div>
              </div>
              <Button variant="outline" className="gap-2">
                <Settings className="w-4 h-4" />
                설정
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 탭 섹션 */}
        <Tabs defaultValue="rented" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="rented">빌린 물품</TabsTrigger>
            <TabsTrigger value="lent">빌려준 물품</TabsTrigger>
            <TabsTrigger value="wishlist">찜한 물품</TabsTrigger>
            <TabsTrigger value="reviews">리뷰</TabsTrigger>
          </TabsList>

          <TabsContent value="rented" className="space-y-4">
            <div className="grid gap-4">
              {rentedItems.map((item) => (
                <Card key={item.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-lg">{item.title}</h3>
                          <Badge className={getStatusColor(item.status)}>
                            {item.status}
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-600 space-y-1">
                          <p>소유자: {item.owner}</p>
                          <p>대여일: {item.rentDate}</p>
                          <p>반납일: {item.returnDate}</p>
                          <p className="font-medium text-blue-600">
                            {item.price.toLocaleString()}원
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col space-y-2">
                        <Button size="sm" variant="outline" className="gap-2">
                          <MessageCircle className="w-4 h-4" />
                          채팅
                        </Button>
                        {item.status === "사용중" && (
                          <Button size="sm">반납하기</Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="lent" className="space-y-4">
            <div className="grid gap-4">
              {lentItems.map((item) => (
                <Card key={item.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-lg">{item.title}</h3>
                          <Badge className={getStatusColor(item.status)}>
                            {item.status}
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-600 space-y-1">
                          <p>대여자: {item.renter}</p>
                          <p>대여일: {item.rentDate}</p>
                          <p>반납일: {item.returnDate}</p>
                          <p className="font-medium text-green-600">
                            +{item.price.toLocaleString()}원
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col space-y-2">
                        <Button size="sm" variant="outline" className="gap-2">
                          <MessageCircle className="w-4 h-4" />
                          채팅
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="wishlist" className="space-y-4">
            <div className="grid gap-4">
              {wishList.map((item) => (
                <Card key={item.id} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                        <div className="text-sm text-gray-600 space-y-1">
                          <p>소유자: {item.owner}</p>
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            <span>{item.distance}</span>
                          </div>
                          <p className="font-medium text-blue-600">
                            {item.price.toLocaleString()}원/일
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col space-y-2">
                        <Button size="sm">대여 요청</Button>
                        <Button size="sm" variant="outline">
                          <Heart className="w-4 h-4 fill-current text-red-500" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>받은 리뷰</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-b pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">김철수님</span>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className="w-4 h-4 text-yellow-400 fill-current"
                          />
                        ))}
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">2024-01-12</span>
                  </div>
                  <p className="text-gray-700">
                    매우 친절하시고 물건도 깨끗하게 관리해주셔서 좋았습니다!
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MyPage;
