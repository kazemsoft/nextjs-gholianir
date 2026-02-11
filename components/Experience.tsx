'use client';

import React, { useState } from "react";
import { EXPERIENCE_DATA } from "../generated-experiences";
import { MapPin, Calendar, Gem } from "lucide-react";

const Experience: React.FC = () => {
  const [expandedSkills, setExpandedSkills] = useState<{
    [key: string]: boolean;
  }>({});

  const toggleSkills = (id: string) => {
    setExpandedSkills((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section
      id="experience"
      className="py-16 border-t border-gray-100 scroll-mt-28"
    >
      <h3 className="text-3xl font-black mb-12">My Experiences</h3>

      <div className="relative border-l-2 border-gray-200 ml-4 md:ml-6 space-y-16">
        {EXPERIENCE_DATA.map((item) => {
          const isExpanded = expandedSkills[item.id] || false;
          const displayedSkills = isExpanded
            ? item.skills
            : item.skills.slice(0, 2);
          const remainingCount = item.skills.length - 2;

          return (
            <div key={item.id} className="relative pl-10 md:pl-16 group">
              {/* Timeline Dot/Icon */}
              <div className="absolute -left-[17px] md:-left-[21px] top-0 bg-white p-1 md:p-1.5 border-2 border-gray-200 rounded-full transition-transform duration-300 group-hover:scale-150">
                {/* Using local image or fallback */}
                <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gray-50 flex items-center justify-center overflow-hidden">
                  <img
                    src={
                      item.image
                        ? `/images/experiences/${item.image}`
                        : `https://picsum.photos/seed/${item.company}/100/100`
                    }
                    alt={item.company}
                    className="w-full h-full object-cover grayscale opacity-80 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100"
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 mb-2">
                <h4 className="text-xl md:text-2xl font-bold">{item.role}</h4>
              </div>

              <div className="mb-4">
                <div className="flex flex-wrap items-center gap-x-2 text-sm md:text-base font-medium text-gray-800 mb-1">
                  <span>{item.company}</span>
                  <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                  <span className="text-gray-500">{item.type}</span>
                </div>

                <div className="flex flex-wrap gap-x-4 text-xs md:text-sm text-gray-500 font-medium uppercase tracking-wide">
                  <span className="flex items-center gap-1">
                    <Calendar size={14} /> {item.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin size={14} /> {item.location}
                  </span>
                </div>
              </div>

              <div className="text-gray-600 mb-6 leading-relaxed">
                <ul className="list-none space-y-2">
                  {item.description.map((desc, idx) => (
                    <li
                      key={idx}
                      className="relative pl-4 before:content-['•'] before:absolute before:left-0 before:text-black font-normal"
                    >
                      {desc}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center gap-2 text-sm font-bold text-gray-800 flex-wrap">
                <Gem size={16} className="text-black flex-shrink-0" />
                <span>{displayedSkills.join(", ")}</span>
                {remainingCount > 0 && !isExpanded && (
                  <button
                    onClick={() => toggleSkills(item.id)}
                    className="text-black underline hover:no-underline font-bold"
                  >
                    +{remainingCount} more
                  </button>
                )}
                {isExpanded && item.skills.length > 2 && (
                  <button
                    onClick={() => toggleSkills(item.id)}
                    className="text-black underline hover:no-underline font-bold"
                  >
                    show less
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Experience;
