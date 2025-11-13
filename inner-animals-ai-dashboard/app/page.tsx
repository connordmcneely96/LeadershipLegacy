"use client";

import { motion } from "framer-motion";
import { Brain, Database, Eye, MessageSquare, Activity, TrendingUp, Zap, Users, ArrowUpRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
  const features = [
    {
      title: "RAG Builder",
      description: "Build advanced Retrieval-Augmented Generation systems with multi-document support",
      icon: Database,
      href: "/rag-builder",
      status: "active",
      gradient: "from-brand-cyan to-brand-cyan-dark",
    },
    {
      title: "ML Studio",
      description: "Train custom machine learning models with AutoML capabilities",
      icon: Brain,
      href: "/ml-studio",
      status: "beta",
      gradient: "from-brand-blue-electric to-brand-cyan",
    },
    {
      title: "Vision Lab",
      description: "Computer vision solutions with YOLOv8 for object detection and classification",
      icon: Eye,
      href: "/vision-lab",
      status: "coming-soon",
      gradient: "from-success to-brand-cyan",
    },
    {
      title: "NLP Analytics",
      description: "Natural language processing for sentiment analysis and entity recognition",
      icon: MessageSquare,
      href: "/nlp-analytics",
      status: "coming-soon",
      gradient: "from-warning to-brand-blue-electric",
    },
    {
      title: "Observatory",
      description: "Monitor all your AI deployments with real-time metrics and alerts",
      icon: Activity,
      href: "/observatory",
      status: "coming-soon",
      gradient: "from-error to-brand-cyan",
    },
  ];

  const metrics = [
    {
      label: "Active Projects",
      value: "12",
      change: "+3 this week",
      icon: TrendingUp,
      trend: "up",
      sparkline: [40, 45, 42, 48, 50, 49, 52]
    },
    {
      label: "API Calls",
      value: "45.2K",
      change: "+12% vs last week",
      icon: Zap,
      trend: "up",
      sparkline: [30, 35, 32, 38, 42, 45, 45.2]
    },
    {
      label: "Models Deployed",
      value: "8",
      change: "+2 this month",
      icon: Brain,
      trend: "up",
      sparkline: [4, 5, 5, 6, 7, 7, 8]
    },
    {
      label: "Active Users",
      value: "156",
      change: "+8% growth",
      icon: Users,
      trend: "up",
      sparkline: [120, 130, 135, 140, 145, 150, 156]
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <div className="min-h-screen bg-neural-dark">
      {/* Hero Section with Animated Gradient */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-br from-neural-dark via-neural-slate to-neural-dark pt-20 pb-32"
      >
        {/* Animated Background Grid */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(to right, #00B8E6 1px, transparent 1px),
                            linear-gradient(to bottom, #00B8E6 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }} />
        </div>

        {/* Glowing Orbs */}
        <div className="absolute top-20 -left-40 w-80 h-80 bg-brand-cyan opacity-20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 -right-40 w-80 h-80 bg-brand-blue-electric opacity-20 rounded-full blur-3xl animate-pulse" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 mb-6"
            >
              <Sparkles className="w-4 h-4 text-brand-cyan" />
              <span className="text-sm font-medium text-brand-cyan">
                Powered by Advanced AI/ML Infrastructure
              </span>
            </motion.div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              Inner Animals
              <span className="block mt-2 bg-gradient-to-r from-brand-cyan via-glow-cyan to-brand-blue-electric bg-clip-text text-transparent">
                AI Platform
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-circuit-silver max-w-3xl mx-auto mb-8">
              Enterprise-grade AI/ML operations dashboard. Build, deploy, and monitor intelligent systems at scale.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-brand-cyan to-brand-blue-electric text-white font-semibold shadow-glow-cyan-lg hover:shadow-glow-cyan-lg transition-all duration-300 flex items-center gap-2 group"
              >
                Get Started
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-xl border-2 border-brand-cyan/30 text-brand-cyan font-semibold hover:bg-brand-cyan/10 hover:border-brand-cyan transition-all duration-300"
              >
                View Documentation
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10 pb-20">
        {/* Metrics Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-12"
        >
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative bg-neural-slate/60 backdrop-blur-xl border border-circuit-silver/20 rounded-2xl p-6 hover:border-brand-cyan/50 hover:shadow-glow-cyan transition-all duration-300"
            >
              {/* Glow Effect on Hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand-cyan/0 to-brand-cyan/0 group-hover:from-brand-cyan/10 group-hover:to-transparent transition-all duration-300" />

              <div className="relative">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-circuit-silver text-sm font-medium mb-1">
                      {metric.label}
                    </p>
                    <h3 className="text-4xl font-bold text-white">
                      {metric.value}
                    </h3>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-brand-cyan/20 flex items-center justify-center group-hover:bg-brand-cyan/30 transition-colors">
                    <metric.icon className="w-6 h-6 text-brand-cyan" />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-success text-sm font-semibold flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />
                    {metric.change}
                  </span>
                </div>

                {/* Mini Sparkline */}
                <div className="mt-4 flex items-end gap-1 h-8">
                  {metric.sparkline.map((value, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-brand-cyan/30 rounded-t group-hover:bg-brand-cyan/50 transition-colors"
                      style={{ height: `${(value / Math.max(...metric.sparkline)) * 100}%` }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* AI Capabilities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">
                AI Capabilities
              </h2>
              <p className="text-circuit-silver">
                Powerful tools to build and deploy intelligent systems
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                whileHover={{ y: -8 }}
              >
                <Link href={feature.href}>
                  <div className="group relative h-full bg-neural-slate/60 backdrop-blur-xl border border-circuit-silver/20 rounded-2xl p-8 hover:border-brand-cyan/50 hover:shadow-glow-cyan transition-all duration-300 overflow-hidden">
                    {/* Gradient Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

                    <div className="relative">
                      <div className="flex items-center justify-between mb-6">
                        <div className={`p-4 rounded-xl bg-gradient-to-br ${feature.gradient} shadow-glow-cyan`}>
                          <feature.icon className="h-8 w-8 text-white" />
                        </div>
                        <span
                          className={`px-3 py-1.5 text-xs font-bold rounded-full ${
                            feature.status === "active"
                              ? "bg-success/20 text-success border border-success/30"
                              : feature.status === "beta"
                              ? "bg-warning/20 text-warning border border-warning/30"
                              : "bg-circuit-silver/20 text-circuit-silver border border-circuit-silver/30"
                          }`}
                        >
                          {feature.status === "active"
                            ? "ACTIVE"
                            : feature.status === "beta"
                            ? "BETA"
                            : "COMING SOON"}
                        </span>
                      </div>

                      <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-brand-cyan transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-circuit-silver text-sm leading-relaxed mb-4">
                        {feature.description}
                      </p>

                      <div className="flex items-center gap-2 text-brand-cyan font-semibold group-hover:gap-3 transition-all">
                        <span>Explore</span>
                        <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Platform Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="relative bg-gradient-to-br from-brand-cyan to-brand-blue-electric rounded-2xl p-12 overflow-hidden"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
              backgroundSize: '30px 30px'
            }} />
          </div>

          <div className="relative">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-3 h-3 bg-success rounded-full animate-pulse shadow-glow-cyan" />
              <h2 className="text-3xl font-bold text-white">Platform Status</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="text-5xl font-bold text-white mb-2">99.8%</div>
                <div className="text-white/80 font-medium">System Uptime</div>
                <p className="text-white/60 text-sm mt-1">Last 30 days</p>
              </div>
              <div>
                <div className="text-5xl font-bold text-white mb-2">&lt;2s</div>
                <div className="text-white/80 font-medium">Response Time</div>
                <p className="text-white/60 text-sm mt-1">Average API latency</p>
              </div>
              <div>
                <div className="text-5xl font-bold text-white mb-2">94%</div>
                <div className="text-white/80 font-medium">Model Accuracy</div>
                <p className="text-white/60 text-sm mt-1">Across all deployments</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
