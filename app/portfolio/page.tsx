'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Briefcase,
  TrendingUp,
  Sparkles,
  ArrowRight,
  Cog,
  Factory,
  Zap,
  Award,
  GraduationCap,
  Settings
} from 'lucide-react';
import GitHubProjects from '../components/GitHubProjects';

export default function Portfolio() {
  const projects = [
    {
      title: 'Lead Mechanical Design Engineer',
      company: 'Pump Manufacturer | Youngsville, LA',
      year: '2023 - Present',
      description: 'Sole in-house engineer overseeing full-cycle design of high-efficiency disc pumps, from conception to manufacturing.',
      tags: ['Mechanical Design', 'FEA/CFD', 'DFMA'],
      icon: Settings,
      gradient: 'from-brand-cyan to-brand-cyan-dark',
      results: [
        'Designed complete pump systems using SolidWorks with FEA/CFD analysis',
        'Improved pump efficiency by 20% through innovative design optimization',
        'Reduced manufacturing costs by 15% implementing DFMA principles',
        'Managed cross-functional coordination between sales, manufacturing, and clients',
      ],
    },
    {
      title: 'Automation/Mechatronics Engineer',
      company: 'John Deere Turf Care',
      year: '2023',
      description: 'Led critical automation initiatives to enhance production efficiency and safety.',
      tags: ['Automation', 'PLC Programming', 'Machine Vision'],
      icon: Zap,
      gradient: 'from-brand-blue-electric to-brand-cyan',
      results: [
        'Reduced takt time by 20% through sensor and actuator programming',
        'Improved ergonomics by 30% via automation solutions',
        'Programmed PLCs and maintained SQL databases for MES systems',
        'Designed mistake-proofing systems using machine vision',
      ],
    },
    {
      title: 'Inspection/Automation/Mechanical Engineer',
      company: 'Pfizer',
      year: '2021 - 2022',
      description: 'Contributed to producing 759M vaccine doses while optimizing critical processes.',
      tags: ['Process Optimization', 'Quality Control', 'GMP/FDA'],
      icon: Factory,
      gradient: 'from-success to-brand-cyan',
      results: [
        'Enhanced Pfizer\'s efficiency leading to #1 PatientView ranking',
        'Implemented image processing and IoT dashboards for quality control',
        'Led Kaizen initiatives reducing waste and improving safety',
        'Ensured GMP, FDA, and ASME standards compliance',
      ],
    },
    {
      title: 'Machine Design Engineer',
      company: 'Louisiana Tech - Turbomachinery Project',
      year: '2020',
      description: 'Designed complete centrifugal pump system adhering to international standards.',
      tags: ['CAD Design', 'CFD/FEA', 'Standards Compliance'],
      icon: Cog,
      gradient: 'from-warning to-brand-blue-electric',
      results: [
        'Applied ISO 5199 and ASME B73.1 standards throughout design',
        'Conducted comprehensive CFD and FEA analyses',
        'Delivered innovative design combining manufacturability and performance',
        'Gained expertise in holistic system design and DFMA',
      ],
    },
  ];

  const stats = [
    {
      value: '75%',
      label: 'Downtime Reduction',
      icon: TrendingUp,
    },
    {
      value: '50%',
      label: 'Efficiency Improvement',
      icon: Zap,
    },
    {
      value: '20%',
      label: 'Cost Reduction',
      icon: Award,
    },
    {
      value: '759M',
      label: 'Units Produced',
      icon: Factory,
    },
  ];

  const certifications = [
    { name: 'B.S. Mechanical Engineering', issuer: 'Louisiana Tech University', icon: GraduationCap },
    { name: 'Lean Six Sigma', issuer: 'Process Excellence', icon: Award },
    { name: 'SolidWorks Professional', issuer: 'Dassault Systèmes', icon: Cog },
    { name: 'PLC Programming', issuer: 'Allen-Bradley', icon: Zap },
    { name: 'Machine Learning', issuer: 'Python Certified', icon: Sparkles },
    { name: 'ISO Standards', issuer: 'Quality Assurance', icon: Award },
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
              <span className="text-sm font-medium text-brand-cyan">Engineering Excellence</span>
            </motion.div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">Portfolio & Engineering Impact</h1>
            <p className="text-xl md:text-2xl text-circuit-silver max-w-3xl mx-auto">Quantifiable achievements demonstrating multi-disciplinary engineering expertise</p>
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
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Professional Journey</h2>
          <p className="text-xl text-circuit-silver max-w-3xl mx-auto">Building engineering excellence across mechanical design, automation, and process optimization</p>
        </motion.div>

        {/* Professional Experience */}
        <div className="mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-3xl font-bold text-white mb-8"
          >
            Professional Experience
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
                    <h4 className="text-white font-semibold text-sm mb-3">Key Achievements:</h4>
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

        {/* GitHub Projects Section */}
        <GitHubProjects />

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white mb-8">Professional Credentials</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.9 + index * 0.05 }}
                whileHover={{ y: -8 }}
                className="group bg-neural-slate/60 backdrop-blur-xl border border-circuit-silver/20 rounded-2xl p-6 text-center hover:border-brand-cyan/50 hover:shadow-glow-cyan transition-all duration-300"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand-cyan/0 to-brand-cyan/0 group-hover:from-brand-cyan/10 group-hover:to-transparent transition-all duration-300" />
                <div className="relative">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-brand-cyan/20 flex items-center justify-center group-hover:bg-brand-cyan/30 transition-colors">
                    <cert.icon className="w-7 h-7 text-brand-cyan" />
                  </div>
                  <h3 className="text-white font-bold mb-2">{cert.name}</h3>
                  <p className="text-circuit-silver text-sm">{cert.issuer}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="relative bg-gradient-to-br from-brand-cyan to-brand-blue-electric rounded-2xl p-12 overflow-hidden text-center"
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
              backgroundSize: '30px 30px',
            }} />
          </div>
          <div className="relative">
            <h2 className="text-4xl font-bold text-white mb-4">Let's Build Something Amazing</h2>
            <p className="text-white/80 text-xl mb-8">Ready to bring engineering excellence to your team</p>
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
