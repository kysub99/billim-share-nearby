
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Menu, Bell, User, MessageCircle } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-blue-600">빌림</div>
            <Badge variant="secondary" className="text-xs">BILLIM</Badge>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Button variant="ghost">둘러보기</Button>
            <Button variant="ghost">내 물품 등록</Button>
            <Button variant="ghost">이용방법</Button>
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-2">
            {isLoggedIn ? (
              <>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="w-5 h-5" />
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs">
                    3
                  </Badge>
                </Button>
                <Button variant="ghost" size="icon">
                  <MessageCircle className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <User className="w-5 h-5" />
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" onClick={() => setIsLoggedIn(true)}>
                  로그인
                </Button>
                <Button onClick={() => setIsLoggedIn(true)}>
                  회원가입
                </Button>
              </>
            )}

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>메뉴</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col space-y-4 mt-6">
                  <Button variant="ghost" className="justify-start">둘러보기</Button>
                  <Button variant="ghost" className="justify-start">내 물품 등록</Button>
                  <Button variant="ghost" className="justify-start">이용방법</Button>
                  {!isLoggedIn && (
                    <>
                      <Button variant="ghost" className="justify-start">로그인</Button>
                      <Button className="justify-start">회원가입</Button>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
