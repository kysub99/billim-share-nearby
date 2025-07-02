
import { Card, CardContent } from "@/components/ui/card";
import { 
  Wrench, 
  Tent, 
  Gamepad2, 
  Camera, 
  Car, 
  Home,
  Music,
  Dumbbell
} from "lucide-react";

interface CategoryGridProps {
  onCategorySelect: (category: string) => void;
  selectedCategory: string;
}

const CategoryGrid = ({ onCategorySelect, selectedCategory }: CategoryGridProps) => {
  const categories = [
    { name: "공구", icon: Wrench, color: "bg-blue-100 text-blue-600", count: 234 },
    { name: "캠핑", icon: Tent, color: "bg-green-100 text-green-600", count: 156 },
    { name: "전자기기", icon: Gamepad2, color: "bg-purple-100 text-purple-600", count: 189 },
    { name: "카메라", icon: Camera, color: "bg-pink-100 text-pink-600", count: 87 },
    { name: "자동차", icon: Car, color: "bg-red-100 text-red-600", count: 45 },
    { name: "생활용품", icon: Home, color: "bg-yellow-100 text-yellow-600", count: 298 },
    { name: "악기", icon: Music, color: "bg-indigo-100 text-indigo-600", count: 67 },
    { name: "운동용품", icon: Dumbbell, color: "bg-orange-100 text-orange-600", count: 123 }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {categories.map((category) => {
        const Icon = category.icon;
        const isSelected = selectedCategory === category.name;
        
        return (
          <Card
            key={category.name}
            className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
              isSelected 
                ? 'ring-2 ring-blue-500 shadow-md' 
                : 'hover:scale-105'
            }`}
            onClick={() => onCategorySelect(isSelected ? "" : category.name)}
          >
            <CardContent className="p-4 text-center">
              <div className={`w-12 h-12 rounded-full ${category.color} flex items-center justify-center mx-auto mb-2`}>
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="font-medium text-sm mb-1">{category.name}</h3>
              <p className="text-xs text-gray-500">{category.count}개</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default CategoryGrid;
