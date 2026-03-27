import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, ArrowRight } from "lucide-react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) return;
    await register(name, email, password);
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md animate-fade-in">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-4">
            <Brain className="w-7 h-7 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">智脑知识库</h1>
          <p className="text-muted-foreground mt-1">创建您的账号</p>
        </div>

        <Card className="glass-card">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-xl">注册</CardTitle>
            <CardDescription>填写以下信息创建新账号</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">用户名</Label>
                <Input id="name" placeholder="输入用户名" value={name} onChange={e => setName(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">邮箱地址</Label>
                <Input id="email" type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">密码</Label>
                <Input id="password" type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">确认密码</Label>
                <Input id="confirmPassword" type="password" placeholder="••••••••" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
              </div>
              <Button type="submit" className="w-full gap-2">
                注册 <ArrowRight className="w-4 h-4" />
              </Button>
            </form>
            <p className="text-center text-sm text-muted-foreground mt-6">
              已有账号？{" "}
              <Link to="/login" className="text-primary font-medium hover:underline">
                返回登录
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
