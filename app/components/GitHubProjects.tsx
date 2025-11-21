'use client';

import { motion } from 'framer-motion';
import {
  Github,
  ExternalLink,
  Code2,
  Rocket,
  Star,
  GitFork
} from 'lucide-react';

interface Project {
  title: string;
  description: string;
  tags: string[];
  githubUrl: string;
  liveUrl: string;
  image?: string;
  stats?: {
    stars?: number;
    forks?: number;
  };
  featured?: boolean;
}

const projects: Project[] = [
  {
    title: 'Leadership Legacy',
    description: 'Professional portfolio and coaching platform built with Next.js, showcasing engineering excellence and leadership development programs.',
    tags: ['Next.js 15', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vercel'],
    githubUrl: 'https://github.com/connordmcneely96/LeadershipLegacy',
    liveUrl: 'https://leadership-legacy.vercel.app',
    featured: true,
  },
  {
    title: 'Southern Pets Animal Rescue',
    description: 'Full-stack animal rescue platform connecting shelters with potential adopters. Features pet listings, adoption applications, and shelter management tools.',
    tags: ['React', 'Node.js', 'MongoDB', 'Express', 'Vercel'],
    githubUrl: 'https://github.com/connordmcneely96/Southern-Pets-Animal-Rescue-client-project',
    liveUrl: 'https://southern-pets-animal-rescue-client.vercel.app/',
  },
  {
    title: 'AI-Powered Health & Fitness Coach',
    description: 'Intelligent fitness coaching application leveraging AI to provide personalized workout plans, nutrition guidance, and health tracking insights.',
    tags: ['React', 'OpenAI API', 'Python', 'FastAPI', 'Vercel'],
    githubUrl: 'https://github.com/connordmcneely96/AI_Powered_Health_-_Fitness_Coach',
    liveUrl: 'https://ai-powered-health-fitness-coach.vercel.app/',
  },
  {
    title: 'RAG Q&A for Mechanical Engineers',
    description: 'Retrieval-Augmented Generation system designed for mechanical engineers, providing AI-powered answers from technical documentation and engineering standards.',
    tags: ['Python', 'LangChain', 'OpenAI', 'Vector DB', 'Next.js', 'Vercel'],
    githubUrl: 'https://github.com/connordmcneely96/RAG-Q-A-for-Mechanical-Engineers',
    liveUrl: 'https://rag-q-a-for-mechanical-engineers.vercel.app/',
  },
  {
    title: 'CAD Autonomous Engine',
    description: 'Autonomous CAD design engine that leverages AI to generate and optimize mechanical engineering designs automatically.',
    tags: ['Python', 'AI/ML', 'CAD', 'FastAPI', 'React', 'Vercel'],
    githubUrl: 'https://github.com/connordmcneely96/CAD_Autonomous_Engine',
    liveUrl: 'https://cad-autonomous-engine-backend.vercel.app/',
  },
  {
    title: 'iAutodidact',
    description: 'Self-directed learning platform built with Rust for high performance. Enables users to create, track, and optimize their personalized learning journeys.',
    tags: ['Rust', 'WebAssembly', 'React', 'PostgreSQL', 'Vercel'],
    githubUrl: 'https://github.com/connordmcneely96/I-autodidact',
    liveUrl: 'https://i-autodidact-rust.vercel.app/',
  },
  {
    title: 'Inner Animal Media',
    description: 'Creative media platform for content creation and distribution. Features multimedia galleries, artist portfolios, and community engagement tools.',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Cloudinary', 'Vercel'],
    githubUrl: 'https://github.com/connordmcneely96/InnerAnimalMedia',
    liveUrl: 'https://inner-animal-media-psi.vercel.app/',
  },
];

export default function GitHubProjects() {
  return (
    <div className="mb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 mb-6">
          <Code2 className="w-4 h-4 text-brand-cyan" />
          <span className="text-sm font-medium text-brand-cyan">Open Source & Projects</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Software Projects
        </h2>
        <p className="text-xl text-circuit-silver max-w-3xl mx-auto">
          Building modern web applications with cutting-edge technologies
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
            whileHover={{ y: -8 }}
            className={`group relative bg-neural-slate/60 backdrop-blur-xl border border-circuit-silver/20 rounded-2xl overflow-hidden hover:border-brand-cyan/50 hover:shadow-glow-cyan transition-all duration-300 ${
              project.featured ? 'lg:col-span-2' : ''
            }`}
          >
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan/0 via-brand-cyan/0 to-brand-blue-electric/0 group-hover:from-brand-cyan/10 group-hover:to-brand-blue-electric/10 transition-all duration-300" />

            <div className="relative p-8">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-cyan to-brand-blue-electric flex items-center justify-center shadow-glow-cyan">
                      <Rocket className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white group-hover:text-brand-cyan transition-colors">
                        {project.title}
                      </h3>
                      {project.featured && (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-warning">
                          <Star className="w-3 h-3 fill-warning" />
                          Featured Project
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-circuit-silver text-base leading-relaxed mb-6">
                {project.description}
              </p>

              {/* Stats (if available) */}
              {project.stats && (
                <div className="flex items-center gap-4 mb-6">
                  {project.stats.stars !== undefined && (
                    <div className="flex items-center gap-1.5 text-circuit-silver">
                      <Star className="w-4 h-4" />
                      <span className="text-sm font-medium">{project.stats.stars}</span>
                    </div>
                  )}
                  {project.stats.forks !== undefined && (
                    <div className="flex items-center gap-1.5 text-circuit-silver">
                      <GitFork className="w-4 h-4" />
                      <span className="text-sm font-medium">{project.stats.forks}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-xs font-medium rounded-full bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/20 hover:bg-brand-cyan/20 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex flex-wrap gap-3">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/btn inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-circuit-silver/10 border border-circuit-silver/20 text-white font-medium hover:bg-circuit-silver/20 hover:border-circuit-silver/40 transition-all duration-200"
                >
                  <Github className="w-4 h-4" />
                  <span>View Code</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all" />
                </a>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/btn inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-cyan to-brand-blue-electric text-white font-medium hover:shadow-glow-cyan transition-all duration-200"
                >
                  <Rocket className="w-4 h-4" />
                  <span>Live Demo</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all" />
                </a>
              </div>
            </div>

            {/* Decorative Corner Accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-brand-cyan/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.div>
        ))}
      </div>

      {/* Add More Projects CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mt-8 text-center"
      >
        <a
          href="https://github.com/connordmcneely96"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-neural-slate/60 border border-circuit-silver/20 text-circuit-silver font-medium hover:text-brand-cyan hover:border-brand-cyan/50 hover:shadow-glow-cyan transition-all duration-300"
        >
          <Github className="w-5 h-5" />
          <span>View All Projects on GitHub</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </motion.div>
    </div>
  );
}
