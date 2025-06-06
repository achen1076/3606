import React, { useState } from "react";
import PageLayout from "../components/templates/PageLayout.tsx";
import PageTitle from "../components/molecules/PageTitle.tsx";
import SectionCard from "../components/molecules/SectionCard.tsx";
import Button from "../components/atoms/button.tsx";
import { useAuth } from "../contexts/AuthContext.tsx";

export default function AdminPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'users' | 'stats' | 'news'>('users');

  // Mock data for demonstration
  const mockUsers = [
    { id: '1', username: 'admin', role: 'admin', displayName: 'Kingdom Admin', lastLogin: '2025-06-06' },
    { id: '2', username: 'member', role: 'member', displayName: 'Kingdom Member', lastLogin: '2025-06-05' },
    { id: '3', username: 'player1', role: 'member', displayName: 'Elite Player', lastLogin: '2025-06-04' },
  ];

  return (
    <PageLayout>
      {/* Page Title */}
      <PageTitle
        title="Admin"
        highlightedText="Dashboard"
        subtitle="Manage Kingdom 3606 website and data"
      />

      {/* Admin Controls */}
      <section className="w-full py-8">
        <SectionCard title="Admin Controls">
          <div className="border-b border-rok-purple/30 mb-6">
            <div className="flex flex-wrap -mb-px">
              <button
                className={`inline-block p-4 border-b-2 rounded-t-lg ${
                  activeTab === 'users'
                    ? 'text-rok-purple-light border-rok-purple-light'
                    : 'text-gray-400 border-transparent hover:text-rok-purple-light/70 hover:border-rok-purple-light/70'
                }`}
                onClick={() => setActiveTab('users')}
              >
                Manage Users
              </button>
              <button
                className={`inline-block p-4 border-b-2 rounded-t-lg ${
                  activeTab === 'stats'
                    ? 'text-rok-purple-light border-rok-purple-light'
                    : 'text-gray-400 border-transparent hover:text-rok-purple-light/70 hover:border-rok-purple-light/70'
                }`}
                onClick={() => setActiveTab('stats')}
              >
                Kingdom Stats
              </button>
              <button
                className={`inline-block p-4 border-b-2 rounded-t-lg ${
                  activeTab === 'news'
                    ? 'text-rok-purple-light border-rok-purple-light'
                    : 'text-gray-400 border-transparent hover:text-rok-purple-light/70 hover:border-rok-purple-light/70'
                }`}
                onClick={() => setActiveTab('news')}
              >
                News Management
              </button>
            </div>
          </div>

          {/* Users Tab */}
          {activeTab === 'users' && (
            <div className="animate-fadeIn">
              <h3 className="text-xl font-bold text-white mb-4">User Management</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-white">
                  <thead>
                    <tr className="bg-rok-purple text-white">
                      <th className="p-3 text-left">User</th>
                      <th className="p-3 text-left">Role</th>
                      <th className="p-3 text-left">Last Login</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockUsers.map(user => (
                      <tr key={user.id} className="border-b border-gray-700">
                        <td className="p-3 text-left">
                          <div>
                            <div className="font-medium">{user.displayName}</div>
                            <div className="text-sm text-gray-400">{user.username}</div>
                          </div>
                        </td>
                        <td className="p-3 text-left">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            user.role === 'admin' ? 'bg-rok-purple/30 text-rok-purple-light' : 'bg-gray-700 text-gray-300'
                          }`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="p-3 text-left">{user.lastLogin}</td>
                        <td className="p-3 text-right">
                          <div className="flex justify-end space-x-2">
                            <button className="px-3 py-1 bg-rok-purple/30 text-rok-purple-light rounded hover:bg-rok-purple/50 transition-colors">
                              Edit
                            </button>
                            {user.id !== '1' && (
                              <button className="px-3 py-1 bg-red-900/30 text-red-400 rounded hover:bg-red-900/50 transition-colors">
                                Delete
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-6">
                <Button variant="primary" size="md">Add New User</Button>
              </div>
            </div>
          )}

          {/* Stats Tab */}
          {activeTab === 'stats' && (
            <div className="animate-fadeIn">
              <h3 className="text-xl font-bold text-white mb-4">Kingdom Statistics Management</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-black/30 p-5 rounded-lg">
                  <h4 className="text-rok-purple-light font-bold mb-3">Kingdom Power</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-400 mb-1">Total Power</label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-2 rounded-lg bg-black/50 border border-rok-purple/50 text-white focus:outline-none focus:border-rok-purple-light"
                        defaultValue="11.5B"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 mb-1">Top 300 KP</label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-2 rounded-lg bg-black/50 border border-rok-purple/50 text-white focus:outline-none focus:border-rok-purple-light"
                        defaultValue="79B"
                      />
                    </div>
                  </div>
                </div>
                <div className="bg-black/30 p-5 rounded-lg">
                  <h4 className="text-rok-purple-light font-bold mb-3">KvK Performance</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-400 mb-1">KvK Wins</label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-2 rounded-lg bg-black/50 border border-rok-purple/50 text-white focus:outline-none focus:border-rok-purple-light"
                        defaultValue="2"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 mb-1">Season</label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-2 rounded-lg bg-black/50 border border-rok-purple/50 text-white focus:outline-none focus:border-rok-purple-light"
                        defaultValue="3"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <Button variant="primary" size="md">Update Statistics</Button>
              </div>
            </div>
          )}

          {/* News Tab */}
          {activeTab === 'news' && (
            <div className="animate-fadeIn">
              <h3 className="text-xl font-bold text-white mb-4">News Management</h3>
              <div className="space-y-6">
                <div className="bg-black/30 p-5 rounded-lg">
                  <h4 className="text-rok-purple-light font-bold mb-3">Latest News</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-400 mb-1">News Title</label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-2 rounded-lg bg-black/50 border border-rok-purple/50 text-white focus:outline-none focus:border-rok-purple-light"
                        defaultValue="KvK Season 3 Victory!"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 mb-1">News Content</label>
                      <textarea 
                        className="w-full px-4 py-2 rounded-lg bg-black/50 border border-rok-purple/50 text-white focus:outline-none focus:border-rok-purple-light h-32"
                        defaultValue="Our kingdom has emerged victorious in the latest KvK battle, securing valuable rewards and territory."
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <Button variant="secondary" size="sm">Update News</Button>
                  </div>
                </div>

                <div className="bg-black/30 p-5 rounded-lg">
                  <h4 className="text-rok-purple-light font-bold mb-3">Add New Announcement</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-400 mb-1">Title</label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-2 rounded-lg bg-black/50 border border-rok-purple/50 text-white focus:outline-none focus:border-rok-purple-light"
                        placeholder="Enter news title"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 mb-1">Content</label>
                      <textarea 
                        className="w-full px-4 py-2 rounded-lg bg-black/50 border border-rok-purple/50 text-white focus:outline-none focus:border-rok-purple-light h-32"
                        placeholder="Enter news content"
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <Button variant="primary" size="sm">Add News</Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </SectionCard>
      </section>
    </PageLayout>
  );
}
