"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Sun, Moon, Menu, X } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { siteConfig } from "@/config/site";

interface NavbarProps {
  isAuthenticated: boolean;
}

export function Navbar({ isAuthenticated }: NavbarProps) {
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userProfile, setUserProfile] = useState<{ name: string; email: string; role?: string; profileImage?: string } | null>(null);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const navbarRef = useRef<HTMLDivElement>(null);

  // Fetch user profile on mount / auth change
  useEffect(() => {
    if (isAuthenticated) {
      const fetchProfile = async () => {
        try {
          const res = await fetch("/api/users/profile");
          if (res.ok) {
            const data = await res.json();
            setUserProfile(data);
          }
        } catch (error) {
          console.error("Failed to fetch profile in navbar:", error);
        }
      };
      fetchProfile();
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUserProfile(null);
    }
  }, [isAuthenticated]);

  // Avoid hydration mismatch by waiting for mount
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // Entrance GSAP animation
  useGSAP(
    () => {
      gsap.fromTo(
        navbarRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power4.out" }
      );
    },
    { scope: navbarRef }
  );

  const toggleTheme = () => {
    if (!mounted) return;
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Projects", href: "/projects" },
    { label: "Blogs", href: "/blogs" },
    ...(isAuthenticated && userProfile?.role === "admin" ? [{ label: "Dashboard", href: "/dashboard" }] : []),
    { label: "Contact", href: "/contact" },
  ];

  return (
    <div
      ref={navbarRef}
      className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/70 backdrop-blur-md transition-all duration-300"
    >
      <div className="mx-auto flex max-w-7xl h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left Side: Brand Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-semibold tracking-tight text-foreground">
            {siteConfig.name}
          </span>
        </Link>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive ? "text-primary font-semibold" : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Side: Actions (Theme Toggle & Auth UI) */}
        <div className="hidden md:flex items-center gap-6">
          {/* Bare Theme Toggle Icon */}
          <button
            onClick={toggleTheme}
            className="inline-flex size-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            aria-label="Toggle theme"
          >
            {mounted && (theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)) ? (
              <Sun className="size-5" />
            ) : (
              <Moon className="size-5" />
            )}
          </button>

          <Link
            href="/#contact"
            className="button-primary h-9 rounded-md px-4"
          >
            Hire Me
          </Link>
        </div>

        {/* Mobile Toggle & Bare Actions */}
        <div className="flex md:hidden items-center gap-4">
          <button
            onClick={toggleTheme}
            className="inline-flex size-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            aria-label="Toggle theme"
          >
            {mounted && (theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)) ? (
              <Sun className="size-5" />
            ) : (
              <Moon className="size-5" />
            )}
          </button>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="inline-flex size-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            {isMobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div id="mobile-navigation" className="md:hidden border-t border-border bg-background">
          <div className="space-y-1 px-4 py-4 pb-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-current={isActive ? "page" : undefined}
                  className={`block rounded-md px-3 py-2 text-base font-medium transition-colors hover:bg-muted ${
                    isActive ? "text-primary bg-muted" : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            <div className="border-t border-border/40 my-4 pt-4 px-3">
              <Link
                href="/#contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="button-primary h-11 w-full rounded-md"
              >
                Hire Me
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
