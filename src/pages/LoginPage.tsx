import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "../components/templates/PageLayout.tsx";
import PageTitle from "../components/molecules/PageTitle.tsx";
import SectionCard from "../components/molecules/SectionCard.tsx";
import LoginForm from "../components/organisms/LoginForm.tsx";
import { login, isAuthenticated } from "../services/authService.ts";

export default function LoginPage() {
  const [error, setError] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // If user is already logged in, redirect to home page
  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogin = async (username: string, password: string) => {
    setIsLoading(true);
    setError(undefined);

    try {
      await login(username, password);
      window.location.href = "/"; // Redirect to home page after successful login
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Login failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageLayout>
      {/* Page Title */}
      <PageTitle
        title="Kingdom"
        highlightedText="Login"
        subtitle="Access exclusive Kingdom 3606 features"
      />

      {/* Login Section */}
      <section className="w-full py-12 md:py-16">
        <SectionCard title="Secure Login">
          <div className="flex flex-col items-center">
            <div className="w-full max-w-md">
              <LoginForm
                onLogin={handleLogin}
                error={error}
                isLoading={isLoading}
              />
            </div>
          </div>
        </SectionCard>
      </section>
    </PageLayout>
  );
}
