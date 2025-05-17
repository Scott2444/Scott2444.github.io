"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useState, useRef, useEffect } from "react";
import BlurredBackground, { NavBar, ContactMe, ImageModal } from "./components";
import data from '../public/data.json';


export function HeroSection() {
  return (
    <section className="w-full bg-transparent relative">
      {/* Mobile layout: image with overlay text */}
      <div className="md:hidden relative">
        {/* Image with gradient overlay */}
        <div className="w-screen relative left-1/2 right-1/2 -mx-[50vw] h-[500px]">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-sky-100 dark:hidden z-10"></div>
          <Image 
            src="/images/Intro_Picture_Mobile.jpg" 
            alt="Picture of Scott Haakenson" 
            className="dark:hidden"
            fill
            sizes="100vw"
            style={{
              objectFit: 'cover',
              objectPosition: 'center top'
            }}
            priority
          />
          <Image 
            src="/images/Intro_Picture_Mobile.jpg" 
            alt="Picture of Scott Haakenson" 
            className="hidden dark:block"
            fill
            sizes="100vw"
            style={{
              objectFit: 'cover',
              objectPosition: 'center top',
              WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 80%, transparent 100%)',
              maskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 80%, transparent 100%)',
              WebkitMaskSize: '100% 100%',
              maskSize: '100% 100%',
              WebkitMaskRepeat: 'no-repeat',
              maskRepeat: 'no-repeat'
            }}
            priority
          />
        </div>
        
        {/* Overlaid text positioned at bottom - updated for dark mode */}
        <div className="absolute bottom-10 left-0 right-0 z-20 px-4">
          <div className="max-w-lg mx-auto">
            <h1 className="text-4xl font-bold mb-4 dark:text-white">
              Hi, I&apos;m Scott
            </h1>
            <p className="text-med text-gray-700 dark:text-zinc-200">
              {data["About Me"].Introduction}
            </p>
          </div>
        </div>
      </div>

      {/* Desktop layout */}
      <div className="hidden md:flex md:flex-row items-center">
        {/* Text container */}
        <div className="w-full py-16 px-4 md:px-12 lg:px-20 flex flex-col justify-center">
          <div className="max-w-lg mx-auto">
            <h1 className="text-5xl font-bold mb-6 dark:text-white">
              Hi, I&apos;m Scott
            </h1>
            <p className="text-xl text-gray-700 mb-8 dark:text-zinc-300">
              {data["About Me"].Introduction}
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
        <div className="text-gray-700 mb-2 font-medium dark:text-zinc-300">Get to know me</div>
        <svg 
          className="w-6 h-6 text-gray-700 dark:text-zinc-300" 
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
    <section className="w-full bg-gray-800 py-12 md:py-16 text-white dark:bg-transparent">
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
              className={`rounded-3xl p-6 pb-12 bg-gradient-to-r ${card.gradient} 
                transform transition-all duration-300 
                hover:scale-[1.03] hover:shadow-xl hover:shadow-black/20 dark:hover:shadow-white/10 
                hover:-translate-y-1`}
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
                <div className={`rounded-3xl p-5 pb-10 bg-gradient-to-r ${card.gradient} h-full
                  transform transition-all duration-300 
                  hover:scale-[1.02] hover:shadow-lg active:scale-95`}>
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

export function ImageGallery() {
  // State to track active image for mobile view
  const [activeImage, setActiveImage] = useState(0);
  const galleryRef = useRef<HTMLDivElement>(null);
  // State to track the selected image for the modal
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null);
  
  // Handle scroll events to update active image indicator
  const handleScroll = () => {
    const container = galleryRef.current;
    if (!container) return;

    const scrollLeft = container.scrollLeft;
    const containerWidth = container.clientWidth;

    const children = Array.from(container.children);
    const imageCenters = children.map(child => {
      const childElement = child as HTMLElement;
      return childElement.offsetLeft + childElement.clientWidth / 2;
    });

    const center = scrollLeft + containerWidth / 2;

    let closestIndex = 0;
    let minDistance = Infinity;

    imageCenters.forEach((imageCenter, index) => {
      const distance = Math.abs(imageCenter - center);
      if (distance < minDistance) {
        closestIndex = index;
        minDistance = distance;
      }
    });

    setActiveImage(closestIndex);
  };

  const scrollToImage = (index: number) => {
  const container = galleryRef.current;
  if (!container) return;

  const target = container.children[index] as HTMLElement;
  if (target) {
    target.scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
      block: 'nearest',
    });
    setActiveImage(index);
  }
};
  
  // Get images from data
  const images = data["About Me"].Images || [];
  
  return (
    <section className="w-full py-12 md:py-16 bg-transparent">
      <div className="container mx-auto px-2 md:px-16">
        <h2 className="text-3xl md:text-4xl font-medium text-center mb-10 text-gray-800 dark:text-white">
          Photo Gallery
        </h2>
        
        {/* Image Modal - rendered conditionally when an image is selected */}
        {selectedImage && (
          <ImageModal
            src={selectedImage.src}
            alt={selectedImage.alt}
            onClose={() => setSelectedImage(null)}
          />
        )}
        
        {/* Desktop layout - larger images */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image: any, index: number) => (
            <div 
              key={`desktop-image-${index}`} 
              className="rounded-xl overflow-hidden shadow-lg bg-white dark:bg-gray-800 cursor-pointer"
              onClick={() => setSelectedImage({ src: image.src, alt: image.alt })}
            >
              <div className="relative h-64 lg:h-72">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-all duration-200 flex items-center justify-center">
                  <span className="opacity-0 hover:opacity-100 text-white text-sm font-medium p-2 rounded bg-black bg-opacity-60 transition-opacity">
                    Click to enlarge
                  </span>
                </div>
              </div>
              <div className="p-4">
                <p className="text-center text-gray-700 dark:text-gray-300">{image.caption}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile slider */}
        <div className="md:hidden mt-8">
          <div 
            ref={galleryRef}
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
            {images.map((image: any, index: number) => (
              <div 
                key={`mobile-image-${index}`}
                className="flex-shrink-0 w-[100%] mx-[5%] snap-center"
                style={{ scrollSnapAlign: 'center' }}
                onClick={() => setSelectedImage({ src: image.src, alt: image.alt })}
              >
                <div className="rounded-xl overflow-hidden shadow-lg bg-white dark:bg-gray-800 cursor-pointer">
                  <div className="relative h-64">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-all duration-200 flex items-center justify-center">
                      <span className="opacity-0 hover:opacity-100 text-white text-sm font-medium p-2 rounded bg-black bg-opacity-60 transition-opacity">
                        Click to enlarge
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-center text-gray-700 dark:text-gray-300">{image.caption}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Pagination dots - fixed to handle all elements correctly */}
          {images.length > 1 && (
            <div className="flex justify-center mt-6 space-x-2">
              {images.map((_: any, index: number) => (
                <button
                  key={`dot-${index}`}
                  onClick={() => scrollToImage(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    activeImage === index 
                      ? 'bg-gray-800 scale-110 dark:bg-white' 
                      : 'bg-gray-600 opacity-60 dark:bg-gray-400'
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <BlurredBackground />
      <NavBar />
      <HeroSection />
      <AboutMe />
      <ImageGallery />
      <ContactMe />
    </>
  );
}