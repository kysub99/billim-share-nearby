
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Clock } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface Product {
  id: number;
  title: string;
  price: number;
  priceUnit: string;
  owner: string;
}

interface ReservationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  onReservationSubmit: (reservation: any) => void;
}

const ReservationDialog = ({ isOpen, onClose, product, onReservationSubmit }: ReservationDialogProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    if (!selectedDate || !startTime || !endTime || !product) return;

    const reservation = {
      productId: product.id,
      date: selectedDate,
      startTime,
      endTime,
      message,
      productTitle: product.title,
      owner: product.owner,
      price: product.price,
      priceUnit: product.priceUnit
    };

    onReservationSubmit(reservation);
    
    // 폼 초기화
    setSelectedDate(undefined);
    setStartTime("");
    setEndTime("");
    setMessage("");
    onClose();
  };

  if (!product) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{product.title} 예약하기</DialogTitle>
          <DialogDescription>
            현재 대여 중인 물품입니다. 원하시는 날짜와 시간을 선택해서 예약해주세요.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>예약 날짜</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !selectedDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? format(selectedDate, "yyyy년 MM월 dd일") : "날짜를 선택하세요"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => date < new Date()}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>시작 시간</Label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>종료 시간</Label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>요청 메시지 (선택사항)</Label>
            <textarea
              className="w-full p-3 border rounded-md resize-none"
              rows={3}
              placeholder="물품 소유자에게 전달할 메시지를 입력해주세요..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center text-sm">
              <span>예상 대여료</span>
              <span className="font-semibold">
                {product.price.toLocaleString()}원/{product.priceUnit}
              </span>
            </div>
            <div className="text-xs text-gray-500 mt-1">
              최종 금액은 소유자와 협의 후 결정됩니다.
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            취소
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={!selectedDate || !startTime || !endTime}
          >
            예약 요청하기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReservationDialog;
