// Multi-Exam Application State
const appState = {
    currentExam: null,
    exams: {}
};

// Exam Definitions
const examDefinitions = {
    'aws-ai-practitioner': {
        id: 'aws-ai-practitioner',
        code: 'AIF-C01',
        name: 'AWS Certified AI Practitioner',
        description: 'Demonstrate knowledge of AI/ML, generative AI technologies, and AWS services',
        icon: '🤖',
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
        quizScores: [],
        currentModule: null,
        flashcards: [],
        currentFlashcardIndex: 0,
        examGuide: {
            examCode: "AIF-C01",
            scaledScoreRange: "100–1,000",
            passingScore: 700,
            scoredQuestions: 50,
            unscoredQuestions: 15,
            duration: "90 minutes",
            scoringModel: "Compensatory (no need to pass each section, only overall exam)",
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
            recommendedKnowledge: [
                "Familiarity with core AWS services (EC2, S3, Lambda, SageMaker) and use cases",
                "Understanding of AWS shared responsibility model for security and compliance",
                "Familiarity with AWS IAM for securing and controlling access to AWS resources",
                "Understanding of AWS global infrastructure (Regions, Availability Zones, edge locations)",
                "Familiarity with AWS service pricing models"
            ],
            outOfScope: [
                "Developing or coding AI/ML models or algorithms",
                "Implementing data engineering or feature engineering techniques",
                "Performing hyperparameter tuning or model optimization",
                "Building and deploying AI/ML pipelines or infrastructure",
                "Conducting mathematical or statistical analysis of AI/ML models",
                "Implementing security or compliance protocols for AI/ML systems",
                "Developing and implementing governance frameworks and policies for AI/ML solutions"
            ],
            examTips: [
                "Unanswered questions are scored as incorrect - there is no penalty for guessing",
                "Use the compensatory scoring model - focus on overall performance, not individual sections",
                "Section-level feedback highlights strengths and weaknesses but doesn't determine pass/fail",
                "Read each question carefully, especially multiple response questions",
                "For case studies, each question is evaluated separately",
                "Manage your time - approximately 1.8 minutes per scored question",
                "Review flagged questions if time permits"
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
        },
        cheatSheetData: {
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
                { front: "What is Responsible AI?", back: "Development of AI systems that are fair, transparent, accountable, safe, and unbiased. Includes fairness, explainability, privacy, security, safety, controllability, veracity, robustness, governance, and transparency." }
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
                    "Amazon Polly - Text-to-speech conversion"
                ]
            },
            references: [
                "AWS AI Practitioner Exam Guide (AIF-C01)",
                "AWS Documentation: https://docs.aws.amazon.com/",
                "Foundation Models: https://aws.amazon.com/what-is/foundation-models/"
            ]
        }
    }
    // Add more exams here in the future
};

// Load state from localStorage
function loadState() {
    const saved = localStorage.getItem('certification-platform-state');
    if (saved) {
        const parsed = JSON.parse(saved);
        appState.exams = parsed.exams || {};
        appState.currentExam = parsed.currentExam || null;
    }
    
    // Initialize exam states if they don't exist
    Object.keys(examDefinitions).forEach(examId => {
        if (!appState.exams[examId]) {
            appState.exams[examId] = {
                modules: JSON.parse(JSON.stringify(examDefinitions[examId].modules)),
                quizScores: [],
                currentModule: null,
                flashcards: [],
                currentFlashcardIndex: 0
            };
        }
    });
}

// Save state to localStorage
function saveState() {
    localStorage.setItem('certification-platform-state', JSON.stringify({
        exams: appState.exams,
        currentExam: appState.currentExam
    }));
}

// Initialize app
function init() {
    loadState();
    renderDashboard();
    setupExamNavigation();
}

