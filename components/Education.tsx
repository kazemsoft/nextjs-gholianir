import React from 'react';
import { EDUCATION_DATA } from '../constants';

const Education: React.FC = () => {
  return (
    <section id="education" className="py-16 border-t border-gray-100 scroll-mt-28">
      <h3 className="text-3xl font-black mb-10">Education</h3>
      
      <div className="space-y-8">
        {EDUCATION_DATA.map((edu, index) => (
          <div key={index}>
            <h4 className="text-lg md:text-xl font-bold text-gray-800 mb-1">
              – {edu.degree}
            </h4>
            <p className="text-gray-600 font-medium">
              {edu.university}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Education;