import React from 'react';
import { PROJECTS_DATA } from '../generated-projects';
import { ExternalLink } from 'lucide-react';

const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-16 border-t border-gray-100 scroll-mt-28">
      <h3 className="text-3xl font-black mb-10">My Projects</h3>

      <div className="grid grid-cols-1 gap-6">
        {PROJECTS_DATA.map((project) => (
          <a
            key={project.id}
            href={project.link || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-gray-200 p-8 rounded-sm hover:border-black transition-colors bg-white group relative block cursor-pointer"
          >
            <div className="flex justify-between items-start mb-4">
              <h4 className="text-2xl font-bold group-hover:underline decoration-2 underline-offset-4">
                {project.title}
              </h4>
              {project.link && project.link !== '#' && (
                <ExternalLink size={20} className="text-gray-400 group-hover:text-black transition-colors flex-shrink-0" />
              )}
            </div>
            <p className="text-gray-600 leading-relaxed">
              {project.description}
            </p>
          </a>
        ))}
      </div>
    </section>
  );
};

export default Projects;