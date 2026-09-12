import { useEffect } from "react";
import { Header } from "@/components/complaints/Header";
import { Hero } from "@/components/complaints/Hero";
import { Industries } from "@/components/complaints/Industries";
import { HowItWorks } from "@/components/complaints/HowItWorks";
import { WhyComplaintBridge } from "@/components/complaints/WhyComplaintBridge";
import { ComplaintForm } from "@/components/complaints/ComplaintForm";
import { FAQ } from "@/components/complaints/FAQ";
import { Contact } from "@/components/complaints/Contact";
import { FloatingContactBar } from "@/components/complaints/FloatingContactBar";
import { Footer } from "@/components/complaints/Footer";

const Index = () => {
  useEffect(() => {
    // Smooth scroll for anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a[href^=\"#\"]");
      if (anchor) {
        e.preventDefault();
        const targetId = anchor.getAttribute("href")?.substring(1);
        if (targetId) {
          const element = document.getElementById(targetId);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);
    return () => document.removeEventListener("click", handleAnchorClick);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pt-16 pb-20 md:pb-0">
        <Hero />
        <Industries />
        <HowItWorks />
        <WhyComplaintBridge />
        <section
          id="submit-complaint"
          className="section-padding bg-gray-50"
        >
          <div className="container-custom">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl font-Poppins">
                Submit a Complaint
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Fill in the details below and we'll route your complaint to the
                right company with a tracked case reference.
              </p>
            </div>
            <div className="mx-auto max-w-3xl">
              <div className="rounded-xl bg-white p-6 shadow-sm md:p-8">
                <ComplaintForm />
              </div>
            </div>
          </div>
        </section>
        <FAQ />
        <Contact />
      </main>
      <FloatingContactBar />
      <Footer />
    </div>
  );
};

export default Index;
