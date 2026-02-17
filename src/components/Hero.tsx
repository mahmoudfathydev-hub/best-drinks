"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { Gravitas_One } from "next/font/google";
import data from "../data/data.json";
import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { useTheme } from "@/context/ThemeContext";
import { useProductImage } from "@/context/ProductImageContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const gravitasOne = Gravitas_One({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-gravitas",
});

gsap.registerPlugin(ScrollTrigger);

type Flavor = (typeof data)[0];

function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentFlavor, setCurrentFlavor] = useState<Flavor>(data[0]);

  const getImagePath = (path: string) => {
    return path.replace("public", "");
  };

  const textRef = useRef<HTMLElement | null>(null);
  const imagesRef = useRef<Array<HTMLDivElement | null>>([]);
  const buttonsRef = useRef<HTMLDivElement | null>(null);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const lastDirectionRef = useRef<"next" | "prev">("next");
  const isFirstRender = useRef(true);
  const { setBackgroundColor } = useTheme();
  const { productImageRef } = useProductImage();

  // Use useLayoutEffect to set initial hidden state BEFORE browser paint
  // This prevents any flash of content in wrong positions
  useLayoutEffect(() => {
    const imgs = imagesRef.current.filter(Boolean) as HTMLElement[];
    if (imgs.length) {
      gsap.set(imgs, { opacity: 0, y: 50 });
    }
    if (buttonsRef.current) {
      gsap.set(buttonsRef.current, { opacity: 0, y: 30 });
    }
  }, []);

  const changeFlavor = (dir: "next" | "prev") => {
    lastDirectionRef.current = dir;

    const shift =
      (typeof window !== "undefined" ? window.innerWidth * 0.8 : 800) *
      (dir === "next" ? -1 : 1);
    const imgs = imagesRef.current.filter(Boolean) as HTMLElement[];
    const tl = gsap.timeline({ defaults: { ease: "power2.in" } });

    if (textRef.current) {
      tl.to(textRef.current, { x: shift, opacity: 0, duration: 0.45 });
    }

    if (imgs.length) {
      tl.to(
        imgs,
        { y: 40, opacity: 0, stagger: 0.12, duration: 0.35 },
        "-=0.25",
      );
    }

    if (buttonsRef.current) {
      tl.to(
        buttonsRef.current,
        { y: 20, opacity: 0, duration: 0.3 },
        "-=0.2",
      );
    }

    tl.call(() => {
      setCurrentIndex((prevIndex) =>
        dir === "next"
          ? (prevIndex + 1) % data.length
          : (prevIndex - 1 + data.length) % data.length,
      );
    });
  };

  useEffect(() => {
    setCurrentFlavor(data[currentIndex]);
    setBackgroundColor(data[currentIndex].backgroundColor);
    const dir = lastDirectionRef.current;
    const sw = typeof window !== "undefined" ? window.innerWidth * 0.8 : 800;
    const fromX = dir === "next" ? sw : -sw;

    if (textRef.current) {
      gsap.fromTo(
        textRef.current,
        { x: fromX, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
      );
    }

    const imgs = imagesRef.current.filter(Boolean) as HTMLElement[];
    const delay = isFirstRender.current ? 1.8 : 0.3;

    if (imgs.length) {
      gsap.fromTo(
        imgs,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.6,
          ease: "power3.out",
          delay: delay,
        },
      );
    }

    if (buttonsRef.current) {
      gsap.fromTo(
        buttonsRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
          delay: isFirstRender.current ? 3 : delay + 0.4,
        },
      );
    }

    isFirstRender.current = false;
  }, [currentIndex, setBackgroundColor]);

  return (
    <main
      ref={heroRef}
      className="relative h-[90vh] flex items-center justify-center overflow-hidden transition-colors duration-1000"
      style={{
        backgroundColor: currentFlavor.backgroundColor,
      }}
    >
      <div className="w-full max-w-[80%] mx-auto px-4">
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          <h1
            ref={(el) => {
              textRef.current = el;
            }}
            className={`whitespace-nowrap text-[60px] xs:text-[60px] sm:text-[80px] md:text-[120px] lg:text-[150px] xl:text-[160px] font-bold text-white/20 pointer-events-none select-none w-full text-center ${gravitasOne.className} leading-[0.8] transition-all duration-1000`}
          >
            {currentFlavor.flavor}
          </h1>
        </div>

        <div className="container mx-auto px-4 z-10 w-full h-full">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center h-full">
            <div className="md:col-span-1 flex flex-col gap-4 md:gap-8">
              <div
                className="w-full"
                style={{ opacity: 0 }}
                ref={(el) => {
                  imagesRef.current[0] = el;
                }}
              >
                <Image
                  src={getImagePath(currentFlavor.images[0])}
                  alt={currentFlavor.flavor}
                  width={300}
                  height={300}
                  className="w-full h-auto aspect-square object-cover rounded-full"
                />
              </div>
              <div
                className="w-full"
                style={{ opacity: 0 }}
                ref={(el) => {
                  imagesRef.current[1] = el;
                }}
              >
                <Image
                  src={getImagePath(currentFlavor.images[1])}
                  alt={currentFlavor.flavor}
                  width={300}
                  height={300}
                  className="w-full h-auto aspect-square object-cover rounded-full"
                />
              </div>
            </div>
            <div className="md:col-span-3 relative z-20 mt-8 md:mt-0">
              <div className="relative h-full flex flex-col items-center justify-center gap-4">
                <div className="mx-auto w-auto relative flex items-center justify-center">
                  <div
                    ref={(el) => {
                      imagesRef.current[2] = el;
                      productImageRef.current = el;
                    }}
                    style={{ opacity: 0 }}
                    className="relative w-auto h-auto z-50 will-change-transform"
                  >
                    <Image
                      src={getImagePath(currentFlavor.Can)}
                      alt={`${currentFlavor.flavor} drink`}
                      width={600}
                      height={900}
                      className="mx-auto w-auto object-contain"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="md:col-span-1 flex flex-col gap-4 md:gap-8 mt-4 md:mt-0">
              <div
                className="w-full"
                style={{ opacity: 0 }}
                ref={(el) => {
                  imagesRef.current[3] = el;
                }}
              >
                <Image
                  src={getImagePath(currentFlavor.images[2])}
                  alt={currentFlavor.flavor}
                  width={300}
                  height={300}
                  className="w-full h-auto aspect-square object-cover rounded-full"
                />
              </div>
              <div
                className="w-full"
                style={{ opacity: 0 }}
                ref={(el) => {
                  imagesRef.current[4] = el;
                }}
              >
                <Image
                  src={getImagePath(currentFlavor.images[3])}
                  alt={currentFlavor.flavor}
                  width={300}
                  height={300}
                  className="w-full h-auto aspect-square object-cover rounded-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        ref={buttonsRef}
        style={{ opacity: 0 }}
        className="absolute bottom-8 left-0 right-0 z-50 flex items-center justify-center gap-4 sm:gap-6"
      >
        <button
          onClick={() => changeFlavor("prev")}
          className="w-12 h-12 rounded-full bg-transparent border border-white/20 cursor-pointer flex items-center justify-center hover:bg-white/30 transition-colors active:scale-95"
          aria-label="Previous flavor"
        >
          <ChevronLeft className="text-white w-6 h-6" />
        </button>

        <button
          className="px-8 py-3 bg-white text-gray-900 rounded-full font-bold hover:bg-gray-100 active:scale-95 transition-all cursor-pointer"
          onClick={() => {
            console.log(`Shop now for ${currentFlavor.flavor}`);
          }}
        >
          Shop Now
        </button>

        <button
          onClick={() => changeFlavor("next")}
          className="w-12 h-12 rounded-full bg-transparent border border-white/20 cursor-pointer flex items-center justify-center hover:bg-white/30 transition-colors active:scale-95"
          aria-label="Next flavor"
        >
          <ChevronRight className="text-white w-6 h-6" />
        </button>
      </div>
    </main>
  );
}

export default Hero;