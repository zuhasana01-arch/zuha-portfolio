import React, { useState } from 'react';
import { Mail, Linkedin, Github, Download, ExternalLink } from 'lucide-react';
import portfolioContent from '../data/portfolioContent';
import { FileUpload } from './FileUpload';

interface EnhancedScrollUIProps {
  currentSection: number;
  scrollProgress: number;
}

export const EnhancedScrollUI: React.FC<EnhancedScrollUIProps> = ({ currentSection }) => {
  const renderSectionTitle = (title: string) => (
    <div className="text-center mb-8 px-4 pt-2">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white drop-shadow-lg break-words whitespace-normal">
        {title}
      </h2>
    </div>
  );

  const renderHero = () => (
    <div className="text-center space-y-6 max-w-2xl mx-auto px-4">
      <h1 className="text-5xl md:text-6xl font-black text-white drop-shadow-lg">{portfolioContent.hero.name}</h1>
      <div className="space-y-3">
        <p className="text-xl md:text-2xl font-bold text-blue-300">{portfolioContent.hero.headline}</p>
        <p className="text-base md:text-lg text-white/80">{portfolioContent.hero.tagline}</p>
      </div>
      <div className="flex flex-wrap gap-3 justify-center pt-4">
        <a
          href="#projects"
          className="px-5 md:px-6 py-2 md:py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-lg hover:shadow-lg hover:scale-105 transition-all text-sm md:text-base"
        >
          View Projects
        </a>
        <a
          href="#resume"
          className="px-5 md:px-6 py-2 md:py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:shadow-lg hover:scale-105 transition-all text-sm md:text-base"
        >
          Download Resume
        </a>
        <a
          href="#contact"
          className="px-5 md:px-6 py-2 md:py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-lg hover:shadow-lg hover:scale-105 transition-all text-sm md:text-base"
        >
          Contact Me
        </a>
      </div>
    </div>
  );

  const renderAbout = () => (
    <div className="space-y-6 max-w-2xl mx-auto px-4">
      {renderSectionTitle('ABOUT ME')}
      <div className="bg-white/10 backdrop-blur p-6 rounded-xl space-y-4 max-h-60vh overflow-y-auto">
        <p className="text-white/90 leading-relaxed text-base md:text-lg">{portfolioContent.about.summary}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
          <div className="bg-white/5 p-4 rounded-lg">
            <p className="text-blue-300 font-semibold text-sm">Education</p>
            <p className="text-white text-sm mt-2">{portfolioContent.about.education}</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg">
            <p className="text-blue-300 font-semibold text-sm">Focus Areas</p>
            <p className="text-white text-sm mt-2">{portfolioContent.about.focus}</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderProjects = () => (
    <div className="space-y-8 max-w-4xl mx-auto px-4">
      {renderSectionTitle('KEY PROJECTS')}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-h-60vh overflow-y-auto pr-2">
        {portfolioContent.projects.map((project) => (
          <div
            key={project.id}
            className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 backdrop-blur border border-white/10 rounded-xl p-5 hover:border-white/30 transition-all"
          >
            <h3 className="text-lg font-bold text-white mb-2">{project.title}</h3>
            <p className="text-white/70 text-xs md:text-sm mb-3">{project.shortDescription}</p>
            
            <div className="space-y-3 text-xs">
              <div>
                <p className="text-blue-300 font-semibold mb-1">Tools</p>
                <div className="flex flex-wrap gap-1">
                  {project.tools.map((tool, i) => (
                    <span key={i} className="bg-white/10 text-white px-2 py-0.5 rounded-full text-xs">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              <div className="border-t border-white/10 pt-3 space-y-2">
                <div>
                  <p className="text-cyan-300 font-semibold text-xs">Problem</p>
                  <p className="text-white/80 text-xs mt-0.5 line-clamp-2">{project.caseStudy.problem}</p>
                </div>
                <div>
                  <p className="text-cyan-300 font-semibold text-xs">Results</p>
                  <p className="text-white/80 text-xs mt-0.5 line-clamp-2">{project.caseStudy.results}</p>
                </div>
                <div className="bg-blue-500/20 p-2 rounded-lg">
                  <p className="text-blue-300 font-semibold text-xs">💡 Business Insight</p>
                  <p className="text-white/80 text-xs mt-0.5 line-clamp-2">{project.caseStudy.businessInsight}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSkills = () => (
    <div className="space-y-8 max-w-4xl mx-auto px-4">
      {renderSectionTitle('SKILLS & EXPERTISE')}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-h-60vh overflow-y-auto pr-2">
        <div className="bg-white/10 backdrop-blur rounded-xl p-5">
          <h3 className="text-lg font-bold text-blue-300 mb-3">Analytics</h3>
          <ul className="space-y-2">
            {portfolioContent.skills.analytics.map((skill, i) => (
              <li key={i} className="text-white/80 text-sm flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                {skill}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white/10 backdrop-blur rounded-xl p-5">
          <h3 className="text-lg font-bold text-cyan-300 mb-3">Data Tools</h3>
          <ul className="space-y-2">
            {portfolioContent.skills.tools.map((skill, i) => (
              <li key={i} className="text-white/80 text-sm flex items-center gap-2">
                <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
                {skill}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white/10 backdrop-blur rounded-xl p-5">
          <h3 className="text-lg font-bold text-purple-300 mb-3">Product & UX</h3>
          <ul className="space-y-2">
            {portfolioContent.skills.productUX.map((skill, i) => (
              <li key={i} className="text-white/80 text-sm flex items-center gap-2">
                <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                {skill}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );

  const renderTools = () => (
    <div className="space-y-8 max-w-4xl mx-auto px-4">
      {renderSectionTitle('TOOLS & TECHNOLOGIES')}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-3 max-h-60vh overflow-y-auto pr-2">
        {portfolioContent.technologies.map((tech, i) => (
          <div key={i} className="bg-white/10 backdrop-blur rounded-lg p-4 text-center hover:bg-white/20 transition-all">
            <div className="text-3xl mb-1">{tech.icon}</div>
            <p className="text-white font-semibold text-xs md:text-sm">{tech.name}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderExperience = () => (
    <div className="space-y-8 max-w-3xl mx-auto px-4">
      {renderSectionTitle('EXPERIENCE')}
      <div className="space-y-4 max-h-60vh overflow-y-auto pr-2">
        {portfolioContent.experience.map((exp, i) => (
          <div key={i} className="bg-white/10 backdrop-blur rounded-xl p-5 border-l-4 border-blue-400">
            <div className="flex justify-between items-start mb-2 flex-wrap gap-2">
              <div>
                <h3 className="text-lg font-bold text-white">{exp.company}</h3>
                <p className="text-blue-300 font-semibold text-sm">{exp.position}</p>
              </div>
              <span className="text-white/60 text-xs md:text-sm">{exp.duration}</span>
            </div>
            <p className="text-white/80 text-sm mb-3">{exp.description}</p>
            <ul className="space-y-1">
              {exp.achievements.map((achievement, j) => (
                <li key={j} className="text-white/70 text-xs flex gap-2">
                  <span className="text-cyan-400">✓</span>
                  <span>{achievement}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );

  const renderEducation = () => (
    <div className="space-y-8 max-w-3xl mx-auto px-4">
      {renderSectionTitle('EDUCATION')}
      <div className="space-y-4 max-h-60vh overflow-y-auto pr-2">
        {portfolioContent.education.map((edu, i) => (
          <div key={i} className="bg-white/10 backdrop-blur rounded-xl p-5">
            <h3 className="text-lg font-bold text-white">{edu.degree}</h3>
            <p className="text-blue-300 font-semibold text-sm">{edu.institution}</p>
            <p className="text-white/70 text-xs md:text-sm mt-2">Graduated: {edu.year}</p>
            <p className="text-white/70 text-xs md:text-sm">Focus: {edu.focus}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCertifications = () => (
    <div className="space-y-8 max-w-3xl mx-auto px-4">
      {renderSectionTitle('CERTIFICATIONS')}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-60vh overflow-y-auto pr-2">
        {portfolioContent.certifications.map((cert, i) => (
          <div key={i} className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur rounded-lg p-4 border border-white/10">
            <p className="text-white font-semibold text-sm">{cert.name}</p>
            <p className="text-white/70 text-xs">{cert.issuer}</p>
            <p className="text-white/50 text-xs mt-2">{cert.year}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCurrentWork = () => (
    <div className="space-y-8 max-w-3xl mx-auto px-4">
      {renderSectionTitle('WHAT I\'M WORKING ON')}
      <div className="bg-white/10 backdrop-blur rounded-xl p-6 space-y-4 max-h-60vh overflow-y-auto">
        {portfolioContent.currentWork.items.map((item, i) => (
          <div key={i} className="flex gap-3">
            <span className="text-2xl flex-shrink-0">→</span>
            <p className="text-white/80 text-base">{item}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderResume = () => (
    <div className="space-y-8 max-w-3xl mx-auto px-4">
      {renderSectionTitle('RESUME')}
      <div className="flex flex-col gap-6 items-center max-h-60vh overflow-y-auto">
        <a
          href="#download-resume"
          className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-lg hover:shadow-lg hover:scale-105 transition-all flex items-center gap-2"
        >
          <Download size={20} />
          Download Resume
        </a>
        <div className="flex gap-8 flex-wrap justify-center">
          <a 
            href="https://linkedin.com/in/zuhasana" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white hover:text-blue-300 transition-colors"
          >
            <Linkedin size={32} />
          </a>
          <a 
            href="https://github.com/zuhasana" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white hover:text-blue-300 transition-colors"
          >
            <Github size={32} />
          </a>
          <a 
            href="https://g.dev/zuhsana" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white hover:text-blue-300 transition-colors"
            title="Google Dev Profile"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
              <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm0 22C6.48 22 2 17.52 2 12S6.48 2 12 2s10 4.48 10 10-4.48 10-10 10z"/>
              <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6z"/>
            </svg>
          </a>
          <a 
            href="mailto:zsana@depaul.edu"
            className="text-white hover:text-blue-300 transition-colors"
          >
            <Mail size={32} />
          </a>
        </div>
      </div>
    </div>
  );

  const renderContact = () => (
    <div className="space-y-8 max-w-3xl mx-auto px-4">
      {renderSectionTitle('GET IN TOUCH')}
      <div className="flex flex-col items-center gap-8 max-h-60vh overflow-y-auto">
        <div className="text-center space-y-4">
          <p className="text-white/80 text-lg">Let's work together on your next project</p>
          <a
            href="mailto:zsana@depaul.edu"
            className="inline-block px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-lg hover:shadow-lg hover:scale-105 transition-all"
          >
            Send Me an Email
          </a>
        </div>
        <div className="flex gap-8 flex-wrap justify-center">
          <a
            href="https://linkedin.com/in/zuhasana"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-2 text-white hover:text-blue-300 transition-colors group"
          >
            <Linkedin size={40} className="group-hover:scale-110 transition-transform" />
            <span className="text-sm font-semibold">LinkedIn</span>
          </a>
          <a
            href="https://github.com/zuhasana"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-2 text-white hover:text-blue-300 transition-colors group"
          >
            <Github size={40} className="group-hover:scale-110 transition-transform" />
            <span className="text-sm font-semibold">GitHub</span>
          </a>
          <a
            href="mailto:zsana@depaul.edu"
            className="flex flex-col items-center gap-2 text-white hover:text-blue-300 transition-colors group"
          >
            <Mail size={40} className="group-hover:scale-110 transition-transform" />
            <span className="text-sm font-semibold">Email</span>
          </a>
        </div>
      </div>
    </div>
  );

  const sections = [
    { render: renderHero, title: 'Hero' },
    { render: () => null, title: 'Bridge' },
    { render: renderAbout, title: 'About' },
    { render: renderProjects, title: 'Projects' },
    { render: renderSkills, title: 'Skills' },
    { render: renderTools, title: 'Tools' },
    { render: renderExperience, title: 'Experience' },
    { render: renderEducation, title: 'Education' },
    { render: renderCertifications, title: 'Certifications' },
    { render: renderCurrentWork, title: 'Current Work' },
    { render: renderResume, title: 'Resume' },
    { render: renderContact, title: 'Contact' },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
      <div className="pointer-events-auto max-w-5xl mx-auto px-4 md:px-6 py-8 md:py-12 h-screen flex items-center justify-center">
        <div className="bg-black/50 backdrop-blur-md rounded-2xl p-6 md:p-8 max-h-[85vh] overflow-hidden w-full flex flex-col">
          <div className="overflow-y-auto flex-1 pr-2 flex flex-col justify-start">
            {sections[currentSection]?.render()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedScrollUI;
