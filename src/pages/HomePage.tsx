import React from "react";
import PageLayout from "../components/templates/PageLayout.tsx";
import PageTitle from "../components/molecules/PageTitle.tsx";
import SectionCard from "../components/molecules/SectionCard.tsx";
import InfoCard from "../components/molecules/InfoCard.tsx";
import { useAuth } from "../contexts/AuthContext.tsx";

export default function HomePage() {
  const { isLoggedIn, user } = useAuth();

  return (
    <PageLayout>
      {/* Welcome Message for Logged In Users */}
      {isLoggedIn && (
        <div className="w-full mb-6 bg-rok-purple/20 border border-rok-purple/30 rounded-lg p-4">
          <h3 className="text-rok-purple-light font-bold">
            Welcome, {user?.displayName}!
          </h3>
          <p className="text-white text-sm">
            {user?.role === "admin"
              ? "You have admin access to Kingdom 3606 resources."
              : "Thank you for being part of Kingdom 3606."}
          </p>
        </div>
      )}

      {/* Hero Section */}
      <section className="w-full py-12 md:py-20 flex flex-col items-center">
        <div className="w-full max-w-4xl text-center">
          <PageTitle
            title="Welcome to"
            highlightedText="Kingdom 3606"
            subtitle="A powerful alliance in Rise of Kingdoms"
            className="mb-8"
          />
          <div className="bg-rok-purple rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-white mb-4">
              Kingdom Highlights
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <InfoCard title="Title Bot" value="24/7 Title Bot" />
              <InfoCard
                title="Alliance Gift Level 27"
                value="2-3 Chests per Day"
              />
              <InfoCard
                title="Ark of Osiris"
                value="Lead by experienced leaders"
              />
              <InfoCard title="Top Leadership" value="6+ years of experience" />
              <InfoCard
                title="Fixed MGE"
                value="Application Process for Top Leads"
              />
              <InfoCard
                title="Young and Stable"
                value="Friendly veterans willing to help"
              />
            </div>
            <h2 className="text-md font-bold text-white mt-4">
              and this cool website!
            </h2>
          </div>
        </div>
      </section>

      {/* Recruitment Section */}
      <section className="w-full py-12 md:py-16">
        <SectionCard title="Recruitment">
          <p className="text-white mb-6">
            Looking for a competitive and organized kingdom? Kingdom 3606 is
            recruiting active players!
          </p>
          <a
            className="inline-block bg-white text-rok-purple font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors"
            href="https://discord.gg/3606"
            target="_blank"
          >
            Contact Recruiting
          </a>
        </SectionCard>
      </section>
    </PageLayout>
  );
}
