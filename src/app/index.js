"use client";
import Hero from "@/components/home/Hero";
import TraficSources from "@/components/home/TraficSources";
import transactionImage from "../../../public/transaction.png";
import ExpectedFeatures from "@/components/home/ExpectedFeatures";
import Leads from "@/components/home/Leads";
import Pricing from "@/components/home/Pricing";
import FAQ from "@/components/home/FAQ";
import Navbar1 from "@/components/navbar/Navbar1";
import Hero1 from "@/components/home/Hero1";
import WhatWeDo1 from "@/components/home/WhatWeDo";
import Capabilities1 from "@/components/home/Capabilities";
import Showcase1 from "@/components/home/Showcase";
import WebAndMobile1 from "@/components/home/WebAndMobile";
import Clients1 from "../components/home/Clients";
import Leads1 from "../../CommonElements/Leads";
import Testimonial1 from "@/components/home/Testimonial";
import MapAndAddress1 from "../../CommonElements/MapAndAddress";
import Careers1 from "@/components/home/Careers";
import Footer from "@/components/footer/Footer";
import { useEffect } from "react";

const leadshome2 = [
  {
    count: 28,
    icon: "bi-box-fill",
    title: "designers and developers",
    description:
      "Using year-over-year approaches and the latest technologies, we will ensure that your new website will be visible, accessible, and treads lightly.",
  },
  {
    count: 35,
    icon: "bi-pentagon-half",
    title: "awards for digital innovation",
    description:
      "We’ve structured our workflow processes were from the funny the century rather, initial all the made, have spare to negatives.",
  },
];

export default function Page() {
  const transactionTextContent = {
    mainHeading: "Insights & spam detection.",
    boldParaText: "Open stage API",
    remainingParaText:
      "Open stage API with a core feature of data occaecat cupidatat proident, taken possession of my entire soul, like these sweet mornings.",
  };

  return (
    <>
      <header>
        <Navbar1 />
      </header>

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
        <Leads data={leadshome2} />
        <Clients1 />
        <Testimonial1 />
        <MapAndAddress1 />
        <Careers1 />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}
