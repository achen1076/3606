import React from "react";
import Header from "../components/parts/header.tsx";
import Footer from "../components/parts/footer.tsx";

// Profile image component that falls back to initials if no image is available
const ProfileImage = ({ src, alt, initial, size = "w-32 h-32" }) => {
  const [imageError, setImageError] = React.useState(false);

  // Log when component renders with src
  React.useEffect(() => {
    console.log(`Attempting to load image: ${src}`);
  }, [src]);

  const handleImageError = () => {
    console.error(`Failed to load image: ${src}`);
    setImageError(true);
  };

  return (
    <div
      className={`${size} mx-auto rounded-full flex items-center justify-center mb-4`}
    >
      {!imageError && src ? (
        <div className="w-full h-full relative">
          <img
            src={src}
            alt={alt}
            className="absolute inset-0 w-full h-full object-contain object-center"
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              display: "block",
            }}
            onError={handleImageError}
          />
        </div>
      ) : (
        <span className="text-4xl font-bold text-white">{initial}</span>
      )}
    </div>
  );
};

// Smaller profile image component for council members
const SmallProfileImage = ({ src, alt, initial, size = "w-12 h-12" }) => {
  const [imageError, setImageError] = React.useState(false);

  // Log when component renders with src
  React.useEffect(() => {
    console.log(`Attempting to load image: ${src}`);
  }, [src]);

  const handleImageError = () => {
    console.error(`Failed to load image: ${src}`);
    setImageError(true);
  };

  return (
    <div
      className={`${size} rounded-full flex items-center justify-center mr-4`}
    >
      {!imageError && src ? (
        <div className="w-full h-full relative">
          <img
            src={src}
            alt={alt}
            className="absolute inset-0 w-full h-full object-contain object-center"
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              display: "block",
            }}
            onError={handleImageError}
          />
        </div>
      ) : (
        <span className="text-xl font-bold text-white">{initial}</span>
      )}
    </div>
  );
};

