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

// Official exam guide data (AIF-C01)
const examGuide = {
    examCode: "AIF-C01",
    scaledScoreRange: "100–1,000",
    passingScore: 700,
    scoredQuestions: 50,
    unscoredQuestions: 15,
    questionTypes: [
        "Multiple choice (1 correct, 3 distractors)",
        "Multiple response (2+ correct options)",
        "Ordering (3–5 responses in correct order)",
        "Matching (match 3–7 prompts to responses)",
        "Case study (one scenario with 2+ questions)"
    ],
    targetCandidate: [
        "Up to 6 months of exposure to AI/ML technologies on AWS",
        "Uses AI/ML and generative AI services, but does not necessarily build models",
        "Familiar with core AWS services, IAM, shared responsibility model, and AWS global infrastructure"
    ],
    domains: [
        {
            id: 1,
            name: "Fundamentals of AI and ML",
            weight: 20,
            tasks: [
                { code: "1.1", title: "Explain basic AI concepts and terminologies." },
                { code: "1.2", title: "Identify practical use cases for AI." },
                { code: "1.3", title: "Describe the ML development lifecycle." }
            ]
        },
        {
            id: 2,
            name: "Fundamentals of Generative AI",
            weight: 24,
            tasks: [
                { code: "2.1", title: "Explain the basic concepts of generative AI." },
                { code: "2.2", title: "Understand capabilities and limitations of generative AI for business problems." },
                { code: "2.3", title: "Describe AWS infrastructure and technologies for building generative AI applications." }
            ]
        },
        {
            id: 3,
            name: "Applications of Foundation Models",
            weight: 28,
            tasks: [
                { code: "3.1", title: "Describe design considerations for applications that use foundation models." },
                { code: "3.2", title: "Choose effective prompt engineering techniques." },
                { code: "3.3", title: "Describe the training and fine-tuning process for foundation models." },
                { code: "3.4", title: "Describe methods to evaluate foundation model performance." }
            ]
        },
        {
            id: 4,
            name: "Guidelines for Responsible AI",
            weight: 14,
            tasks: [
                { code: "4.1", title: "Explain the development of AI systems that are responsible." },
                { code: "4.2", title: "Recognize the importance of transparent and explainable models." }
            ]
        },
        {
            id: 5,
            name: "Security, Compliance, and Governance for AI Solutions",
            weight: 14,
            tasks: [
                { code: "5.1", title: "Explain methods to secure AI systems." },
                { code: "5.2", title: "Recognize governance and compliance regulations for AI systems." }
            ]
        }
    ]
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
    const questionTypesEl = document.getElementById('question-types');
    const targetCandidateEl = document.getElementById('target-candidate');

    domainsContainer.innerHTML = examGuide.domains.map(d => `
        <div class="domain-item">
            <h4>Domain ${d.id}: ${d.name}</h4>
            <div class="domain-weight">${d.weight}% of scored content</div>
        </div>
    `).join('');

    if (questionTypesEl) {
        questionTypesEl.innerHTML = examGuide.questionTypes
            .map((t) => `<li>${t}</li>`)
            .join('');
    }

    if (targetCandidateEl) {
        targetCandidateEl.innerHTML = examGuide.targetCandidate
            .map((t) => `<p>${t}</p>`)
            .join('');
    }
}

