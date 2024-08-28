"use client";
import LoginForm from "@/components/LoginForm";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const handleLoginSubmit = (username: string, password: string) => {
    // The logic is handled in the LoginForm component
    console.log("Login email:", username);
    console.log("Login password:", password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <LoginForm onSubmit={handleLoginSubmit} />
    </div>
  );
}