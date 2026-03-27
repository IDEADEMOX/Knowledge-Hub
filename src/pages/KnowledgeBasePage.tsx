import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Upload, Trash2, FileText, FileSpreadsheet, File, Search } from "lucide-react";

interface KBItem {
  id: string;
  name: string;
  size: string;
  type: string;
  tags: string[];
  createdAt: string;
}

const mockData: KBItem[] = [
  { id: "1", name: "项目需求文档.pdf", size: "2.4 MB", type: "PDF", tags: ["项目", "需求"], createdAt: "2026-03-25" },
  { id: "2", name: "季度报告.docx", size: "1.1 MB", type: "Word", tags: ["报告"], createdAt: "2026-03-24" },
  { id: "3", name: "数据分析表.xlsx", size: "3.8 MB", type: "Excel", tags: ["数据", "分析"], createdAt: "2026-03-23" },
  { id: "4", name: "API接口文档.pdf", size: "890 KB", type: "PDF", tags: ["技术", "API"], createdAt: "2026-03-22" },
];

const typeIcon: Record<string, typeof FileText> = {
  PDF: FileText,
  Word: File,
  Excel: FileSpreadsheet,
};

export default function KnowledgeBasePage() {
  const [items, setItems] = useState<KBItem[]>(mockData);
  const [search, setSearch] = useState("");

  const filtered = items.filter(i => i.name.toLowerCase().includes(search.toLowerCase()));

  const handleUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.csv";
    input.multiple = true;
    input.onchange = (e) => {
      const files = (e.target as HTMLInputElement).files;
      if (!files) return;
      const newItems: KBItem[] = Array.from(files).map((f, i) => ({
        id: String(Date.now() + i),
        name: f.name,
        size: `${(f.size / 1024 / 1024).toFixed(1)} MB`,
        type: f.name.split(".").pop()?.toUpperCase() || "文件",
        tags: [],
        createdAt: new Date().toISOString().slice(0, 10),
      }));
      setItems(prev => [...newItems, ...prev]);
    };
    input.click();
  };

  const handleDelete = (id: string) => {
    setItems(prev => prev.filter(i => i.id !== id));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">知识库</h1>
          <p className="text-muted-foreground text-sm mt-1">管理您的文件和知识资源</p>
        </div>
        <Button onClick={handleUpload} className="gap-2">
          <Upload className="w-4 h-4" /> 上传文件
        </Button>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="搜索文件..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      <Card className="overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>文件名称</TableHead>
              <TableHead>类型</TableHead>
              <TableHead>大小</TableHead>
              <TableHead>标签</TableHead>
              <TableHead>上传日期</TableHead>
              <TableHead className="w-16">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map(item => {
              const Icon = typeIcon[item.type] || File;
              return (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4 text-primary shrink-0" />
                      {item.name}
                    </div>
                  </TableCell>
                  <TableCell>{item.type}</TableCell>
                  <TableCell>{item.size}</TableCell>
                  <TableCell>
                    <div className="flex gap-1 flex-wrap">
                      {item.tags.map(t => (
                        <Badge key={t} variant="secondary" className="text-xs">{t}</Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{item.createdAt}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => handleDelete(item.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-12 text-muted-foreground">
                  暂无文件，点击上方按钮上传
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
