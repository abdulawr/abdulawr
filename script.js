// Global variable to store portfolio data
let portfolioData = null;

class Terminal {
    constructor() {
        this.output = document.getElementById('output');
        this.input = document.getElementById('commandInput');
        this.commandHistory = [];
        this.historyIndex = -1;
        
        this.commands = {
            help: this.showHelp.bind(this),
            about: this.showAbout.bind(this),
            experience: this.showExperience.bind(this),
            education: this.showEducation.bind(this),
            skills: this.showSkills.bind(this),
            projects: this.showProjects.bind(this),
            certifications: this.showCertifications.bind(this),
            awards: this.showAwards.bind(this),
            contact: this.showContact.bind(this),
            clear: this.clearTerminal.bind(this),
            resume: this.downloadResume.bind(this),
            social: this.showSocial.bind(this)
        };
        
        this.init();
    }
    
    init() {
        this.input.addEventListener('keydown', this.handleKeyDown.bind(this));
        this.input.focus();
        
        // Keep input focused
        document.addEventListener('click', () => {
            this.input.focus();
        });
    }
    
    handleKeyDown(e) {
        if (e.key === 'Enter') {
            const command = this.input.value.trim().toLowerCase();
            this.processCommand(command);
            this.input.value = '';
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            this.navigateHistory(-1);
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            this.navigateHistory(1);
        }
    }
    
    navigateHistory(direction) {
        if (this.commandHistory.length === 0) return;
        
        this.historyIndex += direction;
        if (this.historyIndex < 0) this.historyIndex = 0;
        if (this.historyIndex >= this.commandHistory.length) {
            this.historyIndex = this.commandHistory.length;
            this.input.value = '';
            return;
        }
        
        this.input.value = this.commandHistory[this.historyIndex];
    }
    
    processCommand(command) {
        if (command) {
            this.commandHistory.unshift(command);
            this.historyIndex = -1;
        }
        
        this.addOutput(`<div class="command-line"><span class="user">guest@abdul-portfolio:~$</span> <span class="command">${command}</span></div>`);
        
        if (command === '') return;
        
        const [cmd, ...args] = command.split(' ');
        
        if (this.commands[cmd]) {
            if (!portfolioData) {
                this.addOutput(`<div class="error">Error: Portfolio data not loaded. Please refresh the page.</div>`);
                return;
            }
            this.commands[cmd](args);
        } else {
            this.addOutput(`<div class="error">Command not found: ${cmd}. Type 'help' to see available commands.</div>`);
        }
        
        this.scrollToBottom();
    }
    
    addOutput(content) {
        const div = document.createElement('div');
        div.className = 'command-output';
        div.innerHTML = content;
        this.output.appendChild(div);
    }
    
    scrollToBottom() {
        const terminal = document.getElementById('terminal');
        terminal.scrollTop = terminal.scrollHeight;
    }
    
    showHelp() {
        const helpContent = `
            <div class="section-title">Available Commands</div>
            <div class="help-section">
                <div class="command-item">
                    <span class="command-name">help</span>
                    <span class="command-desc">Show this help message</span>
                </div>
                <div class="command-item">
                    <span class="command-name">about</span>
                    <span class="command-desc">Display personal information and summary</span>
                </div>
                <div class="command-item">
                    <span class="command-name">experience</span>
                    <span class="command-desc">Show work experience and achievements</span>
                </div>
                <div class="command-item">
                    <span class="command-name">education</span>
                    <span class="command-desc">Display educational background</span>
                </div>
                <div class="command-item">
                    <span class="command-name">skills</span>
                    <span class="command-desc">List technical skills and technologies</span>
                </div>
                <div class="command-item">
                    <span class="command-name">projects</span>
                    <span class="command-desc">Showcase portfolio projects</span>
                </div>
                <div class="command-item">
                    <span class="command-name">certifications</span>
                    <span class="command-desc">Display professional certifications</span>
                </div>
                <div class="command-item">
                    <span class="command-name">awards</span>
                    <span class="command-desc">Show awards and recognitions</span>
                </div>
                <div class="command-item">
                    <span class="command-name">contact</span>
                    <span class="command-desc">Get contact information</span>
                </div>
                <div class="command-item">
                    <span class="command-name">social</span>
                    <span class="command-desc">Display social media and professional links</span>
                </div>
                <div class="command-item">
                    <span class="command-name">resume</span>
                    <span class="command-desc">Download resume (placeholder)</span>
                </div>
                <div class="command-item">
                    <span class="command-name">clear</span>
                    <span class="command-desc">Clear the terminal screen</span>
                </div>
            </div>
        `;
        this.addOutput(helpContent);
    }
    
