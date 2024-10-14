"use client";

import RegisterForm from "@/components/RegisterForm";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleRegisterSubmit = async (
        username: string,
        password: string,
        confirmPassword: string
    ) => {
        // Reset any previous errors
        setError(null);

        // Validate password and confirmPassword match
        if (password !== confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        // Set loading state
        setLoading(true);

        try {
            // API call to register the user
            const response = await fetch("http://localhost:3012/users/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            // Handle success or failure based on API response
            if (response.ok) {
                console.log("User registered:", data);
                alert("Registration successful!");
                router.push("/login");
                // Optionally redirect the user to the login page or dashboard
            } else {
                // Show error message returned by the API
                setError(
                    data.message || "Registration failed. Please try again."
                );
            }
        } catch (err) {
            setError(
                "An error occurred while registering. Please try again later."
            );
            console.error("Registration error:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <RegisterForm onSubmit={handleRegisterSubmit} />
            {loading && <p>Registering...</p>}
            {error && <p className="text-red-500">{error}</p>}
        </div>
    );
}
