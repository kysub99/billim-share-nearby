
import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Send, 
  Phone, 
  Video, 
  MoreVertical,
  Image as ImageIcon,
  Star
} from "lucide-react";
import Header from "@/components/Header";

interface Message {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
  type: 'text' | 'image' | 'system';
  isMe: boolean;
}

interface ChatRoom {
  id: string;
  user: {
    name: string;
    avatar: string;
    rating: number;
    isOnline: boolean;
    lastSeen?: string;
  };
  productInfo?: {
    title: string;
    price: number;
    image: string;
  };
  messages: Message[];
}

const Chat = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 샘플 채팅룸 데이터
  const chatRooms: ChatRoom[] = [
    {
      id: "1",
      user: {
        name: "김철수",
        avatar: "",
        rating: 4.8,
        isOnline: true
      },
      productInfo: {
        title: "보쉬 전동드릴",
        price: 3000,
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=100&h=100&fit=crop"
      },
      messages: [
        {
          id: 1,
          sender: "김철수",
          content: "안녕하세요! 전동드릴 대여 문의주셔서 감사합니다.",
          timestamp: "14:30",
          type: 'text',
          isMe: false
        },
        {
          id: 2,
          sender: "나",
          content: "안녕하세요! 내일 오후에 사용 가능한지 궁금합니다.",
          timestamp: "14:32",
          type: 'text',
          isMe: true
        },
        {
          id: 3,
          sender: "김철수",
          content: "네, 내일 오후는 가능합니다. 몇 시쯤 픽업 원하시나요?",
          timestamp: "14:33",
          type: 'text',
          isMe: false
        },
        {
          id: 4,
          sender: "시스템",
          content: "김철수님이 대여 요청을 수락했습니다.",
          timestamp: "14:35",
          type: 'system',
          isMe: false
        }
      ]
    },
    {
      id: "2",
      user: {
        name: "이영희",
        avatar: "",
        rating: 4.9,
        isOnline: false,
        lastSeen: "1시간 전"
      },
      productInfo: {
        title: "4인용 텐트",
        price: 15000,
        image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=100&h=100&fit=crop"
      },
      messages: [
        {
          id: 1,
          sender: "이영희",
          content: "텐트 사용법 설명드릴게요!",
          timestamp: "13:20",
          type: 'text',
          isMe: false
        }
      ]
    }
  ];

  const currentChatRoom = userId 
    ? chatRooms.find(room => room.user.name === userId)
    : chatRooms[0];

  useEffect(() => {
    if (currentChatRoom) {
      setMessages(currentChatRoom.messages);
    }
  }, [currentChatRoom]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMessage: Message = {
      id: Date.now(),
      sender: "나",
      content: message,
      timestamp: new Date().toLocaleTimeString('ko-KR', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      type: 'text',
      isMe: true
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage("");

    // 시뮬레이션: 상대방 응답
    setTimeout(() => {
      const replyMessage: Message = {
        id: Date.now() + 1,
        sender: currentChatRoom?.user.name || "상대방",
        content: "네, 알겠습니다!",
        timestamp: new Date().toLocaleTimeString('ko-KR', { 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        type: 'text',
        isMe: false
      };
      setMessages(prev => [...prev, replyMessage]);
    }, 1000);
  };

  if (!currentChatRoom) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-gray-500">채팅방을 찾을 수 없습니다.</p>
            <Button onClick={() => navigate('/')} className="mt-4">
              홈으로 돌아가기
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // 채팅방 목록 표시 (userId가 없는 경우)
  if (!userId) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex items-center mb-6">
            <Button
              variant="ghost"
              className="gap-2"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="w-4 h-4" />
              뒤로가기
            </Button>
            <h1 className="text-2xl font-bold ml-4">채팅</h1>
          </div>

          <div className="space-y-4">
            {chatRooms.map((room) => (
              <Card 
                key={room.id} 
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => navigate(`/chat/${room.user.name}`)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={room.user.avatar} />
                        <AvatarFallback>{room.user.name}</AvatarFallback>
                      </Avatar>
                      {room.user.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold">{room.user.name}</span>
                          <div className="flex items-center">
                            <Star className="w-3 h-3 text-yellow-400 fill-current mr-1" />
                            <span className="text-xs text-gray-500">{room.user.rating}</span>
                          </div>
                          {!room.user.isOnline && (
                            <span className="text-xs text-gray-400">{room.user.lastSeen}</span>
                          )}
                        </div>
                        <span className="text-xs text-gray-500">
                          {room.messages[room.messages.length - 1]?.timestamp}
                        </span>
                      </div>
                      
                      {room.productInfo && (
                        <div className="flex items-center space-x-2 mb-2">
                          <img
                            src={room.productInfo.image}
                            alt={room.productInfo.title}
                            className="w-8 h-8 object-cover rounded"
                          />
                          <span className="text-sm text-gray-600">{room.productInfo.title}</span>
                          <Badge variant="outline" className="text-xs">
                            {room.productInfo.price.toLocaleString()}원
                          </Badge>
                        </div>
                      )}
                      
                      <p className="text-sm text-gray-600 truncate">
                        {room.messages[room.messages.length - 1]?.content}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // 개별 채팅방 표시
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-4xl mx-auto">
        {/* 채팅 헤더 */}
        <div className="bg-white border-b sticky top-0 z-10">
          <div className="px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => navigate('/chat')}
                >
                  <ArrowLeft className="w-5 h-5" />
                </Button>
                
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={currentChatRoom.user.avatar} />
                      <AvatarFallback>{currentChatRoom.user.name}</AvatarFallback>
                    </Avatar>
                    {currentChatRoom.user.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                    )}
                  </div>
                  <div>
                    <h2 className="font-semibold">{currentChatRoom.user.name}</h2>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        <Star className="w-3 h-3 text-yellow-400 fill-current mr-1" />
                        <span className="text-xs text-gray-500">{currentChatRoom.user.rating}</span>
                      </div>
                      <span className="text-xs text-gray-500">
                        {currentChatRoom.user.isOnline ? "온라인" : currentChatRoom.user.lastSeen}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon">
                  <Phone className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Video className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* 상품 정보 카드 */}
        {currentChatRoom.productInfo && (
          <div className="p-4 bg-blue-50 border-b">
            <div className="flex items-center space-x-3">
              <img
                src={currentChatRoom.productInfo.image}
                alt={currentChatRoom.productInfo.title}
                className="w-12 h-12 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="font-medium">{currentChatRoom.productInfo.title}</h3>
                <p className="text-sm text-blue-600 font-medium">
                  {currentChatRoom.productInfo.price.toLocaleString()}원/일
                </p>
              </div>
              <Button size="sm" onClick={() => navigate(`/product/${1}`)}>
                상품 보기
              </Button>
            </div>
          </div>
        )}

        {/* 메시지 영역 */}
        <div className="h-[calc(100vh-240px)] overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}
            >
              {msg.type === 'system' ? (
                <div className="text-center w-full">
                  <div className="inline-block bg-gray-200 text-gray-600 text-sm px-3 py-1 rounded-full">
                    {msg.content}
                  </div>
                </div>
              ) : (
                <div className={`max-w-[70%] ${msg.isMe ? 'items-end' : 'items-start'} flex flex-col`}>
                  <div
                    className={`px-4 py-2 rounded-2xl ${
                      msg.isMe
                        ? 'bg-blue-500 text-white'
                        : 'bg-white border shadow-sm'
                    }`}
                  >
                    <p className="text-sm">{msg.content}</p>
                  </div>
                  <span className="text-xs text-gray-500 mt-1 px-2">
                    {msg.timestamp}
                  </span>
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* 메시지 입력 */}
        <div className="bg-white border-t p-4">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="icon">
              <ImageIcon className="w-5 h-5" />
            </Button>
            <div className="flex-1">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="메시지를 입력하세요..."
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>
            <Button 
              onClick={handleSendMessage}
              disabled={!message.trim()}
              size="icon"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
