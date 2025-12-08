import React from 'react';
import { EXPERIENCE_DATA } from '../generated-experiences';
import { SKILLS_DATA } from '../generated-skills';
import { EDUCATION_DATA } from '../constants';

interface ResumeTemplateProps {
  className?: string;
}

const ResumeTemplate: React.FC<ResumeTemplateProps> = ({ className = '' }) => {
  return (
    <div
      id="resume-template"
      className={`bg-white p-12 max-w-[850px] mx-auto ${className}`}
      style={{ width: '850px', minHeight: '1100px' }}
    >
      {/* Header */}
      <div className="text-center mb-8 pb-6 border-b-2 border-black">
        <h1 className="text-4xl font-black mb-2">M.K. Qoliyan</h1>
        <p className="text-xl font-bold text-gray-700 mb-3">Full-Stack Developer</p>
        <p className="text-sm text-gray-600">
          kgholian@gmail.com | Tehran, Iran
        </p>
      </div>

      {/* Profile Summary */}
      <div className="mb-8">
        <h2 className="text-2xl font-black mb-3 pb-2 border-b-2 border-gray-300">PROFILE</h2>
        <p className="text-sm leading-relaxed text-gray-700">
          With two decades of hands-on experience, I transform complex business challenges into elegant
          technical solutions. From architecting AI-powered platforms at Sharif University to leading
          development teams across continents, I bring both strategic vision and tactical execution to
          every project. My expertise spans the full stack—React, Next.js, Node.js, and modern cloud
          architectures—delivering solutions that perform, scale, and endure.
        </p>
      </div>

      {/* Work Experience */}
      <div className="mb-8">
        <h2 className="text-2xl font-black mb-4 pb-2 border-b-2 border-gray-300">WORK EXPERIENCE</h2>
        <div className="space-y-5">
          {EXPERIENCE_DATA.map((exp) => (
            <div key={exp.id}>
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="text-lg font-bold">{exp.role}</h3>
                <span className="text-xs text-gray-600">{exp.date}</span>
              </div>
              <div className="flex justify-between items-baseline mb-2">
                <p className="text-sm font-semibold text-gray-700">{exp.company}</p>
                <span className="text-xs text-gray-600">{exp.location}</span>
              </div>
              <ul className="list-disc list-inside space-y-1 mb-2">
                {exp.description.map((desc, idx) => (
                  <li key={idx} className="text-xs text-gray-700 leading-relaxed ml-2">
                    {desc}
                  </li>
                ))}
              </ul>
              <p className="text-xs text-gray-600">
                <span className="font-semibold">Skills:</span> {exp.skills.slice(0, 8).join(', ')}
                {exp.skills.length > 8 && `, +${exp.skills.length - 8} more`}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Education */}
      <div className="mb-8">
        <h2 className="text-2xl font-black mb-3 pb-2 border-b-2 border-gray-300">EDUCATION</h2>
        <div className="space-y-2">
          {EDUCATION_DATA.map((edu, idx) => (
            <div key={idx}>
              <h3 className="text-sm font-bold">{edu.degree}</h3>
              <p className="text-xs text-gray-700">{edu.university}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div className="mb-8">
        <h2 className="text-2xl font-black mb-3 pb-2 border-b-2 border-gray-300">TECHNICAL SKILLS</h2>
        <div className="grid grid-cols-3 gap-x-4 gap-y-1">
          {SKILLS_DATA.map((skill, idx) => (
            <div key={idx} className="text-xs">
              <span className="font-semibold">{skill.name}</span>
              <span className="text-gray-600"> ({skill.level})</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="text-center pt-6 border-t border-gray-300">
        <p className="text-xs text-gray-500">
          Printed at: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>
    </div>
  );
};

export default ResumeTemplate;
