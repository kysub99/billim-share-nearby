
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Star, 
  Heart, 
  MapPin, 
  Calendar, 
  Clock, 
  MessageCircle,
  ArrowLeft,
  Shield,
  CheckCircle
} from "lucide-react";
import Header from "@/components/Header";
import ReservationDialog from "@/components/ReservationDialog";
import LocationDialog from "@/components/LocationDialog";
import { useToast } from "@/hooks/use-toast";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLiked, setIsLiked] = useState(false);
  const [isReservationDialogOpen, setIsReservationDialogOpen] = useState(false);
  const [isLocationDialogOpen, setIsLocationDialogOpen] = useState(false);

  // 샘플 데이터 (실제로는 API에서 가져올 데이터)
  const product = {
    id: parseInt(id || "1"),
    title: "보쉬 전동드릴 GSB 120-LI",
    category: "공구",
    price: 3000,
    priceUnit: "일",
    location: "성수동",
    distance: "0.5km",
    rating: 4.8,
    reviewCount: 24,
    images: [
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop"
    ],
    owner: {
      name: "김철수",
      rating: 4.9,
      reviewCount: 47,
      joinDate: "2023년 3월",
      responseTime: "평균 30분 이내",
      avatar: ""
    },
    isAvailable: true,
    description: `전문가용 보쉬 전동드릴입니다. 
    
주요 특징:
• 18V 리튬이온 배터리
• 최대 토크 30Nm
• 13mm 키리스 척
• LED 라이트 내장
• 벨트 클립 포함

사용 용도:
• 목재, 금속, 플라스틱 드릴링
• 나사 조임/해체
• 가벼운 작업용

포함 구성품:
• 본체 1개
• 배터리 2개
• 충전기 1개
• 드릴비트 세트
• 캐리어백

주의사항:
• 사용 전 안전 교육 필수
• 보안경 착용 권장
• 물이나 습기가 있는 곳에서 사용 금지`,
    availableDates: ["2024-01-20", "2024-01-21", "2024-01-22"],
    policies: [
      "사용 후 청소해서 반납",
      "파손 시 수리비 청구",
      "늦은 반납 시 추가 요금",
      "신분증 확인 필수"
    ]
  };

  const reviews = [
    {
      id: 1,
      user: "이영희",
      rating: 5,
      date: "2024-01-10",
      comment: "정말 좋은 드릴이에요! 김철수님도 친절하시고 설명도 자세히 해주셨습니다.",
      helpful: 5
    },
    {
      id: 2,
      user: "박민수",
      rating: 4,
      date: "2024-01-05",
      comment: "성능 좋고 사용하기 편해요. 다만 좀 무거운 편입니다.",
      helpful: 3
    }
  ];

  const handleRentRequest = () => {
    toast({
      title: "대여 요청 완료!",
      description: "물품 소유자에게 대여 요청을 보냈습니다.",
    });
  };

  const handleReservationSubmit = (reservation: any) => {
    console.log('예약 요청:', reservation);
    toast({
      title: "예약 요청 완료!",
      description: `${reservation.productTitle}에 대한 예약 요청을 보냈습니다.`,
    });
  };

  const handleChatClick = () => {
    navigate(`/chat/${product.owner.name}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* 뒤로가기 버튼 */}
        <Button
          variant="ghost"
          className="mb-4 gap-2"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="w-4 h-4" />
          뒤로가기
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 이미지 섹션 */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-lg overflow-hidden shadow-md">
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {product.images.slice(1).map((image, index) => (
                <div key={index} className="aspect-square bg-white rounded-lg overflow-hidden shadow-sm">
                  <img
                    src={image}
                    alt={`${product.title} ${index + 2}`}
                    className="w-full h-full object-cover cursor-pointer hover:opacity-80 transition-opacity"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* 상품 정보 섹션 */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <Badge variant="outline">{product.category}</Badge>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsLiked(!isLiked)}
                >
                  <Heart className={`w-5 h-5 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                </Button>
              </div>
              
              <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
              
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-400 fill-current mr-1" />
                  <span className="font-medium">{product.rating}</span>
                  <span className="text-gray-500 ml-1">({product.reviewCount}개 리뷰)</span>
                </div>
                <button 
                  onClick={() => setIsLocationDialogOpen(true)}
                  className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <MapPin className="w-4 h-4 mr-1" />
                  <span className="hover:underline">{product.location} • {product.distance}</span>
                </button>
              </div>

              <div className="text-3xl font-bold text-blue-600 mb-6">
                {product.price.toLocaleString()}원
                <span className="text-lg text-gray-500 ml-2">/{product.priceUnit}</span>
              </div>
            </div>

            {/* 소유자 정보 */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={product.owner.avatar} />
                    <AvatarFallback>{product.owner.name}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold">{product.owner.name}님</span>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                        <span className="text-sm">{product.owner.rating}</span>
                        <span className="text-sm text-gray-500 ml-1">({product.owner.reviewCount})</span>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600">
                      <p>{product.owner.joinDate} 가입 • {product.owner.responseTime}</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2"
                    onClick={handleChatClick}
                  >
                    <MessageCircle className="w-4 h-4" />
                    채팅하기
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* 대여 버튼들 */}
            <div className="space-y-3">
              {product.isAvailable ? (
                <Button className="w-full text-lg py-6" onClick={handleRentRequest}>
                  대여 요청하기
                </Button>
              ) : (
                <Button 
                  className="w-full text-lg py-6"
                  variant="outline"
                  onClick={() => setIsReservationDialogOpen(true)}
                >
                  <Clock className="w-5 h-5 mr-2" />
                  예약하기
                </Button>
              )}
              
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="gap-2">
                  <Calendar className="w-4 h-4" />
                  예약 가능일 확인
                </Button>
                <Button variant="outline" className="gap-2">
                  <Shield className="w-4 h-4" />
                  안전거래 정보
                </Button>
              </div>
            </div>

            {/* 대여 정책 */}
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3">대여 정책</h3>
                <div className="space-y-2">
                  {product.policies.map((policy, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">{policy}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 상품 설명 */}
        <Card className="mt-8">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-4">상품 설명</h2>
            <div className="whitespace-pre-line text-gray-700 leading-relaxed">
              {product.description}
            </div>
          </CardContent>
        </Card>

        {/* 리뷰 섹션 */}
        <Card className="mt-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">리뷰 ({reviews.length})</h2>
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="font-semibold">{product.rating}</span>
                <span className="text-gray-500">평균 평점</span>
              </div>
            </div>
            
            <div className="space-y-4">
              {reviews.map((review) => (
                <div key={review.id} className="border-b pb-4 last:border-b-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback>{review.user}</AvatarFallback>
                      </Avatar>
                      <div>
                        <span className="font-medium">{review.user}</span>
                        <div className="flex items-center space-x-2">
                          <div className="flex">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-500">{review.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-2">{review.comment}</p>
                  <div className="text-sm text-gray-500">
                    도움됨 {review.helpful}명
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 다이얼로그들 */}
      <ReservationDialog
        isOpen={isReservationDialogOpen}
        onClose={() => setIsReservationDialogOpen(false)}
        product={product}
        onReservationSubmit={handleReservationSubmit}
      />

      <LocationDialog
        isOpen={isLocationDialogOpen}
        onClose={() => setIsLocationDialogOpen(false)}
        address={product.location}
        productTitle={product.title}
      />
    </div>
  );
};

export default ProductDetail;
