import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, ChevronRight, Clock } from "lucide-react";

interface HistoryItem {
  id: string;
  title: string;
  preview: string;
  date: string;
  messages: { role: "user" | "assistant"; content: string }[];
}

const mockHistory: HistoryItem[] = [
  {
    id: "1", title: "项目需求分析", preview: "帮我总结一下项目需求文档的核心内容...",
    date: "2026-03-27 14:30",
    messages: [
      { role: "user", content: "帮我总结一下项目需求文档的核心内容" },
      { role: "assistant", content: "根据您上传的项目需求文档，核心内容包括：\n1. 用户认证模块\n2. 知识库管理系统\n3. AI对话功能\n4. 标签与分类管理" },
    ],
  },
  {
    id: "2", title: "数据报表解读", preview: "分析一下这个季度的销售数据...",
    date: "2026-03-26 09:15",
    messages: [
      { role: "user", content: "分析一下这个季度的销售数据" },
      { role: "assistant", content: "本季度销售总额为 ¥2,450,000，同比增长 18%。其中线上渠道贡献了 65% 的销售额。" },
    ],
  },
  {
    id: "3", title: "API文档查询", preview: "用户认证的API接口有哪些...",
    date: "2026-03-25 16:45",
    messages: [
      { role: "user", content: "用户认证的API接口有哪些？" },
      { role: "assistant", content: "根据API文档，用户认证模块包含以下接口：\n- POST /auth/login\n- POST /auth/register\n- POST /auth/refresh\n- DELETE /auth/logout" },
    ],
  },
];

export default function HistoryPage() {
  const [selected, setSelected] = useState<HistoryItem | null>(null);

  if (selected) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => setSelected(null)}>← 返回</Button>
          <h1 className="text-xl font-bold text-foreground">{selected.title}</h1>
        </div>
        <div className="space-y-4 max-w-3xl">
          {selected.messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${
                msg.role === "user"
                  ? "bg-primary text-primary-foreground rounded-br-md"
                  : "bg-muted text-foreground rounded-bl-md"
              }`}>
                <p className="whitespace-pre-wrap">{msg.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">历史记录</h1>
        <p className="text-muted-foreground text-sm mt-1">查看和回顾历史对话</p>
      </div>
      <div className="space-y-3">
        {mockHistory.map(item => (
          <Card key={item.id} className="hover-lift cursor-pointer" onClick={() => setSelected(item)}>
            <CardContent className="flex items-center gap-4 py-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <MessageSquare className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground">{item.title}</p>
                <p className="text-sm text-muted-foreground truncate">{item.preview}</p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {item.date}
                </span>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
