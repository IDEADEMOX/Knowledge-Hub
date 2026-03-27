import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Plus, Pencil, Trash2, Zap } from "lucide-react";

interface PromptItem {
  id: string;
  title: string;
  content: string;
  updatedAt: string;
}

const mockPrompts: PromptItem[] = [
  { id: "1", title: "文档摘要", content: "请帮我总结以下文档的核心要点，以清晰的结构化格式输出，包含主要观点和关键数据。", updatedAt: "2026-03-27" },
  { id: "2", title: "代码审查", content: "请审查以下代码片段，指出潜在的问题、性能优化建议和最佳实践改进方向。", updatedAt: "2026-03-26" },
  { id: "3", title: "翻译助手", content: "请将以下内容翻译为中文/英文，保持专业术语准确性和语句流畅度。", updatedAt: "2026-03-25" },
];

export default function PromptsPage() {
  const [prompts, setPrompts] = useState<PromptItem[]>(mockPrompts);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<PromptItem | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const openCreate = () => { setEditing(null); setTitle(""); setContent(""); setDialogOpen(true); };
  const openEdit = (p: PromptItem) => { setEditing(p); setTitle(p.title); setContent(p.content); setDialogOpen(true); };

  const handleSave = () => {
    if (!title.trim() || !content.trim()) return;
    if (editing) {
      setPrompts(prev => prev.map(p => p.id === editing.id ? { ...p, title, content, updatedAt: new Date().toISOString().slice(0, 10) } : p));
    } else {
      setPrompts(prev => [...prev, { id: String(Date.now()), title, content, updatedAt: new Date().toISOString().slice(0, 10) }]);
    }
    setDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    setPrompts(prev => prev.filter(p => p.id !== id));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Prompt 管理</h1>
          <p className="text-muted-foreground text-sm mt-1">创建和管理常用提示词模板</p>
        </div>
        <Button onClick={openCreate} className="gap-2">
          <Plus className="w-4 h-4" /> 创建 Prompt
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {prompts.map(p => (
          <Card key={p.id} className="hover-lift">
            <CardContent className="py-5 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Zap className="w-4 h-4 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground">{p.title}</h3>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => openEdit(p)}>
                    <Pencil className="w-3.5 h-3.5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive hover:text-destructive" onClick={() => handleDelete(p.id)}>
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-3">{p.content}</p>
              <p className="text-xs text-muted-foreground">更新于 {p.updatedAt}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{editing ? "编辑 Prompt" : "创建 Prompt"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>标题</Label>
              <Input value={title} onChange={e => setTitle(e.target.value)} placeholder="Prompt 标题" />
            </div>
            <div className="space-y-2">
              <Label>内容</Label>
              <Textarea value={content} onChange={e => setContent(e.target.value)} placeholder="输入提示词内容..." rows={5} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>取消</Button>
            <Button onClick={handleSave}>保存</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
