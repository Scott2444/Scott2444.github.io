"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useState, useEffect } from "react";

// PDF preview component: shows a preview box with a PDF icon and label, opens PDF in new tab
export function PdfPreview({ src, alt }: { src: string; alt: string }) {
  return (
    <div
      className="relative w-full h-40 rounded-lg overflow-hidden border border-gray-200 cursor-pointer hover:shadow-lg transition-all dark:border-stone-400 flex items-center justify-center bg-gray-50 dark:bg-stone-900"
      onClick={() => window.open(src, '_blank', 'noopener')}
      title={alt}
      tabIndex={0}
      role="button"
      aria-label={`Open PDF: ${alt}`}
    >
      <div className="flex flex-col items-center justify-center w-full h-full">
        <svg className="w-16 h-16 text-red-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 2a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6H6z" />
        </svg>
        <span className="text-sm font-medium text-red-600 dark:text-red-400">PDF Preview</span>
        <span className="text-xs text-gray-500 dark:text-slate-400 mt-1 text-center px-2 line-clamp-2">{alt}</span>
      </div>
      <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-all duration-200 flex items-center justify-center">
        <span className="opacity-0 hover:opacity-100 text-white text-sm font-medium p-2 rounded bg-black bg-opacity-60 transition-opacity">
          Click to open PDF
        </span>
      </div>
    </div>
  );
}

