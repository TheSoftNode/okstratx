"use client";

import CallToActionSection from "@/components/Landing/CallToActionSection";
import DataVisualizationSection from "@/components/Landing/DataVisualizationSection";
import FeaturesSection from "@/components/Landing/FeaturesSection";
import HeroSection from "@/components/Landing/HeroSection";
import TestimonialsSection from "@/components/Landing/TestimonialsSection";
import UseCasesSection from "@/components/Landing/UseCasesSection";
import Footer from "@/components/Layout/Footer";
import Navbar from "@/components/Layout/Navbar";
import { useEffect } from "react";

export default function Home() {
  // Initialize WebSocket connection for demo purposes
  useEffect(() => {
    // This just demonstrates connection establishment
    // Real data will be handled by the useWebSocket hook in components
    const initDemoSocket = () => {
      try {
        const socket = new WebSocket("ws://localhost:8000/ws/market_data");

        socket.onopen = () => {
          console.log("Demo WebSocket connected");
        };

        socket.onerror = (error) => {
          console.log("Demo WebSocket error:", error);
        };

        return () => {
          socket.close();
        };
      } catch (error) {
        console.log("Error initializing demo WebSocket:", error);
      }
    };

    // Only attempt to connect if in browser
    if (typeof window !== "undefined") {
      const cleanup = initDemoSocket();
      return cleanup;
    }
  }, []);

  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <UseCasesSection />
      <DataVisualizationSection />
      <TestimonialsSection />
      <CallToActionSection />
      <Footer />
    </main>
  );
}