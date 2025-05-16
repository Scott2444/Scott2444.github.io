"use client";

import Image from "next/image";
import React from "react";
import { useState, useEffect, useRef } from "react";
import { NavBar, ContactMe, Sidebar, MobileSidebar, SidebarSection, ImageModal, VideoComponent } from "../components";
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 mt-4">
      {courses.map((course, index) => {
        const { bg, text } = getCourseColor(course.Code);
        
        return (
          <div key={index} className="flex flex-wrap items-center">
            <span className={`${bg} ${text} text-xs font-medium px-2 py-1 rounded mr-2 mb-1`}>
              {course.Code}
            </span>
            <span className="text-gray-700 text-sm sm:text-base">{course.Title}</span>
          </div>
        );
      })}
    </div>
  );
}

function SchoolCard({ 
  school, 
  index,
  setSelectedImage  // Add this prop
}: { 
  school: School, 
  index: number,
  setSelectedImage: React.Dispatch<React.SetStateAction<{ src: string; alt: string } | null>>
}) {
  const [activeTab, setActiveTab] = useState<'academics'|'activities'>('academics');
  const [expanded, setExpanded] = useState<boolean>(false);
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
      className="relative scroll-mt-24 mb-12"
    > 
      {/* Mobile Timeline Indicator with Year */}
      <div className="md:hidden flex items-center mb-4">
        <div className="w-4 h-4 rounded-full bg-white border-2 mr-3" style={{ borderColor: colors.primary }}></div>
        <div 
          className="px-3 py-1 rounded-full text-sm font-medium shadow-sm" 
          style={{ 
            background: colors.light,
            color: colors.primary,
            border: `1px solid ${colors.border}`
          }}>
          {school["Start Date"].split(" ")[1]} - {school["End Date"].split(" ")[1]}
        </div>
      </div>
      
      {/* Desktop Year indicator */}
      <div className="hidden md:flex justify-center mb-6">
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
        className="bg-white shadow-lg rounded-lg overflow-hidden border hover:shadow-xl transition-all duration-300 border-t-4 sm:border-t-8" 
        style={{ 
          borderColor: colors.border,
          borderTopColor: colors.primary
        }}
      >
        {school.Banner && (
          <div className="relative h-36 sm:h-44 md:h-52 w-full overflow-hidden">
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
              <h2 className="text-2xl sm:text-3xl font-bold text-white drop-shadow-lg text-center px-4">{school.School}</h2>
            </div>
          </div>
        )}
        
        {!school.Banner && (
          <div className="py-4 px-4 sm:py-6 sm:px-8" style={{ 
            background: `linear-gradient(to right, ${colors.primary}, ${adjustColorBrightness(colors.primary, 15)})` 
          }}>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">{school.School}</h2>
          </div>
        )}
        
        {/* Tab navigation - improved for mobile */}
        <div className="flex border-b" style={{ borderColor: colors.border }}>
          <button 
            onClick={() => setActiveTab('academics')}
            className={`flex-1 py-3 sm:py-4 px-2 sm:px-6 text-center font-medium transition-colors text-sm sm:text-base ${
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
            className={`flex-1 py-3 sm:py-4 px-2 sm:px-6 text-center font-medium transition-colors text-sm sm:text-base ${
              activeTab === 'activities' 
                ? 'border-b-2' 
                : 'hover:bg-opacity-10 hover:bg-gray-200'
            }`}
            style={{ 
              color: activeTab === 'activities' ? colors.primary : 'gray',
              borderColor: activeTab === 'activities' ? colors.primary : 'transparent'
            }}
          >
            <span className="hidden xs:inline">Activities</span>
            <span className="xs:hidden">Activities</span> ({school.Extracirriculars?.length || 0})
          </button>
        </div>
        
        {/* Content based on active tab */}
        <div className="p-4 sm:p-6">
          {activeTab === 'academics' && (
            <div className="space-y-4 sm:space-y-6">
              {/* School information */}
              <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                <div>
                  {school.Subheading && <h3 className="text-lg sm:text-xl text-gray-700 mb-2">{school.Subheading}</h3>}
                  <div className="space-y-1">
                    {school.Degree && <p className="text-gray-700 text-sm sm:text-base">{school.Degree}</p>}
                    {school.Minor && <p className="text-gray-700 text-sm sm:text-base">Minor in {school.Minor}</p>}
                    <p style={{ color: colors.primary }} className="font-medium text-sm sm:text-base">
                      GPA: {school.GPA.toFixed(2)}/4.00
                    </p>
                  </div>
                </div>
                
                <div className="mt-3 md:mt-0 md:text-right">
                  <p className="text-gray-600 text-sm sm:text-base">{school.Location}</p>
                  <p className="text-gray-500 text-xs sm:text-sm">
                    {school["Start Date"]} - {school["End Date"]}
                  </p>
                </div>
              </div>
              
              <div style={{ backgroundColor: colors.light, height: '2px' }} className="w-full"></div>
              
              {/* Course section - only show if there are courses */}
              {school["Selected Courses"] && school["Selected Courses"].length > 0 && (
                <div>
                  <h4 className="text-base sm:text-lg font-medium mb-3 sm:mb-4" style={{ color: colors.primary }}>
                    Selected Courses
                  </h4>
                  <CourseList courses={school["Selected Courses"]} />
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'activities' && (
            <div>
              <h4 className="text-base sm:text-lg font-medium mb-3 sm:mb-4" style={{ color: colors.primary }}>
                Extracurricular Activities
              </h4>
              
              {school.Extracirriculars && school.Extracirriculars.length > 0 ? (
                <div className="space-y-4 sm:space-y-6">
                  {school.Extracirriculars.map((activity, idx) => (
                    <div 
                      key={idx}
                      id={`${createSectionId(school.School)}-${createSectionId(activity.Club)}`}
                      className="scroll-mt-24"
                    >
                      <ExtracurricularCard activity={activity} schoolColor={colors.primary} setSelectedImage={setSelectedImage} />
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

function ExtracurricularCard({ 
  activity, 
  schoolColor,
  setSelectedImage  // Add this prop
}: { 
  activity: Extracurricular, 
  schoolColor: string,
  setSelectedImage: React.Dispatch<React.SetStateAction<{ src: string; alt: string } | null>>
}) {
  const [expanded, setExpanded] = useState(false);
  
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

  const hasAdditionalContent = activity.Accomplishments?.length || 
                              activity.Awards?.length || 
                              mediaContent.length || 
                              linkContent.length;

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-4 sm:mb-8 border border-gray-200 hover:shadow-xl transition-all duration-300 relative"
      style={{ borderLeft: `4px solid ${schoolColor}` }}
    >
      <div className="p-4 sm:p-6">
        
        <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3 sm:mb-4">
          <div>
            <div className="flex items-center">
              <h3 className="text-lg sm:text-xl font-semibold" style={{ color: schoolColor }}>{activity.Club}</h3>
            </div>
            {activity.Position && (
              <h4 className="text-base sm:text-lg text-gray-700">{activity.Position}</h4>
            )}
          </div>
          
          <div className="mt-1 md:mt-0 md:text-right">
            <p className="text-gray-500 text-xs sm:text-sm">
              {activity["Start Date"]} - {activity["End Date"]}
            </p>
          </div>
        </div>
        
        <p className="text-gray-600 mb-4 sm:mb-5 leading-relaxed text-sm sm:text-base">
          {activity.Description}
        </p>
        
        {/* Mobile: Show/Hide Additional Content Button */}
        {hasAdditionalContent > 0 && (
          <div className="md:hidden mb-3">
            <button
              onClick={() => setExpanded(!expanded)}
              className="w-full py-2 px-3 text-sm font-medium rounded-md flex justify-center items-center gap-2 transition-colors"
              style={{ 
                backgroundColor: getLighterColor(schoolColor), 
                color: schoolColor
              }}
            >
              {expanded ? 'Show Less' : 'Show More'} 
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="16" 
                height="16" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                className={`transition-transform ${expanded ? 'rotate-180' : ''}`}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        )}
        
        <div className={`md:block ${expanded ? 'block' : 'hidden'}`}>
          {/* Accomplishments */}
          {activity.Accomplishments && activity.Accomplishments.length > 0 && (
            <div className="mb-4 sm:mb-6">
              <h5 className="px-2 sm:px-3 py-1 rounded-md inline-block mb-2 font-medium text-sm sm:text-base" 
                style={{ backgroundColor: headingBgColor, color: headingTextColor }}>
                Accomplishments
              </h5>
              <ul className="list-disc pl-4 sm:pl-5 text-gray-600 space-y-1 sm:space-y-2 text-sm sm:text-base">
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
            <div className="mb-4 sm:mb-6">
              <h5 className="px-2 sm:px-3 py-1 rounded-md inline-block mb-2 font-medium text-sm sm:text-base"
                style={{ backgroundColor: headingBgColor, color: headingTextColor }}>
                Awards
              </h5>
              <ul className="list-disc pl-4 sm:pl-5 text-gray-600 space-y-1 text-sm sm:text-base">
                {activity.Awards.map((award, i) => (
                  <li key={i}>{award}</li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Additional Content Section */}
          {activity["Additional Content"] && activity["Additional Content"].length > 0 && (
            <div className="mt-4 sm:mt-6 pt-4" style={{ borderTop: `1px solid ${getLighterColor(schoolColor)}` }}>
              {mediaContent.length > 0 && (
                <div>
                  <h5 className="px-2 sm:px-3 py-1 rounded-md inline-block mb-2 sm:mb-3 font-medium text-sm sm:text-base"
                    style={{ backgroundColor: headingBgColor, color: headingTextColor }}>
                    Media
                  </h5>
                  {/* Improved mobile-first media grid */}
                  <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mb-6">
                    {mediaContent.map((content, i) => (
                      content.type === "image" ? (
                        <div
                          key={i}
                          className="relative w-full h-32 sm:h-40 rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-all"
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
                              Click to Enlarge
                            </span>
                          </div>
                        </div>
                      ) : content.type === "video" ? (
                        <div key={i} className="w-full h-32 sm:h-40 rounded-lg overflow-hidden border"
                          style={{ borderColor: getLighterColor(schoolColor) }}>
                          <VideoComponent src={content.src} alt={content.alt} />
                        </div>
                      ) : null
                    ))}
                  </div>
                </div>
              )}
                      
              {mediaContent.length > 0 && linkContent.length > 0 && (
                <div className="border-t my-3 sm:my-4" style={{ borderColor: getLighterColor(schoolColor) }}></div>
              )}
              
              {linkContent.length > 0 && (
                <div>
                  <h5 className="px-2 sm:px-3 py-1 rounded-md inline-block mb-2 sm:mb-3 font-medium text-sm sm:text-base"
                    style={{ backgroundColor: headingBgColor, color: headingTextColor }}>
                    Related Links
                  </h5>
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {linkContent.map((content, i) => (
                      <a 
                        key={i}
                        href={content.src} 
                        className="block px-3 sm:px-4 py-2 sm:py-3 rounded-lg hover:bg-opacity-90 transition-colors border text-sm sm:text-base"
                        style={{ 
                          backgroundColor: getLighterColor(schoolColor),
                          color: schoolColor,
                          borderColor: getLighterColor(schoolColor)
                        }}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className="flex items-center gap-1 sm:gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
    </div>
  );
}

function EducationContent({ 
  activeSection,
  setSelectedImage  // Add this prop
}: SidebarNavProps & { 
  setSelectedImage: React.Dispatch<React.SetStateAction<{ src: string; alt: string } | null>> 
}) {
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
              <SchoolCard key={index} school={school} index={index} setSelectedImage={setSelectedImage} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default function Education() {
  const [activeSection, setActiveSection] = useState("overview");  
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null);

  
  useEffect(() => {
    const handleScroll = () => {      
      const sections = ["overview", "education"];
      
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

    window.addEventListener("scroll", handleScroll);
    
    // Initial check
    setTimeout(handleScroll, 500); // Slight delay to ensure DOM is ready
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
      href={data.Overall.Resume} 
      download
      className="block w-full bg-[#4891FF] hover:bg-blue-600 text-white py-2 px-4 rounded-lg text-center transition duration-300"
    >
      Download Resume
    </a>
  );

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <NavBar />

      {selectedImage && (
        <ImageModal
          src={selectedImage.src}
          alt={selectedImage.alt}
          onClose={() => setSelectedImage(null)}
        />
      )}
      
      <div className="relative">
        {/* Background gradient */}
        <div className="absolute top-0 left-0 w-full h-48 sm:h-64 bg-gradient-to-b from-sky-100 to-white pointer-events-none" />
        
        <div className="container mx-auto px-4 sm:px-5 py-4 sm:py-6 md:py-10 flex flex-1 relative z-10">
          <Sidebar 
            title="Education"
            sections={sidebarSections}
            activeSection={activeSection}
            footerContent={resumeButton}
          />
          <EducationContent activeSection={activeSection} setSelectedImage={setSelectedImage}/>
        </div>
      </div>

      <MobileSidebar
        title="Education"
        sections={sidebarSections}
        activeSection={activeSection}
        footerContent={resumeButton}
      />

      <ContactMe />
    </div>
  );
}