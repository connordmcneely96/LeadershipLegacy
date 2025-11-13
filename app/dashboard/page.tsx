'use client';

import React from 'react';
import '../globals.css';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-gray-800 border-b border-gray-700 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Connor Mcneely</h1>
            <div className="flex gap-6">
              <a href="/" className="hover:text-blue-400">Home</a>
              <a href="/about" className="hover:text-blue-400">About</a>
              <a href="/coaching" className="hover:text-blue-400">Coaching</a>
              <a href="/portfolio" className="hover:text-blue-400">Portfolio</a>
              <a href="/community" className="hover:text-blue-400">Community</a>
              <a href="/dashboard" className="text-blue-400">Dashboard</a>
              <a href="/contact" className="hover:text-blue-400">Contact</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="pt-24 pb-12 bg-gradient-to-r from-purple-600 to-indigo-700">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Engineering & AI Dashboard</h1>
          <p className="text-xl opacity-90">Integrated CAD Workspace + AI/ML Operations Platform</p>
        </div>
      </div>

      {/* Dashboard Stats */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-gray-800 p-6 rounded-lg text-center">
            <div className="text-4xl mb-2">🎯</div>
            <div className="text-3xl font-bold text-blue-400">12</div>
            <div className="text-gray-400">Active Projects</div>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg text-center">
            <div className="text-4xl mb-2">🚀</div>
            <div className="text-3xl font-bold text-blue-400">$1.2M</div>
            <div className="text-gray-400">Revenue Pipeline</div>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg text-center">
            <div className="text-4xl mb-2">⚡</div>
            <div className="text-3xl font-bold text-blue-400">8</div>
            <div className="text-gray-400">AI Models Running</div>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg text-center">
            <div className="text-4xl mb-2">📐</div>
            <div className="text-3xl font-bold text-blue-400">24</div>
            <div className="text-gray-400">CAD Designs</div>
          </div>
        </div>

        {/* AI/ML Services */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">AI/ML Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ServiceCard
              icon="🧠"
              title="RAG System Builder"
              status="Active"
              projects={3}
              revenue="$105K"
              description="Intelligent document processing and retrieval"
            />
            <ServiceCard
              icon="🤖"
              title="ML Model Studio"
              status="Active"
              projects={2}
              revenue="$240K"
              description="Custom machine learning model training"
            />
            <ServiceCard
              icon="👁️"
              title="Computer Vision Lab"
              status="Active"
              projects={1}
              revenue="$180K"
              description="Advanced image and video analysis"
            />
            <ServiceCard
              icon="💬"
              title="NLP Analytics Suite"
              status="Planning"
              projects={0}
              revenue="$0K"
              description="Natural language processing and analytics"
            />
          </div>
        </section>

        {/* CAD Workspace */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">CAD Engineering Workspace</h2>
          <div className="bg-gray-800 rounded-lg p-8">
            <div className="bg-gradient-to-br from-blue-900 to-indigo-900 rounded-lg h-96 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">📐</div>
                <h3 className="text-2xl font-bold mb-2">3D CAD Viewer</h3>
                <p className="text-gray-300 mb-4">Interactive Three.js-powered 3D model viewer</p>
                <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold">
                  Load Sample Model
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 3D Plan Deliverables */}
        <section>
          <h2 className="text-3xl font-bold mb-6">3D Plan Deliverables</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <DeliverableCard
              icon="📚"
              title="3D Product Catalogs"
              price="$25K - $45K"
              timeline="4-6 weeks"
              description="Interactive web-based product viewers"
            />
            <DeliverableCard
              icon="⚡"
              title="Parametric Design Systems"
              price="$40K - $80K"
              timeline="8-12 weeks"
              description="Custom parametric CAD platform"
              featured
            />
            <DeliverableCard
              icon="🎨"
              title="Engineering Visualization"
              price="$30K - $60K"
              timeline="6-10 weeks"
              description="Advanced rendering and simulation"
            />
            <DeliverableCard
              icon="🏢"
              title="Enterprise CAD Platform"
              price="$100K - $200K"
              timeline="16-24 weeks"
              description="Complete browser-based CAD solution"
            />
          </div>
        </section>
      </div>
    </div>
  );
}

function ServiceCard({ icon, title, status, projects, revenue, description }: any) {
  const statusColor = status === 'Active' ? 'bg-green-500' : 'bg-yellow-500';

  return (
    <div className="bg-gray-800 rounded-lg p-6 border-2 border-gray-700 hover:border-blue-500 transition">
      <div className="flex justify-between items-start mb-3">
        <span className="text-4xl">{icon}</span>
        <span className={`${statusColor} text-white text-xs px-2 py-1 rounded-full`}>
          {status}
        </span>
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-400 text-sm mb-4">{description}</p>
      <div className="flex justify-between text-sm">
        <div>
          <div className="text-gray-400">Projects</div>
          <div className="text-blue-400 font-bold">{projects}</div>
        </div>
        <div>
          <div className="text-gray-400">Revenue</div>
          <div className="text-blue-400 font-bold">{revenue}</div>
        </div>
      </div>
    </div>
  );
}

function DeliverableCard({ icon, title, price, timeline, description, featured }: any) {
  return (
    <div className={`bg-gray-800 rounded-lg p-6 border-2 ${featured ? 'border-blue-500' : 'border-gray-700'} hover:border-blue-400 transition relative`}>
      {featured && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white text-xs px-3 py-1 rounded-full">
          Most Popular
        </div>
      )}
      <div className="text-center mb-4">
        <div className="text-5xl mb-3">{icon}</div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <div className="text-2xl font-bold text-blue-400 mb-2">{price}</div>
        <p className="text-gray-400 text-sm">{description}</p>
      </div>
      <div className="flex items-center justify-center gap-2 text-sm text-gray-400 mt-4">
        <span>⏱️</span>
        <span>{timeline}</span>
      </div>
      <button className="w-full bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-semibold mt-4">
        Request Quote
      </button>
    </div>
  );
}
