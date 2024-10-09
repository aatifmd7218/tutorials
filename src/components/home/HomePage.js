"use client";
import Hero from "@/components/home/Hero";
import TraficSources from "@/components/home/TraficSources";
import transactionImage from "../../../public/transaction.png";
import ExpectedFeatures from "@/components/home/ExpectedFeatures";
import Leads from "@/components/home/Leads";
import Pricing from "@/components/home/Pricing";
import FAQ from "@/components/home/FAQ";
import Hero1 from "@/components/home/Hero1";
import WhatWeDo1 from "@/components/home/WhatWeDo";
import Capabilities1 from "@/components/home/Capabilities";
import Showcase1 from "@/components/home/Showcase";
import WebAndMobile1 from "@/components/home/WebAndMobile";
import Testimonial1 from "@/components/home/Testimonial";
import Careers1 from "@/components/home/Careers";
import Capabilities21 from "@/components/home/Capabilities2";
import PlayVideo1 from "@/components/home/PlayVideo";
import Services1 from "@/components/home/Services";
import Breadcrumbs from "../../../CommonElements/Breadcrumbs";
import Breadcrumbs1 from "../../../CommonElements/Breadcrumbs";
import Testimonials from "@/components/home/Testimonials";
import Awards from "@/components/home/Awards";
import Collaborate from "@/components/home/Collaborate";
import MapAndAddress1 from "../../../CommonElements/MapAndAddress";
import Clients1 from "./Clients";

const HomePage = () => {
  const transactionTextContent = {
    mainHeading: "Insights & spam detection.",
    boldParaText: "Open stage API",
    remainingParaText:
      "Open stage API with a core feature of data occaecat cupidatat proident, taken possession of my entire soul, like these sweet mornings.",
  };
  return (
    <>
      <main>
        <Hero />
        <div className="bg-red-100">
          <TraficSources
            textContent={transactionTextContent}
            image={transactionImage}
          />
          <ExpectedFeatures />
          <Leads />
        </div>
        <div className="bg-indigo-900">
          <Pricing />
        </div>
        <div className="bg-indigo-950">
          <FAQ />
        </div>
      </main>
      <main>
        <Hero1 />
        <div className="bg-[#111013]">
          <WhatWeDo1 />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 ">
          <Capabilities1 />
          <Showcase1 />
        </div>

        <WebAndMobile1 />
        <Clients1 />
        <Testimonial1 />
        <MapAndAddress1 />
        <Careers1 />
      </main>
      <main>
        <Breadcrumbs />

        <div className="bg-[#1a191b]">
          <Testimonials />
        </div>
        <Awards />
        <Collaborate />
      </main>
      <main>
        <Breadcrumbs1 />
        <Services1 />
        <Capabilities21 />
        <PlayVideo1 />
      </main>
    </>
  );
};

export default HomePage;