export function ImageModal({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  // Close when Escape key is pressed
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4" 
         onClick={onClose}
         aria-modal="true"
         role="dialog">
      <div className="relative max-w-4xl max-h-[90vh] overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-black bg-opacity-50 text-white w-10 h-10 rounded-full flex items-center justify-center z-10 hover:bg-opacity-70 transition-all"
          aria-label="Close modal"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="relative w-full" onClick={(e) => e.stopPropagation()}>
          <Image 
            src={src} 
            alt={alt} 
            width={800} 
            height={600} 
            priority
            style={{ objectFit: 'contain', maxHeight: '80vh', width: 'auto' }}
            className="rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}

export function VideoComponent({ src, alt }: { src: string; alt: string }) {
  // Check if the source is a YouTube URL
  const isYouTube = src.includes('youtube.com') || src.includes('youtu.be');
  
  // Extract YouTube video ID if it's a YouTube URL
  const getYouTubeVideoId = (url: string): string => {
    try {
      if (url.includes('youtube.com/watch')) {
        // Format: youtube.com/watch?v=VIDEO_ID
        const urlParams = new URLSearchParams(new URL(url).search);
        return urlParams.get('v') || '';
      } else if (url.includes('youtu.be/')) {
        // Format: youtu.be/VIDEO_ID    
        return url.split('youtu.be/')[1].split('?')[0];
      } else if (url.includes('youtube.com/embed/')) {
        // Format: youtube.com/embed/VIDEO_ID
        return url.split('youtube.com/embed/')[1].split('?')[0];
      }
      return '';
    } catch (error) {
      console.error('Error parsing YouTube URL', error);
      return '';
    }
  };
  
  if (isYouTube) {
    const videoId = getYouTubeVideoId(src);
    if (!videoId) {
      return (
        <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-500">
          Invalid YouTube URL
        </div>
      );
    }
    
    // Use the privacy-enhanced mode (youtube-nocookie.com)
    // And add parameters to reduce tracking and CORS issues
    const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1`;
    
    return (
      <iframe
        src={embedUrl}
        title={alt}
        width="100%"
        height="100%"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    );
  } else {
    // Handle direct video files (MP4, etc.)
    return (
      <video
        controls
        width="100%"
        height="100%"
        preload="metadata"
        title={alt}
        className="w-full h-full object-cover"
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    );
  }
}

export default function BlurredBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  // Calculate different movement patterns for each orb
  const purpleOrbPosition = {
    x: mousePosition.x / 30,
    y: mousePosition.y / 35,
  };
  
  const redOrbPosition = {
    x: mousePosition.x / -25, // Negative divisor makes it move opposite horizontally
    y: mousePosition.y / 20,  // Different divisor for unique speed
  };
  
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-sky-100 dark:bg-[#171717]">
      {/* Purple orb */}
      <div 
        className="absolute w-[600px] h-[600px] rounded-full bg-[#5967D9]/50 blur-[100px]"
        style={{
          left: `calc(20% + ${purpleOrbPosition.x}px)`,
          top: `calc(40% + ${purpleOrbPosition.y}px)`,
          transform: 'translate(-50%, -50%)',
        }}
      ></div>
      
      {/* Red orb */}
      <div 
        className="absolute w-[500px] h-[500px] rounded-full bg-[#C84D4D]/40 blur-[120px]"
        style={{
          right: `calc(25% + ${redOrbPosition.x}px)`, 
          bottom: `calc(20% + ${redOrbPosition.y}px)`,
          transform: 'translate(50%, 50%)',
        }}
      ></div>
      
      {/* Optional: subtle noise texture overlay */}
      <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.03] mix-blend-overlay"></div>
    </div>
  );
}

export function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Track scroll position to add effects when scrolled
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`sticky top-0 py-5 px-4 md:px-8 z-30 transition-all duration-300
        ${isScrolled 
          ? 'bg-sky-100/95 backdrop-blur-sm shadow-sm dark:bg-[#171717]/80 dark:md:bg-[#171717]/80 dark:shadow-lg dark:shadow-black/20' 
          : isMenuOpen
            ? 'bg-sky-100 md:bg-transparent dark:bg-[#171717]/60 dark:md:bg-transparent'
            : 'bg-sky-100 md:bg-transparent dark:bg-transparent dark:md:bg-transparent'}
      `} 
      id="topofpage"
    >
      <div className="container mx-auto flex justify-between items-center">
        <div className="ml-0 md:ml-20">
          <Link href="/" className="text-[#141619] no-underline">
            <h2 className="text-2xl font-medium">
              <span className="dark:text-zinc-300">Scott </span>
              <span className="dark:bg-gradient-to-r dark:from-[#5967D9] dark:to-[#C84D4D] dark:bg-clip-text dark:text-transparent">Haakenson</span> 
            </h2>
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
        <div className="hidden md:block text-black dark:text-white">
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
              <button 
                onClick={(e) => {
                  e.preventDefault(); // Prevent default action
                  document.getElementById('contact')?.scrollIntoView({ 
                    behavior: 'smooth' 
                  });
                }}
                className="px-5 py-2.5 block font-semibold bg-neutral-300 rounded-xl transition-all duration-500 hover:bg-neutral-400 w-full text-left dark:bg-neutral-700 dark:text-white dark:hover:bg-neutral-500"
                style={{cursor: 'pointer'}}
              >
                <h4 className="text-base md:text-lg font-medium">Contact</h4>
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-2 bg-sky-100 dark:bg-transparent">
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
              <button 
                onClick={(e) => {
                  e.preventDefault(); // Prevent default action
                  document.getElementById('contact')?.scrollIntoView({ 
                    behavior: 'smooth' 
                  });
                  setIsMenuOpen(false);
                }}
                className="block w-full px-4 py-2 bg-neutral-300 rounded-lg transition-all duration-500 hover:bg-neutral-400 text-center dark:bg-neutral-700 dark:text-white dark:hover:bg-neutral-500"
              >
                <h4 className="text-base font-medium">Contact</h4>
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export interface SidebarSection {
  id: string;
  title: string;
  href: string;
  subsections?: { id: string; title: string; href: string }[];
}

export function Sidebar({
  title,
  sections,
  activeSection,
  footerContent,
}: {
  title: string;
  sections: SidebarSection[];
  activeSection: string;
  footerContent?: React.ReactNode;
}) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  // Toggle section expansion
  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  return (
    <div className="hidden lg:block w-64 pr-6 border-r border-gray-200 dark:border-gray-400">
      <div className="sticky top-32 max-h-[calc(100vh-6rem)] overflow-y-auto pr-2">
        <h3 className="text-lg font-semibold mb-6 text-gray-700 dark:text-slate-200">{title}</h3>
        <nav>
          <ul className="space-y-3">
            {sections.map(section => (
              <li key={section.id}>
                {section.subsections ? (
                  <>
                    <div className="flex justify-between items-center">
                      <a 
                        href={section.href} 
                        className={`py-2 px-3 rounded-lg transition-colors flex-grow ${
                          activeSection === section.id 
                            ? "bg-blue-100 text-blue-700 font-medium dark:text-slate-200 dark:bg-[#5967D9]/40" 
                            : "text-gray-700 hover:bg-blue-50 dark:text-slate-200 dark:hover:bg-[#5967D9]/20 dark:hover:text-slate-100"
                        }`}
                      >
                        {section.title}
                      </a>
                      <button 
                        onClick={() => toggleSection(section.id)}
                        className="p-1.5 ml-1 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-md dark:text-gray-300 dark:hover:bg-gray-300"
                        aria-label={expandedSections[section.id] ? `Collapse ${section.title}` : `Expand ${section.title}`}
                      >
                        {expandedSections[section.id] ? (
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="18 15 12 9 6 15"></polyline>
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="6 9 12 15 18 9"></polyline>
                          </svg>
                        )}
                      </button>
                    </div>
                    
                    {expandedSections[section.id] && section.subsections && (
                      <ul className="mt-1 ml-4 border-l-2 border-gray-100 pl-3 space-y-1 dark:border-gray-100/30">
                        {section.subsections.map(subsection => (
                          <li key={subsection.id}>
                            <a 
                              href={subsection.href}
                              className="block py-1.5 px-3 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors 
                                         dark:text-slate-300 dark:hover:bg-[#5967D9]/30 dark:hover:text-slate-100"
                            >
                              {subsection.title}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <a 
                    href={section.href} 
                    className={`block py-2 px-3 rounded-lg transition-colors ${
                      activeSection === section.id 
                        ? "bg-blue-100 text-blue-700 font-medium dark:text-slate-200 dark:bg-[#5967D9]/40" 
                        : "text-gray-700 hover:bg-blue-50 dark:text-slate-200 dark:hover:bg-[#5967D9]/20 dark:hover:text-slate-100"
                    }`}
                  >
                    {section.title}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </nav>
        
        {footerContent && (
          <div className="mt-10 border-t pt-6 border-gray-200 dark:border-gray-400">
            {footerContent}
          </div>
        )}
      </div>
    </div>
  );
}

export function MobileSidebar({
  title,
  sections,
  activeSection,
  footerContent,
}: {
  title: string;
  sections: SidebarSection[];
  activeSection: string;
  footerContent?: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      {/* Floating Action Button - Toggles between hamburger and X */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed lg:hidden bottom-6 right-6 bg-blue-400 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center z-40 hover:bg-blue-500 transition-colors`}
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>
      
      {/* Mobile Navigation Drawer - Slides in from left */}
      {isOpen && (
        <div className="fixed inset-0 z-30 lg:hidden">
          {/* Semi-transparent backdrop */}
          <div 
            className="absolute inset-0 bg-gray-900/50 transition-opacity duration-300"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Drawer content - from left side */}
          <div className="absolute left-0 top-0 bottom-0 w-80 bg-white shadow-xl p-6 overflow-y-auto z-40 animate-slide-in-left dark:bg-[#171717]/95">
            <div className="mb-6">
              <h2 className="text-xl font-semibold">{title}</h2>
            </div>
            
            <nav>
              <ul className="space-y-4">
                {sections.map(section => (
                  <li key={section.id}>
                    <a 
                      href={section.href}
                      className={`block py-2 px-4 rounded-md ${section.subsections ? "mb-2" : ""} ${activeSection === section.id 
                        ? "bg-blue-100 text-blue-700 font-medium dark:text-slate-200 dark:bg-[#5967D9]/40" 
                        : "text-gray-700 hover:bg-blue-50 dark:text-slate-200 dark:hover:bg-[#5967D9]/20 dark:hover:text-slate-100"
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {section.title}
                    </a>
                    
                    {section.subsections && (
                      <ul className="ml-2 border-l border-gray-200 pl-2 space-y-2 mt-2">
                        {section.subsections.map(subsection => (
                          <li key={subsection.id}>
                            <a 
                              href={subsection.href}
                              className="block py-1 px-4 text-gray-600 hover:text-blue-700 rounded-md dark:text-slate-300 dark:hover:bg-[#5967D9]/30 dark:hover:text-slate-100"
                              onClick={() => setIsOpen(false)}
                            >
                              {subsection.title}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
              
              {footerContent && (
                <div className="mt-10 border-t pt-6 border-gray-200 dark:border-gray-400">
                  {footerContent}
                </div>
              )}
            </nav>
          </div>
        </div>
      )}
    </>
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
              I&apos;m interested in hearing from you about job opportunities, social media connections, or simply for a conversation.
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
              style={{cursor: 'pointer'}}
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