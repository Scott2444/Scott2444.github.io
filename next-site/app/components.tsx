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
              <button 
                onClick={(e) => {
                  e.preventDefault(); // Prevent default action
                  document.getElementById('contact')?.scrollIntoView({ 
                    behavior: 'smooth' 
                  });
                }}
                className="px-5 py-2.5 block font-semibold bg-neutral-300 rounded-xl transition-all duration-500 hover:bg-neutral-400 w-full text-left"
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
              <button 
                onClick={(e) => {
                  e.preventDefault(); // Prevent default action
                  document.getElementById('contact')?.scrollIntoView({ 
                    behavior: 'smooth' 
                  });
                  setIsMenuOpen(false);
                }}
                className="block w-full px-4 py-2 bg-neutral-300 rounded-lg transition-all duration-500 hover:bg-neutral-400 text-center"
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
    <div className="hidden lg:block w-64 pr-6 border-r border-gray-200">
      <div className="sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto pr-2">
        <h3 className="text-lg font-semibold mb-6 text-gray-700">{title}</h3>
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
                            ? "bg-blue-100 text-blue-700 font-medium" 
                            : "text-gray-700 hover:bg-blue-50"
                        }`}
                      >
                        {section.title}
                      </a>
                      <button 
                        onClick={() => toggleSection(section.id)}
                        className="p-1.5 ml-1 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-md"
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
                      <ul className="mt-1 ml-4 border-l-2 border-gray-100 pl-3 space-y-1">
                        {section.subsections.map(subsection => (
                          <li key={subsection.id}>
                            <a 
                              href={subsection.href}
                              className="block py-1.5 px-3 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors"
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
                        ? "bg-blue-100 text-blue-700 font-medium" 
                        : "text-gray-700 hover:bg-blue-50"
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
          <div className="mt-10 border-t pt-6 border-gray-200">
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
          <div className="absolute left-0 top-0 bottom-0 w-80 bg-white shadow-xl p-6 overflow-y-auto z-40 animate-slide-in-left">
            <div className="mb-6">
              <h2 className="text-xl font-semibold">{title}</h2>
            </div>
            
            <nav>
              <ul className="space-y-4">
                {sections.map(section => (
                  <li key={section.id}>
                    <a 
                      href={section.href}
                      className={`block py-2 px-4 rounded-md ${section.subsections ? "mb-2" : ""} ${activeSection === section.id ? "bg-blue-100 text-blue-700 font-medium" : "text-gray-700 hover:bg-blue-50"}`}
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
                              className="block py-1 px-4 text-gray-600 hover:text-blue-700 rounded-md"
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
                <div className="mt-6 pt-6 border-t border-gray-200">
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