"use client"
import LoginForm from "@/components/LoginForm";

export default function Login() {
  const handleLoginSubmit = (email: string, password: string) => {
    // Handle login logic (e.g., call an API)
    console.log("Login email:", email);
    console.log("Login password:", password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <LoginForm onSubmit={handleLoginSubmit} />
    </div>
  );
}
