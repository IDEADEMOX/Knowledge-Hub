import { Outlet } from "react-router-dom";
import TopNav from "@/components/TopNav";

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-background">
      <TopNav />
      <main className="max-w-7xl mx-auto px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}
