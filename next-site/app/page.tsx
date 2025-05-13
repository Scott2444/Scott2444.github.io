"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

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
    <section className="w-full bg-sky-100">
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
    </section>
  );
}

/**
<section className="w-full flex flex-col md:flex-row items-center bg-sky-100">
      <div className="w-full md:fit py-16 px-4 md:px-12 lg:px-20 flex flex-col justify-center">
        <div className="max-w-lg mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Hi, I&apos;m Scott
          </h1>
          <p className="text-med md:text-xl text-gray-700 mb-8">
            I&apos;m currently a software engineering student at Michigan State University. I&apos;m passionate about creating innovative products that push the bounds of what is possible.
          </p>
        </div>
      </div>
      
      <div className="hidden md:block md:w-2/3 h-96 md:h-[600px] relative">
        <Image 
          src="/images/Intro Picture.png" 
          alt="Picture of Scott Haakenson" 
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          style={{
            objectFit: 'contain',
            objectPosition: 'right center'
          }}
          priority
        />
      </div>
    </section>
 */

export default function Home() {
  return (
    <>
      <NavBar />
      <HeroSection />
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
      </main>
    </>
  );
}