    showAbout() {
        const aboutContent = `
            <div class="section-title">About ${portfolioData.personal.name}</div>
            <div class="section-content">
                <div class="info-grid">
                    <span class="info-label">Name:</span>
                    <span class="info-value">${portfolioData.personal.name}</span>
                    <span class="info-label">Title:</span>
                    <span class="info-value">${portfolioData.personal.title}</span>
                    <span class="info-label">Location:</span>
                    <span class="info-value">${portfolioData.personal.location}</span>
                    <span class="info-label">Languages:</span>
                    <span class="info-value">${portfolioData.personal.languages.join(', ')}</span>
                </div>
                <div style="margin-top: 15px;">
                    <div class="info-label">Summary:</div>
                    <div class="info-value" style="margin-top: 8px;">${portfolioData.personal.summary}</div>
                </div>
            </div>
        `;
        this.addOutput(aboutContent);
    }
    
    showExperience() {
        let experienceContent = `<div class="section-title">Work Experience</div><div class="section-content">`;
        
        portfolioData.experience.forEach(exp => {
            experienceContent += `
                <div class="item">
                    <div class="item-title">${exp.title}</div>
                    <div class="item-subtitle">${exp.company} • ${exp.location} • ${exp.duration}</div>
                    <div class="item-description">Key Achievements:</div>
                    <ul class="achievement-list">
                        ${exp.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
                    </ul>
                </div>
            `;
        });
        
        experienceContent += `</div>`;
        this.addOutput(experienceContent);
    }
    
    showEducation() {
        let educationContent = `<div class="section-title">Education</div><div class="section-content">`;
        
        portfolioData.education.forEach(edu => {
            educationContent += `
                <div class="item">
                    <div class="item-title">${edu.degree}</div>
                    <div class="item-subtitle">${edu.institution} • ${edu.location} • ${edu.duration}</div>
                    <div class="info-grid" style="margin-top: 8px;">
                        ${edu.cgpa ? `<span class="info-label">CGPA:</span><span class="info-value">${edu.cgpa}</span>` : ''}
                        ${edu.honors ? `<span class="info-label">Honors:</span><span class="info-value">${edu.honors}</span>` : ''}
                        ${edu.scholarship ? `<span class="info-label">Scholarship:</span><span class="info-value">${edu.scholarship}</span>` : ''}
                        ${edu.status ? `<span class="info-label">Status:</span><span class="info-value">${edu.status}</span>` : ''}
                    </div>
                </div>
            `;
        });
        
        educationContent += `</div>`;
        this.addOutput(educationContent);
    }
    