export default function LeadsPage() {
  return (
    <div className="overflow-x-hidden bg-black min-h-screen">
      <Header />
      <main className="flex flex-col w-full pt-24 pb-16 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
        {/* Page Title */}
        <section className="w-full py-8 md:py-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Kingdom <span className="text-rok-purple-light">Leadership</span>
          </h1>
          <p className="text-lg text-gray-300">
            Meet the dedicated team leading Kingdom 3606 to victory
          </p>
        </section>

        {/* King & Council */}
        <section className="w-full py-8">
          <div className="bg-gradient-to-br from-rok-purple/20 to-black rounded-lg p-6 md:p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-white mb-6">Council</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
              {/* King */}
              <div className="bg-black/30 p-6 rounded-lg text-center">
                <ProfileImage
                  src="/media/profiles/bucknaked.png"
                  alt="BuckNaked"
                  initial="👑"
                />
                <h3 className="text-xl font-bold text-rok-purple-light">
                  BuckNaked
                </h3>
                <p className="text-white font-bold mt-1">
                  King and Territory Lead
                </p>
              </div>

              {/* Council Member 1 */}
              <div className="bg-black/30 p-6 rounded-lg text-center">
                <ProfileImage
                  src="/media/profiles/stitch.png"
                  alt="TSN Stitch"
                  initial="⚔️"
                />
                <h3 className="text-xl font-bold text-rok-purple-light">
                  TSN Stitch
                </h3>
                <p className="text-white font-bold mt-1">
                  War Lead and Diplomacy
                </p>
              </div>

              {/* Achen */}
              <div className="bg-black/30 p-6 rounded-lg text-center">
                <ProfileImage
                  src="/media/profiles/achen.png"
                  alt="Achen"
                  initial="A"
                />
                <h3 className="text-xl font-bold text-rok-purple-light">
                  Achen
                </h3>
                <p className="text-white font-bold mt-1">
                  Stats and KD Management
                </p>
              </div>

              {/* Mondu */}
              <div className="bg-black/30 p-6 rounded-lg text-center">
                <ProfileImage
                  src="/media/profiles/mondu.png"
                  alt="Mondu"
                  initial="M"
                />
                <h3 className="text-xl font-bold text-rok-purple-light">
                  Mondu
                </h3>
                <p className="text-white font-bold mt-1">War and Ark Lead</p>
              </div>

              {/* Kasper */}
              <div className="bg-black/30 p-6 rounded-lg text-center">
                <ProfileImage
                  src="/media/profiles/kasper.png"
                  alt="Kasper"
                  initial="K"
                />
                <h3 className="text-xl font-bold text-rok-purple-light">
                  Kasper
                </h3>
                <p className="text-white font-bold mt-1">
                  War Lead and Migration Tsar
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Alliance Leaders */}
        <section className="w-full py-8">
          <div className="bg-gradient-to-br from-rok-purple/20 to-black rounded-lg p-6 md:p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-white mb-6">Officers</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-black/30 p-5 rounded-lg h-full">
                <div className="flex items-start">
                  <SmallProfileImage
                    src="/media/profiles/rokishi.png"
                    alt="Rokishi"
                    initial="R"
                  />
                  <div>
                    <h3 className="text-lg font-bold text-rok-purple-light">
                      Rokishi
                    </h3>
                    <p className="text-white text-sm">Migration Officer</p>
                  </div>
                </div>
              </div>
              <div className="bg-black/30 p-5 rounded-lg h-full">
                <div className="flex items-start">
                  <SmallProfileImage
                    src="/media/profiles/nanog.png"
                    alt="Nanog"
                    initial="N"
                  />
                  <div>
                    <h3 className="text-lg font-bold text-rok-purple-light">
                      Nanog
                    </h3>
                    <p className="text-white text-sm">Shell Management</p>
                  </div>
                </div>
              </div>
              <div className="bg-black/30 p-5 rounded-lg h-full">
                <div className="flex items-start">
                  <SmallProfileImage
                    src="/media/profiles/dory.png"
                    alt="Dory"
                    initial="D"
                  />
                  <div>
                    <h3 className="text-lg font-bold text-rok-purple-light">
                      Dory
                    </h3>
                    <p className="text-white text-sm">Events and Migration</p>
                  </div>
                </div>
              </div>
              <div className="bg-black/30 p-5 rounded-lg h-full">
                <div className="flex items-start">
                  <SmallProfileImage
                    src="/media/profiles/tati.png"
                    alt="Tati"
                    initial="T"
                  />
                  <div>
                    <h3 className="text-lg font-bold text-rok-purple-light">
                      Tati
                    </h3>
                    <p className="text-white text-sm">Territory</p>
                  </div>
                </div>
              </div>
              <div className="bg-black/30 p-5 rounded-lg h-full">
                <div className="flex items-start">
                  <SmallProfileImage
                    src="/media/profiles/geo.png"
                    alt="Geo"
                    initial="G"
                  />
                  <div>
                    <h3 className="text-lg font-bold text-rok-purple-light">
                      Geo
                    </h3>
                    <p className="text-white text-sm">
                      Territory and Shell Alliances
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-black/30 p-5 rounded-lg h-full">
                <div className="flex items-start">
                  <SmallProfileImage
                    src="/media/profiles/mah.png"
                    alt="Mah"
                    initial="M"
                  />
                  <div>
                    <h3 className="text-lg font-bold text-rok-purple-light">
                      Fairy Mah
                    </h3>
                    <p className="text-white text-sm">KD Management</p>
                  </div>
                </div>
              </div>
              <div className="bg-black/30 p-5 rounded-lg h-full">
                <div className="flex items-start">
                  <SmallProfileImage
                    src="/media/profiles/horst.png"
                    alt="Papi Horst"
                    initial="P"
                  />
                  <div>
                    <h3 className="text-lg font-bold text-rok-purple-light">
                      Papi Horst
                    </h3>
                    <p className="text-white text-sm">War Lead</p>
                  </div>
                </div>
              </div>
              <div className="bg-black/30 p-5 rounded-lg h-full">
                <div className="flex items-start">
                  <SmallProfileImage
                    src="/media/profiles/tony.png"
                    alt="Papa Tony"
                    initial="T"
                  />
                  <div>
                    <h3 className="text-lg font-bold text-rok-purple-light">
                      Papa Tony
                    </h3>
                    <p className="text-white text-sm">Events and AMOB</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Leadership */}
        <section className="w-full py-8">
          <div className="bg-rok-purple rounded-lg p-8 text-center shadow-lg">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Contact Our Leadership
            </h2>
            <p className="text-white mb-6">
              Have questions or want to join our kingdom? Our leadership team is
              here to help!
            </p>
            <a className="inline-block bg-white text-rok-purple font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors">
              Contact Us
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
