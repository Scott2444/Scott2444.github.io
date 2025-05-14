"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useState, useRef, useEffect } from "react";
import { NavBar, ContactMe } from "../components";
import data from '../../public/data.json';

interface SidebarNavProps {
    activeSection: string;
}

interface Experience {
  Title: string;
  Position: string;
  Description: string;
  Location: string;
  "Start Date": string;
  "End Date": string;
  Accomplishments?: string[];
  "Additional Content"?: {
    type: "image" | "video" | "link";
    src: string;
    alt: string;
  }[];
  Skills?: string[];
  Banner?: string;
  Color?: string;
}

function VideoComponent({ src, alt }: { src: string; alt: string }) {
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

function ImageModal({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
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
          className="absolute top-4 right-4 bg-black bg-opacity-50 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-opacity-70 transition-colors"
          aria-label="Close modal"
        >
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

function ExperienceCard({ experience }: { experience: Experience }) {
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null);
  
  // Filter content by type
  const mediaContent = experience["Additional Content"]?.filter(
    content => content.type === "image" || content.type === "video"
  ) || [];
  
  const linkContent = experience["Additional Content"]?.filter(
    content => content.type === "link"
  ) || [];

  return (
    <div className={`bg-white shadow-lg rounded-lg overflow-hidden mb-8 border border-gray-200 hover:shadow-xl transition-all duration-300 ${experience.Color ? `border-l-4` : ''}`} style={{ borderLeftColor: experience.Color || 'transparent' }}>
      {/* Banner Image with Gradient Overlay */}
      {experience.Banner && (
        <div className="relative h-48 w-full overflow-hidden">
          <Image 
            src={experience.Banner}
            alt={`${experience.Title} banner`}
            fill
            style={{ objectFit: 'cover' }}
            priority
            className="z-0"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent z-10"></div>
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white via-white/90 to-transparent z-10"></div>
        </div>
      )}

      <div className="p-6">
        {/* Show modal when image is selected */}
        {selectedImage && (
          <ImageModal
            src={selectedImage.src}
            alt={selectedImage.alt}
            onClose={() => setSelectedImage(null)}
          />
        )}
        
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-800">{experience.Position}</h3>
            <h4 className="text-lg text-gray-700">{experience.Title}</h4>
          </div>
          <div className="mt-2 md:mt-0 text-right">
            <p className="text-gray-600">{experience.Location}</p>
            <p className="text-gray-500 text-sm">{experience["Start Date"]} - {experience["End Date"]}</p>
          </div>
        </div>
        
        <p className="text-gray-600 mb-4">{experience.Description}</p>
        
        {experience.Accomplishments && experience.Accomplishments.length > 0 && (
          <div className="mb-6">
            <h5 className="text-gray-800 font-medium mb-2">Accomplishments</h5>
            <ul className="list-disc pl-5 text-gray-600 space-y-1">
              {experience.Accomplishments.map((responsibility, i) => (
                <li key={i}>{responsibility}</li>
              ))}
            </ul>
          </div>
        )}
        
        {/* Additional Content Section */}
        {experience["Additional Content"] && experience["Additional Content"].length > 0 && (
          <div className="mt-6 border-t pt-4">
            {/* Media content (images and videos) */}
            {mediaContent.length > 0 && (
              <div>
                  <h5 className="text-gray-800 font-medium mb-3">Media</h5>
                  <div className="flex flex-wrap gap-4 mb-6">
                  {mediaContent.map((content, i) => (
                      content.type === "image" ? (
                      <div
                          key={i}
                          className="relative w-60 h-40 rounded-lg overflow-hidden border border-gray-200 cursor-pointer hover:shadow-lg transition-all"
                          onClick={() => setSelectedImage({ src: content.src, alt: content.alt })}
                      >
                          <Image
                          src={content.src}
                          alt={content.alt}
                          width={240}
                          height={160}
                          style={{ objectFit: 'cover' }}
                          className="w-full h-full"
                          placeholder="blur"
                          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="
                          />
                          <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-all duration-200 flex items-center justify-center">
                              <span className="opacity-0 hover:opacity-100 text-white text-sm font-medium p-2 rounded bg-black bg-opacity-60 transition-opacity">
                                  Click to enlarge
                              </span>
                          </div>
                      </div>
                      ) : content.type === "video" ? (
                      <div key={i} className="w-60 h-40 rounded-lg overflow-hidden border border-gray-200">
                          <VideoComponent src={content.src} alt={content.alt} />
                      </div>
                      ) : null
                  ))}
                  </div>
              </div>
            )}
                    
            {/* Separator between media and links (only if both exist) */}
            {mediaContent.length > 0 && linkContent.length > 0 && (
              <div className="border-t border-gray-100 my-4"></div>
            )}
            
            {/* Link content */}
            {linkContent.length > 0 && (
              <div>
                <h5 className="text-gray-800 font-medium mb-3">Related Links</h5>
                <div className="flex flex-wrap gap-3">
                  {linkContent.map((content, i) => (
                    <a 
                      key={i}
                      href={content.src} 
                      className="block px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors border border-blue-100"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                          <polyline points="15 3 21 3 21 9"/>
                          <line x1="10" y1="14" x2="21" y2="3"/>
                        </svg>
                        {content.alt}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
        
        {/* Skills section */}
        {experience.Skills && experience.Skills.length > 0 && (
          <div className="mt-6 border-t pt-4">
            <h5 className="text-gray-800 font-medium mb-3">Skills</h5>
            <div className="flex flex-wrap gap-2">
              {experience.Skills.map((skill, i) => {
                // Categorize skills by type for better visual organization
                const skillColor = 
                  skill.includes("Python") || skill.includes("C") || skill.includes("Java") || skill.includes("MATLAB") || skill.includes("SQL") ? 
                    "bg-blue-100 text-blue-700" : 
                  skill.includes("Git") || skill.includes("Linux") ? 
                    "bg-green-100 text-green-700" : 
                  skill.includes("Machine Learning") || skill.includes("TensorFlow") || skill.includes("Scikit-learn") ? 
                    "bg-purple-100 text-purple-700" :
                  skill.includes("Database") || skill.includes("Postgre") || skill.includes("Weav") ? 
                    "bg-yellow-100 text-yellow-700" :
                    "bg-gray-100 text-gray-700";
                    
                return (
                  <span 
                    key={i} 
                    className={`px-3 py-1 rounded-full text-sm font-medium ${skillColor}`}
                  >
                    {skill}
                  </span>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
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
              <h3 className="text-2xl font-semibold mb-2 text-white/90">
                Professional Experience
              </h3>
              {/* Add max-height and overflow to prevent text overlap */}
              <div className="h-[140px] overflow-hidden"> 
                <p className="text-left text-amber-50">
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
              <h3 className="text-2xl font-semibold mb-2 text-white/90">
                Personal Experience
              </h3>
              {/* Add max-height and overflow to prevent text overlap */}
              <div className="h-[140px] overflow-hidden">
                <p className="text-left text-rose-50">
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
              <h3 className="text-2xl font-semibold mb-2 text-white/90">
                Skills
              </h3>
              {/* Add max-height and overflow to prevent text overlap */}
              <div className="h-[140px] overflow-hidden">
                <p className="text-left text-indigo-50">
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
            <h2 className="text-2xl font-bold mb-8 py-3 px-6 bg-gradient-to-r from-amber-300 to-amber-500 inline-block rounded-lg shadow-sm text-white">Professional Experience</h2>
          {(data.Experience.Professional as Experience[]).map((exp, index) => (
            <ExperienceCard key={index} experience={exp} />
          ))}
          
          <hr className="border-t-2 border-gray-200" />
        </section>
        
        {/* Personal Experience Section */}
        <section id="personal" className="py-10 scroll-mt-20">
            <h2 className="text-2xl font-bold mb-8 py-3 px-6 bg-gradient-to-r from-rose-300 to-rose-500 inline-block rounded-lg shadow-sm text-white">Personal Experience</h2>
            <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 mb-8">
            <p className="text-gray-600">
              Personal experience content will go here...
            </p>
          </div>
          <hr className="border-t-2 border-gray-200" />
        </section>
        
        {/* Skills Section */}
        <section id="skills" className="py-10 scroll-mt-20">
            <h2 className="text-2xl font-bold mb-8 py-3 px-6 bg-gradient-to-r from-indigo-300 to-indigo-500 inline-block rounded-lg shadow-sm text-white">Skills</h2>
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