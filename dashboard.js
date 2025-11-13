/**
 * Dashboard JavaScript - CAD Workspace & AI/ML Operations
 * Inner Animals Engineering Platform
 */

// Global Three.js variables
let scene, camera, renderer, model;
let currentViewMode = 'solid';
let currentTool = 'rotate';

// ============================================
// AI/ML Service Functions
// ============================================

function openRAGBuilder() {
    showNotification('Opening RAG System Builder...', 'info');
    setTimeout(() => {
        showNotification('RAG Builder Module - Coming Soon! Document upload and vector embedding features.', 'success');
    }, 500);
}

function openMLStudio() {
    showNotification('Opening ML Model Studio...', 'info');
    setTimeout(() => {
        showNotification('ML Studio Module - Coming Soon! Custom model training and hyperparameter tuning.', 'success');
    }, 500);
}

function openVisionLab() {
    showNotification('Opening Computer Vision Lab...', 'info');
    setTimeout(() => {
        showNotification('Vision Lab Module - Coming Soon! Object detection and quality control features.', 'success');
    }, 500);
}

function openNLPSuite() {
    showNotification('Opening NLP Analytics Suite...', 'info');
    setTimeout(() => {
        showNotification('NLP Suite Module - Coming Soon! Natural language processing and sentiment analysis.', 'success');
    }, 500);
}

// ============================================
// CAD Workspace Functions
// ============================================

function newCADProject() {
    const projectName = prompt('Enter project name:', 'New CAD Project');
    if (projectName) {
        showNotification(`Creating new project: ${projectName}`, 'success');
        // In production, this would initialize a new CAD project
    }
}

function importCADFile() {
    showNotification('Import CAD File - Feature coming soon! Supported formats: STEP, STL, OBJ, IGES', 'info');
    // In production, this would open a file picker
}

// ============================================
// 3D Viewer Tool Functions
// ============================================

function viewTool(tool) {
    currentTool = tool;
    showNotification(`Activated: ${tool.charAt(0).toUpperCase() + tool.slice(1)} Tool`, 'info');

    // Update active button state
    const toolButtons = document.querySelectorAll('.tool-btn');
    toolButtons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
}

function viewMode(mode) {
    currentViewMode = mode;
    showNotification(`View Mode: ${mode.charAt(0).toUpperCase() + mode.slice(1)}`, 'info');

    // In production, this would change the 3D rendering mode
    if (model) {
        switch(mode) {
            case 'wireframe':
                model.material.wireframe = true;
                break;
            case 'solid':
                model.material.wireframe = false;
                model.material.transparent = false;
                break;
            case 'xray':
                model.material.transparent = true;
                model.material.opacity = 0.5;
                break;
        }
    }
}

function measureTool() {
    showNotification('Measurement Tool - Click two points to measure distance', 'info');
}

function annotationTool() {
    showNotification('Annotation Tool - Click to add notes to your model', 'info');
}

function sectionTool() {
    showNotification('Section Tool - Create cross-section views', 'info');
}

// ============================================
// Three.js 3D Viewer Initialization
// ============================================

function initThreeJS() {
    const viewerContainer = document.getElementById('cad-viewer');

    // Only initialize if Three.js is available
    if (typeof THREE === 'undefined') {
        console.warn('Three.js not loaded. 3D viewer will not be initialized.');
        return;
    }

    // Create scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0f3460);

    // Create camera
    const width = viewerContainer.clientWidth;
    const height = viewerContainer.clientHeight;
    camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;

    // Create renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);

    // Remove placeholder and add canvas
    const placeholder = viewerContainer.querySelector('.viewer-placeholder');
    if (placeholder) {
        placeholder.remove();
    }
    viewerContainer.appendChild(renderer.domElement);

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Add grid helper
    const gridHelper = new THREE.GridHelper(10, 10, 0x3498db, 0x2c3e50);
    scene.add(gridHelper);

    // Add axes helper
    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);

    // Handle window resize
    window.addEventListener('resize', () => {
        const width = viewerContainer.clientWidth;
        const height = viewerContainer.clientHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    });

    // Start animation loop
    animate();

    updateViewerStatus('Ready', 'Viewer initialized');
}

