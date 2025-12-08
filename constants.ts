import { ExperienceItem, SkillItem, ProjectItem, EducationItem } from './types';

export const SOCIAL_LINKS = {
  telegram: 'https://t.me/MKQoliyan',
  instagram: 'https://www.instagram.com/m.k.qoliyan/',
  linkedin: 'https://www.linkedin.com/in/qoliyan/',
};

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    id: '1',
    role: 'Programming Consultant',
    company: 'Sharif University of Technology',
    type: 'Full-time',
    date: 'Feb 2025 - Present',
    location: 'Tehran, Iran • Remote',
    description: ['Developing an AI Platform.'],
    skills: ['Next.js', 'React.js', '+10 skills'],
  },
  {
    id: '2',
    role: 'Frontend Developer',
    company: 'Wisdev',
    type: 'Part-time',
    date: 'Feb 2024 - Mar 2025',
    location: 'Canada • Remote',
    description: [
      'Developed more than 60 react.js modules over syncfusion library.',
      'As a WordPress developer, I have fully designed 7 WordPress websites using the Elementor plugin.',
      'Implemented custom WordPress plugins.',
    ],
    skills: ['JavaScript', 'React.js', '+3 skills'],
  },
  {
    id: '3',
    role: 'Frontend Developer',
    company: 'NovinCloud',
    type: 'Part-time',
    date: 'Feb 2023 - Mar 2025',
    location: 'Tehran, Iran • Remote',
    description: [
      'As front-end developer I was responsible for designing the user panel for online purchases of IaaS services using the Next.js framework.',
      'I have also developed admin panel using Next.js too.',
    ],
    skills: ['React.js', 'Chakra UI', '+2 skills'],
  },
  {
    id: '4',
    role: 'Team Lead',
    company: 'Bluewaves',
    type: 'Full-time',
    date: 'Sep 2023 - Feb 2024',
    location: 'Dubai, United Arab Emirates • Remote',
    description: [
      'Leading developers of the team.',
      'Helped the frontend developer in some User Panel modules.',
      'Helped the backend developer in up and running some services.',
      'I have implemented the Admin Panel using React.js',
      'Also I have implemented the official website using next.js as frontend framework and WordPress as a Headless Content Management and REST API.',
    ],
    skills: ['JavaScript', 'React.js', '+8 skills'],
  },
  {
    id: '5',
    role: 'Team Lead',
    company: 'Footab',
    type: 'Full-time',
    date: 'Mar 2003 - Sep 2023',
    location: 'Tehran, Iran • On-site',
    description: [
      'Played a key role in backend development using Node.js and PHP, demonstrating versatility in different programming languages.',
      'Mentoring and Supporting the Front-end programmer, resulting in a 20% increase in code quality and a more efficient development process.',
      'Contributed significantly to the release of the final product version, highlighting project completion and delivery skills.',
    ],
    skills: ['JavaScript', 'React.js', '+5 skills'],
  },
];

export const SKILLS_DATA: SkillItem[] = [
  { name: 'Zustand', level: 'Advanced' },
  { name: 'WordPress Development', level: 'Advanced' },
  { name: 'WordPress Design', level: 'Advanced' },
  { name: 'WordPress', level: 'Advanced' },
  { name: 'Web Design', level: 'Advanced' },
  { name: 'Vite', level: 'Advanced' },
  { name: 'Team Leadership', level: 'Advanced' },
  { name: 'Tailwind', level: 'Advanced' },
  { name: 'Redis', level: 'Advanced' },
  { name: 'React.js', level: 'Advanced' },
  { name: 'React Query', level: 'Advanced' },
  { name: 'React Native', level: 'Advanced' },
  { name: 'PHP Nukes', level: 'Advanced' },
  { name: 'PHP', level: 'Advanced' },
  { name: 'Photoshop', level: 'Advanced' },
  { name: 'Node.js', level: 'Intermediate' },
  { name: 'Next.js', level: 'Advanced' },
  { name: 'N8N', level: 'Advanced' },
  { name: 'MongoDB', level: 'Advanced' },
];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: '1',
    title: 'UCRS',
    description: 'A custom-designed corporate website built with Next.js, Tailwind CSS, and Shadcn UI',
    link: '#',
  },
  {
    id: '2',
    title: 'OwlSourcing',
    description: 'A WordPress-based corporate website built with Elementor for a Chinese sourcing company.',
    link: '#',
  },
  {
    id: '3',
    title: 'NovinCloud',
    description: 'A Next.js cloud management console powered by a customized Kubectl API.',
    link: '#',
  },
  {
    id: '4',
    title: 'Safes.so',
    description: 'Parental control web dashboard built with React.js, Material UI, and Zustand.',
    link: '#',
  },
];

export const EDUCATION_DATA: EducationItem[] = [
  {
    degree: 'Associate’s Degree in Accounting',
    university: 'Islamic Azad University, Garmsar',
  },
  {
    degree: 'Bachelor’s Degree in Software Technology Engineering',
    university: 'Islamic Azad University, Garmsar',
  },
];
