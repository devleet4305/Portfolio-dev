import React from "react";
import { Hero } from "@/components/home/Hero";
import { TechStack } from "@/components/sections/TechStack";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Education } from "@/components/sections/Education";
import { ContactSection } from "@/components/sections/ContactSection";
import { LanguageSkills } from "@/components/sections/LanguageSkills";
import { ResumeSection } from "@/components/sections/ResumeSection";
import { HomeMotion } from "@/components/home/HomeMotion";

export default function HomePage() {
  return (
    <HomeMotion>
      <Hero />
      <TechStack />
      <LanguageSkills />
      <FeaturedProjects />
      <Education />
      <ResumeSection />
      <ContactSection />
    </HomeMotion>
  );
}
