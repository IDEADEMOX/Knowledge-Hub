import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Brain, User, Database, LogOut, ChevronDown } from "lucide-react";
import ProfileDialog from "@/components/ProfileDialog";

export default function TopNav() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [profileOpen, setProfileOpen] = useState(false);

  const navItems = [
    { label: "首页", path: "/" },
    { label: "知识库", path: "/knowledge" },
    { label: "历史记录", path: "/history" },
    { label: "标签管理", path: "/tags" },
    { label: "Prompt 管理", path: "/prompts" },
  ];

  return (
    <>
      <header className="h-14 border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="h-full max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Brain className="w-4.5 h-4.5 text-primary" />
              </div>
              <span className="font-bold text-foreground hidden sm:block">智脑知识库</span>
            </Link>
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map(item => (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant={location.pathname === item.path ? "secondary" : "ghost"}
                    size="sm"
                    className="text-sm"
                  >
                    {item.label}
                  </Button>
                </Link>
              ))}
            </nav>
          </div>

          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2 px-2">
                  <Avatar className="w-7 h-7">
                    <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                      {user.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium hidden sm:block">{user.name}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => setProfileOpen(true)}>
                  <User className="w-4 h-4 mr-2" /> 个人信息
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/knowledge")}>
                  <Database className="w-4 h-4 mr-2" /> 我的知识库
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => { logout(); navigate("/login"); }}>
                  <LogOut className="w-4 h-4 mr-2" /> 退出登录
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </header>
      <ProfileDialog open={profileOpen} onOpenChange={setProfileOpen} />
    </>
  );
}
