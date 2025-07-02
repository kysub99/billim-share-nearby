
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Map from "./Map";

interface LocationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  address: string;
  productTitle: string;
}

const LocationDialog = ({ isOpen, onClose, address, productTitle }: LocationDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] sm:max-h-[500px]">
        <DialogHeader>
          <DialogTitle>{productTitle} - 위치</DialogTitle>
        </DialogHeader>
        <div className="h-[400px]">
          <Map address={address} className="h-full" />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LocationDialog;
