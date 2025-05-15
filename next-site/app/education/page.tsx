"use client";

import Image from "next/image";
import React from "react";
import { useState, useEffect, useRef } from "react";
import { NavBar, ContactMe, Sidebar, MobileSidebar, SidebarSection } from "../components";
import data from '../../public/data.json';

interface SidebarNavProps {
  activeSection: string;
}

interface School {
  School: string;
  Subheading?: string;
  Degree?: string;
  Minor?: string;
  GPA: number;
  "Start Date": string;
  "End Date": string;
  Location: string;
  "Selected Courses"?: { Code: string; Title: string }[];
  Extracirriculars: Extracurricular[];
  Banner?: string;
  Colors?: Colors;
}

interface Extracurricular {
  Club: string;
  Position?: string;
  "Start Date": string;
  "End Date": string;
  Description: string;
  Accomplishments?: string[];
  Awards?: string[];
  "Additional Content"?: {
    type: "image" | "video" | "link";
    src: string;
    alt: string;
  }[];
}

interface Colors {
  primary: string;
  light: string;
  border: string;
}

// Helper function to adjust color brightness
function adjustColorBrightness(hex: string, percent: number) {
  // Remove the # if present
  hex = hex.replace(/^#/, '');
  
  // Parse the hex string
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  
  // Increase brightness
  const brightenValue = percent / 100;
  const newR = Math.min(255, r + (255 - r) * brightenValue);
  const newG = Math.min(255, g + (255 - g) * brightenValue);
  const newB = Math.min(255, b + (255 - b) * brightenValue);
  
  // Convert back to hex
  const brighterHex = `#${Math.round(newR).toString(16).padStart(2, '0')}${Math.round(newG).toString(16).padStart(2, '0')}${Math.round(newB).toString(16).padStart(2, '0')}`;
  
  return brighterHex;
}

function ImageModal({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  const modalRef = useRef<HTMLDivElement>(null);
  
  // Close when clicking outside the image
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === modalRef.current) {
      onClose();
    }
  };

  // Close on escape key
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleEscKey);
    return () => window.removeEventListener('keydown', handleEscKey);
  }, [onClose]);

  return (
    <div 
      ref={modalRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
      onClick={handleBackdropClick}
    >
      <div className="relative max-w-4xl max-h-[90vh] overflow-hidden">
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 text-white bg-black/50 rounded-full p-2 hover:bg-black/80 transition-colors"
          aria-label="Close modal"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 18L18 6M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        
        <Image
          src={src}
          alt={alt}
          width={1200}
          height={800}
          style={{ objectFit: 'contain', maxHeight: '85vh' }}
          className="rounded-lg"
        />
      </div>
    </div>
  );
}

// Video component for embedding videos
function VideoComponent({ src, alt }: { src: string; alt: string }) {
  // Handle YouTube URLs
  if (src.includes('youtube.com') || src.includes('youtu.be')) {
    // Extract video ID
    let videoId = '';
    if (src.includes('youtube.com/watch?v=')) {
      videoId = src.split('v=')[1].split('&')[0];
    } else if (src.includes('youtu.be/')) {
      videoId = src.split('youtu.be/')[1].split('?')[0];
    }
    
    if (videoId) {
      return (
        <div className="relative w-full pt-[56.25%]">
          <iframe
            className="absolute inset-0 w-full h-full rounded-lg"
            src={`https://www.youtube.com/embed/${videoId}`}
            title={alt}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      );
    }
  }
  
  // For other video formats, use HTML5 video
  return (
    <video
      controls
      className="w-full h-auto rounded-lg"
      src={src}
      title={alt}
    >
      Your browser does not support the video tag.
    </video>
  );
}

function CourseList({ courses }: { courses?: { Code: string; Title: string }[] }) {
  if (!courses || courses.length === 0) return null;
  
  // Function to determine course category color based on course code
  const getCourseColor = (code: string) => {
    const prefix = code.split(' ')[0];
    
    // Color mapping for different course subjects
    const colorMap: Record<string, { bg: string, text: string }> = {
      'MTH': { bg: 'bg-blue-100', text: 'text-blue-700' },
      'CSE': { bg: 'bg-emerald-100', text: 'text-emerald-700' },
      'BUS': { bg: 'bg-amber-100', text: 'text-amber-700' },
      'COM': { bg: 'bg-purple-100', text: 'text-purple-700' },
      'ENG': { bg: 'bg-rose-100', text: 'text-rose-700' },
      'PHY': { bg: 'bg-cyan-100', text: 'text-cyan-700' },
      'CHEM': { bg: 'bg-teal-100', text: 'text-teal-700' }
    };
    
    return colorMap[prefix] || { bg: 'bg-gray-100', text: 'text-gray-700' };
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 mt-4">
      {courses.map((course, index) => {
        const { bg, text } = getCourseColor(course.Code);
        
        return (
          <div key={index} className="flex items-center">
            <span className={`${bg} ${text} text-xs font-medium px-2 py-1 rounded mr-2`}>
              {course.Code}
            </span>
            <span className="text-gray-700">{course.Title}</span>
          </div>
        );
      })}
    </div>
  );
}

