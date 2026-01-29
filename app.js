// Application State
const appState = {
    modules: [
        {
            id: 1,
            title: "AI & ML Fundamentals",
            description: "Understanding artificial intelligence, machine learning, and deep learning concepts",
            status: "not-started",
            progress: 0,
            topics: ["AI vs ML vs DL", "Supervised vs Unsupervised Learning", "Model Training Basics"]
        },
        {
            id: 2,
            title: "AWS AI Services Overview",
            description: "Comprehensive overview of AWS AI and ML services",
            status: "not-started",
            progress: 0,
            topics: ["Amazon Bedrock", "Amazon SageMaker", "Amazon Rekognition", "Amazon Comprehend"]
        },
        {
            id: 3,
            title: "Generative AI Foundations",
            description: "Large language models, prompting, and RAG patterns",
            status: "not-started",
            progress: 0,
            topics: ["LLMs", "Prompt Engineering", "Embeddings", "RAG Architecture"]
        },
        {
            id: 4,
            title: "Responsible AI & Security",
            description: "Governance, privacy, and security in AWS AI services",
            status: "not-started",
            progress: 0,
            topics: ["Model Governance", "Data Privacy", "Security Best Practices"]
        },
        {
            id: 5,
            title: "Exam Preparation & Practice",
            description: "Final preparation with cheat sheets and practice tests",
            status: "not-started",
            progress: 0,
            topics: ["Cheat Sheets", "Scenario Questions", "Practice Tests"]
        }
    ],
    currentModule: null,
    quizScores: [],
    flashcards: [],
    currentFlashcardIndex: 0
};

// Load state from localStorage
function loadState() {
    const saved = localStorage.getItem('aws-ai-practitioner-state');
    if (saved) {
        Object.assign(appState, JSON.parse(saved));
    }
}

// Save state to localStorage
function saveState() {
    localStorage.setItem('aws-ai-practitioner-state', JSON.stringify(appState));
}

// Initialize app
function init() {
    loadState();
    setupNavigation();
    renderDashboard();
    renderModules();
    renderGuidelines();
    renderSyllabus();
    renderRevision();
}

// Navigation
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');
    const navigateButtons = document.querySelectorAll('[data-navigate]');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = link.dataset.page;
            showPage(page);
        });
    });

    navigateButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const page = btn.dataset.navigate;
            showPage(page);
        });
    });
}

function showPage(pageName) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });

    // Remove active from all nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });

    // Show selected page
    const targetPage = document.getElementById(`page-${pageName}`);
    if (targetPage) {
        targetPage.classList.add('active');
    }

    // Activate nav link
    const targetLink = document.querySelector(`[data-page="${pageName}"]`);
    if (targetLink) {
        targetLink.classList.add('active');
    }

    // Refresh page content if needed
    if (pageName === 'dashboard') {
        renderDashboard();
    } else if (pageName === 'modules') {
        renderModules();
    }
}

// Dashboard Rendering
function renderDashboard() {
    const completed = appState.modules.filter(m => m.status === 'completed').length;
    const inProgress = appState.modules.filter(m => m.status === 'in-progress').length;
    const totalProgress = appState.modules.reduce((sum, m) => sum + m.progress, 0) / appState.modules.length;
    
    document.getElementById('overall-progress').textContent = `${Math.round(totalProgress)}%`;
    document.getElementById('progress-fill').style.width = `${totalProgress}%`;
    document.getElementById('modules-completed').textContent = `${completed} / 5`;
    document.getElementById('quizzes-taken').textContent = appState.quizScores.length;
    
    const avgScore = appState.quizScores.length > 0
        ? Math.round(appState.quizScores.reduce((a, b) => a + b, 0) / appState.quizScores.length)
        : '-';
    document.getElementById('average-score').textContent = avgScore === '-' ? '-' : `${avgScore}%`;

    // Render modules grid
    const modulesGrid = document.getElementById('modules-grid');
    modulesGrid.innerHTML = appState.modules.map(module => `
        <div class="module-card" onclick="openModule(${module.id})">
            <div class="module-card-header">
                <span class="module-number">Module ${module.id}</span>
                <span class="module-status status-${module.status}">${getStatusLabel(module.status)}</span>
            </div>
            <h4 class="module-title">${module.title}</h4>
            <p class="module-description">${module.description}</p>
            <div class="module-progress">Progress: ${module.progress}%</div>
        </div>
    `).join('');
}

function openModule(moduleId) {
    showPage('modules');
    setTimeout(() => {
        const module = appState.modules.find(m => m.id === moduleId);
        if (module) {
            renderModuleDetail(module);
        }
    }, 100);
}

// Modules Page
function renderModules() {
    const moduleList = document.getElementById('module-list');
    moduleList.innerHTML = appState.modules.map(module => `
        <div class="module-list-item ${module.id === appState.currentModule?.id ? 'active' : ''}" 
             onclick="selectModule(${module.id})">
            <div>
                <strong>Module ${module.id}</strong><br>
                <small>${module.title}</small>
            </div>
            <span class="module-status status-${module.status}">${getStatusLabel(module.status)}</span>
        </div>
    `).join('');

    if (appState.currentModule) {
        renderModuleDetail(appState.currentModule);
    } else if (appState.modules.length > 0) {
        selectModule(appState.modules[0].id);
    }
}

