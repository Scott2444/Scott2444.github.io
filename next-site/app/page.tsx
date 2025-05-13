import Image from "next/image";
import Link from "next/link";

export function NavBar() {
  return (
    <nav className="py-5 px-4 md:px-8 bg-sky-100" id="topofpage">
      <div className="container mx-auto flex justify-between items-center">
        <div className="ml-0 md:ml-20">
          <Link href="/" className="text-[#141619] no-underline">
            <h2 className="text-2xl font-medium">Scott Haakenson</h2>
          </Link>
        </div>
        <div>
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
            <li className="ml-2 md:ml-4 mr-0 md:mr-20">
              <Link href="#contact" className="px-5 py-2.5 block font-semibold bg-neutral-300 rounded-xl transition-all duration-500 hover:bg-neutral-400">
                <h4 className="text-base md:text-lg font-medium">Contact</h4>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export function HeroSection() {
  return (
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
      
      <div className="w-full md:w-2/3 h-96 md:h-[600px] relative">
        <Image 
          src="/images/Intro Picture.png" 
          alt="Picture of Scott Haakenson" 
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          style={{
            objectFit: 'contain',  // Changed from 'cover' to 'contain'
            objectPosition: 'right center' // Align to right side
          }}
          priority
        />
      </div>
    </section>
  );
}


export default function Home() {
  return (
    <>
      <NavBar />
      <HeroSection />
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <h1 className="text-4xl font-bold">Hello, world!</h1>
        <Image
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </main>
    </>
  );
}
