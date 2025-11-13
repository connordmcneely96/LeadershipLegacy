'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Users,
  MessageSquare,
  BookOpen,
  GraduationCap,
  Handshake,
  BarChart3,
  Target,
  Sparkles,
  ArrowRight,
  Star,
  Zap
} from 'lucide-react';

export default function Community() {
  const benefits = [
    {
      icon: MessageSquare,
      title: 'Monthly Meetups',
      description: 'Regular virtual and in-person gatherings for networking, learning, and sharing experiences with fellow leaders',
      gradient: 'from-brand-cyan to-brand-cyan-dark',
    },
    {
      icon: BookOpen,
      title: 'Resource Library',
      description: 'Access to exclusive tools, templates, guides, and resources to support your leadership development',
      gradient: 'from-brand-blue-electric to-brand-cyan',
    },
    {
      icon: GraduationCap,
      title: 'Workshops & Webinars',
      description: 'Participate in specialized training sessions covering various aspects of leadership and personal development',
      gradient: 'from-success to-brand-cyan',
    },
    {
      icon: Handshake,
      title: 'Peer Support',
      description: 'Connect with like-minded leaders for accountability, encouragement, and collaborative problem-solving',
      gradient: 'from-warning to-brand-blue-electric',
    },
    {
      icon: BarChart3,
      title: 'Success Tracking',
      description: 'Tools and frameworks to measure your progress and celebrate milestones along your leadership journey',
      gradient: 'from-error to-brand-cyan',
    },
    {
      icon: Target,
      title: 'Mastermind Groups',
      description: 'Join small cohorts of peers for deep-dive discussions, strategic thinking, and mutual growth',
      gradient: 'from-brand-cyan to-brand-blue-electric',
    },
  ];

  const features = [
    {
      icon: Users,
      value: '500+',
      label: 'Active Members',
    },
    {
      icon: Zap,
      value: '50+',
      label: 'Monthly Events',
    },
    {
      icon: Star,
      value: '98%',
      label: 'Satisfaction Rate',
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
              <span className="text-sm font-medium text-brand-cyan">Growth & Connection</span>
            </motion.div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">Leadership Community</h1>
            <p className="text-xl md:text-2xl text-circuit-silver max-w-3xl mx-auto">Join a thriving network of leaders committed to growth and excellence</p>
          </motion.div>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{ y: -8 }}
              className="group bg-neural-slate/60 backdrop-blur-xl border border-circuit-silver/20 rounded-2xl p-6 text-center hover:border-brand-cyan/50 hover:shadow-glow-cyan transition-all duration-300"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand-cyan/0 to-brand-cyan/0 group-hover:from-brand-cyan/10 group-hover:to-transparent transition-all duration-300" />
              <div className="relative">
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-brand-cyan/20 flex items-center justify-center group-hover:bg-brand-cyan/30 transition-colors">
                  <feature.icon className="w-6 h-6 text-brand-cyan" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-1">{feature.value}</h3>
                <p className="text-circuit-silver text-sm">{feature.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Intro */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Welcome to the Community</h2>
              <p className="text-circuit-silver text-lg mb-4">
                Our leadership community is more than just a network—it's a supportive ecosystem where leaders connect, collaborate, and grow together. Whether you're an emerging leader or a seasoned executive, you'll find value, inspiration, and support here.
              </p>
              <p className="text-circuit-silver text-lg">
                Members benefit from exclusive resources, networking opportunities, and ongoing mentorship that extends beyond individual coaching sessions.
              </p>
            </div>
            <div className="relative">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="relative bg-gradient-to-br from-brand-cyan to-brand-blue-electric rounded-2xl p-12 text-center overflow-hidden"
              >
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
                    backgroundSize: '30px 30px',
                  }} />
                </div>
                <div className="relative">
                  <Star className="w-20 h-20 text-white mx-auto mb-6 animate-pulse" />
                  <p className="text-white text-xl">
                    A space for<br />
                    <strong className="text-2xl">Growth & Connection</strong>
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Community Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group relative bg-neural-slate/60 backdrop-blur-xl border border-circuit-silver/20 rounded-2xl p-6 hover:border-brand-cyan/50 hover:shadow-glow-cyan transition-all duration-300"
              >
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${benefit.gradient} opacity-0 group-hover:opacity-10 transition-all duration-300`} />

                <div className="relative">
                  <div className={`w-14 h-14 mb-4 rounded-xl bg-gradient-to-br ${benefit.gradient} flex items-center justify-center shadow-glow-cyan`}>
                    <benefit.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-brand-cyan transition-colors">
                    {benefit.title}
                  </h3>
                  <p className="text-circuit-silver text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

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
            <h2 className="text-4xl font-bold text-white mb-4">Join the Community</h2>
            <p className="text-white/80 text-xl mb-8">Connect with leaders who are committed to growth and excellence</p>
            <Link href="/contact">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-8 py-4 rounded-xl bg-white text-brand-cyan font-bold shadow-lg hover:shadow-xl transition-all inline-flex items-center gap-2">
                Get Started
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
