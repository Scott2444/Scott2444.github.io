"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useState, useRef, useEffect } from "react";
import { NavBar, ContactMe } from "../components";

interface SidebarNavProps {
    activeSection: string;
}

export function SidebarNav({activeSection}: SidebarNavProps ) {
  return (
    <div className="hidden lg:block w-64 pr-6 border-r border-gray-200">
      <div className="sticky top-24">
        <h3 className="text-lg font-semibold mb-6 text-gray-700">Experience</h3>
        <nav>
          <ul className="space-y-3">
            <li>
              <a 
                href="#overview" 
                className={`block py-2 px-3 rounded-lg transition-colors ${
                  activeSection === "overview" 
                    ? "bg-blue-100 text-blue-700 font-medium" 
                    : "text-gray-700 hover:bg-blue-50"
                }`}
              >
                Overview
              </a>
            </li>
            <li>
              <a 
                href="#professional" 
                className={`block py-2 px-3 rounded-lg transition-colors ${
                  activeSection === "professional" 
                    ? "bg-blue-100 text-blue-700 font-medium" 
                    : "text-gray-700 hover:bg-blue-50"
                }`}
              >
                Professional Experience
              </a>
            </li>
            <li>
              <a 
                href="#personal" 
                className={`block py-2 px-3 rounded-lg transition-colors ${
                  activeSection === "personal" 
                    ? "bg-blue-100 text-blue-700 font-medium" 
                    : "text-gray-700 hover:bg-blue-50"
                }`}
              >
                Personal Experience
              </a>
            </li>
            <li>
              <a 
                href="#skills" 
                className={`block py-2 px-3 rounded-lg transition-colors ${
                  activeSection === "skills" 
                    ? "bg-blue-100 text-blue-700 font-medium" 
                    : "text-gray-700 hover:bg-blue-50"
                }`}
              >
                Skills
              </a>
            </li>
          </ul>
        </nav>
        
        <div className="mt-10 border-t pt-6 border-gray-200">
          <a 
            href="College Resume - Third Year.pdf" 
            download
            className="block w-full bg-[#4891FF] hover:bg-blue-600 text-white py-2 px-4 rounded-lg text-center transition duration-300"
          >
            Download Resume
          </a>
        </div>
      </div>
    </div>
  );
}

export function ExperienceContent({activeSection}: SidebarNavProps ) {
  return (
    <div className="flex-1 pl-6 relative">
      {/* Content with relative positioning to appear above the gradient */}
      <div className="relative z-10">
        {/* Overview Section */}
        <section className="mb-16 pt-6" id="overview">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-[#141619]">
            Programming Experience and Skills
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
            {/* Professional Experience Card */}
            <div className="bg-gradient-to-br from-amber-300 to-amber-500 shadow-lg rounded-lg p-6 border border-gray-200 relative h-[300px] hover:shadow-xl transition-shadow">
              <h3 className="text-2xl font-semibold mb-2 text-white text-opacity-90">
                Professional Experience
              </h3>
              {/* Add max-height and overflow to prevent text overlap */}
              <div className="h-[140px] overflow-hidden"> 
                <p className="text-left text-amber-50 text-opacity-90">
                  Here are some of the professional projects I've been involved in, ranging from large corporations to small startups!
                </p>
              </div>
              <a 
                href="#professional" 
                className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-3/5 bg-gradient-to-br from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white py-2 px-4 rounded-md text-center transition duration-300 shadow-md"
              >
                Explore
              </a>
            </div>
            
            {/* Personal Experience Card */}
            <div className="bg-gradient-to-br from-rose-300 to-rose-500 shadow-lg rounded-lg p-6 border border-gray-200 relative h-[300px] hover:shadow-xl transition-shadow">
              <h3 className="text-2xl font-semibold mb-2 text-white text-opacity-90">
                Personal Experience
              </h3>
              {/* Add max-height and overflow to prevent text overlap */}
              <div className="h-[140px] overflow-hidden">
                <p className="text-left text-rose-50 text-opacity-90">
                  These are passion projects that are a reflection of my passion for programming and desire to learn!
                </p>
              </div>
              <a 
                href="#personal" 
                className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-3/5 bg-gradient-to-br from-rose-600 to-rose-700 hover:from-rose-700 hover:to-rose-800 text-white py-2 px-4 rounded-md text-center transition duration-300 shadow-md"
              >
                Explore
              </a>
            </div>
            
            {/* Skills Card */}
            <div className="bg-gradient-to-br from-indigo-300 to-indigo-500 shadow-lg rounded-lg p-6 border border-gray-200 relative h-[300px] hover:shadow-xl transition-shadow">
              <h3 className="text-2xl font-semibold mb-2 text-white text-opacity-90">
                Skills
              </h3>
              {/* Add max-height and overflow to prevent text overlap */}
              <div className="h-[140px] overflow-hidden">
                <p className="text-left text-indigo-50 text-opacity-90">
                  These are the technical and interpersonal skills that I have accumulated over my lifetime as a software engineer!
                </p>
              </div>
              <a 
                href="#skills" 
                className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-3/5 bg-gradient-to-br from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white py-2 px-4 rounded-md text-center transition duration-300 shadow-md"
              >
                Explore
              </a>
            </div>
          </div>
          
          <hr className="border-t-2 border-gray-200 mb-6" />
        </section>
        
        {/* Professional Experience Section */}
        <section id="professional" className="py-10 scroll-mt-20">
          <h2 className="text-2xl font-bold mb-8">Professional Experience</h2>
          <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 mb-8">
            <p className="text-gray-600">
              Professional experience content will go here...
            </p>
          </div>
          <hr className="border-t-2 border-gray-200" />
        </section>
        
        {/* Personal Experience Section */}
        <section id="personal" className="py-10 scroll-mt-20">
          <h2 className="text-2xl font-bold mb-8">Personal Experience</h2>
          <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 mb-8">
            <p className="text-gray-600">
              Personal experience content will go here...
            </p>
          </div>
          <hr className="border-t-2 border-gray-200" />
        </section>
        
        {/* Skills Section */}
        <section id="skills" className="py-10 scroll-mt-20">
          <h2 className="text-2xl font-bold mb-8">Skills</h2>
          <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 mb-8">
            <p className="text-gray-600">
              Skills content will go here...
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default function Experience() {
  const [activeSection, setActiveSection] = useState("overview");

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["overview", "professional", "personal", "skills"];
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <NavBar />
      
      <div className="relative">
        {/* Background gradient */}
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-sky-100 to-white pointer-events-none" />
        
        <div className="container mx-auto px-4 py-10 flex flex-1 relative z-10">
          <SidebarNav activeSection={activeSection} />
          <ExperienceContent activeSection={activeSection} />
        </div>
      </div>

      <ContactMe />
    </div>
  );
}