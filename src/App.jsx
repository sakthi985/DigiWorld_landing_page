import React from 'react';
import { QueryProvider, useQuery } from './context/QueryContext';

// Intro Animation
import LandingIntroAnimation from './components/LandingIntroAnimation';

// Pages & Full-View Components
import LoginPage from './components/LoginPage';

// Layout & Overlay Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Toast from './components/Toast';
import FloatingWidgets from './components/FloatingWidgets';
import EnquiryModal from './components/EnquiryModal';
import ProjectDetailsModal from './components/ProjectDetailsModal';

// Page Section Components
import Hero from './components/Hero';
import BentoFeatures from './components/BentoFeatures';
import ServicesSuite from './components/ServicesSuite';
import DevelopmentProcess from './components/DevelopmentProcess';
import PortfolioMatrix from './components/PortfolioMatrix';
import LiveQueryHub from './components/LiveQueryHub';
import TestimonialsSection from './components/TestimonialsSection';
import TeamSection from './components/TeamSection';
import ContactSection from './components/ContactSection';

function AppInner() {
  const { currentView } = useQuery();

  return (
    <div className="relative min-h-screen bg-dark-950 text-slate-100 overflow-x-hidden selection:bg-brand-500 selection:text-white font-sans">
      {/* ── CINEMATIC LANDING INTRO ANIMATION ──────── */}
      <LandingIntroAnimation />

      {/* ── VIEW ROUTING ───────────────────────────── */}
      {currentView === 'login' ? (
        <LoginPage />
      ) : (
        <>
          {/* ── PERSISTENT MAIN NAVBAR ────────────────── */}
          <Navbar />

          {/* ── MAIN PAGE SECTIONS ────────────────────── */}
          <main>
            {/* 1. Hero */}
            <Hero />

            {/* 2. Bento Feature Grid */}
            <section id="features">
              <BentoFeatures />
            </section>

            {/* 3. Services Suite */}
            <section id="services">
              <ServicesSuite />
            </section>

            {/* 4. Development Process */}
            <section id="process">
              <DevelopmentProcess />
            </section>

            {/* 5. Portfolio Matrix */}
            <section id="portfolio">
              <PortfolioMatrix />
            </section>

            {/* 6. Live Query / Q&A Hub */}
            <section id="query-hub">
              <LiveQueryHub />
            </section>

            {/* 7. Testimonials */}
            <section id="testimonials">
              <TestimonialsSection />
            </section>

            {/* 8. Team */}
            <section id="about">
              <TeamSection />
            </section>

            {/* 9. Contact */}
            <section id="contact">
              <ContactSection />
            </section>
          </main>

          {/* ── FOOTER ────────────────────────────────── */}
          <Footer />

          {/* ── FLOATING UTILITY WIDGETS ──────────────── */}
          <FloatingWidgets />
        </>
      )}

      {/* ── GLOBAL MODAL OVERLAYS ──────────────────── */}
      <EnquiryModal />
      <ProjectDetailsModal />

      {/* ── TOAST NOTIFICATIONS ───────────────────── */}
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <QueryProvider>
      <AppInner />
    </QueryProvider>
  );
}