// Render Main Dashboard (shows all exams)
function renderDashboard() {
    const examsGrid = document.getElementById('exams-grid');
    if (!examsGrid) return;
    
    examsGrid.innerHTML = Object.values(examDefinitions).map(exam => {
        const examState = appState.exams[exam.id] || {};
        const completed = examState.modules?.filter(m => m.status === 'completed').length || 0;
        const totalProgress = examState.modules?.reduce((sum, m) => sum + (m.progress || 0), 0) / exam.modules.length || 0;
        
        return `
            <div class="exam-card" onclick="selectExam('${exam.id}')">
                <div class="exam-card-header">
                    <span class="exam-code">${exam.code}</span>
                    <span class="exam-status status-${completed === exam.modules.length ? 'completed' : completed > 0 ? 'in-progress' : 'not-started'}">
                        ${completed === exam.modules.length ? 'Completed' : completed > 0 ? 'In Progress' : 'Not Started'}
                    </span>
                </div>
                <div class="exam-title">${exam.icon} ${exam.name}</div>
                <div class="exam-description">${exam.description}</div>
                <div class="exam-stats">
                    <div class="exam-stat">
                        <span class="exam-stat-value">${Math.round(totalProgress)}%</span>
                        <span>Progress</span>
                    </div>
                    <div class="exam-stat">
                        <span class="exam-stat-value">${completed}/${exam.modules.length}</span>
                        <span>Modules</span>
                    </div>
                    <div class="exam-stat">
                        <span class="exam-stat-value">${examState.quizScores?.length || 0}</span>
                        <span>Quizzes</span>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Select an exam and show its content
function selectExam(examId) {
    appState.currentExam = examId;
    saveState();
    
    // Hide dashboard, show exam content
    document.getElementById('page-dashboard').classList.remove('active');
    document.getElementById('page-exam-content').classList.add('active');
    document.getElementById('top-nav').style.display = 'block';
    
    // Update nav title
    const exam = examDefinitions[examId];
    document.getElementById('nav-title').textContent = exam.name;
    document.getElementById('exam-dashboard-title').textContent = exam.name;
    document.getElementById('exam-dashboard-subtitle').textContent = exam.description;
    
    // Show exam dashboard
    showExamPage('dashboard');
}

// Show dashboard (back to exam selection)
function showDashboard() {
    appState.currentExam = null;
    saveState();
    
    document.getElementById('page-dashboard').classList.add('active');
    document.getElementById('page-exam-content').classList.remove('active');
    document.getElementById('top-nav').style.display = 'none';
    
    renderDashboard();
}

// Show specific exam page
function showExamPage(pageName) {
    if (!appState.currentExam) return;
    
    // Hide all exam pages
    document.querySelectorAll('.exam-page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show selected page
    const pageMap = {
        'dashboard': 'exam-dashboard',
        'guidelines': 'exam-guidelines',
        'syllabus': 'exam-syllabus',
        'modules': 'exam-modules',
        'final-test': 'exam-final-test',
        'results': 'exam-results',
        'revision': 'exam-revision'
    };
    
    const targetPage = document.getElementById(pageMap[pageName]);
    if (targetPage) {
        targetPage.classList.add('active');
    }
    
    // Update nav buttons
    document.querySelectorAll('.nav-link-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.page === pageName);
    });
    
    // Render page content
    const exam = examDefinitions[appState.currentExam];
    const examState = appState.exams[appState.currentExam];
    
    if (pageName === 'dashboard') {
        renderExamDashboard(exam, examState);
    } else if (pageName === 'guidelines') {
        renderGuidelines(exam);
    } else if (pageName === 'syllabus') {
        renderSyllabus(exam);
    } else if (pageName === 'modules') {
        renderModules(exam, examState);
    } else if (pageName === 'revision') {
        renderRevision(exam, examState);
    }
}

// Setup exam navigation
function setupExamNavigation() {
    document.querySelectorAll('.nav-link-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            showExamPage(btn.dataset.page);
        });
    });
}

// Render Exam Dashboard
function renderExamDashboard(exam, examState) {
    const completed = examState.modules?.filter(m => m.status === 'completed').length || 0;
    const inProgress = examState.modules?.filter(m => m.status === 'in-progress').length || 0;
    const notStarted = examState.modules?.filter(m => m.status === 'not-started').length || 0;
    const totalProgress = examState.modules?.reduce((sum, m) => sum + (m.progress || 0), 0) / exam.modules.length || 0;
    
    document.getElementById('overall-progress').textContent = `${Math.round(totalProgress)}%`;
    document.getElementById('progress-fill').style.width = `${totalProgress}%`;
    document.getElementById('modules-completed').textContent = `${completed} / ${exam.modules.length}`;
    
    const inProgressEl = document.getElementById('modules-in-progress');
    if (inProgressEl) {
        inProgressEl.textContent = inProgress > 0 ? `${inProgress} in progress` : 'None in progress';
    }
    
    document.getElementById('quizzes-taken').textContent = examState.quizScores?.length || 0;
    
    const avgScore = examState.quizScores?.length > 0
        ? Math.round(examState.quizScores.reduce((a, b) => a + b, 0) / examState.quizScores.length)
        : '-';
    document.getElementById('average-score').textContent = avgScore === '-' ? '-' : `${avgScore}%`;
    
    const modulesSummary = document.getElementById('modules-summary');
    if (modulesSummary) {
        modulesSummary.textContent = `${completed} completed • ${inProgress} in progress • ${notStarted} remaining`;
    }
    
    const modulesGrid = document.getElementById('modules-grid');
    modulesGrid.innerHTML = examState.modules.map(module => {
        const progressColor = module.progress === 100 ? 'var(--success-color)' : 
                             module.progress > 0 ? 'var(--warning-color)' : 'var(--text-secondary)';
        return `
        <div class="module-card" onclick="openModule(${module.id})">
            <div class="module-card-header">
                <span class="module-number">Module ${module.id}</span>
                <span class="module-status status-${module.status}">${getStatusLabel(module.status)}</span>
            </div>
            <h4 class="module-title">${module.title}</h4>
            <p class="module-description">${module.description}</p>
            <div style="margin-top: 20px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                    <span style="font-size: 12px; color: var(--text-secondary); font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Progress</span>
                    <span style="font-weight: 700; color: ${progressColor}; font-size: 16px;">${module.progress}%</span>
                </div>
                <div class="progress-bar" style="height: 8px;">
                    <div class="progress-fill" style="width: ${module.progress}%; background: ${progressColor};"></div>
                </div>
            </div>
        </div>
    `;
    }).join('');
}

// Render Guidelines (same as before but uses exam parameter)
function renderGuidelines(exam) {
    const guide = exam.examGuide;
    const domainsContainer = document.getElementById('exam-domains');
    const questionTypesEl = document.getElementById('question-types');
    const targetCandidateEl = document.getElementById('target-candidate');
    const recommendedKnowledgeEl = document.getElementById('recommended-knowledge');
    const outOfScopeEl = document.getElementById('out-of-scope');
    const examTipsEl = document.getElementById('exam-tips');
    const examOverviewEl = document.getElementById('exam-overview');

    if (examOverviewEl) {
        examOverviewEl.innerHTML = `
            <p><strong>Exam Code:</strong> ${guide.examCode}</p>
            <p><strong>Duration:</strong> <strong>${guide.duration}</strong></p>
            <p><strong>Scoring model:</strong> Scaled score from <strong>${guide.scaledScoreRange}</strong></p>
            <p><strong>Minimum passing score:</strong> <strong>${guide.passingScore}</strong></p>
            <p><strong>Total questions:</strong> <strong>${guide.scoredQuestions + guide.unscoredQuestions}</strong> (${guide.scoredQuestions} scored + ${guide.unscoredQuestions} unscored)</p>
            <p style="margin-top: 12px; padding-top: 12px; border-top: 1px solid var(--border-color);">
                <strong>Scoring:</strong> <span style="color: var(--success-color);">${guide.scoringModel}</span>
            </p>
        `;
    }

    domainsContainer.innerHTML = guide.domains.map(d => `
        <div class="domain-item" style="cursor: pointer;" onclick="showExamPage('syllabus')">
            <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 8px;">
                <h4>Domain ${d.id}: ${d.name}</h4>
                <span class="module-status status-completed" style="font-size: 12px;">${d.weight}%</span>
            </div>
            <div class="domain-weight">${d.weight}% of scored content</div>
        </div>
    `).join('');

    if (questionTypesEl) {
        questionTypesEl.innerHTML = guide.questionTypes.map(t => `<li>${t}</li>`).join('');
    }
    if (targetCandidateEl) {
        targetCandidateEl.innerHTML = guide.targetCandidate.map(t => `<p style="margin-bottom: 8px;">${t}</p>`).join('');
    }
    if (recommendedKnowledgeEl) {
        recommendedKnowledgeEl.innerHTML = guide.recommendedKnowledge.map(k => `<li>${k}</li>`).join('');
    }
    if (outOfScopeEl) {
        outOfScopeEl.innerHTML = guide.outOfScope.map(item => `<li style="color: var(--danger-color);">${item}</li>`).join('');
    }
    if (examTipsEl) {
        examTipsEl.innerHTML = guide.examTips.map(tip => `<li style="margin-bottom: 10px;">${tip}</li>`).join('');
    }
}

// Render Syllabus
function renderSyllabus(exam) {
    const guide = exam.examGuide;
    const graphEl = document.getElementById('syllabus-graph');
    const tasksEl = document.getElementById('syllabus-tasks');

    if (graphEl) {
        graphEl.innerHTML = `
            <div class="bar-chart">
                ${guide.domains.map(d => `
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
        tasksEl.innerHTML = guide.domains.map(d => `
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

// Render Modules
function renderModules(exam, examState) {
    const moduleList = document.getElementById('module-list');
    moduleList.innerHTML = examState.modules.map(module => `
        <div class="module-list-item ${module.id === examState.currentModule?.id ? 'active' : ''}" 
             onclick="selectModule(${module.id})">
            <div>
                <strong>Module ${module.id}</strong><br>
                <small>${module.title}</small>
            </div>
            <span class="module-status status-${module.status}">${getStatusLabel(module.status)}</span>
        </div>
    `).join('');

    if (examState.currentModule) {
        renderModuleDetail(examState.currentModule, exam);
    } else if (examState.modules.length > 0) {
        selectModule(examState.modules[0].id);
    }
}

function selectModule(moduleId) {
    if (!appState.currentExam) return;
    const examState = appState.exams[appState.currentExam];
    const module = examState.modules.find(m => m.id === moduleId);
    if (module) {
        examState.currentModule = module;
        renderModuleDetail(module, examDefinitions[appState.currentExam]);
        saveState();
    }
}

function renderModuleDetail(module, exam) {
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
    if (!appState.currentExam) return;
    const examState = appState.exams[appState.currentExam];
    const module = examState.modules.find(m => m.id === moduleId);
    if (module) {
        module.status = 'completed';
        module.progress = 100;
        saveState();
        renderModules(examDefinitions[appState.currentExam], examState);
        renderExamDashboard(examDefinitions[appState.currentExam], examState);
    }
}

function markModuleInProgress(moduleId) {
    if (!appState.currentExam) return;
    const examState = appState.exams[appState.currentExam];
    const module = examState.modules.find(m => m.id === moduleId);
    if (module) {
        module.status = 'in-progress';
        if (module.progress === 0) module.progress = 25;
        saveState();
        renderModules(examDefinitions[appState.currentExam], examState);
        renderExamDashboard(examDefinitions[appState.currentExam], examState);
    }
}

function startModuleQuiz(moduleId) {
    alert(`Quiz for Module ${moduleId} will be implemented here.`);
}

function openModule(moduleId) {
    showExamPage('modules');
    setTimeout(() => {
        selectModule(moduleId);
    }, 100);
}

// Render Revision
function renderRevision(exam, examState) {
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

    renderFlashcards(exam, examState);
    renderNotes(exam);
    renderReferences(exam);
}

function renderFlashcards(exam, examState) {
    const flashcard = document.getElementById('flashcard');
    const prevBtn = document.getElementById('prev-flashcard');
    const nextBtn = document.getElementById('next-flashcard');
    
    if (!flashcard || !prevBtn || !nextBtn) return;
    
    let currentIndex = examState.currentFlashcardIndex || 0;
    const flashcards = exam.cheatSheetData.flashcards;
    
    function updateFlashcard() {
        const card = flashcards[currentIndex];
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
        
        const counter = document.getElementById('flashcard-counter');
        if (counter) {
            counter.textContent = `Card ${currentIndex + 1} of ${flashcards.length}`;
        }
        
        flashcard.addEventListener('click', () => {
            flashcard.classList.toggle('flipped');
        });
        
        examState.currentFlashcardIndex = currentIndex;
        saveState();
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

function renderNotes(exam) {
    const notesContainer = document.getElementById('revision-notes');
    if (!notesContainer) return;
    
    let html = '';
    for (const [topic, points] of Object.entries(exam.cheatSheetData.notes)) {
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

function renderReferences(exam) {
    const refList = document.getElementById('references-list');
    if (!refList) return;
    
    refList.innerHTML = exam.cheatSheetData.references.map(ref => 
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
window.selectExam = selectExam;
window.showDashboard = showDashboard;
window.showExamPage = showExamPage;
window.selectModule = selectModule;
window.markModuleComplete = markModuleComplete;
window.markModuleInProgress = markModuleInProgress;
window.startModuleQuiz = startModuleQuiz;
window.openModule = openModule;

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
