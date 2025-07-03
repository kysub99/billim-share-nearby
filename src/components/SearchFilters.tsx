
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Filter, CalendarIcon, X } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface SearchFiltersProps {
  onFiltersChange: (filters: any) => void;
  initialFilters?: any;
}

const SearchFilters = ({ onFiltersChange, initialFilters = {} }: SearchFiltersProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    priceRange: initialFilters.priceRange || [0, 50000],
    distance: initialFilters.distance || 5,
    category: initialFilters.category || "",
    availableDate: initialFilters.availableDate || null,
    rating: initialFilters.rating || 0,
    sortBy: initialFilters.sortBy || "distance"
  });

  const categories = [
    "공구", "캠핑", "전자기기", "카메라", "자동차", "생활용품", "악기", "운동용품"
  ];

  const sortOptions = [
    { value: "distance", label: "거리순" },
    { value: "price_low", label: "가격 낮은순" },
    { value: "price_high", label: "가격 높은순" },
    { value: "rating", label: "평점순" },
    { value: "recent", label: "최신순" }
  ];

  const handleFilterChange = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const resetFilters = () => {
    const defaultFilters = {
      priceRange: [0, 50000],
      distance: 5,
      category: "",
      availableDate: null,
      rating: 0,
      sortBy: "distance"
    };
    setFilters(defaultFilters);
    onFiltersChange(defaultFilters);
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.category) count++;
    if (filters.availableDate) count++;
    if (filters.rating > 0) count++;
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 50000) count++;
    if (filters.distance < 5) count++;
    return count;
  };

  const activeFiltersCount = getActiveFiltersCount();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2 relative">
          <Filter className="w-4 h-4" />
          필터
          {activeFiltersCount > 0 && (
            <Badge className="absolute -top-2 -right-2 w-5 h-5 p-0 flex items-center justify-center text-xs">
              {activeFiltersCount}
            </Badge>
          )}
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            검색 필터
            <Button variant="ghost" size="sm" onClick={resetFilters}>
              초기화
            </Button>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {/* 카테고리 */}
          <div className="space-y-2">
            <Label>카테고리</Label>
            <Select
              value={filters.category}
              onValueChange={(value) => handleFilterChange("category", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="카테고리 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">전체</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* 가격 범위 */}
          <div className="space-y-3">
            <Label>가격 범위</Label>
            <div className="px-3">
              <Slider
                value={filters.priceRange}
                onValueChange={(value) => handleFilterChange("priceRange", value)}
                max={50000}
                min={0}
                step={1000}
                className="w-full"
              />
            </div>
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>{filters.priceRange[0].toLocaleString()}원</span>
              <span>{filters.priceRange[1].toLocaleString()}원</span>
            </div>
          </div>

          {/* 거리 */}
          <div className="space-y-3">
            <Label>최대 거리: {filters.distance}km</Label>
            <div className="px-3">
              <Slider
                value={[filters.distance]}
                onValueChange={(value) => handleFilterChange("distance", value[0])}
                max={10}
                min={0.5}
                step={0.5}
                className="w-full"
              />
            </div>
          </div>

          {/* 사용 가능 날짜 */}
          <div className="space-y-2">
            <Label>사용 가능 날짜</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !filters.availableDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {filters.availableDate ? (
                    format(filters.availableDate, "yyyy년 MM월 dd일")
                  ) : (
                    "날짜 선택"
                  )}
                  {filters.availableDate && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="ml-auto h-auto p-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFilterChange("availableDate", null);
                      }}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={filters.availableDate}
                  onSelect={(date) => handleFilterChange("availableDate", date)}
                  disabled={(date) => date < new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* 최소 평점 */}
          <div className="space-y-3">
            <Label>최소 평점: {filters.rating > 0 ? `${filters.rating}점 이상` : "전체"}</Label>
            <div className="px-3">
              <Slider
                value={[filters.rating]}
                onValueChange={(value) => handleFilterChange("rating", value[0])}
                max={5}
                min={0}
                step={0.5}
                className="w-full"
              />
            </div>
          </div>

          {/* 정렬 기준 */}
          <div className="space-y-2">
            <Label>정렬 기준</Label>
            <Select
              value={filters.sortBy}
              onValueChange={(value) => handleFilterChange("sortBy", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* 적용된 필터 표시 */}
        {activeFiltersCount > 0 && (
          <div className="border-t pt-4">
            <Label className="text-sm font-medium mb-2 block">적용된 필터</Label>
            <div className="flex flex-wrap gap-2">
              {filters.category && (
                <Badge variant="secondary" className="gap-1">
                  {filters.category}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 ml-1"
                    onClick={() => handleFilterChange("category", "")}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}
              {filters.availableDate && (
                <Badge variant="secondary" className="gap-1">
                  {format(filters.availableDate, "MM/dd")}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 ml-1"
                    onClick={() => handleFilterChange("availableDate", null)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}
              {filters.rating > 0 && (
                <Badge variant="secondary" className="gap-1">
                  {filters.rating}점 이상
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 ml-1"
                    onClick={() => handleFilterChange("rating", 0)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SearchFilters;
