import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.tsx";
import PageLayout from "../components/templates/PageLayout.tsx";
import PageTitle from "../components/molecules/PageTitle.tsx";
import SectionCard from "../components/molecules/SectionCard.tsx";

export default function LogoutPage() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Log the user out
    logout();
    
    // Redirect to home page after 3 seconds
    const timer = setTimeout(() => {
      navigate("/");
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [logout, navigate]);

  return (
    <PageLayout>
      <PageTitle
        title="Signing"
        highlightedText="Out"
        subtitle="You have been successfully logged out"
      />

      <section className="w-full py-8">
        <SectionCard title="Logged Out Successfully">
          <div className="text-center py-8">
            <div className="text-rok-purple-light text-5xl mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">You have been logged out</h3>
            <p className="text-gray-300 mb-6">Thank you for visiting Kingdom 3606!</p>
            <p className="text-gray-400">Redirecting to home page in a few seconds...</p>
            <div className="mt-8">
              <a 
                href="/" 
                className="bg-rok-purple hover:bg-rok-purple-dark text-white px-6 py-3 rounded-lg transition-colors"
              >
                Return to Home
              </a>
            </div>
          </div>
        </SectionCard>
      </section>
    </PageLayout>
  );
}