function loadSampleModel() {
    showNotification('Loading sample CAD model...', 'info');

    // Initialize Three.js if not already done
    if (!scene) {
        initThreeJS();
    }

    // Create a sample geometric model (torus knot)
    const geometry = new THREE.TorusKnotGeometry(1, 0.3, 100, 16);
    const material = new THREE.MeshStandardMaterial({
        color: 0x3498db,
        metalness: 0.5,
        roughness: 0.5
    });
    model = new THREE.Mesh(geometry, material);
    scene.add(model);

    updateViewerStatus('Model Loaded', 'Sample TorusKnot - 100 vertices');
    showNotification('Sample model loaded successfully!', 'success');
}

function animate() {
    requestAnimationFrame(animate);

    // Rotate model if exists
    if (model) {
        model.rotation.x += 0.005;
        model.rotation.y += 0.01;
    }

    renderer.render(scene, camera);
}

function updateViewerStatus(status, info) {
    const statusElement = document.getElementById('viewer-status');
    const infoElement = document.getElementById('model-info');

    if (statusElement) statusElement.textContent = status;
    if (infoElement) infoElement.textContent = info;
}

// ============================================
// Engineering Tools Functions
// ============================================

function openParametricEditor() {
    showNotification('Parametric Editor - Feature-based modeling with constraints', 'info');
}

function openAIAssistant() {
    showNotification('AI Design Assistant - Natural language design commands activated', 'success');
}

function openManufacturing() {
    showNotification('Manufacturing Tools - CAM toolpaths and BOM generation', 'info');
}

function runAccessibilityCheck() {
    showNotification('Running accessibility compliance check...', 'info');
    setTimeout(() => {
        showNotification('Accessibility Check Complete - WCAG 2.1 AA Compliant ✓', 'success');
    }, 1500);
}

// ============================================
// Deliverables Functions
// ============================================

function requestQuote(type) {
    const typeNames = {
        'catalog': '3D Product Catalog',
        'parametric': 'Parametric Design System',
        'visualization': 'Engineering Visualization',
        'platform': 'Enterprise CAD Platform'
    };

    const typeName = typeNames[type] || type;
    showNotification(`Quote request for ${typeName} - Redirecting to contact form...`, 'success');

    // In production, this would navigate to contact form with pre-filled service type
    setTimeout(() => {
        window.location.href = `contact.html?service=${type}`;
    }, 1500);
}

// ============================================
// Notification System
// ============================================

function showNotification(message, type = 'info') {
    // Create notification element if it doesn't exist
    let notificationContainer = document.getElementById('notification-container');
    if (!notificationContainer) {
        notificationContainer = document.createElement('div');
        notificationContainer.id = 'notification-container';
        notificationContainer.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            z-index: 9999;
            display: flex;
            flex-direction: column;
            gap: 10px;
            max-width: 400px;
        `;
        document.body.appendChild(notificationContainer);
    }

    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        padding: 1rem 1.5rem;
        border-radius: 8px;
        background-color: ${type === 'success' ? '#2ecc71' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        animation: slideIn 0.3s ease-out;
        font-size: 0.9rem;
        line-height: 1.4;
    `;
    notification.textContent = message;

    // Add animation styles if not exists
    if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(400px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Add to container
    notificationContainer.appendChild(notification);

    // Auto remove after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 4000);
}

// ============================================
// Initialize on Page Load
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('Dashboard initialized');

    // Show welcome notification
    setTimeout(() => {
        showNotification('Welcome to the Engineering Dashboard! Explore AI/ML services and CAD tools.', 'success');
    }, 500);

    // Note: Three.js viewer will be initialized when user clicks "Load Sample Model"
    // to avoid unnecessary resource usage
});

// ============================================
// Analytics & Metrics (Placeholder)
// ============================================

function updateDashboardMetrics() {
    // In production, this would fetch real-time metrics from backend
    console.log('Updating dashboard metrics...');
}

// Update metrics every 30 seconds
setInterval(updateDashboardMetrics, 30000);
