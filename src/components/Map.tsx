
import { useEffect, useRef, useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin, AlertCircle } from "lucide-react";

// 임시 맵박스 토큰 입력을 위한 인터페이스
interface MapProps {
  address?: string;
  className?: string;
}

const Map = ({ address = "서울특별시 성동구 성수동", className = "" }: MapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [mapboxToken, setMapboxToken] = useState("");
  const [showTokenInput, setShowTokenInput] = useState(true);
  const [error, setError] = useState("");

  const initializeMap = async () => {
    if (!mapboxToken || !mapContainer.current) return;

    try {
      // Mapbox GL JS 동적 로드
      const mapboxgl = await import('mapbox-gl');
      
      // 토큰 설정
      mapboxgl.default.accessToken = mapboxToken;

      // 주소를 좌표로 변환 (Geocoding API)
      const geocodeUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${mapboxToken}&country=KR&language=ko`;
      
      const response = await fetch(geocodeUrl);
      const data = await response.json();
      
      let center: [number, number] = [127.0557, 37.5439]; // 기본값: 성수동
      
      if (data.features && data.features.length > 0) {
        center = data.features[0].center as [number, number];
      }

      // 지도 초기화
      const map = new mapboxgl.default.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: center,
        zoom: 15,
      });

      // 마커 추가
      new mapboxgl.default.Marker({
        color: '#3B82F6'
      })
        .setLngLat(center)
        .setPopup(
          new mapboxgl.default.Popup({ offset: 25 })
            .setHTML(`<div class="p-2"><strong>${address}</strong></div>`)
        )
        .addTo(map);

      // 네비게이션 컨트롤 추가
      map.addControl(new mapboxgl.default.NavigationControl(), 'top-right');

      setError("");
      setShowTokenInput(false);

    } catch (err) {
      console.error('지도 초기화 오류:', err);
      setError("지도를 불러올 수 없습니다. 토큰을 확인해주세요.");
    }
  };

  const handleTokenSubmit = () => {
    if (!mapboxToken.trim()) {
      setError("Mapbox 토큰을 입력해주세요.");
      return;
    }
    initializeMap();
  };

  if (showTokenInput) {
    return (
      <div className={`bg-gray-50 rounded-lg p-6 ${className}`}>
        <div className="text-center space-y-4">
          <MapPin className="w-12 h-12 text-gray-400 mx-auto" />
          <div>
            <h3 className="font-semibold text-lg mb-2">지도를 표시하려면 Mapbox 토큰이 필요합니다</h3>
            <p className="text-sm text-gray-600 mb-4">
              <a 
                href="https://mapbox.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                mapbox.com
              </a>에서 계정을 만들고 공개 토큰을 가져와 입력해주세요.
            </p>
          </div>
          
          <div className="max-w-md mx-auto space-y-3">
            <Input
              type="text"
              placeholder="Mapbox 공개 토큰을 입력하세요"
              value={mapboxToken}
              onChange={(e) => setMapboxToken(e.target.value)}
              className="text-center"
            />
            {error && (
              <div className="flex items-center justify-center text-red-600 text-sm">
                <AlertCircle className="w-4 h-4 mr-1" />
                {error}
              </div>
            )}
            <Button onClick={handleTokenSubmit} className="w-full">
              지도 표시하기
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <div ref={mapContainer} className="w-full h-full rounded-lg" />
    </div>
  );
};

export default Map;
