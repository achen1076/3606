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
          <h3 className="text-rok-purple-light font-bold">Welcome, {user?.displayName}!</h3>
          <p className="text-white text-sm">
            {user?.role === 'admin' ? 
              'You have admin access to Kingdom 3606 resources.' : 
              'Thank you for being part of Kingdom 3606.'}
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
                title="Alliance Gift Level 26"
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
                title="Stable Kingdom"
                value="Friendly veterans willing to help"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="w-full py-12 md:py-16">
        <SectionCard title="About Our Kingdom">
          <div className="space-y-4 text-gray-300">
            <p>
              Kingdom 3606 is a united and powerful kingdom in Rise of Kingdoms.
              Our kingdom is known for its strong leadership, organized
              structure, and competitive spirit in KvK (Kingdom versus Kingdom)
              events.
            </p>
            <p>
              We pride ourselves on maintaining a balanced ecosystem where both
              F2P (Free to Play) and P2W (Pay to Win) players can thrive and
              contribute to our kingdom's success.
            </p>
            <p>
              With a focus on teamwork and strategic planning, we have
              established ourselves as a formidable force in the Rise of
              Kingdoms world.
            </p>
          </div>
        </SectionCard>
      </section>

      {/* News & Updates */}
      <section className="w-full py-12 md:py-16">
        <SectionCard title="Latest News">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-rok-purple/10 to-black rounded-lg p-6 shadow-lg">
              <h3 className="text-xl font-bold text-rok-purple-light mb-2">
                KvK Season 3 Victory!
              </h3>
              <p className="text-gray-300 mb-4">
                Our kingdom has emerged victorious in the latest KvK battle,
                securing valuable rewards and territory.
              </p>
            </div>
            <div className="bg-gradient-to-br from-rok-purple/10 to-black rounded-lg p-6 shadow-lg">
              <h3 className="text-xl font-bold text-rok-purple-light mb-2">
                Alliance Restructuring
              </h3>
              <p className="text-gray-300 mb-4">
                We're optimizing our alliance structure to better prepare for
                upcoming challenges and events.
              </p>
            </div>
          </div>
        </SectionCard>
      </section>

      {/* News Section */}
      <section className="w-full py-12 md:py-16">
        <SectionCard title="Latest Kingdom News">
          <p className="text-white mb-6">
            Looking for a competitive and organized kingdom? Kingdom 3606 is
            recruiting active players!
          </p>
          <a
            href="/contact"
            className="inline-block bg-white text-rok-purple font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Contact Recruiting
          </a>
        </SectionCard>
      </section>
    </PageLayout>
  );
}
