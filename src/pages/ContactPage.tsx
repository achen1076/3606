import React, { useState } from "react";
import Header from "../components/parts/header.tsx";
import Footer from "../components/parts/footer.tsx";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    governorId: "",
    power: "",
    email: "",
    discord: "",
    message: "",
    reason: "join" // Default value
  });
  
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would send this data to a server
    console.log("Form submitted:", formData);
    setFormSubmitted(true);
    
    // Reset form after submission (in a real app, you might do this after successful API response)
    setTimeout(() => {
      setFormData({
        name: "",
        governorId: "",
        power: "",
        email: "",
        discord: "",
        message: "",
        reason: "join"
      });
      setFormSubmitted(false);
    }, 5000);
  };

  return (
    <div className="overflow-x-hidden bg-black min-h-screen">
      <Header />
      <main className="flex flex-col w-full pt-24 pb-16 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
        {/* Page Title */}
        <section className="w-full py-8 md:py-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Contact <span className="text-rok-purple-light">Kingdom 3606</span>
          </h1>
          <p className="text-lg text-gray-300">
            Reach out to our recruitment team or kingdom leadership
          </p>
        </section>

        {/* Contact Form */}
        <section className="w-full py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-rok-purple/20 to-black rounded-lg p-6 md:p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-white mb-6">Get in Touch</h2>
              
              {formSubmitted ? (
                <div className="bg-green-500/20 border border-green-500 rounded-lg p-4 text-center">
                  <p className="text-white font-bold mb-2">Message Sent Successfully!</p>
                  <p className="text-gray-300">Our team will get back to you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-rok-purple-light mb-2 font-bold">Contact Reason</label>
                    <select 
                      name="reason"
                      value={formData.reason}
                      onChange={handleChange}
                      className="w-full bg-black border border-rok-purple/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-rok-purple-light"
                      required
                    >
                      <option value="join">Join Kingdom 3606</option>
                      <option value="alliance">Alliance Inquiry</option>
                      <option value="kvk">KvK Coordination</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-rok-purple-light mb-2 font-bold">Your Name</label>
                      <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-black border border-rok-purple/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-rok-purple-light"
                        placeholder="In-game name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-rok-purple-light mb-2 font-bold">Governor ID</label>
                      <input 
                        type="text" 
                        name="governorId"
                        value={formData.governorId}
                        onChange={handleChange}
                        className="w-full bg-black border border-rok-purple/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-rok-purple-light"
                        placeholder="Your governor ID"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-rok-purple-light mb-2 font-bold">Power</label>
                      <input 
                        type="text" 
                        name="power"
                        value={formData.power}
                        onChange={handleChange}
                        className="w-full bg-black border border-rok-purple/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-rok-purple-light"
                        placeholder="Your power (e.g., 25M)"
                      />
                    </div>
                    <div>
                      <label className="block text-rok-purple-light mb-2 font-bold">Email</label>
                      <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-black border border-rok-purple/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-rok-purple-light"
                        placeholder="Your email address"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-rok-purple-light mb-2 font-bold">Discord Username</label>
                    <input 
                      type="text" 
                      name="discord"
                      value={formData.discord}
                      onChange={handleChange}
                      className="w-full bg-black border border-rok-purple/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-rok-purple-light"
                      placeholder="Your Discord username"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-rok-purple-light mb-2 font-bold">Message</label>
                    <textarea 
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full bg-black border border-rok-purple/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-rok-purple-light min-h-[120px]"
                      placeholder="Tell us more about your inquiry..."
                      required
                    ></textarea>
                  </div>
                  
                  <button 
                    type="submit"
                    className="w-full bg-rok-purple hover:bg-rok-purple-dark text-white font-bold py-3 px-6 rounded-lg transition-colors"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>
            
            <div className="space-y-8">
              {/* Contact Information */}
              <div className="bg-gradient-to-br from-rok-purple/20 to-black rounded-lg p-6 md:p-8 shadow-lg">
                <h2 className="text-2xl font-bold text-white mb-6">Contact Information</h2>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-rok-purple rounded-full flex items-center justify-center mr-4 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-rok-purple-light font-bold">Email</h3>
                      <p className="text-white mt-1">recruitment@kingdom3606.com</p>
                      <p className="text-gray-400 text-sm mt-1">For recruitment inquiries</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-rok-purple rounded-full flex items-center justify-center mr-4 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-rok-purple-light font-bold">Discord</h3>
                      <p className="text-white mt-1">discord.gg/kingdom3606</p>
                      <p className="text-gray-400 text-sm mt-1">Join our community server</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-rok-purple rounded-full flex items-center justify-center mr-4 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-rok-purple-light font-bold">In-Game</h3>
                      <p className="text-white mt-1">Kingdom 3606</p>
                      <p className="text-gray-400 text-sm mt-1">Message R4/R5 in main alliances</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* FAQ */}
              <div className="bg-gradient-to-br from-rok-purple/20 to-black rounded-lg p-6 md:p-8 shadow-lg">
                <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-rok-purple-light font-bold">What are the requirements to join?</h3>
                    <p className="text-gray-300 mt-2">
                      Requirements vary by alliance. Our main fighting alliances require 25M+ power with T5 troops, 
                      while development alliances accept active players of all power levels.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-rok-purple-light font-bold">Do you accept jumpers?</h3>
                    <p className="text-gray-300 mt-2">
                      Yes, we accept jumper groups and individual jumpers. Please contact our recruitment team 
                      at least 2 weeks before your planned jump.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-rok-purple-light font-bold">What language do you speak?</h3>
                    <p className="text-gray-300 mt-2">
                      Our kingdom's official language is English, but we have international players from around the world.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
