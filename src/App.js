import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import StatsPage from "./pages/StatsPage.tsx";
import LeadsPage from "./pages/LeadsPage.tsx";
import ToolsPage from "./pages/ToolsPage.tsx";
import FormsPage from "./pages/FormsPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import LogoutPage from "./pages/LogoutPage.tsx";
import AllGearScorePage from "./pages/AllGearScorePage.tsx";
import InscriptionScorePage from "./pages/InscriptionScorePage.tsx";
import BarbForRallyPage from "./pages/BarbForRallyPage.tsx";
import CrystalTechPage from "./pages/CrystalTechPage.tsx";
import KOABStatsPage from "./pages/KOABStatsPage.tsx";
import AdminPage from "./pages/AdminPage.tsx";
import ProtectedRoute from "./components/templates/ProtectedRoute.tsx";
import { AuthProvider } from "./contexts/AuthContext.tsx";

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/stats" element={<StatsPage />} />
        <Route path="/leads" element={<LeadsPage />} />
        <Route path="/gear-scores" element={<AllGearScorePage />} />
        <Route path="/inscription-scores" element={<InscriptionScorePage />} />
        <Route path="/barbfortrally" element={<BarbForRallyPage />} />
        <Route path="/crystaltech" element={<CrystalTechPage />} />
        <Route path="/koabstats" element={<KOABStatsPage />} />
        <Route path="/tools" element={<ToolsPage />} />
        <Route path="/forms" element={<FormsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="/admin" element={
          <ProtectedRoute>
            <AdminPage />
          </ProtectedRoute>
        } />
      </Routes>
    </AuthProvider>
  );
}
