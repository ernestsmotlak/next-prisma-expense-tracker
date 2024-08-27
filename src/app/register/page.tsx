"use client";

import RegisterForm from '@/components/RegisterForm';

export default function RegisterPage() {
  const handleRegisterSubmit = (email: string, password: string, confirmPassword: string) => {
    // Handle registration logic, such as calling an API to create a new user account
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    console.log('Register email:', email);
    console.log('Register password:', password);
    // Add logic to handle successful registration
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <RegisterForm onSubmit={handleRegisterSubmit} />
    </div>
  );
}
