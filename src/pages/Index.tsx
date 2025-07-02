
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Star, Clock, Plus } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import CategoryGrid from "@/components/CategoryGrid";
import Header from "@/components/Header";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [products, setProducts] = useState([]);
  const { toast } = useToast();

  // 샘플 데이터
  const sampleProducts = [
    {
      id: 1,
      title: "보쉬 전동드릴",
      category: "공구",
      price: 3000,
      priceUnit: "일",
      location: "성수동",
      distance: "0.5km",
      rating: 4.8,
      reviewCount: 24,
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&h=200&fit=crop",
      owner: "김철수",
      isAvailable: true
    },
    {
      id: 2,
      title: "4인용 텐트",
      category: "캠핑",
      price: 15000,
      priceUnit: "일",
      location: "성수동",
      distance: "1.2km",
      rating: 4.9,
      reviewCount: 18,
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=300&h=200&fit=crop",
      owner: "이영희",
      isAvailable: true
    },
    {
      id: 3,
      title: "빔프로젝터",
      category: "전자기기",
      price: 8000,
      priceUnit: "일",
      location: "성수동",
      distance: "0.8km",
      rating: 4.7,
      reviewCount: 31,
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=300&h=200&fit=crop",
      owner: "박민수",
      isAvailable: false
    },
    {
      id: 4,
      title: "접이식 사다리",
      category: "공구",
      price: 4000,
      priceUnit: "일",
      location: "성수동",
      distance: "1.5km",
      rating: 4.6,
      reviewCount: 12,
      image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=300&h=200&fit=crop",
      owner: "최영수",
      isAvailable: true
    }
  ];

  useEffect(() => {
    setProducts(sampleProducts);
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleRentRequest = (productId) => {
    toast({
      title: "대여 요청 완료!",
      description: "물품 소유자에게 대여 요청을 보냈습니다.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">사는 대신, 빌리세요</h1>
          <p className="text-xl mb-8 opacity-90">동네 이웃과 함께하는 스마트한 대여 서비스</p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="필요한 물품을 검색해보세요 (예: 전동드릴, 텐트)"
              className="pl-12 py-6 text-lg rounded-full border-0 shadow-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex items-center justify-center mt-4 text-sm opacity-80">
            <MapPin className="w-4 h-4 mr-1" />
            성수동 기준
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Categories */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">카테고리</h2>
          <CategoryGrid onCategorySelect={setSelectedCategory} selectedCategory={selectedCategory} />
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">1,234</div>
              <div className="text-gray-600">등록된 물품</div>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">567</div>
              <div className="text-gray-600">완료된 대여</div>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">4.8</div>
              <div className="text-gray-600">평균 만족도</div>
            </CardContent>
          </Card>
        </div>

        {/* Products Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">
              {selectedCategory ? `${selectedCategory} 물품` : "추천 물품"}
            </h2>
            <Button variant="outline" className="gap-2">
              <Plus className="w-4 h-4" />
              물품 등록하기
            </Button>
          </div>
          
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">검색 결과가 없습니다</div>
              <Button variant="outline">다른 검색어로 시도해보세요</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onRentRequest={() => handleRentRequest(product.id)}
                />
              ))}
            </div>
          )}
        </div>

        {/* How it works */}
        <Card className="bg-gradient-to-r from-gray-50 to-blue-50 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-center text-2xl">빌림은 이렇게 작동해요</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">1. 검색하기</h3>
                <p className="text-gray-600">필요한 물품을 검색하고 가까운 곳에서 찾아보세요</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">2. 예약하기</h3>
                <p className="text-gray-600">원하는 날짜와 시간에 대여 요청을 보내세요</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">3. 사용하기</h3>
                <p className="text-gray-600">안전하게 사용하고 후기를 남겨주세요</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
