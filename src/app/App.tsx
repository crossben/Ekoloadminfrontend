import { RouterProvider, useNavigate } from "react-router";
import { router } from "./routes";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

export default function App() {
  const { token, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-[#050e08]">
        <div className="w-8 h-8 border-4 border-[#1FAF5A] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return <RouterProvider router={router} />;
}
