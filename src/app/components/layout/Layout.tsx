import { Outlet, Navigate } from "react-router";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { useAuth } from "../../../context/AuthContext";

export function Layout() {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex min-h-screen bg-[#050e08]">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