    showSkills() {
        const skillsContent = `
            <div class="section-title">Technical Skills</div>
            <div class="section-content">
                <div class="skills-grid">
                    <div class="skill-category">
                        <div class="skill-category-title">Programming Languages</div>
                        <ul class="skill-list">
                            ${portfolioData.skills.languages.map(skill => `<li>${skill}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="skill-category">
                        <div class="skill-category-title">Frameworks & Libraries</div>
                        <ul class="skill-list">
                            ${portfolioData.skills.frameworks.map(skill => `<li>${skill}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="skill-category">
                        <div class="skill-category-title">Databases & APIs</div>
                        <ul class="skill-list">
                            ${portfolioData.skills.databases.map(skill => `<li>${skill}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="skill-category">
                        <div class="skill-category-title">Cloud & DevOps</div>
                        <ul class="skill-list">
                            ${portfolioData.skills.cloud.map(skill => `<li>${skill}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="skill-category">
                        <div class="skill-category-title">Tools & IDEs</div>
                        <ul class="skill-list">
                            ${portfolioData.skills.tools.map(skill => `<li>${skill}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="skill-category">
                        <div class="skill-category-title">Practices & Methodologies</div>
                        <ul class="skill-list">
                            ${portfolioData.skills.practices.map(skill => `<li>${skill}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            </div>
        `;
        this.addOutput(skillsContent);
    }
    
    showProjects() {
        let projectsContent = `<div class="section-title">Featured Projects</div><div class="section-content">`;
        
        portfolioData.projects.forEach(project => {
            projectsContent += `
                <div class="item">
                    <div class="item-title">${project.name}</div>
                    <div class="item-subtitle">${project.company} • ${project.duration}</div>
                    <div class="item-description">${project.description}</div>
                    
                    ${project.features ? `
                        <div style="margin-top: 8px;">
                            <strong class="info-label">Key Features:</strong>
                            <ul class="features-list">
                                ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                            </ul>
                        </div>
                    ` : ''}
                    
                    <div class="tech-tags">
                        ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                    
                    ${project.metrics ? `<div class="success" style="margin-top: 8px;">📈 ${project.metrics}</div>` : ''}
                    ${project.github ? `<div style="margin-top: 5px;"><span class="info-label">GitHub:</span> <span class="link">${project.github}</span></div>` : ''}
                    ${project.website ? `<div style="margin-top: 5px;"><span class="info-label">Website:</span> <span class="link">${project.website}</span></div>` : ''}
                </div>
            `;
        });
        
        projectsContent += `</div>`;
        this.addOutput(projectsContent);
    }
    
    showCertifications() {
        let certificationsContent = `<div class="section-title">Professional Certifications</div><div class="section-content">`;
        
        // Group certifications by type
        const groupedCerts = portfolioData.certifications.reduce((acc, cert) => {
            if (!acc[cert.type]) acc[cert.type] = [];
            acc[cert.type].push(cert);
            return acc;
        }, {});
        
        Object.keys(groupedCerts).forEach(type => {
            certificationsContent += `
                <div class="skill-category" style="margin-bottom: 15px;">
                    <div class="skill-category-title">${type}</div>
                    ${groupedCerts[type].map(cert => `
                        <div class="item" style="margin: 8px 0;">
                            <div class="item-title" style="font-size: 14px;">${cert.name}</div>
                            <div class="item-subtitle">${cert.issuer}</div>
                        </div>
                    `).join('')}
                </div>
            `;
        });
        
        certificationsContent += `</div>`;
        this.addOutput(certificationsContent);
    }
    
    showAwards() {
        let awardsContent = `<div class="section-title">Awards & Recognition</div><div class="section-content">`;
        
        portfolioData.awards.forEach(award => {
            awardsContent += `
                <div class="item">
                    <div class="item-title">🏆 ${award.title}</div>
                    <div class="item-subtitle">${award.year}</div>
                    <div class="item-description">${award.description}</div>
                </div>
            `;
        });
        
        awardsContent += `</div>`;
        this.addOutput(awardsContent);
    }
    
    showContact() {
        const contactContent = `
            <div class="section-title">Contact Information</div>
            <div class="section-content">
                <div class="info-grid">
                    <span class="info-label">📧 Email:</span>
                    <span class="info-value link">${portfolioData.personal.email}</span>
                    <span class="info-label">📱 Phone:</span>
                    <span class="info-value">${portfolioData.personal.phone}</span>
                    <span class="info-label">📍 Location:</span>
                    <span class="info-value">${portfolioData.personal.location}</span>
                </div>
                <div style="margin-top: 15px;" class="success">
                    💡 Feel free to reach out for collaborations, opportunities, or just to connect!
                </div>
            </div>
        `;
        this.addOutput(contactContent);
    }
    
    showSocial() {
        const socialContent = `
            <div class="section-title">Social & Professional Links</div>
            <div class="section-content">
                <div class="info-grid">
                    <span class="info-label">💼 LinkedIn:</span>
                    <span class="info-value link">${portfolioData.personal.linkedin}</span>
                    <span class="info-label">👨‍💻 GitHub:</span>
                    <span class="info-value link">${portfolioData.personal.github}</span>
                </div>
                <div style="margin-top: 15px;" class="info-value">
                    Connect with me on these platforms to stay updated with my latest projects and professional journey!
                </div>
            </div>
        `;
        this.addOutput(socialContent);
    }
    
    downloadResume() {
        const resumeContent = `
            <div class="section-title">Resume Download</div>
            <div class="section-content">
                <div class="warning">📄 Resume download feature is a placeholder in this demo.</div>
                <div style="margin-top: 8px;" class="info-value">
                    In a real implementation, this would trigger a PDF download of the resume.
                </div>
                <div style="margin-top: 8px;" class="success">
                    💡 For now, you can use the 'contact' command to get my contact information!
                </div>
            </div>
        `;
        this.addOutput(resumeContent);
    }
    
    clearTerminal() {
        this.output.innerHTML = '';
    }
}

// Load portfolio data from JSON file
async function loadPortfolioData() {
    try {
        const response = await fetch('portfolio-data.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        portfolioData = await response.json();
        console.log('Portfolio data loaded successfully');
    } catch (error) {
        console.error('Error loading portfolio data:', error);
        // Fallback: show error message
        const output = document.getElementById('output');
        output.innerHTML += `
            <div class="command-output">
                <div class="error">Error: Could not load portfolio data from portfolio-data.json</div>
                <div class="warning">Please ensure portfolio-data.json is in the same directory as index.html</div>
            </div>
        `;
    }
}

// Matrix rain effect
function createMatrixRain() {
    const matrixContainer = document.querySelector('.matrix-rain');
    const characters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    
    for (let i = 0; i < 50; i++) {
        const drop = document.createElement('div');
        drop.style.cssText = `
            position: absolute;
            color: rgba(0, 255, 65, 0.8);
            font-size: 14px;
            font-family: 'Fira Code', monospace;
            left: ${Math.random() * 100}%;
            animation: matrixDrop ${3 + Math.random() * 4}s linear infinite;
            animation-delay: ${Math.random() * 2}s;
            text-shadow: 0 0 5px rgba(0, 255, 65, 0.8);
        `;
        
        drop.textContent = characters[Math.floor(Math.random() * characters.length)];
        matrixContainer.appendChild(drop);
    }
}

// Neural network effect
function createNeuralNetwork() {
    const neuralContainer = document.querySelector('.neural-network');
    
    // Create connecting lines between nodes
    for (let i = 0; i < 8; i++) {
        const line = document.createElement('div');
        line.style.cssText = `
            position: absolute;
            height: 1px;
            background: linear-gradient(90deg, 
                transparent, 
                rgba(0, 255, 255, 0.4), 
                transparent);
            top: ${20 + Math.random() * 60}%;
            left: ${10 + Math.random() * 80}%;
            width: ${100 + Math.random() * 200}px;
            transform: rotate(${Math.random() * 360}deg);
            animation: neuralFlow ${3 + Math.random() * 3}s ease-in-out infinite;
            animation-delay: ${Math.random() * 2}s;
        `;
        neuralContainer.appendChild(line);
    }
}

// Add CSS for matrix rain animation
function addMatrixAnimations() {
    const matrixStyle = document.createElement('style');
    matrixStyle.textContent = `
        @keyframes matrixDrop {
            0% {
                transform: translateY(-100vh);
                opacity: 1;
            }
            100% {
                transform: translateY(100vh);
                opacity: 0;
            }
        }
        
        @keyframes neuralFlow {
            0%, 100% {
                opacity: 0.2;
                transform: scaleX(0.5);
            }
            50% {
                opacity: 0.8;
                transform: scaleX(1);
            }
        }
    `;
    document.head.appendChild(matrixStyle);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {
    // Load portfolio data first
    await loadPortfolioData();
    
    // Create visual effects
    createMatrixRain();
    createNeuralNetwork();
    addMatrixAnimations();
    
    // Initialize terminal with delay for dramatic effect
    setTimeout(() => {
        new Terminal();
    }, 1000);
});