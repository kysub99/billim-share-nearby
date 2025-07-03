
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Search, 
  MapPin, 
  Star, 
  Clock, 
  Heart,
  Filter
} from "lucide-react";
import Header from "@/components/Header";
import CategoryGrid from "@/components/CategoryGrid";
import PopularItems from "@/components/PopularItems";
import ProductCard from "@/components/ProductCard";
import SearchFilters from "@/components/SearchFilters";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    category: "",
    priceRange: [0, 50000],
    rating: 0,
    location: "",
    sortBy: "newest"
  });

  // 샘플 데이터
  const products = [
    {
      id: 1,
      title: "보쉬 전동드릴 GSB 120-LI",
      category: "공구",
      price: 3000,
      priceUnit: "일",
      location: "성수동",
      distance: "0.5km",
      rating: 4.8,
      reviewCount: 24,
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&h=200&fit=crop",
      owner: "김철수",
      isAvailable: true,
      createdAt: new Date('2024-01-15')
    },
    {
      id: 2,
      title: "4인용 텐트",
      category: "캠핑",
      price: 15000,
      priceUnit: "일",
      location: "강남구",
      distance: "2.3km",
      rating: 4.9,
      reviewCount: 18,
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=300&h=200&fit=crop",
      owner: "이영희",
      isAvailable: false,
      createdAt: new Date('2024-01-12')
    },
    {
      id: 3,
      title: "빔프로젝터",
      category: "전자기기",
      price: 8000,
      priceUnit: "일",
      location: "홍대입구",
      distance: "1.8km",
      rating: 4.7,
      reviewCount: 32,
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=300&h=200&fit=crop",
      owner: "박민수",
      isAvailable: true,
      createdAt: new Date('2024-01-10')
    }
  ];

  const filteredProducts = products.filter(product => {
    if (searchQuery && !product.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (filters.category && product.category !== filters.category) {
      return false;
    }
    if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
      return false;
    }
    if (filters.rating && product.rating < filters.rating) {
      return false;
    }
    return true;
  }).sort((a, b) => {
    switch (filters.sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
      default:
        return b.createdAt.getTime() - a.createdAt.getTime();
    }
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // 검색 로직은 이미 filteredProducts에서 처리됨
  };

  const handleFiltersChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* 검색 섹션 */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              원하는 물건을 빌려보세요
            </h1>
            <p className="text-xl text-gray-600">
              근처 이웃들과 함께하는 스마트한 공유 생활
            </p>
          </div>
          
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="어떤 물건을 찾고 계신가요?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 text-lg"
                />
              </div>
              <Button 
                type="button"
                variant="outline" 
                className="h-12 px-4"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="w-5 h-5" />
              </Button>
              <Button type="submit" className="h-12 px-8">
                검색
              </Button>
            </div>
          </form>
        </div>

        {/* 필터 섹션 */}
        {showFilters && (
          <div className="mb-8">
            <SearchFilters 
              filters={filters}
              onFiltersChange={handleFiltersChange}
            />
          </div>
        )}

        {/* 빠른 카테고리 */}
        <div className="mb-12">
          <CategoryGrid />
        </div>

        {/* 인기 물품 */}
        <div className="mb-12">
          <PopularItems />
        </div>

        {/* 최근 등록된 물품 */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">
              {searchQuery ? `'${searchQuery}' 검색 결과` : "최근 등록된 물품"}
            </h2>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-gray-500" />
              <span className="text-sm text-gray-500">실시간 업데이트</span>
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-500 mb-4">
                <Star className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p className="text-lg">검색 결과가 없습니다.</p>
                <p className="text-sm">다른 키워드로 검색해보세요.</p>
              </div>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchQuery("");
                  setFilters({
                    category: "",
                    priceRange: [0, 50000],
                    rating: 0,
                    location: "",
                    sortBy: "newest"
                  });
                }}
              >
                전체 물품 보기
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onClick={() => navigate(`/product/${product.id}`)}
                />
              ))}
            </div>
          )}
        </div>

        {/* 통계 섹션 */}
        <div className="bg-white rounded-2xl p-8 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">1,234</div>
              <div className="text-gray-600">등록된 물품</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">567</div>
              <div className="text-gray-600">활성 사용자</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">89%</div>
              <div className="text-gray-600">만족도</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
