import Image from 'next/image';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Experience from '../components/Experience';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Education from '../components/Education';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white">
      <div className="flex flex-col lg:flex-row">
        {/* Left Side (Scrollable Content) - Order 2 on mobile, 1 on desktop */}
        <div className="w-full lg:w-3/5 xl:w-2/3 order-2 lg:order-1">
          <Navbar />
          <main className="px-6 md:px-12 lg:px-16 max-w-4xl mx-auto">
            <Hero />
            <Experience />
            <Skills />
            <Projects />
            <Education />
            <Contact />
            <Footer />
          </main>
        </div>

        {/* Right Side (Sticky Image) - Order 1 on mobile, 2 on desktop */}
        <div className="w-full lg:w-2/5 xl:w-1/3 order-1 lg:order-2 lg:h-screen lg:sticky lg:top-0 bg-gray-100 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10 z-10 pointer-events-none"></div>
          <div className="relative h-[50vh] lg:h-screen w-full">
            <Image
              src="/portraite.jpg"
              alt="M.K. Qoliyan"
              fill
              priority
              className="object-cover object-center grayscale contrast-110 filter hover:grayscale-0 transition-all duration-700"
            />
          </div>
          {/* Mobile Overlay Text (Visible only on small screens) */}
          <div className="lg:hidden absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 to-transparent text-white z-20">
            <h1 className="text-3xl font-bold">M.K. Qoliyan</h1>
            <p className="text-gray-200">Architect of Digital Experiences</p>
          </div>
        </div>
      </div>
    </div>
  );
}