// Syllabus Page
function renderSyllabus() {
    const graphEl = document.getElementById('syllabus-graph');
    const tasksEl = document.getElementById('syllabus-tasks');

    if (graphEl) {
        graphEl.innerHTML = `
            <div class="bar-chart">
                ${examGuide.domains.map(d => `
                    <div class="bar-row">
                        <div class="bar-label">Domain ${d.id}: ${d.name}</div>
                        <div class="bar-track">
                            <div class="bar-fill" style="width: ${d.weight}%"></div>
                        </div>
                        <div class="bar-value">${d.weight}%</div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    if (tasksEl) {
        tasksEl.innerHTML = examGuide.domains.map(d => `
            <div class="domain-item">
                <h4>Domain ${d.id}: ${d.name}</h4>
                <div class="domain-weight">${d.weight}% of scored content</div>
                <div class="tasks">
                    ${d.tasks.map(t => `
                        <div class="task-item">
                            <div class="task-title">Task ${t.code}</div>
                            <div class="task-desc">${t.title}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `).join('');
    }
}

// Cheat Sheet Data (from AWS AI Practitioner Cheat Sheet)
const cheatSheetData = {
    flashcards: [
        { front: "What is AI?", back: "AI is a branch of computer science that develops systems capable of intelligent behaviors like reasoning, learning, and autonomous action." },
        { front: "What is Machine Learning?", back: "ML creates algorithms that facilitate decision-making and predictions. Algorithms enhance performance over time by processing more data." },
        { front: "What is Deep Learning?", back: "A subset of ML that uses neural networks with multiple layers (deep neural networks) to learn from large amounts of data." },
        { front: "What is Generative AI?", back: "A type of AI focused on generating new content, such as images, text, or music, based on learned patterns." },
        { front: "What are Foundation Models?", back: "Large-scale neural networks trained on extensive datasets. They serve as a starting point for tasks like language understanding, text/image generation, and NLP." },
        { front: "What is RAG?", back: "Retrieval Augmented Generation enhances LLMs by referencing authoritative knowledge bases beyond their training data, improving response accuracy without retraining." },
        { front: "What is Amazon Bedrock?", back: "Serverless platform offering foundation models from top AI providers via a unified API for secure, private, and responsible generative AI applications." },
        { front: "What is Amazon SageMaker?", back: "Comprehensive platform for building, training, and deploying machine learning models. Fully managed service with notebooks, debuggers, profilers, and MLOps capabilities." },
        { front: "What is MLOps?", back: "Set of practices combining ML and DevOps to streamline development, deployment, and management of ML models in AWS cloud environment." },
        { front: "What is Responsible AI?", back: "Development of AI systems that are fair, transparent, accountable, safe, and unbiased. Includes fairness, explainability, privacy, security, safety, controllability, veracity, robustness, governance, and transparency." },
        { front: "What is Prompt Engineering?", back: "The art and science of designing inputs to generative models to achieve the best output based on specific objectives." },
        { front: "What is Temperature (inference parameter)?", back: "Controls randomness/creativity. Min 0 = predictable, fact-focused. Max 1 = creative but less predictable." },
        { front: "What is Top-K?", back: "Limits model selection to top K most probable words for next token. Low = focused, High = diverse." },
        { front: "What is Top-P?", back: "Controls diversity by limiting word choices based on cumulative probabilities (0-1). Low = focused, High = diverse." },
        { front: "What is Amazon SageMaker Clarify?", back: "Detects bias in data and models before, during, and after training. Provides explainability and fairness metrics." },
        { front: "What is Amazon SageMaker Model Monitor?", back: "Monitors quality of ML models in production. Detects deviations in model performance, data drift, and potential bias." },
        { front: "What is Amazon Macie?", back: "Data security solution using ML to identify and safeguard sensitive data. Detects sensitive data and offers insights into potential threats." },
        { front: "What is AWS PrivateLink?", back: "Network service to connect to AWS services without exposing data to public internet. Uses VPC endpoints for secure communication." },
        { front: "What are the 3 layers of AI architecture?", back: "1. Data Layer - Prepares and organizes data. 2. Model Layer - Decision-making using foundation/LLMs. 3. Application Layer - User-facing interface." },
        { front: "What are the types of Machine Learning?", back: "1. Supervised Learning - trained on labeled data. 2. Unsupervised Learning - discovers patterns in unlabeled data. 3. Reinforcement Learning - learns by trial and error." }
    ],
    notes: {
        "AI & ML Fundamentals": [
            "AI combines data with algorithms that learn patterns to make decisions",
            "ML algorithms improve performance over time by processing more data",
            "Deep Learning uses neural networks with multiple layers",
            "Generative AI generates new content based on learned patterns",
            "Foundation Models are large-scale neural networks trained on extensive datasets"
        ],
        "AWS ML Services": [
            "Amazon Rekognition - Detects objects, faces, scenes in images/videos",
            "Amazon Comprehend - Analyzes text for sentiment, entities, key phrases",
            "Amazon Translate - Real-time text translation",
            "Amazon Lex - Creates conversational interfaces and chatbots",
            "Amazon Polly - Text-to-speech conversion",
            "Amazon Transcribe - Speech-to-text transcription",
            "Amazon Textract - Extracts text from documents",
            "Amazon Personalize - Personalized recommendations",
            "Amazon Forecast - Time-series forecasting",
            "Amazon Kendra - Enterprise search with ML"
        ],
        "Amazon Bedrock": [
            "Serverless platform offering foundation models from AI21 Labs, Anthropic, Cohere, Meta, Amazon",
            "Unified API for secure, private, responsible generative AI applications",
            "Model states: Active, Legacy, EOL",
            "Features: Model comparison, customization, RAG, Agents, Guardrails",
            "Use cases: Text generation, virtual assistants, search, summarization, image generation"
        ],
        "Amazon SageMaker": [
            "Comprehensive platform for building, training, deploying ML models",
            "Features: Feature Store, Data Wrangler, Notebooks, JumpStart, Model Training, Experiments, Pipelines, MLOps",
            "SageMaker Canvas - Visual, no-code interface for limited coding experience",
            "SageMaker Studio - IDE for advanced coding skills",
            "SageMaker Clarify - Bias detection and explainability",
            "SageMaker Model Monitor - Continuous monitoring of deployed models"
        ],
        "Prompt Engineering": [
            "Zero-shot: Task without examples, relies on general knowledge",
            "Few-shot: Provides small set of examples",
            "Chain-of-thought: Breaks complex reasoning into logical steps",
            "Inference Parameters: Temperature (0-1), Top-K, Top-P, Max Length, Stop Sequences"
        ],
        "RAG (Retrieval Augmented Generation)": [
            "Enhances LLMs by referencing external knowledge bases",
            "Benefits: Cost-effective, current information, enhanced trust, developer control",
            "Process: External data → Embeddings → Vector database → Relevancy search → Augment prompts",
            "AWS services: Amazon OpenSearch, Aurora, Neptune, DocumentDB, RDS PostgreSQL"
        ],
        "Responsible AI": [
            "Components: Fairness, Explainability, Privacy, Security, Safety, Controllability, Veracity, Robustness, Governance, Transparency",
            "Bias: Difference between actual and predicted values",
            "High Bias = Underfitting (too simplistic)",
            "High Variance = Overfitting (learns noise)",
            "Tools: SageMaker Clarify, Model Monitor, Guardrails for Bedrock"
        ],
        "Security & Compliance": [
            "Amazon Macie - ML-based data security and sensitive data detection",
            "AWS PrivateLink - Secure VPC endpoints without public internet",
            "IAM Roles, Policies, Groups - Access control for ML resources",
            "SageMaker Security: VPC setup, interface endpoints, endpoint policies, access control",
            "Cost Tools: AWS Cost Explorer, Billing & Cost Management, Trusted Advisor"
        ]
    },
    references: [
        "AWS AI Practitioner Exam Guide (AIF-C01)",
        "AWS Documentation: https://docs.aws.amazon.com/",
        "Foundation Models: https://aws.amazon.com/what-is/foundation-models/",
        "Bedrock Guardrails: https://docs.aws.amazon.com/bedrock/latest/studio-ug/guardrails.html",
        "ML Best Practices: https://docs.aws.amazon.com/whitepapers/latest/ml-best-practices-public-sector-organizations/security-and-compliance.html"
    ]
};

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

    // Render flashcards
    renderFlashcards();
    
    // Render notes
    renderNotes();
    
    // Render references
    renderReferences();
}

function renderFlashcards() {
    const flashcard = document.getElementById('flashcard');
    const prevBtn = document.getElementById('prev-flashcard');
    const nextBtn = document.getElementById('next-flashcard');
    
    if (!flashcard || !prevBtn || !nextBtn) return;
    
    let currentIndex = 0;
    const flashcards = cheatSheetData.flashcards;
    
    function updateFlashcard() {
        const card = flashcards[currentIndex];
        const counter = document.getElementById('flashcard-counter');
        if (counter) {
            counter.textContent = `Card ${currentIndex + 1} of ${flashcards.length}`;
        }
        
        flashcard.innerHTML = `
            <div class="flashcard-inner">
                <div class="flashcard-front">
                    <h4>Question</h4>
                    <p>${card.front}</p>
                    <small style="margin-top: 20px; color: var(--text-secondary);">Click to flip</small>
                </div>
                <div class="flashcard-back">
                    <h4>Answer</h4>
                    <p>${card.back}</p>
                    <small style="margin-top: 20px; color: var(--text-secondary);">Click to flip back</small>
                </div>
            </div>
        `;
        flashcard.classList.remove('flipped');
        
        flashcard.addEventListener('click', () => {
            flashcard.classList.toggle('flipped');
        });
    }
    
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + flashcards.length) % flashcards.length;
        updateFlashcard();
    });
    
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % flashcards.length;
        updateFlashcard();
    });
    
    updateFlashcard();
}

function renderNotes() {
    const notesContainer = document.getElementById('revision-notes');
    if (!notesContainer) return;
    
    let html = '';
    for (const [topic, points] of Object.entries(cheatSheetData.notes)) {
        html += `
            <div class="content-section" style="margin-bottom: 20px;">
                <h4>${topic}</h4>
                <ul style="margin-left: 20px;">
                    ${points.map(point => `<li style="margin-bottom: 8px;">${point}</li>`).join('')}
                </ul>
            </div>
        `;
    }
    
    notesContainer.innerHTML = html;
}

function renderReferences() {
    const refList = document.getElementById('references-list');
    if (!refList) return;
    
    refList.innerHTML = cheatSheetData.references.map(ref => 
        `<li style="margin-bottom: 12px; padding: 8px; background: var(--bg-secondary); border-radius: var(--radius);">${ref}</li>`
    ).join('');
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
