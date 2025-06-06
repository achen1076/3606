import React from "react";
import PageLayout from "../components/templates/PageLayout.tsx";
import PageTitle from "../components/molecules/PageTitle.tsx";
import SectionCard from "../components/molecules/SectionCard.tsx";
import { useAuth } from "../contexts/AuthContext.tsx";

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <PageLayout>
      {/* Page Title */}
      <PageTitle
        title="My"
        highlightedText="Profile"
        subtitle="Manage your Kingdom 3606 account"
      />

      {/* User Info Section */}
      <section className="w-full py-8">
        <SectionCard title="Account Information">
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="bg-rok-purple rounded-full w-24 h-24 flex items-center justify-center text-3xl font-bold text-white">
                {user?.displayName.charAt(0)}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">{user?.displayName}</h3>
                <p className="text-rok-purple-light">
                  Role: <span className="capitalize">{user?.role}</span>
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="bg-black/30 p-5 rounded-lg">
                <h3 className="text-rok-purple-light font-bold mb-4">Account Details</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-gray-400">Username</p>
                    <p className="text-white font-medium">{user?.username}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">User ID</p>
                    <p className="text-white font-medium">{user?.id}</p>
                  </div>
                </div>
              </div>

              <div className="bg-black/30 p-5 rounded-lg">
                <h3 className="text-rok-purple-light font-bold mb-4">Permissions</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-2 ${user?.role === 'admin' ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                    <p className="text-white">Admin Dashboard Access</p>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full mr-2 bg-green-500"></div>
                    <p className="text-white">View Kingdom Stats</p>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full mr-2 bg-green-500"></div>
                    <p className="text-white">Access Kingdom Tools</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SectionCard>
      </section>

      {/* Admin Section - Only visible to admins */}
      {user?.role === 'admin' && (
        <section className="w-full py-8">
          <SectionCard title="Admin Controls">
            <div className="space-y-4">
              <p className="text-white">
                As an admin, you have access to additional controls and management features for Kingdom 3606.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <a 
                  href="/admin" 
                  className="bg-rok-purple hover:bg-rok-purple-dark text-white p-4 rounded-lg transition-colors text-center"
                >
                  Admin Dashboard
                </a>
                <button className="bg-rok-purple hover:bg-rok-purple-dark text-white p-4 rounded-lg transition-colors">
                  Update Kingdom Stats
                </button>
                <button className="bg-rok-purple hover:bg-rok-purple-dark text-white p-4 rounded-lg transition-colors">
                  Edit Kingdom News
                </button>
              </div>
            </div>
          </SectionCard>
        </section>
      )}
    </PageLayout>
  );
}
