import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Sparkles, Database, History, Tag } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    // Mock: just clear for now
    setQuery("");
  };

  const quickActions = [
    { icon: Database, label: "知识库", desc: "管理文件与知识", path: "/knowledge" },
    { icon: History, label: "历史记录", desc: "查看对话历史", path: "/history" },
    { icon: Tag, label: "标签管理", desc: "管理文件标签", path: "/tags" },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)]">
      <div className="w-full max-w-2xl animate-fade-in space-y-8">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-2">
            <Sparkles className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">有什么可以帮到你？</h1>
          <p className="text-muted-foreground">基于您的知识库，智能回答各类问题</p>
        </div>

        <form onSubmit={handleSubmit} className="relative">
          <div className="glass-card rounded-2xl p-2">
            <div className="flex items-center gap-2">
              <Input
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="输入您的问题，例如：总结一下项目进度报告..."
                className="flex-1 border-0 bg-transparent focus-visible:ring-0 text-base h-12 px-4"
              />
              <Button type="submit" size="icon" className="h-10 w-10 rounded-xl shrink-0">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </form>

        <div className="grid grid-cols-3 gap-3">
          {quickActions.map(action => (
            <button
              key={action.path}
              onClick={() => navigate(action.path)}
              className="glass-card rounded-xl p-4 text-left hover-lift cursor-pointer group"
            >
              <action.icon className="w-5 h-5 text-primary mb-2 group-hover:scale-110 transition-transform" />
              <p className="font-medium text-sm text-foreground">{action.label}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{action.desc}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
