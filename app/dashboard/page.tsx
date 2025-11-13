'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import Script from 'next/script';

export default function Dashboard() {
  const viewerRef = useRef<HTMLDivElement>(null);
  const [threeLoaded, setThreeLoaded] = useState(false);
  const [viewerInitialized, setViewerInitialized] = useState(false);
  const sceneRef = useRef<any>(null);
  const animationFrameRef = useRef<number | null>(null);
  const modelAnimationFrameRef = useRef<number | null>(null);

  // Three.js initialization function
  const initThreeJS = useCallback(() => {
    if (typeof window === 'undefined' || !(window as any).THREE || !viewerRef.current) return;

    const THREE = (window as any).THREE;
    const container = viewerRef.current;

    try {
      // Create scene
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x0f3460);

      // Create camera
      const width = container.clientWidth;
      const height = 500;
      const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
      camera.position.z = 5;

      // Create renderer
      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(width, height);
      container.innerHTML = '';
      container.appendChild(renderer.domElement);

      // Add lights
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
      directionalLight.position.set(5, 5, 5);
      scene.add(directionalLight);

      // Add grid
      const gridHelper = new THREE.GridHelper(10, 10, 0x3498db, 0x2c3e50);
      scene.add(gridHelper);

      // Add axes
      const axesHelper = new THREE.AxesHelper(5);
      scene.add(axesHelper);

      // Animation loop
      const animate = () => {
        animationFrameRef.current = requestAnimationFrame(animate);
        renderer.render(scene, camera);
      };
      animate();

      // Store in ref for access from buttons
      sceneRef.current = { scene, camera, renderer };
    } catch (error) {
      console.error('Error initializing Three.js:', error);
    }
  }, []);

  // Initialize Three.js when loaded
  useEffect(() => {
    if (threeLoaded && !viewerInitialized) {
      initThreeJS();
      setViewerInitialized(true);
    }

    // Cleanup function
    return () => {
      // Cancel animation frame
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (modelAnimationFrameRef.current) {
        cancelAnimationFrame(modelAnimationFrameRef.current);
      }

      // Dispose Three.js resources
      if (sceneRef.current) {
        const { scene, renderer } = sceneRef.current;
        if (renderer) {
          renderer.dispose();
        }
        if (scene) {
          scene.traverse((object: any) => {
            if (object.geometry) {
              object.geometry.dispose();
            }
            if (object.material) {
              if (Array.isArray(object.material)) {
                object.material.forEach((material: any) => material.dispose());
              } else {
                object.material.dispose();
              }
            }
          });
        }
      }
    };
  }, [threeLoaded, viewerInitialized, initThreeJS]);

  const loadSampleModel = () => {
    if (!(window as any).THREE || !sceneRef.current) {
      showNotification('3D viewer not ready yet', 'error');
      return;
    }

    try {
      const THREE = (window as any).THREE;
      const { scene, renderer, camera } = sceneRef.current;

      // Cancel existing model animation if any
      if (modelAnimationFrameRef.current) {
        cancelAnimationFrame(modelAnimationFrameRef.current);
      }

      // Create sample model
      const geometry = new THREE.TorusKnotGeometry(1, 0.3, 100, 16);
      const material = new THREE.MeshStandardMaterial({
        color: 0x3498db,
        metalness: 0.5,
        roughness: 0.5
      });
      const model = new THREE.Mesh(geometry, material);
      scene.add(model);

      // Animate rotation
      const animate = () => {
        modelAnimationFrameRef.current = requestAnimationFrame(animate);
        model.rotation.x += 0.005;
        model.rotation.y += 0.01;
        renderer.render(scene, camera);
      };
      animate();

      showNotification('Sample model loaded successfully!', 'success');
    } catch (error) {
      console.error('Error loading model:', error);
      showNotification('Error loading model', 'error');
    }
  };

  const showNotification = (message: string, type: 'info' | 'success' | 'error' = 'info') => {
    if (typeof window === 'undefined') return;

    const colors = {
      info: '#3498db',
      success: '#2ecc71',
      error: '#e74c3c'
    };

    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 100px;
      right: 20px;
      background: ${colors[type]};
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      z-index: 9999;
      animation: slideIn 0.3s ease-out;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.animation = 'slideOut 0.3s ease-out';
      setTimeout(() => notification.remove(), 300);
    }, 4000);
  };

  return (
    <>
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"
        onLoad={() => setThreeLoaded(true)}
        strategy="afterInteractive"
      />

      <div className="min-h-screen bg-[#1a1a2e] text-[#eaeaea]">
        <style jsx global>{`
          @keyframes slideIn {
            from { transform: translateX(400px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
          }
          @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(400px); opacity: 0; }
          }
        `}</style>

        {/* Hero Section */}
        <div className="pt-24 pb-12 bg-gradient-to-r from-purple-600 to-indigo-700">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-4">Engineering & AI Dashboard</h1>
            <p className="text-xl opacity-90">Integrated CAD Workspace + AI/ML Operations Platform</p>
          </div>
        </div>

        {/* Dashboard Stats */}
        <div className="max-w-7xl mx-auto px-4 py-8 -mt-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            {[
              { icon: '🎯', value: '12', label: 'Active Projects' },
              { icon: '🚀', value: '$1.2M', label: 'Revenue Pipeline' },
              { icon: '⚡', value: '8', label: 'AI Models Running' },
              { icon: '📐', value: '24', label: 'CAD Designs' }
            ].map((stat, i) => (
              <div key={i} className="bg-[#16213e] p-6 rounded-lg text-center transform hover:-translate-y-1 transition border border-[#0f3460]">
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold text-blue-400">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* AI/ML Services */}
          <section className="mb-12 bg-[#16213e] p-8 rounded-lg">
            <h2 className="text-3xl font-bold mb-6">AI/ML Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: '🧠', title: 'RAG System Builder', status: 'Active', projects: 3, revenue: '$105K', desc: 'Intelligent document processing and retrieval', tags: ['Document Upload', 'Vector Embedding', 'API Generation'] },
                { icon: '🤖', title: 'ML Model Studio', status: 'Active', projects: 2, revenue: '$240K', desc: 'Custom machine learning model training', tags: ['Dataset Training', 'Hyperparameter Tuning', 'Model Export'] },
                { icon: '👁️', title: 'Computer Vision Lab', status: 'Active', projects: 1, revenue: '$180K', desc: 'Advanced image and video analysis', tags: ['Object Detection', 'Quality Control', 'Real-time Analysis'] },
                { icon: '💬', title: 'NLP Analytics Suite', status: 'Planning', projects: 0, revenue: '$0K', desc: 'Natural language processing and analytics', tags: ['Sentiment Analysis', 'Text Classification', 'Entity Recognition'] }
              ].map((service, i) => (
                <div key={i} className="bg-[#1a1a2e] rounded-lg p-6 border-2 border-[#0f3460] hover:border-blue-500 transition">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-4xl">{service.icon}</span>
                    <span className={`${service.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'} text-xs px-2 py-1 rounded-full`}>
                      {service.status}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                  <p className="text-gray-400 text-sm mb-4">{service.desc}</p>
                  <div className="flex justify-between text-sm mb-4 bg-[#0f3460] p-3 rounded">
                    <div><div className="text-gray-400">Projects</div><div className="text-blue-400 font-bold">{service.projects}</div></div>
                    <div><div className="text-gray-400">Revenue</div><div className="text-blue-400 font-bold">{service.revenue}</div></div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {service.tags.map((tag, j) => (
                      <span key={j} className="bg-[#0f3460] text-xs px-2 py-1 rounded">{tag}</span>
                    ))}
                  </div>
                  <button
                    onClick={() => showNotification(`Opening ${service.title}...`, 'info')}
                    className="w-full bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded font-semibold transition"
                  >
                    Open {service.status === 'Active' ? 'Builder' : 'Configure'}
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* CAD Workspace */}
          <section className="mb-12">
            <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
              <h2 className="text-3xl font-bold">CAD Engineering Workspace</h2>
              <div className="flex gap-2">
                <button onClick={() => showNotification('Creating new project...', 'info')} className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded font-semibold">+ New Project</button>
                <button onClick={() => showNotification('Import CAD File - Supported: STEP, STL, OBJ, IGES', 'info')} className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded font-semibold border border-gray-600">Import</button>
              </div>
            </div>

            <div className="bg-[#16213e] rounded-lg overflow-hidden border-2 border-[#0f3460]">
              {/* Viewer Toolbar */}
              <div className="bg-[#0f3460] p-3 flex gap-4 flex-wrap border-b border-[#0f3460]">
                <div className="flex gap-2">
                  <button className="w-10 h-10 rounded hover:bg-blue-600 transition text-xl" title="Rotate">🔄</button>
                  <button className="w-10 h-10 rounded hover:bg-blue-600 transition text-xl" title="Pan">✋</button>
                  <button className="w-10 h-10 rounded hover:bg-blue-600 transition text-xl" title="Zoom">🔍</button>
                </div>
                <div className="flex gap-2">
                  <button className="w-10 h-10 rounded hover:bg-blue-600 transition text-xl" title="Wireframe">📐</button>
                  <button className="w-10 h-10 rounded hover:bg-blue-600 transition text-xl" title="Solid">🔲</button>
                  <button className="w-10 h-10 rounded hover:bg-blue-600 transition text-xl" title="X-Ray">👻</button>
                </div>
                <div className="flex gap-2">
                  <button className="w-10 h-10 rounded hover:bg-blue-600 transition text-xl" title="Measure">📏</button>
                  <button className="w-10 h-10 rounded hover:bg-blue-600 transition text-xl" title="Annotate">✏️</button>
                  <button className="w-10 h-10 rounded hover:bg-blue-600 transition text-xl" title="Section">✂️</button>
                </div>
              </div>

              {/* 3D Viewer */}
              <div ref={viewerRef} className="w-full h-[500px] bg-gradient-to-br from-blue-900 to-indigo-900 flex items-center justify-center">
                {!viewerInitialized && (
                  <div className="text-center p-4">
                    <div className="text-6xl mb-4">📐</div>
                    <h3 className="text-2xl font-bold mb-2">3D CAD Viewer</h3>
                    <p className="text-gray-300 mb-4">Load a CAD model to begin</p>
                    <button
                      onClick={loadSampleModel}
                      className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold"
                    >
                      Load Sample Model
                    </button>
                  </div>
                )}
              </div>

              {/* Viewer Info */}
              <div className="bg-[#0f3460] p-3 flex justify-between text-sm border-t border-[#0f3460]">
                <span>Status: {viewerInitialized ? 'Ready' : 'Initializing...'}</span>
                <span>{viewerInitialized ? 'Viewer initialized' : 'Loading Three.js...'}</span>
              </div>
            </div>

            {/* Engineering Tools Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
              {[
                { icon: '⚙️', title: 'Parametric Editor', desc: 'Feature-based modeling with constraints', features: ['Constraint system', 'Formula-driven dimensions', 'Real-time updates'] },
                { icon: '🤖', title: 'AI Design Assistant', desc: 'Natural language design commands', features: ['Voice commands', 'Generative design', 'Design optimization'] },
                { icon: '🏭', title: 'Manufacturing Tools', desc: 'CAM toolpath and BOM generation', features: ['CAM toolpaths', 'BOM auto-generation', 'Quality control'] },
                { icon: '♿', title: 'Accessibility Checker', desc: 'WCAG 2.1 AA compliance verification', features: ['ADA compliance', 'Universal design', 'Section 508'] }
              ].map((tool, i) => (
                <div key={i} className="bg-[#16213e] p-6 rounded-lg border border-[#0f3460] hover:border-blue-500 transition">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl">{tool.icon}</span>
                    <h3 className="text-lg font-bold">{tool.title}</h3>
                  </div>
                  <p className="text-sm text-gray-400 mb-4">{tool.desc}</p>
                  <ul className="text-sm space-y-2 mb-4">
                    {tool.features.map((feature, j) => (
                      <li key={j} className="flex items-center gap-2">
                        <span className="text-blue-400">•</span> {feature}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => showNotification(`Opening ${tool.title}...`, 'info')}
                    className="w-full bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded font-semibold border border-gray-600"
                  >
                    Open Tool
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* 3D Plan Deliverables */}
          <section className="mb-12 bg-[#16213e] p-8 rounded-lg">
            <h2 className="text-3xl font-bold mb-6">3D Plan Deliverables</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: '📚', title: '3D Product Catalogs', price: '$25K - $45K', timeline: '4-6 weeks', desc: 'Interactive web-based product viewers', features: ['360° product views', 'Interactive hotspots', 'AR preview capability', 'Mobile responsive'] },
                { icon: '⚡', title: 'Parametric Design Systems', price: '$40K - $80K', timeline: '8-12 weeks', desc: 'Custom parametric CAD platform', features: ['Feature-based modeling', 'Constraint solver', 'Design automation', 'API integration', 'Team collaboration'], featured: true },
                { icon: '🎨', title: 'Engineering Visualization', price: '$30K - $60K', timeline: '6-10 weeks', desc: 'Advanced rendering and simulation', features: ['Photorealistic rendering', 'Animation sequences', 'Assembly simulations', 'Technical illustrations'] },
                { icon: '🏢', title: 'Enterprise CAD Platform', price: '$100K - $200K', timeline: '16-24 weeks', desc: 'Complete browser-based CAD solution', features: ['Full 3D modeling suite', 'Multi-user collaboration', 'Version control', 'Manufacturing integration', 'Custom plugins', 'Accessibility features'] }
              ].map((deliverable, i) => (
                <div key={i} className={`bg-[#1a1a2e] rounded-lg p-6 border-2 ${deliverable.featured ? 'border-blue-500' : 'border-[#0f3460]'} hover:border-blue-400 transition relative`}>
                  {deliverable.featured && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white text-xs px-3 py-1 rounded-full">
                      Most Popular
                    </div>
                  )}
                  <div className="text-center mb-4">
                    <div className="text-5xl mb-3">{deliverable.icon}</div>
                    <h3 className="text-xl font-bold mb-2">{deliverable.title}</h3>
                    <div className="text-2xl font-bold text-blue-400 mb-2">{deliverable.price}</div>
                    <p className="text-gray-400 text-sm">{deliverable.desc}</p>
                  </div>
                  <ul className="text-sm space-y-2 mb-4 border-t border-b border-[#0f3460] py-4">
                    {deliverable.features.map((feature, j) => (
                      <li key={j} className="flex items-center gap-2">
                        <span className="text-green-400">✓</span> {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-400 mb-4 bg-[#0f3460] p-2 rounded">
                    <span>⏱️</span>
                    <span>{deliverable.timeline}</span>
                  </div>
                  <button
                    onClick={() => showNotification(`Quote request for ${deliverable.title}`, 'success')}
                    className="w-full bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-semibold"
                  >
                    Request Quote
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Project Observatory */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Project Observatory</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Active Projects */}
              <div className="bg-[#16213e] rounded-lg p-6 border border-[#0f3460]">
                <h3 className="text-xl font-bold mb-4 pb-3 border-b border-[#0f3460]">Active Projects</h3>
                {[
                  { name: 'Healthcare RAG System', client: 'MedTech Corp', progress: 75, value: '$35K' },
                  { name: 'ML Predictive Analytics', client: 'FinanceAI Inc', progress: 45, value: '$120K' },
                  { name: '3D Product Catalog', client: 'RetailPro', progress: 90, value: '$35K' }
                ].map((project, i) => (
                  <div key={i} className="mb-4 bg-[#0f3460] p-4 rounded">
                    <div className="flex justify-between mb-2">
                      <div>
                        <div className="font-semibold">{project.name}</div>
                        <div className="text-sm text-gray-400">{project.client}</div>
                      </div>
                      <div className="text-green-400 font-bold">{project.value}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-[#1a1a2e] h-2 rounded-full overflow-hidden">
                        <div className="bg-blue-500 h-full transition-all" style={{ width: `${project.progress}%` }}></div>
                      </div>
                      <span className="text-sm text-blue-400 font-bold">{project.progress}%</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Performance Metrics */}
              <div className="bg-[#16213e] rounded-lg p-6 border border-[#0f3460]">
                <h3 className="text-xl font-bold mb-4 pb-3 border-b border-[#0f3460]">Performance Metrics</h3>
                {[
                  { name: 'Model Accuracy', value: '96.5%' },
                  { name: 'API Uptime', value: '99.9%' },
                  { name: 'Response Time', value: '145ms' },
                  { name: 'Client Satisfaction', value: '4.9/5.0' }
                ].map((metric, i) => (
                  <div key={i} className="flex justify-between items-center mb-3 bg-[#0f3460] p-3 rounded">
                    <span className="text-sm">{metric.name}</span>
                    <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-bold">{metric.value}</span>
                  </div>
                ))}
              </div>

              {/* Revenue Tracking */}
              <div className="bg-[#16213e] rounded-lg p-6 border border-[#0f3460]">
                <h3 className="text-xl font-bold mb-4 pb-3 border-b border-[#0f3460]">Revenue Tracking</h3>
                {[
                  { label: 'Q1 2025', amount: '$250K', progress: 85, color: 'bg-blue-500' },
                  { label: 'Q2 Target', amount: '$400K', progress: 60, color: 'bg-yellow-500' },
                  { label: 'Year 1 Goal', amount: '$1M', progress: 30, color: 'bg-green-500' }
                ].map((item, i) => (
                  <div key={i} className="mb-4">
                    <div className="flex justify-between mb-2">
                      <span className="font-semibold">{item.label}</span>
                      <span className="text-blue-400 font-bold">{item.amount}</span>
                    </div>
                    <div className="bg-[#0f3460] h-8 rounded overflow-hidden">
                      <div className={`${item.color} h-full flex items-center px-3 text-white text-sm font-bold transition-all`} style={{ width: `${item.progress}%` }}>
                        {item.progress > 20 && `${item.progress}%`}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center bg-gradient-to-r from-purple-600 to-indigo-700 p-12 rounded-lg">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Business?</h2>
            <p className="text-xl mb-6 opacity-90">Let&apos;s discuss how our AI/ML and CAD engineering services can accelerate your growth</p>
            <div className="flex gap-4 justify-center flex-wrap">
              <a href="/contact" className="bg-white text-indigo-700 hover:bg-gray-100 px-8 py-3 rounded-lg font-bold transition">
                Schedule Consultation
              </a>
              <a href="/portfolio" className="bg-transparent border-2 border-white hover:bg-white/10 px-8 py-3 rounded-lg font-bold transition">
                View Case Studies
              </a>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
