import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Plus, Pencil, Trash2, Tag } from "lucide-react";

interface TagItem {
  id: string;
  name: string;
  color: string;
  count: number;
}

const colors = [
  "bg-primary/15 text-primary",
  "bg-destructive/15 text-destructive",
  "bg-success/15 text-success",
  "bg-warning/15 text-warning",
  "bg-accent text-accent-foreground",
];

const mockTags: TagItem[] = [
  { id: "1", name: "项目", color: colors[0], count: 5 },
  { id: "2", name: "需求", color: colors[1], count: 3 },
  { id: "3", name: "报告", color: colors[2], count: 8 },
  { id: "4", name: "技术", color: colors[3], count: 12 },
  { id: "5", name: "API", color: colors[4], count: 4 },
  { id: "6", name: "数据", color: colors[0], count: 6 },
  { id: "7", name: "分析", color: colors[1], count: 2 },
];

export default function TagsPage() {
  const [tags, setTags] = useState<TagItem[]>(mockTags);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTag, setEditingTag] = useState<TagItem | null>(null);
  const [tagName, setTagName] = useState("");

  const openCreate = () => { setEditingTag(null); setTagName(""); setDialogOpen(true); };
  const openEdit = (tag: TagItem) => { setEditingTag(tag); setTagName(tag.name); setDialogOpen(true); };

  const handleSave = () => {
    if (!tagName.trim()) return;
    if (editingTag) {
      setTags(prev => prev.map(t => t.id === editingTag.id ? { ...t, name: tagName } : t));
    } else {
      setTags(prev => [...prev, {
        id: String(Date.now()),
        name: tagName,
        color: colors[Math.floor(Math.random() * colors.length)],
        count: 0,
      }]);
    }
    setDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    setTags(prev => prev.filter(t => t.id !== id));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">标签管理</h1>
          <p className="text-muted-foreground text-sm mt-1">创建和管理文件标签</p>
        </div>
        <Button onClick={openCreate} className="gap-2">
          <Plus className="w-4 h-4" /> 创建标签
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {tags.map(tag => (
          <Card key={tag.id} className="hover-lift">
            <CardContent className="flex items-center justify-between py-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Tag className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <Badge className={`${tag.color} border-0`}>{tag.name}</Badge>
                  <p className="text-xs text-muted-foreground mt-1">{tag.count} 个文件</p>
                </div>
              </div>
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(tag)}>
                  <Pencil className="w-3.5 h-3.5" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => handleDelete(tag.id)}>
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>{editingTag ? "编辑标签" : "创建标签"}</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Label>标签名称</Label>
            <Input className="mt-2" value={tagName} onChange={e => setTagName(e.target.value)} placeholder="输入标签名称" />
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
