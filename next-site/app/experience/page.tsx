"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useState, useRef, useEffect } from "react";
import { NavBar, ContactMe, Sidebar, MobileSidebar, SidebarSection } from "../components";
import data from '../../public/data.json';

interface SidebarNavProps {
    activeSection: string;
}

interface Experience {
  Title: string;
  Subheading?: string;
  Description?: string;
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
  Awards?: string[];
}

interface Skill {
    Title: string;
    Subheading: string;
    Description: string;
    Expertise: number;  
    Logo: string;
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

// Function to categorize a skill based on data.json
function categorizeSkill(skillName: string): string {
  // Case-insensitive comparison
  const skillLower = skillName.toLowerCase();
  
  // Check if this skill is in the Languages list
  const isLanguage = data.Experience.Skills?.Languages?.some(
    lang => lang.Title.toLowerCase() === skillLower
  );
  
  if (isLanguage) {
    return "bg-blue-100 text-blue-700"; // Blue for programming languages
  }
  
  // Check if this skill is in the Proficiencies list
  const isProficiency = data.Experience.Skills?.Proficiencies?.some(
    prof => prof.Title.toLowerCase() === skillLower
  );
  
  if (isProficiency) {
    return "bg-green-100 text-green-700"; // Green for technical proficiencies
  }
  
  // If not found in either list, return gray
  return "bg-gray-100 text-gray-700";
}

function ExperienceCard({ experience }: { experience: Experience }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null);
  
  // Filter content by type
  const mediaContent = experience["Additional Content"]?.filter(
    content => content.type === "image" || content.type === "video"
  ) || [];
  
  const linkContent = experience["Additional Content"]?.filter(
    content => content.type === "link"
  ) || [];

  // Check if there's expandable content
  const hasExpandableContent = 
    (experience.Accomplishments && experience.Accomplishments.length > 0) ||
    (experience["Additional Content"] && experience["Additional Content"].length > 0) ||
    (experience.Skills && experience.Skills.length > 0);

