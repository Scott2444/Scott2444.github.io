"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useState, useRef, useEffect } from "react";
import { NavBar, ContactMe } from "./components";
import data from '../public/data.json';


export function HeroSection() {
  return (
    <section className="w-full bg-sky-100 relative">
      {/* Mobile layout: image with overlay text */}
      <div className="md:hidden relative">
        {/* Image with gradient overlay */}
        <div className="w-screen relative left-1/2 right-1/2 -mx-[50vw] h-[500px]">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-sky-100 z-10"></div>
          <Image 
            src="/images/Intro_Picture_Mobile.jpg" 
            alt="Picture of Scott Haakenson" 
            fill
            sizes="100vw"
            style={{
              objectFit: 'cover',
              objectPosition: 'center top'
            }}
            priority
          />
        </div>
        
        {/* Overlaid text positioned at bottom */}
        <div className="absolute bottom-8 left-0 right-0 z-20 px-4">
          <div className="max-w-lg mx-auto">
            <h1 className="text-4xl font-bold mb-4 text-gray-900">
              Hi, I&apos;m Scott
            </h1>
            <p className="text-med text-gray-800">
              I&apos;m currently a software engineering student at Michigan State University. I&apos;m passionate about creating innovative products that push the bounds of what is possible.
            </p>
          </div>
        </div>
      </div>

      {/* Desktop layout */}
      <div className="hidden md:flex md:flex-row items-center">
        {/* Text container */}
        <div className="w-full py-16 px-4 md:px-12 lg:px-20 flex flex-col justify-center">
          <div className="max-w-lg mx-auto">
            <h1 className="text-5xl font-bold mb-6">
              Hi, I&apos;m Scott
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              I&apos;m currently a software engineering student at Michigan State University. I&apos;m passionate about creating innovative products that push the bounds of what is possible.
            </p>
          </div>
        </div>
        
        {/* Desktop image */}
        <div className="md:w-auto h-[600px] relative">
          <Image 
            src="/images/Intro_Picture.png" 
            alt="Picture of Scott Haakenson" 
            width={700}
            height={700}
            style={{
              objectFit: 'contain',
              objectPosition: 'right center',
              height: '100%'
            }}
            priority
          />
        </div>
      </div>

      {/* Get to know me - (desktop only) */}
      <div className="hidden md:flex flex-col items-center absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="text-gray-700 mb-2 font-medium">Get to know me</div>
        <svg 
          className="w-6 h-6 text-gray-700" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
}

export function AboutMe() {
  // State to track active slide for mobile view
  const [activeSlide, setActiveSlide] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  
  // Handle scroll events to update active slide indicator
  const handleScroll = () => {
    if (!sliderRef.current) return;
    
    const scrollPosition = sliderRef.current.scrollLeft;
    const slideWidth = sliderRef.current.clientWidth;
    const newActiveSlide = Math.round(scrollPosition / slideWidth);
    
    if (newActiveSlide !== activeSlide) {
      setActiveSlide(newActiveSlide);
    }
  };
  
  // Scroll to specific slide when indicator is clicked
  const scrollToSlide = (index: number) => {
    if (!sliderRef.current) return;
    
    const slideWidth = sliderRef.current.clientWidth;
    sliderRef.current.scrollTo({
      left: slideWidth * index,
      behavior: 'smooth'
    });
  };
  
  // Add gradients to match with interests data
  const gradients = [
    "from-[#5967D9] to-[#7DCFB6]",
    "from-[#7DCFB6] to-[#FBD1A2]",
    "from-[#FBD1A2] to-[#F79256]"
  ];
  
  // Map interests data to cards with gradients
  const cards = data["About Me"].Interests.map((interest: any, index: number) => ({
    title: interest.Title,
    gradient: gradients[index % gradients.length], // Use modulo to ensure we don't exceed array bounds
    content: interest.Description
  }));
  
  // Effect to add a class to enable smooth scrolling after initial load
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    // Set initial position to center the first card
    setTimeout(() => {
      slider.scrollLeft = 0;
    }, 0);
  }, []);
  
  return (
    <section className="w-full bg-gray-800 py-12 md:py-16 text-white">
      <div className="container mx-auto px-2 md:px-16">
        <h2 className="text-3xl md:text-4xl font-medium text-center mb-6">
          About Me
        </h2>
        <div className="max-w-3xl mx-auto">
          <h4 className="text-base md:text-xl font-normal text-center mb-8 md:mb-12 leading-relaxed px-4">
            {data["About Me"]["About Header"]}
          </h4>
        </div>

        {/* Desktop grid */}
        <div className="hidden md:grid grid-cols-3 gap-6 mt-10">
          {cards.map((card, index) => (
            <div 
              key={`desktop-card-${index}`}
              className={`rounded-3xl p-6 pb-12 bg-gradient-to-r ${card.gradient}`}
            >
              <h3 className="text-xl md:text-2xl font-semibold mb-4 text-center">
                {card.title}
              </h3>
              <p className="text-base">
                {card.content}
              </p>
            </div>
          ))}
        </div>

        {/* Mobile slider */}
        <div className="md:hidden mt-8">
          <div 
            ref={sliderRef}
            className="flex overflow-x-auto snap-x scrollbar-hide px-[15%]"
            onScroll={handleScroll}
            style={{
              scrollbarWidth: 'none', /* Firefox */
              msOverflowStyle: 'none',  /* IE and Edge */
              scrollSnapType: 'x mandatory',
              paddingLeft: 'calc((100% - 70%) / 2)',
              paddingRight: 'calc((100% - 70%) / 2)',
            }}
          >
            {cards.map((card, index) => (
              <div 
                key={`mobile-card-${index}`}
                className="flex-shrink-0 w-[100%] mx-[5%] snap-center"
                style={{
                  scrollSnapAlign: 'center',
                }}
              >
                <div className={`rounded-3xl p-5 pb-10 bg-gradient-to-r ${card.gradient} h-full`}>
                  <h3 className="text-xl font-semibold mb-3 text-center">
                    {card.title}
                  </h3>
                  <p className="text-sm">
                    {card.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Pagination dots */}
          <div className="flex justify-center mt-6 space-x-2">
            {cards.map((_, index) => (
              <button
                key={`dot-${index}`}
                onClick={() => scrollToSlide(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  activeSlide === index ? 'bg-white scale-110' : 'bg-gray-400 opacity-60'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <NavBar />
      <HeroSection />
      <AboutMe />
      <ContactMe />
    </>
  );
}