function selectModule(moduleId) {
    const module = appState.modules.find(m => m.id === moduleId);
    if (module) {
        appState.currentModule = module;
        renderModuleDetail(module);
        
        // Update active state in list
        document.querySelectorAll('.module-list-item').forEach(item => {
            item.classList.remove('active');
        });
        event.target.closest('.module-list-item')?.classList.add('active');
        
        saveState();
    }
}

function renderModuleDetail(module) {
    const detailContainer = document.getElementById('module-detail');
    detailContainer.innerHTML = `
        <h3>${module.title}</h3>
        <div class="module-detail-content">
            <p><strong>Status:</strong> <span class="module-status status-${module.status}">${getStatusLabel(module.status)}</span></p>
            <p><strong>Progress:</strong> ${module.progress}%</p>
            <p><strong>Description:</strong> ${module.description}</p>
            
            <h4 style="margin-top: 24px; margin-bottom: 12px;">Topics Covered:</h4>
            <ul style="margin-left: 20px; margin-bottom: 24px;">
                ${module.topics.map(topic => `<li>${topic}</li>`).join('')}
            </ul>
            
            <h4 style="margin-top: 24px; margin-bottom: 12px;">Module Content</h4>
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 24px;">
                <p>Detailed content for this module will be displayed here. You can add your study materials, notes, and explanations.</p>
            </div>
            
            <h4 style="margin-top: 24px; margin-bottom: 12px;">Flashcards</h4>
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 24px;">
                <p>Module-specific flashcards will appear here. Click to flip and review key concepts.</p>
            </div>
            
            <h4 style="margin-top: 24px; margin-bottom: 12px;">Quiz</h4>
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 24px;">
                <p>Take a quiz to test your understanding of this module's content.</p>
                <button class="btn btn-primary" style="margin-top: 12px;" onclick="startModuleQuiz(${module.id})">Start Quiz</button>
            </div>
        </div>
        <div class="module-actions">
            <button class="btn btn-primary" onclick="markModuleComplete(${module.id})">Mark as Complete</button>
            <button class="btn btn-secondary" onclick="markModuleInProgress(${module.id})">Mark as In Progress</button>
        </div>
    `;
}

function markModuleComplete(moduleId) {
    const module = appState.modules.find(m => m.id === moduleId);
    if (module) {
        module.status = 'completed';
        module.progress = 100;
        saveState();
        renderModules();
        renderDashboard();
    }
}

function markModuleInProgress(moduleId) {
    const module = appState.modules.find(m => m.id === moduleId);
    if (module) {
        module.status = 'in-progress';
        if (module.progress === 0) module.progress = 25;
        saveState();
        renderModules();
        renderDashboard();
    }
}

function startModuleQuiz(moduleId) {
    alert(`Quiz for Module ${moduleId} will be implemented here. This will test your knowledge of the module content.`);
}

// Guidelines Page
function renderGuidelines() {
    const domainsContainer = document.getElementById('exam-domains');
    const domains = [
        { name: "Domain 1: AI/ML Concepts", weight: "20%", description: "Fundamental concepts of AI, ML, and deep learning" },
        { name: "Domain 2: AWS AI Services", weight: "30%", description: "Understanding AWS AI and ML services" },
        { name: "Domain 3: Generative AI", weight: "25%", description: "LLMs, prompting, and generative AI patterns" },
        { name: "Domain 4: Responsible AI", weight: "25%", description: "Governance, security, and ethical AI practices" }
    ];
    
    domainsContainer.innerHTML = domains.map(domain => `
        <div class="domain-item">
            <h4>${domain.name} (${domain.weight})</h4>
            <p>${domain.description}</p>
        </div>
    `).join('');
}

// Syllabus Page
function renderSyllabus() {
    const syllabusContainer = document.getElementById('syllabus-content');
    syllabusContainer.innerHTML = `
        <div class="info-card">
            <h4>Complete Syllabus Breakdown</h4>
            <p style="margin-top: 12px;">The AWS AI Practitioner exam covers the following key areas:</p>
            <ul style="margin-top: 12px; margin-left: 20px;">
                <li>AI/ML Fundamentals and Terminology</li>
                <li>AWS AI Services (Bedrock, SageMaker, Rekognition, Comprehend, etc.)</li>
                <li>Generative AI Concepts and Applications</li>
                <li>Model Training and Deployment</li>
                <li>Data Preparation and Feature Engineering</li>
                <li>Model Evaluation and Monitoring</li>
                <li>Security and Compliance in AI</li>
                <li>Responsible AI Practices</li>
            </ul>
        </div>
    `;
}

// Revision Page
function renderRevision() {
    // Setup tabs
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabName = btn.dataset.tab;
            
            tabButtons.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            btn.classList.add('active');
            document.getElementById(`tab-${tabName}`).classList.add('active');
        });
    });

    // Setup flashcards
    const flashcard = document.getElementById('flashcard');
    if (flashcard) {
        flashcard.addEventListener('click', () => {
            flashcard.classList.toggle('flipped');
        });
    }
}

// Helper Functions
function getStatusLabel(status) {
    const labels = {
        'not-started': 'Not Started',
        'in-progress': 'In Progress',
        'completed': 'Completed'
    };
    return labels[status] || status;
}

// Make functions globally available
window.openModule = openModule;
window.selectModule = selectModule;
window.markModuleComplete = markModuleComplete;
window.markModuleInProgress = markModuleInProgress;
window.startModuleQuiz = startModuleQuiz;

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
