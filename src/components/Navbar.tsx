"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Phone, Menu, X } from "lucide-react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const links = [
    { name: "الرئيسية", href: "/" },
    { name: "من نحن", href: "/about" },
    { name: "منتجاتنا", href: "/products" },
    { name: "اتصل بنا", href: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white shadow-md" : "bg-white"}`}
    >
      <div className="container p-2 max-w-325 mx-auto flex justify-between items-center font-medium">
        <div className="logo border border-blue-600 p-2 rounded-full w-[70px] h-[70px] md:w-[92px] md:h-[92px] transition-all duration-300">
          <Link href="/" onClick={handleLinkClick}>
            <Image
              src="/images/logo.png"
              alt="logo"
              width={92}
              height={92}
              className="w-full h-full rounded-full"
              priority
            />
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="hover:text-blue-600 transition-colors"
              onClick={handleLinkClick}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="hidden md:block">
          <Link
            href="/contact"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition-colors"
            onClick={handleLinkClick}
          >
            اتصل بنا
            <Phone size={20} />
          </Link>
        </div>
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-700 hover:text-blue-600 focus:outline-none"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>
      <div
        className={`md:hidden bg-white w-full overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 py-4" : "max-h-0 py-0"
        }`}
      >
        <div className="container mx-auto px-4 flex flex-col items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="w-full text-center py-2 text-lg hover:text-blue-600 transition-colors"
              onClick={handleLinkClick}
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/contact"
            className="w-full flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors mt-2"
            onClick={handleLinkClick}
          >
            اتصل بنا
            <Phone size={20} />
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
