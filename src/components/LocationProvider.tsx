
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MapPin, Target, Search, AlertCircle } from "lucide-react";
import { toast } from "sonner";

interface LocationData {
  latitude: number;
  longitude: number;
  address: string;
  district: string;
}

interface LocationContextType {
  currentLocation: LocationData | null;
  isLocationLoading: boolean;
  locationError: string | null;
  getCurrentLocation: () => void;
  setManualLocation: (address: string) => void;
  showLocationDialog: () => void;
}

const LocationContext = createContext<LocationContextType | null>(null);

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation must be used within LocationProvider');
  }
  return context;
};

interface LocationProviderProps {
  children: ReactNode;
}

const LocationProvider = ({ children }: LocationProviderProps) => {
  const [currentLocation, setCurrentLocation] = useState<LocationData | null>(null);
  const [isLocationLoading, setIsLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [manualAddress, setManualAddress] = useState("");

  // 좌표를 주소로 변환하는 함수 (Kakao API 사용)
  const reverseGeocode = async (lat: number, lng: number): Promise<string> => {
    try {
      // 실제 환경에서는 Kakao API 키가 필요합니다
      // 여기서는 임시로 서울 지역으로 설정
      const districts = [
        "강남구", "강동구", "강북구", "강서구", "관악구", "광진구", "구로구", "금천구",
        "노원구", "도봉구", "동대문구", "동작구", "마포구", "서대문구", "서초구", "성동구",
        "성북구", "송파구", "양천구", "영등포구", "용산구", "은평구", "종로구", "중구", "중랑구"
      ];
      const randomDistrict = districts[Math.floor(Math.random() * districts.length)];
      return `서울특별시 ${randomDistrict}`;
    } catch (error) {
      console.error('주소 변환 오류:', error);
      return "서울특별시 성동구";
    }
  };

  // 현재 위치 가져오기
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationError("이 브라우저에서는 위치 서비스가 지원되지 않습니다.");
      return;
    }

    setIsLocationLoading(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const address = await reverseGeocode(latitude, longitude);
          const district = address.split(' ').pop() || "성동구";
          
          const locationData: LocationData = {
            latitude,
            longitude,
            address,
            district
          };
          
          setCurrentLocation(locationData);
          localStorage.setItem('userLocation', JSON.stringify(locationData));
          toast.success("현재 위치가 설정되었습니다.");
        } catch (error) {
          console.error('위치 설정 오류:', error);
          setLocationError("위치 정보를 가져올 수 없습니다.");
        } finally {
          setIsLocationLoading(false);
        }
      },
      (error) => {
        console.error('위치 가져오기 오류:', error);
        let errorMessage = "위치 정보를 가져올 수 없습니다.";
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "위치 권한이 거부되었습니다. 브라우저 설정에서 위치 권한을 허용해주세요.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "위치 정보를 사용할 수 없습니다.";
            break;
          case error.TIMEOUT:
            errorMessage = "위치 정보 가져오기 시간이 초과되었습니다.";
            break;
        }
        
        setLocationError(errorMessage);
        setIsLocationLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000
      }
    );
  };

  // 수동으로 위치 설정
  const setManualLocation = async (address: string) => {
    if (!address.trim()) return;

    setIsLocationLoading(true);
    try {
      // 실제 환경에서는 Geocoding API 사용
      // 여기서는 임시로 서울 좌표 사용
      const locationData: LocationData = {
        latitude: 37.5665 + (Math.random() - 0.5) * 0.1,
        longitude: 126.9780 + (Math.random() - 0.5) * 0.1,
        address: address,
        district: address.includes('구') ? address.split(' ').find(part => part.endsWith('구')) || "성동구" : "성동구"
      };
      
      setCurrentLocation(locationData);
      localStorage.setItem('userLocation', JSON.stringify(locationData));
      setShowDialog(false);
      setManualAddress("");
      toast.success("위치가 설정되었습니다.");
    } catch (error) {
      console.error('수동 위치 설정 오류:', error);
      setLocationError("주소를 찾을 수 없습니다.");
    } finally {
      setIsLocationLoading(false);
    }
  };

  const showLocationDialog = () => {
    setShowDialog(true);
  };

  // 컴포넌트 마운트 시 저장된 위치 불러오기
  useEffect(() => {
    const savedLocation = localStorage.getItem('userLocation');
    if (savedLocation) {
      try {
        setCurrentLocation(JSON.parse(savedLocation));
      } catch (error) {
        console.error('저장된 위치 불러오기 오류:', error);
      }
    }
  }, []);

  return (
    <LocationContext.Provider
      value={{
        currentLocation,
        isLocationLoading,
        locationError,
        getCurrentLocation,
        setManualLocation,
        showLocationDialog
      }}
    >
      {children}
      
      {/* 위치 설정 다이얼로그 */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              위치 설정
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            {/* 현재 위치 사용 */}
            <div className="space-y-2">
              <Button
                onClick={getCurrentLocation}
                disabled={isLocationLoading}
                className="w-full gap-2"
              >
                <Target className="w-4 h-4" />
                {isLocationLoading ? "위치 확인 중..." : "현재 위치 사용"}
              </Button>
              
              {locationError && (
                <div className="flex items-center gap-2 text-red-600 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  {locationError}
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              <div className="flex-1 h-px bg-gray-200"></div>
              <span className="text-sm text-gray-500">또는</span>
              <div className="flex-1 h-px bg-gray-200"></div>
            </div>

            {/* 수동 주소 입력 */}
            <div className="space-y-2">
              <Label htmlFor="manual-address">주소 직접 입력</Label>
              <div className="flex gap-2">
                <Input
                  id="manual-address"
                  placeholder="예: 서울시 강남구 역삼동"
                  value={manualAddress}
                  onChange={(e) => setManualAddress(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      setManualLocation(manualAddress);
                    }
                  }}
                />
                <Button
                  onClick={() => setManualLocation(manualAddress)}
                  disabled={!manualAddress.trim() || isLocationLoading}
                  size="icon"
                >
                  <Search className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* 현재 설정된 위치 표시 */}
            {currentLocation && (
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>현재 위치: {currentLocation.address}</span>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </LocationContext.Provider>
  );
};

export default LocationProvider;
