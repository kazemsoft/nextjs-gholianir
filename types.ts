export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  type: string; // Full-time, Part-time, etc.
  date: string;
  location: string;
  description: string[]; // Bullet points
  skills: string[];
  image?: string | null;
  order?: number;
}

export interface SkillItem {
  name: string;
  level: 'Advanced' | 'Intermediate' | 'Basic';
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  link?: string;
}

export interface EducationItem {
  degree: string;
  university: string;
}
