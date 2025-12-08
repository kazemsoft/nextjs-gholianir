import React from 'react';
import { SKILLS_DATA } from '../generated-skills';

const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-16 border-t border-gray-100 scroll-mt-28">
      <h3 className="text-3xl font-black mb-10">My Skills</h3>
      
      <div className="flex flex-wrap gap-3">
        {SKILLS_DATA.map((skill, index) => (
          <div 
            key={index} 
            className="bg-gray-500 text-white rounded-full px-4 py-2 text-sm font-medium flex items-center transition-transform hover:scale-105 cursor-default"
          >
            <span className="font-bold mr-1">{skill.name}</span>
            <span className="opacity-70 font-light text-xs border-l border-white/30 pl-2 ml-1">
              {skill.level}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;