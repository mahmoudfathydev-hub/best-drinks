"use client";
import React, { useEffect, useRef } from "react";
import { useProductImage } from "@/context/ProductImageContext";
import { useTheme } from "@/context/ThemeContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
function About() {
  const { productImageRef, aboutContainerRef } = useProductImage();
  const { backgroundColor } = useTheme();
  const blobRef = useRef<HTMLDivElement | null>(null);
  const contentWrapperRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!productImageRef.current || !aboutContainerRef.current || !contentWrapperRef.current) return;
    const productImg = productImageRef.current;
    const ctx = gsap.context(() => {
      ScrollTrigger.getAll().forEach(t => t.kill());
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: aboutContainerRef.current,
          start: "top bottom", 
          end: "center center", 
          scrub: 1.5, 
          onEnter: () => {
            gsap.set(productImg, { position: "fixed", zIndex: 50 });
          },
          onLeaveBack: () => {
            gsap.set(productImg, { position: "static", x: 0, y: 0, width: "auto", height: "auto", zIndex: "auto" });
          }
        },
      });
      const startRect = productImg.getBoundingClientRect();
      const initialCenterX = startRect.left + startRect.width / 2;
      const initialCenterY = startRect.top + startRect.height / 2;
      const placeholder = contentWrapperRef.current?.firstElementChild as HTMLElement;
      if (!placeholder) return;
      const placeholderRect = placeholder.getBoundingClientRect();
      const aboutRect = aboutContainerRef.current!.getBoundingClientRect();
      const placeholderOffsetY = placeholderRect.top - aboutRect.top;
      const placeholderOffsetX = placeholderRect.left - aboutRect.left;
      const endAboutTopInViewport = (window.innerHeight - aboutRect.height) / 2;
      const targetX = aboutRect.left + placeholderOffsetX; 
      const targetY = endAboutTopInViewport + placeholderOffsetY;
      timeline.fromTo(productImg,
        {
          top: startRect.top,
          left: startRect.left,
          width: startRect.width,
          height: startRect.height,
          position: "fixed",
          x: 0,
          y: 0
        },
        {
          top: targetY,
          left: targetX + 20, 
          width: placeholderRect.width,
          height: "auto",
          ease: "power1.inOut" 
        }
      );
    });
    return () => ctx.revert();
  }, [productImageRef, aboutContainerRef]);
  return (
    <div
      ref={aboutContainerRef}
      className="relative min-h-screen bg-white py-20 px-6 flex items-center justify-center"
    >
      <div
        ref={blobRef}
        className="absolute left-12 md:left-20 top-1/2 -translate-y-1/2 -z-10 pointer-events-none"
        style={{
          width: "300px",
          height: "400px",
          backgroundColor,
          borderRadius: "85% 15% 89% 11% / 51% 46% 54% 49%",
          filter: "blur(15px)",
          opacity: 0,
        }}
      />
      <div
        ref={contentWrapperRef}
        className="w-full max-w-6xl flex items-center justify-between gap-12"
      >
        <div className="shrink-0 w-1/3 h-80" />
        <div className="flex-1">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            About Best Egyptian Juice
          </h2>
          <p className="text-lg leading-relaxed text-gray-700 mb-6">
            Best Egyptian Juice is a premium beverage brand that delivers a
            refreshing and flavorful experience in every sip. Crafted with
            high-quality ingredients and carefully selected flavors, Best
            combines great taste with consistent quality standards.
          </p>
          <p className="text-lg leading-relaxed text-gray-700">
            Whether you&apos;re enjoying it during a busy day, with friends, or at
            special moments, Best Juice offers the perfect balance of freshness
            and energy. More than just a drink, it represents vitality,
            enjoyment, and authentic Egyptian refreshment.
          </p>
        </div>
      </div>
    </div>
  );
}
export default About;