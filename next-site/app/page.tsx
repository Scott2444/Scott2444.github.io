"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useState, useRef, useEffect } from "react";

export function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <nav className="py-5 px-4 md:px-8 bg-sky-100" id="topofpage">
      <div className="container mx-auto flex justify-between items-center">
        <div className="ml-0 md:ml-20">
          <Link href="/" className="text-[#141619] no-underline">
            <h2 className="text-2xl font-medium">Scott Haakenson</h2>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button 
          className="md:hidden p-2" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Desktop menu */}
        <div className="hidden md:block">
          <ul className="flex">
            <li>
              <Link href="/" className="px-5 py-2.5 block font-semibold transition-all duration-500 hover-underline-animation">
                <h4 className="text-base md:text-lg font-light">About Me</h4>
              </Link>
            </li>
            <li>
              <Link href="/experience" className="px-5 py-2.5 block font-semibold transition-all duration-500 hover-underline-animation">
                <h4 className="text-base md:text-lg font-light">Experience</h4>
              </Link>
            </li>
            <li>
              <Link href="/education" className="px-5 py-2.5 block font-semibold transition-all duration-500 hover-underline-animation">
                <h4 className="text-base md:text-lg font-light">Education</h4>
              </Link>
            </li>
            <li className="ml-2 mr-0 md:mr-20">
              <Link href="#contact" className="px-5 py-2.5 block font-semibold bg-neutral-300 rounded-xl transition-all duration-500 hover:bg-neutral-400">
                <h4 className="text-base md:text-lg font-medium">Contact</h4>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-2 bg-sky-100">
          <ul className="flex flex-col space-y-2 px-4 py-2">
            <li>
              <Link 
                href="/" 
                className="block py-2 transition-all duration-500 hover-underline-animation"
                onClick={() => setIsMenuOpen(false)}
              >
                <h4 className="text-base font-light">About Me</h4>
              </Link>
            </li>
            <li>
              <Link 
                href="/experience" 
                className="block py-2 transition-all duration-500 hover-underline-animation"
                onClick={() => setIsMenuOpen(false)}
              >
                <h4 className="text-base font-light">Experience</h4>
              </Link>
            </li>
            <li>
              <Link 
                href="/education" 
                className="block py-2 transition-all duration-500 hover-underline-animation"
                onClick={() => setIsMenuOpen(false)}
              >
                <h4 className="text-base font-light">Education</h4>
              </Link>
            </li>
            <li className="pt-2">
              <Link 
                href="#contact" 
                className="block px-4 py-2 bg-neutral-300 rounded-lg transition-all duration-500 hover:bg-neutral-400 text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <h4 className="text-base font-medium">Contact</h4>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

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

  // Card data
  const cards = [
    {
      title: "Learning",
      gradient: "from-[#5967D9] to-[#7DCFB6]",
      content: "I love learning new things. I follow the tech world to learn about how the next up and coming innovation came to inception. I also like to learn about how cars are engineered. Although I've never been able to work on one, I hope to have a project car one day."
    },
    {
      title: "Traveling",
      gradient: "from-[#7DCFB6] to-[#FBD1A2]",
      content: "Seeing the world is one of my life goals because it allows me to experience different cultures that are unlike anything else. Each new place I visit offers a fresh perspective, enriching my understanding of the world."
    },
    {
      title: "Staying Active",
      gradient: "from-[#FBD1A2] to-[#F79256]",
      content: "I try my best to stay active because having a healthy body is the greatest gift you can give yourself. I enjoy playing casual sports with friends like volleyball or going to the gym to get stronger. One of the best joys are finally beating a personal record after weeks of stagnation."
    }
  ];
  
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
            Here&apos;s a little bit about me. I&apos;m enthusiastic about coding and always looking to improve my skills.
            But everyone needs a break, right?
            When I&apos;m not coding, you can usually find me at the gym or hanging out with friends.
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

export function ContactMe() {
  return (
    <section className="w-full bg-[#141619] pt-16 pb-8 md:pb-16 text-white" id="contact">
      <div className="container mx-auto px-6 md:px-16">
        <div className="md:flex md:justify-between">
          {/* Content area */}
          <div className="md:w-2/3 mb-10 md:mb-0">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Contact Me
            </h1>
            <h4 className="text-base md:text-xl font-normal mb-8 leading-relaxed max-w-xl">
              I'm interested in hearing from you about job opportunities, social media connections, or simply for a conversation.
            </h4>
            
            {/* Social media icons */}
            <div className="flex space-x-6 md:space-x-8 mb-8">
              <a 
                href="https://www.linkedin.com/in/scott-haakenson-84295724b/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
                aria-label="LinkedIn"
              >
                <Image 
                  src="/images/LinkedIn.svg" 
                  alt="LinkedIn" 
                  width={40} 
                  height={40}
                  className="w-8 h-8 md:w-14 md:h-14"
                />
              </a>
              <a 
                href="mailto:scotty.haakenson@gmail.com"
                className="hover:opacity-80 transition-opacity"
                aria-label="Email"
              >
                <Image 
                  src="/images/Gmail.svg" 
                  alt="Gmail" 
                  width={40} 
                  height={40}
                  className="w-8 h-8 md:w-14 md:h-14"
                />
              </a>
              <a 
                href="https://github.com/Scott2444"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
                aria-label="GitHub"
              >
                <Image 
                  src="/images/Github.svg" 
                  alt="Github" 
                  width={40} 
                  height={40}
                  className="w-8 h-8 md:w-14 md:h-14"
                />
              </a>
              <a 
                href="https://www.instagram.com/scott.haakenson/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
                aria-label="Instagram"
              >
                <Image 
                  src="/images/Instagram.svg" 
                  alt="Instagram" 
                  width={40} 
                  height={40}
                  className="w-8 h-8 md:w-14 md:h-14"
                />
              </a>
            </div>
            
            <h6 className="text-xs font-light italic opacity-70">
              © {new Date().getFullYear()} Scott Haakenson
            </h6>
          </div>
          
          {/* Back to top button */}
          <div className="hidden md:flex md:self-center text-right">
            <button 
              onClick={() => {
                window.scrollTo({
                  top: 0,
                  behavior: 'smooth'
                });
              }}
              className="inline-flex flex-col items-center hover:opacity-80 transition-opacity"
              aria-label="Scroll to top"
            >
              <svg 
                className="w-14 h-14 border border-white rounded-full p-2 mb-2" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1.5} 
                  d="M5 10l7-7m0 0l7 7m-7-7v18" 
                />
              </svg>
              <h5 className="text-base font-light">Back to Top</h5>
            </button>
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