  return (
    <div 
      className="bg-white shadow-lg rounded-lg overflow-hidden mb-8 md:mb-12 border border-gray-200 hover:shadow-xl transition-all duration-300 border-l-4" 
      style={{ borderLeftColor: experience.Color || '#374151' }}
    >
      {experience.Banner && (
        <div className="relative h-36 md:h-48 w-full overflow-hidden">
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

      <div className="p-5 md:p-6">
        {selectedImage && (
          <ImageModal
            src={selectedImage.src}
            alt={selectedImage.alt}
            onClose={() => setSelectedImage(null)}
          />
        )}
        
        {/* Basic information - always visible */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-5">
          <div>
            <h3 className="text-xl font-semibold text-gray-800">{experience.Title}</h3>
            <h4 className="text-lg text-gray-700">{experience.Subheading}</h4>
          </div>
          <div className="mt-2 md:mt-0 md:text-right">
            <p className="text-gray-600">{experience.Location}</p>
            <p className="text-gray-500 text-sm">
              {experience["Start Date"]}
              {experience["End Date"] ? ` - ${experience["End Date"]}` : ""}
            </p>
          </div>
        </div>
        
        <p className="text-gray-600 mb-5 leading-relaxed">
          {experience.Description}
        </p>

        {/* Awards section - Keep visible as it's usually short */}
        {experience.Awards && experience.Awards.length > 0 && (
          <div className="mb-6">
            <h5 className="text-gray-800 font-medium mb-2">Awards</h5>
            <ul className="list-disc pl-5 text-gray-600 space-y-1">
              {experience.Awards.map((award, i) => (
                <li key={i}>{award}</li>
              ))}
            </ul>
          </div>
        )}
        
        {/* Mobile-only toggle button */}
        {hasExpandableContent && (
          <div className="md:hidden my-4">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-full py-3 px-4 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-md flex items-center justify-center transition-colors border border-gray-200"
              aria-expanded={isExpanded}
            >
              <span className="mr-2">{isExpanded ? "Show Less" : "Show More"}</span>
              {isExpanded ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          </div>
        )}
        
        {/* Expandable content - conditionally rendered on mobile, always visible on desktop */}
        <div 
          className={`
            ${isExpanded 
              ? "max-h-[5000px] opacity-100 visible pointer-events-auto" 
              : "max-h-0 opacity-0 invisible pointer-events-none"
            } 
            md:max-h-none md:opacity-100 md:visible md:pointer-events-auto
            overflow-hidden transition-all duration-500 ease-in-out
          `}
        >
          {/* Accomplishments */}
          {experience.Accomplishments && experience.Accomplishments.length > 0 && (
            <div className="mb-6">
              <h5 className="text-gray-800 font-medium mb-2">Accomplishments</h5>
              <ul className="list-disc pl-5 text-gray-600 space-y-2">
                {experience.Accomplishments.map((responsibility, i) => (
                  <li key={i} className="leading-relaxed">
                    {responsibility}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Additional Content Section */}
          {experience["Additional Content"] && experience["Additional Content"].length > 0 && (
            <div className="mt-6 border-t pt-4">
              {mediaContent.length > 0 && (
                <div>
                  <h5 className="text-gray-800 font-medium mb-3">Media</h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-4 mb-8 md:mb-6">
                    {mediaContent.map((content, i) => (
                      content.type === "image" ? (
                        <div
                          key={i}
                          className="relative w-full h-40 rounded-lg overflow-hidden border border-gray-200 cursor-pointer hover:shadow-lg transition-all"
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
                        <div key={i} className="w-full h-40 rounded-lg overflow-hidden border border-gray-200">
                          <VideoComponent src={content.src} alt={content.alt} />
                        </div>
                      ) : null
                    ))}
                  </div>
                </div>
              )}
                    
              {mediaContent.length > 0 && linkContent.length > 0 && (
                <div className="border-t border-gray-100 my-4"></div>
              )}
            
              {linkContent.length > 0 && (
                <div>
                  <h5 className="text-gray-800 font-medium mb-3">Related Links</h5>
                  <div className="flex flex-wrap gap-3">
                    {linkContent.map((content, i) => (
                      <a 
                        key={i}
                        href={content.src} 
                        className="block px-4 py-3 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors border border-blue-100"
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
                {experience.Skills
                  .sort((a, b) => {
                    const getCategoryPriority = (skill: string) => {
                      const skillLower = skill.toLowerCase();
                      const isLanguage = data.Experience.Skills?.Languages?.some(
                        lang => lang.Title.toLowerCase() === skillLower
                      );
                      if (isLanguage) return 1;
                      
                      const isProficiency = data.Experience.Skills?.Proficiencies?.some(
                        prof => prof.Title.toLowerCase() === skillLower
                      );
                      if (isProficiency) return 2;
                      
                      return 3;
                    };
                    
                    return getCategoryPriority(a) - getCategoryPriority(b);
                  })
                  .map((skill, i) => (
                    <span 
                      key={i} 
                      className={`px-3 py-2 rounded-full text-sm font-medium mb-1 inline-block ${categorizeSkill(skill)}`}
                    >
                      {skill}
                    </span>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SkillCard({ skill }: { skill: Skill }) {
  const [imageError, setImageError] = useState(false);
  
  // No imageLoaded state - simplify the approach
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 relative h-[280px] hover:shadow-xl transition-all overflow-hidden">
      <h3 className="text-lg font-semibold text-gray-800 relative z-10">{skill.Title}</h3>
      <h5 className="text-sm text-gray-600 mb-2 relative z-10">{skill.Subheading}</h5>
      
      <div className="h-[120px] overflow-hidden relative z-10">
        <p className="text-gray-600 text-sm">
          {skill.Description}
        </p>
      </div>
      
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-2xl whitespace-nowrap z-10">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={`${i < skill.Expertise ? "fa-solid fa-star text-amber-400" : "fa-regular fa-star text-gray-300"} px-1`}></span>
        ))}
      </div>
      
      {!imageError && (
        <div className="absolute inset-0 flex items-center justify-center z-0 opacity-25">
          <img
            src={skill.Logo}
            width="160"
            height="160"
            style={{ objectFit: 'contain' }}
            className="w-40 h-40"
            alt=""
            onError={() => setImageError(true)}
          />
        </div>
      )}
    </div>
  );
}

export function ExperienceContent({activeSection}: SidebarNavProps ) {
    const [languagesStarFilter, setLanguagesStarFilter] = useState(2); // Default to 2 stars
    const [proficienciesStarFilter, setProficienciesStarFilter] = useState(2); // Default to 2 stars

    const createSectionId = (position: string | undefined) => {
        if (!position) return '';
        return position.toLowerCase().replace(/[^a-z0-9]/g, '-');
    };

    // Filter skills based on star rating
    const filteredLanguages = data.Experience.Skills?.Languages?.filter(
      skill => skill.Expertise >= languagesStarFilter
    ).sort((a, b) => b.Expertise - a.Expertise);
    
    const filteredProficiencies = data.Experience.Skills?.Proficiencies?.filter(
      skill => skill.Expertise >= proficienciesStarFilter
    ).sort((a, b) => b.Expertise - a.Expertise);
    
    // Star filter UI component
    const StarFilter = ({ 
      selectedStars, 
      onChange,
      label = "Filter by skill level:"
    }: { 
      selectedStars: number; 
      onChange: (stars: number) => void;
      label?: string;
    }) => (
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center gap-3">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((stars) => (
            <button
              key={stars}
              className={`p-1.5 rounded-full transition-colors ${
                stars <= selectedStars 
                  ? "bg-amber-100 text-amber-500" 
                  : "bg-gray-100 text-gray-400 hover:bg-gray-200"
              }`}
              onClick={() => onChange(stars)}
              aria-pressed={stars <= selectedStars}
              title={`${stars} ${stars === 1 ? 'star' : 'stars'} or higher`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </button>
          ))}
        </div>
        <span className="text-sm text-gray-500">
          Showing {selectedStars === 1 ? 'all' : `${selectedStars}+ star`} skills
        </span>
        {selectedStars > 1 && (
          <button 
            onClick={() => onChange(1)} 
            className="text-blue-600 text-sm hover:underline"
          >
            Show all
          </button>
        )}
      </div>
    );

  return (
    <div className="flex-1 md:pl-6 relative">
      {/* Content with relative positioning to appear above the gradient */}
      <div className="relative z-10 pb-10">
        {/* Overview Section */}
        <section className="md:mb-16 mb-12 pt-8 md:pt-6" id="overview">
          <h1 className="text-2xl md:text-4xl font-bold mb-8 text-[#141619] leading-tight">
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
        <section id="professional" className="pt-12 md:pt-10 scroll-mt-20">
          <h2 className="text-2xl font-bold mb-10 md:mb-8 py-3 px-6 bg-gradient-to-r from-amber-300 to-amber-500 inline-block rounded-lg shadow-sm text-white">
            Professional Experience
          </h2>
            {(data.Experience.Professional as Experience[]).map((exp, index) => (
                <div key={index} id={createSectionId(exp.Title)} className="scroll-mt-24">
                    <ExperienceCard experience={exp} />
                </div>
            ))}
            <hr className="border-t-2 border-gray-200" />
        </section>
        
        {/* Personal Experience Section */}
        <section id="personal" className="pt-10 scroll-mt-20">
            <h2 className="text-2xl font-bold mb-10 md:mb-8 py-3 px-6 bg-gradient-to-r from-rose-300 to-rose-500 inline-block rounded-lg shadow-sm text-white">
              Personal Experience
            </h2>
            {(data.Experience.Personal as Experience[]).map((exp, index) => (
                <div key={index} id={createSectionId(exp.Title)} className="scroll-mt-24">
                    <ExperienceCard experience={exp} />
                </div>
            ))}
            <hr className="border-t-2 border-gray-200" />
        </section>
        
        {/* Skills Section */}
          <section id="skills" className="pt-10 scroll-mt-20">
            <h2 className="text-2xl font-bold mb-10 md:mb-8 py-3 px-6 bg-gradient-to-r from-indigo-300 to-indigo-500 inline-block rounded-lg shadow-sm text-white">
              Skills
            </h2>
            
            {/* Programming Languages Section */}
            <div id="programming-languages" className="mb-8 scroll-mt-24">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-5">
                <h3 className="text-xl font-semibold text-gray-800">Programming Languages</h3>
              </div>
              
              {/* Star Filter for Languages */}
              <StarFilter 
                selectedStars={languagesStarFilter} 
                onChange={setLanguagesStarFilter} 
              />
              
              {filteredLanguages && filteredLanguages.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
                  {filteredLanguages.map((skill, index) => (
                    <SkillCard key={index} skill={skill} />
                  ))}
                </div>
              ) : (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                  <p className="text-amber-700">
                    No programming languages match your filter. <button onClick={() => setLanguagesStarFilter(1)} className="underline">Show all</button>
                  </p>
                </div>
              )}
            </div>

            {/* Technical Proficiencies Section */}
            <div id="technical-proficiencies" className="scroll-mt-24">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-5">
                <h3 className="text-xl font-semibold text-gray-800">Technical Proficiencies</h3>
              </div>
              
              {/* Star Filter for Proficiencies */}
              <StarFilter 
                selectedStars={proficienciesStarFilter} 
                onChange={setProficienciesStarFilter} 
              />
              
              {filteredProficiencies && filteredProficiencies.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filteredProficiencies.map((skill, index) => (
                    <SkillCard key={index} skill={skill} />
                  ))}
                </div>
              ) : (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <p className="text-amber-700">
                    No technical proficiencies match your filter. <button onClick={() => setProficienciesStarFilter(1)} className="underline">Show all</button>
                  </p>
                </div>
              )}
            </div>
          </section>
      </div>
    </div>
  );
}

export default function Experience() {
  const [activeSection, setActiveSection] = useState("overview");  

  useEffect(() => {
    const handleScroll = () => {      
      const sections = ["overview", "professional", "personal", "skills"];
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Change the active section if the viewport is within the section's top and bottom
          if (rect.top <= 200 && rect.bottom > 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    console.warn("Adding scroll event listener");
    window.addEventListener("scroll", handleScroll);
    
    // Initial check
    setTimeout(handleScroll, 500); // Slight delay to ensure DOM is ready
    
    return () => {
      console.warn("Removing scroll event listener");
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Create URL-friendly ID function (keep this existing function)
  const createSectionId = (title: string) => {
    return title?.toLowerCase().replace(/[^a-z0-9]/g, '-') || '';
  };

  // Define sidebar sections for Experience page
  const sidebarSections: SidebarSection[] = [
    {
      id: "overview",
      title: "Overview",
      href: "#overview"
    },
    {
      id: "professional",
      title: "Professional Experience",
      href: "#professional",
      subsections: (data.Experience.Professional as Experience[]).map(exp => ({
        id: createSectionId(exp.Title),
        title: exp.Title,
        href: `#${createSectionId(exp.Title)}`
      }))
    },
    {
      id: "personal",
      title: "Personal Experience",
      href: "#personal",
      subsections: (data.Experience.Personal as Experience[]).map(exp => ({
        id: createSectionId(exp.Title),
        title: exp.Title,
        href: `#${createSectionId(exp.Title)}`
      }))
    },
    {
      id: "skills",
      title: "Skills",
      href: "#skills",
      subsections: [
        {
          id: "programming-languages",
          title: "Programming Languages",
          href: "#programming-languages"
        },
        {
          id: "technical-proficiencies",
          title: "Technical Proficiencies",
          href: "#technical-proficiencies"
        }
      ]
    }
  ];

  // Resume download button for the sidebar footer
  const resumeButton = (
    <a 
      href="College Resume - Third Year.pdf" 
      download
      className="block w-full bg-[#4891FF] hover:bg-blue-600 text-white py-2 px-4 rounded-lg text-center transition duration-300"
    >
      Download Resume
    </a>
  );

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <NavBar />
      
      <div className="relative">
        {/* Background gradient */}
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-sky-100 to-white pointer-events-none" />
        
        <div className="container mx-auto px-5 md:px-4 py-6 md:py-10 flex flex-1 relative z-10">
          <Sidebar 
            title="Experience"
            sections={sidebarSections}
            activeSection={activeSection}
            footerContent={resumeButton}
          />
          <ExperienceContent activeSection={activeSection} />
        </div>
      </div>

      <MobileSidebar
        title="Experience"
        sections={sidebarSections}
        activeSection={activeSection}
        footerContent={resumeButton}
      />

      <ContactMe />
    </div>
  );
}