import React, { useState } from "react";
import Header from "../components/parts/header.tsx";
import Footer from "../components/parts/footer.tsx";
import PageLayout from "../components/templates/PageLayout.tsx";
import Calculators from "../components/organisms/calculators.tsx";

export default function ToolsPage() {
  return (
    <PageLayout>
      <main className="flex flex-col w-full pt-24 pb-16 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
        {/* Page Title */}
        <section className="w-full py-8 md:py-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Kingdom <span className="text-rok-purple-light">Tools</span>
          </h1>
          <p className="text-lg text-gray-300">
            Specialized tools for Kingdom 3606
          </p>
        </section>
        <Calculators />
      </main>
    </PageLayout>
  );
}
