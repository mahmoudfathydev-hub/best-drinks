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

    // Create a context for GSAP to handle cleanup easily
    const ctx = gsap.context(() => {
      // kill any previous triggers to avoid conflict
      ScrollTrigger.getAll().forEach(t => t.kill());

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: aboutContainerRef.current,
          start: "top bottom", // Start when About section enters viewport
          end: "center center", // End when About section is centered
          scrub: 1.5, // Smooth scrubbing
          onEnter: () => {
            gsap.set(productImg, { position: "fixed", zIndex: 50 });
          },
          onLeaveBack: () => {
            // Reset to natural layout when scrolling back up fully
            gsap.set(productImg, { position: "static", x: 0, y: 0, width: "auto", height: "auto", zIndex: "auto" });
          }
        },
      });

      // Initial Rect (Hero Center) - we calculate this relative to viewport
      // Since Hero is usually fully visible at start, we can get initial rect.
      const startRect = productImg.getBoundingClientRect();
      const initialCenterX = startRect.left + startRect.width / 2;
      const initialCenterY = startRect.top + startRect.height / 2;

      // Target Rect (Placeholder in About)
      // We need to calculate where the placeholder WILL be when valid.
      // However, since we want to animate to a "visual position" in the About section...
      // Let's assume the "target" is the placeholder div's position relative to the About Container.
      // And since we end when About is "center center" in viewport:
      // The Target Visual Position is simply the placeholder's offset relative to the viewport CENTER.

      // Better approach: Calculate delta.
      // BUT `productImg` becomes fixed, so `x` and `y` are viewport coordinates.

      // Let's rely on functional values to recalculate on resize? 
      // For now, simpler static calculation on mount.

      // Get placeholder element (the spacer div)
      const placeholder = contentWrapperRef.current?.firstElementChild as HTMLElement;
      if (!placeholder) return;

      const placeholderRect = placeholder.getBoundingClientRect();
      // Adjust placeholder rect for the fact that About might be down the page
      // We want the position when About is Centered.
      // Viewport Center Y = window.innerHeight / 2.
      // About Center Y (at end of scroll) = window.innerHeight / 2.
      // So Placeholder relative Y = (PlaceholderTop - AboutTop).

      // Calculate offsets within About Section
      const aboutRect = aboutContainerRef.current!.getBoundingClientRect();
      const placeholderOffsetY = placeholderRect.top - aboutRect.top;
      const placeholderOffsetX = placeholderRect.left - aboutRect.left;

      // Target Viewport Position when About is Centered:
      // aboutTop = (window.innerHeight - aboutRect.height) / 2  <-- If "center center" means Section Center aligns with Viewport Center.
      // Wait, "center center" trigger means Trigger Center hits Viewport Center.
      // So About Center is at Viewport Center.
      const endAboutTopInViewport = (window.innerHeight - aboutRect.height) / 2;

      const targetX = aboutRect.left + placeholderOffsetX; // Horizontal position roughly assumes straight vertical scroll or centered container
      // If layout is centered, `aboutRect.left` might change? No, container usually centered.
      // Actually `placeholderRect.left` is already viewport relative.
      // The vertical position is the tricky part.

      const targetY = endAboutTopInViewport + placeholderOffsetY;

      // Current (Start) Viewport Position:
      // We assume start is at scroll 0 (or wherever we are).
      // If we are at scroll 0, `startRect` is correct.

      // Set initial Fixed state to match Static state
      // We do this via the timeline "from" or `set`.
      // Actually, we want the animation to start from "Natural Hero Pos".

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
          left: targetX + 20, // Adjustment for padding/centering
          width: placeholderRect.width,
          // height: placeholderRect.height, // Keep aspect ratio? 
          height: "auto",
          ease: "power1.inOut" // Smooth curve
        }
      );

      // OPTIONAL: Phase 2 - Scroll Away
      // If the user scrolls PAST the "center center" point, the Fixed element stays there.
      // To make it look like it scrolls away, we can add a second ScrollTrigger?
      // Or just pin the About section?
      // Given the request, "landing perfectly" might imply it stays for a bit.

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
      <div className="h-96" />
    </div>
  );
}

export default About;