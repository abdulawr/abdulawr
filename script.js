
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
                    social: this.showSocial.bind(this)
                };
                
                this.init();
            }
            
            init() {
                this.input.addEventListener('keydown', this.handleKeyDown.bind(this));
                this.input.focus();
                
                document.addEventListener('click', () => {
                    this.input.focus();
                });

                // Add click handlers to command items
                document.querySelectorAll('.command-item').forEach(item => {
                    item.addEventListener('click', () => {
                        const command = item.querySelector('.command-key').textContent;
                        this.input.value = command;
                        this.processCommand(command);
                        this.input.value = '';
                    });
                });

                // Initialize particles
                this.createParticles();
            }
            
            createParticles() {
                const particlesContainer = document.getElementById('particles');
                const particleCount = 50;
                
                for (let i = 0; i < particleCount; i++) {
                    const particle = document.createElement('div');
                    particle.className = 'particle';
                    particle.style.left = Math.random() * 100 + '%';
                    particle.style.animationDelay = Math.random() * 15 + 's';
                    particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
                    particlesContainer.appendChild(particle);
                }
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
                
                this.addOutput(`
                    <div style="color: var(--primary); margin-bottom: 16px;">
                        <span style="color: var(--text-dim);">▶</span> ${command}
                    </div>
                `);
                
                if (command === '') return;
                
                const [cmd, ...args] = command.split(' ');
                
                if (this.commands[cmd]) {
                    this.commands[cmd](args);
                } else if (command) {
                    this.addOutput(`<div style="color: var(--warning);">Command not found: ${cmd}. Type 'help' for available commands.</div>`);
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
                    <div class="section">
                        <div class="section-header">
                            <div class="section-icon">📚</div>
                            <div class="section-title">Command Reference</div>
                        </div>
                        <div class="command-grid">
                            ${Object.keys(this.commands).map(cmd => `
                                <div class="command-item">
                                    <div class="command-key">${cmd}</div>
                                    <div class="command-description">${this.getCommandDescription(cmd)}</div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `;
                this.addOutput(helpContent);
            }
            
            getCommandDescription(cmd) {
                const descriptions = {
                    help: 'Show this help message',
                    about: 'Display personal information',
                    experience: 'View work experience',
                    education: 'Show educational background',
                    skills: 'List technical skills',
                    projects: 'Browse portfolio projects',
                    certifications: 'View certifications',
                    awards: 'Show awards & recognition',
                    contact: 'Get contact information',
                    social: 'View social links',
                    clear: 'Clear the terminal'
                };
                return descriptions[cmd] || 'Execute command';
            }
            
            showAbout() {
                const aboutContent = `
                    <div class="section">
                        <div class="section-header">
                            <div class="section-icon">👤</div>
                            <div class="section-title">About Me</div>
                        </div>
                        <div class="card">
                            <div class="card-description">
                                ${portfolioData.personal.summary}
                            </div>
                            <div class="tags">
                                ${portfolioData.personal.languages.map(lang => `<span class="tag">${lang}</span>`).join('')}
                            </div>
                        </div>
                    </div>
                `;
                this.addOutput(aboutContent);
            }
            
            showExperience() {
                let experienceContent = `
                    <div class="section">
                        <div class="section-header">
                            <div class="section-icon">💼</div>
                            <div class="section-title">Professional Experience</div>
                        </div>
                `;
                
                portfolioData.experience.forEach(exp => {
                    experienceContent += `
                        <div class="card">
                            <div class="card-title">${exp.title}</div>
                            <div class="card-subtitle">${exp.company} • ${exp.location} • ${exp.duration}</div>
                            <div class="card-description">
                                <ul style="margin: 12px 0; padding-left: 20px;">
                                    ${exp.achievements.map(achievement => `<li style="margin: 8px 0; color: var(--text-secondary);">${achievement}</li>`).join('')}
                                </ul>
                            </div>
                        </div>
                    `;
                });

                experienceContent += `</div>`;
                this.addOutput(experienceContent);
            }

            showEducation() {
                let educationContent = `
                    <div class="section">
                        <div class="section-header">
                            <div class="section-icon">🎓</div>
                            <div class="section-title">Education</div>
                        </div>
                `;
                
                portfolioData.education.forEach(edu => {
                    educationContent += `
                        <div class="card">
                            <div class="card-title">${edu.degree}</div>
                            <div class="card-subtitle">${edu.institution} • ${edu.location} • ${edu.duration}</div>
                            <div class="card-description">
                                ${edu.cgpa ? `<div style="margin: 8px 0;"><strong>CGPA:</strong> ${edu.cgpa}</div>` : ''}
                                ${edu.honors ? `<div style="margin: 8px 0; color: var(--primary);"><strong>🏆 ${edu.honors}</strong></div>` : ''}
                                ${edu.scholarship ? `<div style="margin: 8px 0; color: var(--secondary);"><strong>💰 ${edu.scholarship}</strong></div>` : ''}
                                ${edu.status ? `<div style="margin: 8px 0; color: var(--warning);"><strong>Status:</strong> ${edu.status}</div>` : ''}
                            </div>
                        </div>
                    `;
                });

                educationContent += `</div>`;
                this.addOutput(educationContent);
            }

            showSkills() {
                const skillsContent = `
                    <div class="section">
                        <div class="section-header">
                            <div class="section-icon">🛠️</div>
                            <div class="section-title">Technical Skills</div>
                        </div>
                        <div class="skills-grid">
                            <div class="skill-category">
                                <div class="skill-category-title">Languages</div>
                                <div class="skill-items">
                                    ${portfolioData.skills.languages.map(skill => `
                                        <div class="skill-item">
                                            <div class="skill-bullet"></div>
                                            <span>${skill}</span>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                            <div class="skill-category">
                                <div class="skill-category-title">Frameworks</div>
                                <div class="skill-items">
                                    ${portfolioData.skills.frameworks.map(skill => `
                                        <div class="skill-item">
                                            <div class="skill-bullet"></div>
                                            <span>${skill}</span>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                            <div class="skill-category">
                                <div class="skill-category-title">Databases</div>
                                <div class="skill-items">
                                    ${portfolioData.skills.databases.map(skill => `
                                        <div class="skill-item">
                                            <div class="skill-bullet"></div>
                                            <span>${skill}</span>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                            <div class="skill-category">
                                <div class="skill-category-title">Cloud & DevOps</div>
                                <div class="skill-items">
                                    ${portfolioData.skills.cloud.map(skill => `
                                        <div class="skill-item">
                                            <div class="skill-bullet"></div>
                                            <span>${skill}</span>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                            <div class="skill-category">
                                <div class="skill-category-title">Tools</div>
                                <div class="skill-items">
                                    ${portfolioData.skills.tools.map(skill => `
                                        <div class="skill-item">
                                            <div class="skill-bullet"></div>
                                            <span>${skill}</span>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                            <div class="skill-category">
                                <div class="skill-category-title">Practices</div>
                                <div class="skill-items">
                                    ${portfolioData.skills.practices.map(skill => `
                                        <div class="skill-item">
                                            <div class="skill-bullet"></div>
                                            <span>${skill}</span>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                this.addOutput(skillsContent);
            }

            showProjects() {
                let projectsContent = `
                    <div class="section">
                        <div class="section-header">
                            <div class="section-icon">🚀</div>
                            <div class="section-title">Featured Projects</div>
                        </div>
                `;
                
                portfolioData.projects.forEach(project => {
                    projectsContent += `
                        <div class="card">
                            <div class="card-title">${project.name}</div>
                            <div class="card-subtitle">${project.company} • ${project.duration}</div>
                            <div class="card-description">
                                <p style="margin-bottom: 12px;">${project.description}</p>
                                
                                <div style="margin: 16px 0;">
                                    <strong style="color: var(--primary);">Key Features:</strong>
                                    <ul style="margin: 8px 0; padding-left: 20px;">
                                        ${project.features.map(feature => `<li style="margin: 4px 0; color: var(--text-secondary);">${feature}</li>`).join('')}
                                    </ul>
                                </div>

                                ${project.metrics ? `<div style="margin: 12px 0; padding: 8px; background: rgba(0, 220, 130, 0.1); border-radius: 6px; color: var(--primary);"><strong>Impact:</strong> ${project.metrics}</div>` : ''}
                                
                                <div style="margin: 12px 0;">
                                    ${project.github ? `<a href="${project.github}" style="color: var(--primary); text-decoration: none; margin-right: 16px;">🔗 GitHub</a>` : ''}
                                    ${project.website ? `<a href="${project.website}" style="color: var(--secondary); text-decoration: none;">🌐 Live Demo</a>` : ''}
                                </div>
                            </div>
                            <div class="tags">
                                ${project.technologies.map(tech => `<span class="tag">${tech}</span>`).join('')}
                            </div>
                        </div>
                    `;
                });

                projectsContent += `</div>`;
                this.addOutput(projectsContent);
            }

            showCertifications() {
                let certificationsContent = `
                    <div class="section">
                        <div class="section-header">
                            <div class="section-icon">📜</div>
                            <div class="section-title">Certifications</div>
                        </div>
                `;
                
                const certsByType = {};
                portfolioData.certifications.forEach(cert => {
                    if (!certsByType[cert.type]) {
                        certsByType[cert.type] = [];
                    }
                    certsByType[cert.type].push(cert);
                });

                Object.keys(certsByType).forEach(type => {
                    certificationsContent += `
                        <div class="skill-category" style="margin-bottom: 16px;">
                            <div class="skill-category-title">${type}</div>
                            <div class="skill-items">
                                ${certsByType[type].map(cert => `
                                    <div class="card" style="margin-bottom: 8px;">
                                        <div class="card-title">${cert.name}</div>
                                        <div class="card-subtitle">Issued by ${cert.issuer}</div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    `;
                });

                certificationsContent += `</div>`;
                this.addOutput(certificationsContent);
            }

            showAwards() {
                let awardsContent = `
                    <div class="section">
                        <div class="section-header">
                            <div class="section-icon">🏆</div>
                            <div class="section-title">Awards & Recognition</div>
                        </div>
                `;
                
                portfolioData.awards.forEach(award => {
                    awardsContent += `
                        <div class="card">
                            <div class="card-title">${award.title}</div>
                            <div class="card-subtitle">${award.year}</div>
                            <div class="card-description">${award.description}</div>
                        </div>
                    `;
                });

                awardsContent += `</div>`;
                this.addOutput(awardsContent);
            }

            showContact() {
                const contactContent = `
                    <div class="section">
                        <div class="section-header">
                            <div class="section-icon">📧</div>
                            <div class="section-title">Get In Touch</div>
                        </div>
                        <div class="card">
                            <div class="card-description">
                                <div style="margin: 12px 0; display: flex; align-items: center; gap: 12px;">
                                    <span style="color: var(--primary);">📧</span>
                                    <a href="mailto:${portfolioData.personal.email}" style="color: var(--text-primary); text-decoration: none;">${portfolioData.personal.email}</a>
                                </div>
                                <div style="margin: 12px 0; display: flex; align-items: center; gap: 12px;">
                                    <span style="color: var(--primary);">📱</span>
                                    <a href="tel:${portfolioData.personal.phone}" style="color: var(--text-primary); text-decoration: none;">${portfolioData.personal.phone}</a>
                                </div>
                                <div style="margin: 12px 0; display: flex; align-items: center; gap: 12px;">
                                    <span style="color: var(--primary);">📍</span>
                                    <span>${portfolioData.personal.location}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                this.addOutput(contactContent);
            }

            showSocial() {
                const socialContent = `
                    <div class="section">
                        <div class="section-header">
                            <div class="section-icon">🌐</div>
                            <div class="section-title">Social Links</div>
                        </div>
                        <div class="card">
                            <div class="card-description">
                                <div style="margin: 12px 0; display: flex; align-items: center; gap: 12px;">
                                    <span style="color: var(--primary);">💼</span>
                                    <a href="${portfolioData.personal.linkedin}" target="_blank" style="color: var(--primary); text-decoration: none;">LinkedIn Profile</a>
                                </div>
                                <div style="margin: 12px 0; display: flex; align-items: center; gap: 12px;">
                                    <span style="color: var(--primary);">🐙</span>
                                    <a href="${portfolioData.personal.github}" target="_blank" style="color: var(--secondary); text-decoration: none;">GitHub Repository</a>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                this.addOutput(socialContent);
            }
            
            clearTerminal() {
                // Only remove command outputs, keep the welcome section and command palette
                const commandOutputs = this.output.querySelectorAll('.command-output');
                commandOutputs.forEach(output => output.remove());
                
                this.addOutput(`
                    <div style="color: var(--primary); text-align: center; padding: 20px;">
                        <div style="font-size: 18px; margin-bottom: 8px;">Terminal Cleared</div>
                        <div style="color: var(--text-dim); font-size: 14px;">Type 'help' to see available commands</div>
                    </div>
                `);
            }
        }

        // Initialize terminal when page loads
        document.addEventListener('DOMContentLoaded', () => {
            const terminal = new Terminal();
        });