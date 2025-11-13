'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Briefcase,
  Users,
  TrendingUp,
  Heart,
  Sparkles,
  ArrowRight,
  Building2,
  Rocket,
  Target,
  Award
} from 'lucide-react';

export default function Portfolio() {
  const projects = [
    {
      title: 'Executive Leadership Transformation',
      company: 'Fortune 500 Company',
      year: '2024',
      description: 'Guided C-suite executives through organizational change, resulting in improved team performance and strategic alignment.',
      tags: ['Executive Coaching', 'Change Management'],
      icon: Building2,
      gradient: 'from-brand-cyan to-brand-cyan-dark',
      results: [
        '40% improvement in team engagement',
        'Strategic alignment across 5 departments',
        'Sustained performance growth',
      ],
    },
    {
      title: 'Emerging Leaders Program',
      company: 'Tech Startup',
      year: '2023',
      description: 'Developed and delivered comprehensive leadership development program for high-potential team members.',
      tags: ['Group Mentorship', 'Skill Development'],
      icon: Rocket,
      gradient: 'from-brand-blue-electric to-brand-cyan',
      results: [
        '25 leaders trained and certified',
        '90% promotion rate within 12 months',
        '3x increase in leadership pipeline',
      ],
    },
    {
      title: 'Nonprofit Leadership Initiative',
      company: 'Community Organization',
      year: '2023',
      description: 'Coached nonprofit leaders in strategic planning, stakeholder engagement, and sustainable growth strategies.',
      tags: ['Strategic Planning', 'Community Impact'],
      icon: Heart,
      gradient: 'from-success to-brand-cyan',
      results: [
        '200% increase in community reach',
        'Secured $500K in new funding',
        'Built sustainable governance model',
      ],
    },
    {
      title: 'Healthcare Leadership Development',
      company: 'Regional Hospital System',
      year: '2022',
      description: 'Facilitated leadership workshops focused on team building, communication, and patient-centered care.',
      tags: ['Team Building', 'Healthcare Leadership'],
      icon: Target,
      gradient: 'from-warning to-brand-blue-electric',
      results: [
        '35% improvement in patient satisfaction',
        'Reduced staff turnover by 20%',
        'Enhanced cross-department collaboration',
      ],
    },
  ];

  const stats = [
    {
      value: '150+',
      label: 'Leaders Coached',
      icon: Users,
    },
    {
      value: '40+',
      label: 'Organizations Served',
      icon: Briefcase,
    },
    {
      value: '95%',
      label: 'Client Satisfaction',
      icon: Award,
    },
    {
      value: '10+',
      label: 'Years Experience',
      icon: TrendingUp,
    },
  ];

  return (
    <div className="min-h-screen bg-neural-dark">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative overflow-hidden bg-gradient-to-br from-neural-dark via-neural-slate to-neural-dark pt-32 pb-20"
      >
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(to right, #00B8E6 1px, transparent 1px), linear-gradient(to bottom, #00B8E6 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }} />
        </div>
        <div className="absolute top-20 -left-40 w-80 h-80 bg-brand-cyan opacity-20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 -right-40 w-80 h-80 bg-brand-blue-electric opacity-20 rounded-full blur-3xl animate-pulse" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-center">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5, delay: 0.4 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 mb-6">
              <Sparkles className="w-4 h-4 text-brand-cyan" />
              <span className="text-sm font-medium text-brand-cyan">Proven Results</span>
            </motion.div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">Portfolio & Success Stories</h1>
            <p className="text-xl md:text-2xl text-circuit-silver max-w-3xl mx-auto">Showcasing transformative leadership outcomes and impactful projects</p>
          </motion.div>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{ y: -8 }}
              className="group bg-neural-slate/60 backdrop-blur-xl border border-circuit-silver/20 rounded-2xl p-6 text-center hover:border-brand-cyan/50 hover:shadow-glow-cyan transition-all duration-300"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand-cyan/0 to-brand-cyan/0 group-hover:from-brand-cyan/10 group-hover:to-transparent transition-all duration-300" />
              <div className="relative">
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-brand-cyan/20 flex items-center justify-center group-hover:bg-brand-cyan/30 transition-colors">
                  <stat.icon className="w-6 h-6 text-brand-cyan" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-1">{stat.value}</h3>
                <p className="text-circuit-silver text-sm">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Intro */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Impact Through Leadership</h2>
          <p className="text-xl text-circuit-silver max-w-3xl mx-auto">Each engagement represents a unique journey of growth, transformation, and sustained success. Here are some highlights of the work I've been privileged to be part of.</p>
        </motion.div>

        {/* Projects Grid */}
        <div className="mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-3xl font-bold text-white mb-8"
          >
            Featured Projects
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group relative bg-neural-slate/60 backdrop-blur-xl border border-circuit-silver/20 rounded-2xl p-8 hover:border-brand-cyan/50 hover:shadow-glow-cyan transition-all duration-300"
              >
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-10 transition-all duration-300`} />

                <div className="relative">
                  <div className="flex items-start justify-between mb-6">
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${project.gradient} flex items-center justify-center shadow-glow-cyan`}>
                      <project.icon className="w-8 h-8 text-white" />
                    </div>
                    <span className="px-3 py-1 text-xs font-bold rounded-full bg-circuit-silver/20 text-circuit-silver border border-circuit-silver/30">
                      {project.year}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-brand-cyan transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-brand-cyan text-sm font-medium mb-4">{project.company}</p>
                  <p className="text-circuit-silver mb-6">{project.description}</p>

                  {/* Results */}
                  <div className="mb-6">
                    <h4 className="text-white font-semibold text-sm mb-3">Key Results:</h4>
                    <ul className="space-y-2">
                      {project.results.map((result, i) => (
                        <li key={i} className="flex items-start gap-2 text-circuit-silver text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-brand-cyan mt-1.5 flex-shrink-0" />
                          <span>{result}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-xs font-medium rounded-full bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="relative bg-gradient-to-br from-brand-cyan to-brand-blue-electric rounded-2xl p-12 overflow-hidden text-center"
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
              backgroundSize: '30px 30px',
            }} />
          </div>
          <div className="relative">
            <h2 className="text-4xl font-bold text-white mb-4">Ready to Create Your Success Story?</h2>
            <p className="text-white/80 text-xl mb-8">Let's discuss how we can work together to achieve your leadership goals</p>
            <Link href="/contact">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-8 py-4 rounded-xl bg-white text-brand-cyan font-bold shadow-lg hover:shadow-xl transition-all inline-flex items-center gap-2">
                Get in Touch
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
