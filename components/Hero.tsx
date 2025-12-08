import React, { useState } from 'react';
import { generateResumePDF } from '../utils/generateResumePDF';

const Hero: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownloadResume = async () => {
    try {
      setIsGenerating(true);
      await generateResumePDF();
    } catch (error) {
      console.error('Failed to generate resume:', error);
      alert('Failed to generate resume. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section id="hero" className="py-12 md:py-20 scroll-mt-28">
      <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tight leading-tight">
        M.K. Qoliyan
      </h1>
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">
        Code meets innovation
      </h2>

      <div className="text-gray-600 text-lg leading-relaxed max-w-2xl mb-10 space-y-4">
        <p>
          With two decades of hands-on experience, I transform complex business challenges into elegant
          technical solutions. From architecting AI-powered platforms at Sharif University to leading
          development teams across continents, I bring both strategic vision and tactical execution to
          every project.
        </p>
        <p>
          My expertise spans the full stack—React, Next.js, Node.js, and modern cloud architectures—but
          what truly sets me apart is my ability to bridge the gap between cutting-edge technology and
          real-world business value. Whether it's a lean MVP or an enterprise-scale platform, I deliver
          solutions that perform, scale, and endure.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={handleDownloadResume}
          disabled={isGenerating}
          className="bg-black text-white px-10 py-4 font-bold text-sm uppercase tracking-wider hover:bg-gray-800 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGenerating ? 'Generating...' : 'Download Resume'}
        </button>
        <a href="#contact" className="border-2 border-black text-black px-10 py-4 font-bold text-sm uppercase tracking-wider hover:bg-black hover:text-white transition-all text-center">
          Contact Me
        </a>
      </div>
    </section>
  );
};

export default Hero;