function SchoolCard({ school, index }: { school: School, index: number }) {
  const [activeTab, setActiveTab] = useState<'academics'|'activities'>('academics');
  const createSectionId = (name: string) => {
    return name?.toLowerCase().replace(/[^a-z0-9]/g, '-') || '';
  };
  
  // Use colors directly from the JSON data with fallbacks
  const colors = {
    primary: school.Colors?.primary || '#3B82F6',    // default: blue-500
    light: school.Colors?.light || '#EFF6FF',        // default: blue-50
    border: school.Colors?.border || '#BFDBFE'       // default: blue-200
  };
  
  return (
    <div 
      id={createSectionId(school.School)}
      className="relative scroll-mt-24 mb-16"
    > 
      {/* Year indicator */}
      <div className="flex justify-center mb-6">
        <div className="px-6 py-2 rounded-full font-medium shadow-sm" 
          style={{ 
            background: colors.light,
            color: colors.primary,
            border: `1px solid ${colors.border}`
          }}>
          {school["Start Date"].split(" ")[1]} - {school["End Date"].split(" ")[1]}
        </div>
      </div>
      
      <div 
        className="bg-white shadow-lg rounded-lg overflow-hidden border hover:shadow-xl transition-all duration-300 border-t-8" 
        style={{ 
          borderColor: colors.border,
          borderTopColor: colors.primary
        }}
      >
        {school.Banner && (
          <div className="relative h-52 w-full overflow-hidden">
            <Image
              src={school.Banner}
              alt={`${school.School} banner`}
              fill
              style={{ objectFit: 'cover' }}
              priority
              className="z-0"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent z-10"></div>
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <h2 className="text-3xl font-bold text-white drop-shadow-lg text-center px-4">{school.School}</h2>
            </div>
          </div>
        )}
        
        {!school.Banner && (
          <div className="py-6 px-8" style={{ 
            background: `linear-gradient(to right, ${colors.primary}, ${adjustColorBrightness(colors.primary, 15)})` 
          }}>
            <h2 className="text-2xl md:text-3xl font-bold text-white">{school.School}</h2>
          </div>
        )}
        
        {/* Tab navigation */}
        <div className="flex border-b" style={{ borderColor: colors.border }}>
          <button 
            onClick={() => setActiveTab('academics')}
            className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
              activeTab === 'academics' 
                ? 'border-b-2' 
                : 'hover:bg-opacity-10 hover:bg-gray-200'
            }`}
            style={{ 
              color: activeTab === 'academics' ? colors.primary : 'gray',
              borderColor: activeTab === 'academics' ? colors.primary : 'transparent'
            }}
          >
            Academics
          </button>
          <button 
            onClick={() => setActiveTab('activities')}
            className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
              activeTab === 'activities' 
                ? 'border-b-2' 
                : 'hover:bg-opacity-10 hover:bg-gray-200'
            }`}
            style={{ 
              color: activeTab === 'activities' ? colors.primary : 'gray',
              borderColor: activeTab === 'activities' ? colors.primary : 'transparent'
            }}
          >
            Activities ({school.Extracirriculars?.length || 0})
          </button>
        </div>
        
        {/* Content based on active tab */}
        <div className="p-6">
          {activeTab === 'academics' && (
            <div className="space-y-6">
              {/* School information */}
              <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                <div>
                  {school.Subheading && <h3 className="text-xl text-gray-700 mb-2">{school.Subheading}</h3>}
                  <div className="space-y-1">
                    {school.Degree && <p className="text-gray-700">{school.Degree}</p>}
                    {school.Minor && <p className="text-gray-700">Minor in {school.Minor}</p>}
                    <p style={{ color: colors.primary }} className="font-medium">
                      GPA: {school.GPA.toFixed(2)}/4.00
                    </p>
                  </div>
                </div>
                
                <div className="mt-4 md:mt-0 md:text-right">
                  <p className="text-gray-600">{school.Location}</p>
                  <p className="text-gray-500 text-sm">
                    {school["Start Date"]} - {school["End Date"]}
                  </p>
                </div>
              </div>
              
              <div style={{ backgroundColor: colors.light, height: '2px' }} className="w-full"></div>
              
              {/* Course section - only show if there are courses */}
              {school["Selected Courses"] && school["Selected Courses"].length > 0 && (
                <div>
                  <h4 className="text-lg font-medium mb-4" style={{ color: colors.primary }}>Selected Courses</h4>
                  <CourseList courses={school["Selected Courses"]} />
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'activities' && (
            <div>
              <h4 className="text-lg font-medium mb-4" style={{ color: colors.primary }}>Extracurricular Activities</h4>
              
              {school.Extracirriculars && school.Extracirriculars.length > 0 ? (
                <div className="space-y-6">
                  {school.Extracirriculars.map((activity, idx) => (
                    <div 
                      key={idx}
                      id={`${createSectionId(school.School)}-${createSectionId(activity.Club)}`}
                      className="scroll-mt-24"
                    >
                      <ExtracurricularCard activity={activity} schoolColor={colors.primary} />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 italic">No activities listed for this school.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ExtracurricularCard({ activity, schoolColor }: { activity: Extracurricular, schoolColor: string }) {
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null);
  
  // Filter content by type
  const mediaContent = activity["Additional Content"]?.filter(
    content => content.type === "image" || content.type === "video"
  ) || [];
  
  const linkContent = activity["Additional Content"]?.filter(
    content => content.type === "link"
  ) || [];

  // Generate lighter version of school color for heading backgrounds
  const getLighterColor = (hex: string) => {
    return adjustColorBrightness(hex, 85); // Make it 85% lighter
  };

  const headingBgColor = getLighterColor(schoolColor);
  const headingTextColor = schoolColor;

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8 border border-gray-200 hover:shadow-xl transition-all duration-300 relative"
      style={{ borderLeft: `4px solid ${schoolColor}` }}
    >
      <div className="p-6">
        {selectedImage && (
          <ImageModal
            src={selectedImage.src}
            alt={selectedImage.alt}
            onClose={() => setSelectedImage(null)}
          />
        )}
        
        <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
          <div>
            <div className="flex items-center">
              <h3 className="text-xl font-semibold" style={{ color: schoolColor }}>{activity.Club}</h3>
            </div>
            {activity.Position && (
              <h4 className="text-lg text-gray-700">{activity.Position}</h4>
            )}
          </div>
          
          <div className="mt-2 md:mt-0 md:text-right">
            <p className="text-gray-500 text-sm">
              {activity["Start Date"]} - {activity["End Date"]}
            </p>
          </div>
        </div>
        
        <p className="text-gray-600 mb-5 leading-relaxed">
          {activity.Description}
        </p>
        
        {/* Accomplishments */}
        {activity.Accomplishments && activity.Accomplishments.length > 0 && (
          <div className="mb-6">
            <h5 className="px-3 py-1 rounded-md inline-block mb-2 font-medium" 
              style={{ backgroundColor: headingBgColor, color: headingTextColor }}>
              Accomplishments
            </h5>
            <ul className="list-disc pl-5 text-gray-600 space-y-2">
              {activity.Accomplishments.map((accomplishment, i) => (
                <li key={i} className="leading-relaxed">
                  {accomplishment}
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {/* Awards */}
        {activity.Awards && activity.Awards.length > 0 && (
          <div className="mb-6">
            <h5 className="px-3 py-1 rounded-md inline-block mb-2 font-medium"
              style={{ backgroundColor: headingBgColor, color: headingTextColor }}>
              Awards
            </h5>
            <ul className="list-disc pl-5 text-gray-600 space-y-1">
              {activity.Awards.map((award, i) => (
                <li key={i}>{award}</li>
              ))}
            </ul>
          </div>
        )}
        
        {/* Additional Content Section */}
        {activity["Additional Content"] && activity["Additional Content"].length > 0 && (
          <div className="mt-6 pt-4" style={{ borderTop: `1px solid ${getLighterColor(schoolColor)}` }}>
            {mediaContent.length > 0 && (
              <div>
                <h5 className="px-3 py-1 rounded-md inline-block mb-3 font-medium"
                  style={{ backgroundColor: headingBgColor, color: headingTextColor }}>
                  Media
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-4 mb-8 md:mb-6">
                  {mediaContent.map((content, i) => (
                    content.type === "image" ? (
                      <div
                        key={i}
                        className="relative w-full h-40 rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-all"
                        onClick={() => setSelectedImage({ src: content.src, alt: content.alt })}
                        style={{ borderColor: getLighterColor(schoolColor) }}
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
                      <div key={i} className="w-full h-40 rounded-lg overflow-hidden border"
                        style={{ borderColor: getLighterColor(schoolColor) }}>
                        <VideoComponent src={content.src} alt={content.alt} />
                      </div>
                    ) : null
                  ))}
                </div>
              </div>
            )}
                    
            {mediaContent.length > 0 && linkContent.length > 0 && (
              <div className="border-t my-4" style={{ borderColor: getLighterColor(schoolColor) }}></div>
            )}
            
            {linkContent.length > 0 && (
              <div>
                <h5 className="px-3 py-1 rounded-md inline-block mb-3 font-medium"
                  style={{ backgroundColor: headingBgColor, color: headingTextColor }}>
                  Related Links
                </h5>
                <div className="flex flex-wrap gap-3">
                  {linkContent.map((content, i) => (
                    <a 
                      key={i}
                      href={content.src} 
                      className="block px-4 py-3 rounded-lg hover:bg-opacity-90 transition-colors border"
                      style={{ 
                        backgroundColor: getLighterColor(schoolColor),
                        color: schoolColor,
                        borderColor: getLighterColor(schoolColor)
                      }}
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
      </div>
    </div>
  );
}

function EducationContent({ activeSection }: SidebarNavProps) {
  // Create helper function for section IDs
  const createSectionId = (name: string) => {
    return name?.toLowerCase().replace(/[^a-z0-9]/g, '-') || '';
  };
  
  return (
    <div className="flex-1 md:pl-6 relative">
      <div className="relative z-10 pb-10">
        {/* Overview Section with enhanced colors */}
        <section className="md:mb-16 mb-12 pt-8 md:pt-6" id="overview">
          <h1 className="text-2xl md:text-4xl font-bold mb-8 text-[#141619] leading-tight">
            Education and Extracurricular Activities
          </h1>
          
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg mb-10">
            <p className="text-lg text-gray-700 leading-relaxed">
              My academic journey has shaped my technical foundation, while extracurricular activities have developed my leadership, teamwork, and specialized skills. Below is a timeline of my educational experience and the activities that have contributed to my growth.
            </p>
          </div>
          
          <hr className="border-t-2 border-gray-200 mb-10" />
        </section>
        
        {/* Education Timeline Section */}
        <section id="education" className="pt-4">
          {/* Timeline of schools */}
          <div className="relative">
            {/* Vertical timeline line - with gradient */}
            {data.Education.length > 1 && (
              <div className="hidden md:block absolute left-1/2 top-8 bottom-0 w-0.5 bg-gray-300 -z-10"></div>
            )}
            
            {/* Schools */}
            {(data.Education as School[]).map((school, index) => (
              <SchoolCard key={index} school={school} index={index} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default function Education() {
  const [activeSection, setActiveSection] = useState("overview");

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      // Main sections first (overview, education)
      const mainSections = document.querySelectorAll("section[id]");
      let currentSection = "";
      
      mainSections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop <= 100) {
          currentSection = section.getAttribute("id") || "";
        }
      });
      
      // Then check for school subsections
      if (currentSection === "education") {
        const schoolSections = document.querySelectorAll("[id^='michigan-state-university'],[id^='novi-high-school']");
        schoolSections.forEach((section) => {
          const sectionTop = section.getBoundingClientRect().top;
          if (sectionTop <= 100) {
            currentSection = section.getAttribute("id") || "";
          }
        });
      }
      
      if (currentSection && currentSection !== activeSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSection]);

  // Create URL-friendly ID function
  const createSectionId = (title: string) => {
    return title?.toLowerCase().replace(/[^a-z0-9]/g, '-') || '';
  };

  // Build sidebar sections dynamically from data
  const sidebarSections: SidebarSection[] = [
    {
      id: "overview",
      title: "Overview",
      href: "#overview"
    },
    {
      id: "education",
      title: "Education Timeline",
      href: "#education",
      subsections: data.Education.map(school => {
        const schoolId = createSectionId(school.School);
        return {
          id: schoolId,
          title: school.School,
          href: `#${schoolId}`
        };
      })
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
            title="Education"
            sections={sidebarSections}
            activeSection={activeSection}
            footerContent={resumeButton}
          />
          <EducationContent activeSection={activeSection} />
        </div>
      </div>

      {/* Mobile sidebar will be implemented later */}

      <ContactMe />
    </div>
  );
}