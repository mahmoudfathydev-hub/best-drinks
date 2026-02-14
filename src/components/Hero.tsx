"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
import flavors from "@/data/data.json";

function Hero() {
  const [selectedFlavor, setSelectedFlavor] = useState(flavors[0]);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
      easing: "ease-out-cubic",
    });

    document.documentElement.style.setProperty("--bg-color", "#ffffff");

    return () => {
      document.documentElement.style.removeProperty("--bg-color");
    };
  }, []);

  useEffect(() => {
    AOS.refresh();
  }, [selectedFlavor]);

  useEffect(() => {
    if (selectedFlavor) {
      document.documentElement.style.setProperty(
        "--flavor-color",
        selectedFlavor.backgroundColor,
      );

      return () => {
        document.documentElement.style.removeProperty("--flavor-color");
      };
    }
  }, [selectedFlavor]);

  const handleFlavorClick = (flavor: (typeof flavors)[0]) => {
    setSelectedFlavor(flavor);
    setIsExpanded(true);
  };

  return (
    <main className="min-h-screen flex flex-col relative">
      <div className="absolute right-30 top-[30%] z-10">
        <div
          data-aos="fade-left"
          data-aos-delay="200"
          className="animate-bounce"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-30 w-30 text-blue-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
      <div className="flex-1 flex items-center">
        <div className="container p-4 max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">
            <div className="w-full lg:w-1/3 text-center lg:text-right px-4">
              <div className="p-6 rounded-2xl">
                <h2
                  data-aos="fade-left"
                  data-aos-delay="100"
                  className="text-4xl md:text-5xl font-bold text-gray-800 mb-3"
                >
                  {selectedFlavor.name}
                </h2>
                <h3
                  data-aos="fade-left"
                  data-aos-delay="200"
                  className="text-2xl md:text-3xl text-blue-600 font-semibold mb-4"
                >
                  {selectedFlavor.flavor}
                </h3>
                <p
                  data-aos="fade-left"
                  data-aos-delay="300"
                  className="text-gray-600 text-lg leading-relaxed"
                >
                  {selectedFlavor.description}
                </p>
              </div>
            </div>
            <div
              className="w-full max-w-md flex-shrink-0 flex items-center justify-center"
              data-aos="fade-left"
              data-aos-delay="200"
            >
              <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
                <Image
                  src={selectedFlavor.image.replace("public", "")}
                  alt={selectedFlavor.flavor}
                  fill
                  sizes="(max-width: 768px) 16rem, (max-width: 1024px) 20rem, 24rem"
                  className="object-contain transition-all duration-500 transform hover:scale-105"
                  priority
                />
              </div>
            </div>
          </div>
          <div className="w-full mt-8">
            <div className="container max-w-7xl mx-auto px-4">
              <div className="flex justify-center lg:justify-end">
                <div className="grid grid-cols-4 lg:grid-cols-8 gap-3 md:gap-4 w-full max-w-2xl mx-auto">
                  {flavors.map((flavor, index) => (
                    <button
                      key={`${flavor.flavor}-${index}`}
                      onClick={() => handleFlavorClick(flavor)}
                      data-aos="fade-up"
                      data-aos-delay={index * 100}
                      data-aos-once="false"
                      className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center 
                    shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-110
                    ${selectedFlavor.flavor === flavor.flavor ? "ring-2 ring-blue-400" : ""}`}
                      style={{
                        backgroundColor: flavor.backgroundColor,
                        minWidth: "3rem",
                        minHeight: "3rem",
                      }}
                      aria-label={`نكهة ${flavor.flavor}`}
                    >
                      <div className="w-8 h-8 md:w-10 md:h-10 relative">
                        <Image
                          src={flavor.image.replace("public", "")}
                          alt={flavor.flavor}
                          fill
                          sizes="(max-width: 768px) 2rem, 2.5rem"
                          className="object-contain p-1"
                        />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Hero;
