
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, ChevronDown } from "lucide-react";
import { useLocation } from "./LocationProvider";

const LocationButton = () => {
  const { currentLocation, showLocationDialog } = useLocation();

  return (
    <Button
      variant="outline"
      onClick={showLocationDialog}
      className="gap-2 max-w-48"
    >
      <MapPin className="w-4 h-4" />
      <span className="truncate">
        {currentLocation ? currentLocation.district : "위치 설정"}
      </span>
      <ChevronDown className="w-4 h-4" />
    </Button>
  );
};

export default LocationButton;
