// Global variables
let portfolioData = {};
let commandHistory = [];
let historyIndex = -1;

// DOM elements
const terminalBody = document.getElementById('terminal-body');
const terminalInput = document.getElementById('terminal-input');
const cursor = document.getElementById('cursor');
const suggestions = document.getElementById('suggestions');

// Load portfolio data
async function loadPortfolioData() {
    try {
        const response = await fetch('portfolio-data.json');
        portfolioData = await response.json();
        initializeTerminal();
    } catch (error) {
        console.error('Failed to load portfolio data:', error);
        // Fallback: use embedded data if JSON fails to load
        portfolioData = getEmbeddedData();
        initializeTerminal();
    }
}

// Fallback embedded data (simplified version)
function getEmbeddedData() {
    return {
        personal: {
            name: "Abdul Basit",
            title: "Software Engineer & Full-Stack Developer",
            location: "Brno, Czech Republic",
            email: "ab.basit.dak@gmail.com",
            phone: "+420 607 876 142",
            linkedin: "https://www.linkedin.com/in/dev-abasit",
            github: "https://github.com/abdulawr",
            summary: "Dynamic Software Engineer with a passion for building software that turns ideas into powerful, user-friendly solutions.",
            languages: ["English (Fluent)", "Czech (Beginner)"]
        },
        experience: [],
        education: [],
        skills: {
            languages: ["JavaScript", "TypeScript", "PHP", "Python", "Java"],
            frameworks: ["ReactJS", "NextJS", "Laravel", "Spring Boot"],
            databases: ["MySQL", "PostgreSQL", "MongoDB"],
            cloud: ["AWS", "Azure", "Firebase"],
            tools: ["Git", "VS Code", "Docker"],
            practices: ["Agile", "Microservices", "CI/CD"]
        },
        projects: [],
        certifications: [],
        awards: []
    };
}

// Command definitions
const commands = {
    help: () => `[92m>> SYSTEM HELP MODULE LOADED[0m

[96mAVAILABLE COMMANDS:[0m
[93mabout[0m          - Personal information and background
[93mskills[0m         - Technical expertise and tools  
[93mprojects[0m       - Featured projects portfolio
[93mproject[0m [name] - Detailed project analysis
[93mexperience[0m     - Professional work history
[93meducation[0m      - Academic credentials
[93mcertifications[0m - Professional certifications
[93mawards[0m         - Achievements and recognition
[93mcontact[0m        - Communication channels
[93mresume[0m         - Download links and summary
[93mgithub[0m         - Repository access
[93mlinkedin[0m       - Professional network
[93mclear[0m          - Clear terminal buffer
[93mwhoami[0m         - Current user info
[93mdate[0m           - System timestamp
[93mneofetch[0m       - System information display

[95mNAVIGATION:[0m
[33m>[0m Use TAB for auto-completion
[33m>[0m UP/DOWN arrows for command history
[33m>[0m Type 'project [name]' for specific details

[91m[SECURE CONNECTION ESTABLISHED][0m`,

    about: () => `[92m>> ACCESSING PERSONNEL FILE...[0m

[96mNAME:[0m ${portfolioData.personal.name}
[96mROLE:[0m ${portfolioData.personal.title}
[96mLOCATION:[0m ${portfolioData.personal.location}

[95mPROFILE SUMMARY:[0m
${portfolioData.personal.summary}

[93mKEY METRICS:[0m
[92m>[0m Gold Medalist - Software Engineering (3.83/4.0 GPA)
[92m>[0m 6x Employee of the Month (2023-2024)
[92m>[0m Merit-based scholarship recipient
[92m>[0m 5+ years development experience

[93mCORE COMPETENCIES:[0m
[92m>[0m Full-stack application architecture
[92m>[0m Real-time communication systems
[92m>[0m Cross-platform mobile/web solutions
[92m>[0m Agile development methodologies

[93mCURRENT STATUS:[0m
[92m>[0m Master's student at Masaryk University
[92m>[0m Available for collaboration opportunities`,

    skills: () => {
        const skills = portfolioData.skills;
        return `[92m>> TECHNICAL CAPABILITIES ANALYSIS[0m

[96mPROGRAMMING LANGUAGES:[0m
${skills.languages?.map(lang => `[32m${lang}[0m`).join(' | ') || 'Loading...'}

[96mFRAMEWORKS & LIBRARIES:[0m  
${skills.frameworks?.map(fw => `[36m${fw}[0m`).join(' | ') || 'Loading...'}

[96mDATABASE SYSTEMS:[0m
${skills.databases?.map(db => `[35m${db}[0m`).join(' | ') || 'Loading...'}

[96mCLOUD & DEVOPS:[0m
${skills.cloud?.map(cloud => `[33m${cloud}[0m`).join(' | ') || 'Loading...'}

[96mDEVELOPMENT TOOLS:[0m
${skills.tools?.map(tool => `[94m${tool}[0m`).join(' | ') || 'Loading...'}

[93mSPECIALIZATIONS:[0m
[91m>[0m 85%+ test coverage maintenance
[91m>[0m Real-time communication systems  
[91m>[0m Microservices architecture
[91m>[0m Cross-platform development`;
    },

    projects: () => {
        let output = `[92m>> PROJECT REPOSITORY ACCESSED[0m\n\n`;
        
        portfolioData.projects?.forEach((project, index) => {
            output += `[95m${index + 1}. ${project.name}[0m
[90m   Duration: ${project.duration} | Company: ${project.company}[0m
[96m   ${project.description}[0m
[93m   Tech Stack:[0m ${project.technologies?.map(tech => `[32m${tech}[0m`).join(', ')}`;
            
            if (project.metrics) {
                output += `\n[91m   Impact: ${project.metrics}[0m`;
            }
            
            if (project.github) {
                output += `\n[94m   Repository: ${project.github}[0m`;
            }
            
            output += '\n\n';
        });

        output += `[93mPROJECT STATISTICS:[0m
[92m>[0m ${portfolioData.projects?.length || 0} major projects completed
[92m>[0m Full-stack development expertise
[92m>[0m Enterprise-level solutions

[90mUSAGE: project [name] for detailed analysis[0m`;
        
        return output;
    },

    project: (args) => {
        if (!args) {
            return `[91mERROR: Project name required[0m\n[90mUsage: project [name][0m`;
        }
        
        const projectName = args.toLowerCase();
        const project = portfolioData.projects?.find(p => 
            p.name.toLowerCase().includes(projectName) || 
            p.name.toLowerCase().replace(/[^a-z0-9]/g, '').includes(projectName.replace(/[^a-z0-9]/g, ''))
        );

        if (!project) {
            return `[91mERROR: Project '${args}' not found in database[0m\n[90mType 'projects' to list all available projects[0m`;
        }

        let output = `[92m>> PROJECT ANALYSIS: ${project.name.toUpperCase()}[0m

[96mDURATION:[0m ${project.duration}
[96mCOMPANY:[0m ${project.company}

[95mDESCRIPTION:[0m
${project.description}

[93mFEATURE SET:[0m`;

        project.features?.forEach(feature => {
            output += `\n[92m>[0m ${feature}`;
        });

        output += `\n\n[93mTECHNOLOGY STACK:[0m
${project.technologies?.map(tech => `[32m${tech}[0m`).join(' | ')}`;

        if (project.metrics) {
            output += `\n\n[93mPERFORMANCE METRICS:[0m
[91m${project.metrics}[0m`;
        }

        if (project.github) {
            output += `\n\n[93mREPOSITORY ACCESS:[0m
[94m${project.github}[0m`;
        }

        if (project.website) {
            output += `\n\n[93mLIVE DEPLOYMENT:[0m
[94m${project.website}[0m`;
        }

        return output;
    },

    experience: () => {
        let output = `[92m>> EMPLOYMENT HISTORY DATABASE[0m\n\n`;
        
        portfolioData.experience?.forEach((exp, index) => {
            output += `[95m${exp.title}[0m
[94m${exp.company} | ${exp.location}[0m
[90m${exp.duration}[0m

[93mKEY ACHIEVEMENTS:[0m`;
            
            exp.achievements?.forEach(achievement => {
                output += `\n[92m>[0m ${achievement}`;
            });
            
            output += '\n\n';
        });

        return output;
    },

    education: () => {
        let output = `[92m>> ACADEMIC CREDENTIALS[0m\n\n`;
        
        portfolioData.education?.forEach(edu => {
            output += `[95m${edu.degree}[0m`;
            
            if (edu.honors) {
                output += ` [91m| ${edu.honors}[0m`;
            }
            
            output += `\n[94m${edu.institution}[0m
[90m${edu.location} | ${edu.duration}[0m`;

            if (edu.cgpa) {
                output += `\n[93mGPA: ${edu.cgpa}[0m`;
            }

            if (edu.scholarship) {
                output += `\n[92m${edu.scholarship}[0m`;
            }

            if (edu.status) {
                output += `\n[96mStatus: ${edu.status}[0m`;
            }

            output += '\n\n';
        });

        return output;
    },

    certifications: () => {
        let output = `[92m>> CERTIFICATION DATABASE[0m\n\n`;
        
        const certsByType = {};
        portfolioData.certifications?.forEach(cert => {
            if (!certsByType[cert.type]) certsByType[cert.type] = [];
            certsByType[cert.type].push(cert);
        });

        Object.keys(certsByType).forEach(type => {
            output += `[95m${type.toUpperCase()}:[0m\n`;
            certsByType[type].forEach(cert => {
                output += `[92m>[0m [94m${cert.name}[0m [90m(${cert.issuer})[0m\n`;
            });
            output += '\n';
        });

        output += `[93mTOTAL CERTIFICATIONS:[0m [91m${portfolioData.certifications?.length || 0}[0m`;
        return output;
    },

    awards: () => {
        let output = `[92m>> ACHIEVEMENTS & RECOGNITION[0m\n\n`;
        
        portfolioData.awards?.forEach(award => {
            output += `[95m${award.title}[0m [90m(${award.year})[0m
[96m${award.description}[0m\n\n`;
        });

        return output;
    },

    contact: () => {
        const data = portfolioData.personal;
        return `[92m>> ESTABLISHING COMMUNICATION CHANNELS[0m

[96mEMAIL:[0m [94m${data.email}[0m
[96mPHONE:[0m [94m${data.phone}[0m
[96mLOCATION:[0m [94m${data.location}[0m

[95mPROFESSIONAL NETWORKS:[0m
[93mLinkedIn:[0m [94m${data.linkedin}[0m
[93mGitHub:[0m [94m${data.github}[0m

[95mLANGUAGE PROTOCOLS:[0m
${data.languages?.map(lang => `[32m${lang}[0m`).join(' | ')}

[91m[SECURE CHANNELS ACTIVE - READY FOR COLLABORATION][0m`;
    },

    resume: () => `[92m>> RESUME ACCESS GRANTED[0m

[95mDOCUMENT STATUS:[0m [92mAVAILABLE[0m
[95mFORMAT:[0m Professional CV with project details

[96mPORTFOLIO LINKS:[0m
[93m>[0m GitHub: [94m${portfolioData.personal.github}[0m
[93m>[0m LinkedIn: [94m${portfolioData.personal.linkedin}[0m

[96mQUICK STATS:[0m
[93m>[0m [91m5+[0m years software development
[93m>[0m [91m${portfolioData.projects?.length || 0}[0m major projects
[93m>[0m [91m${portfolioData.certifications?.length || 0}[0m certifications
[93m>[0m [91mGold Medalist[0m academic achievement

[91m[AVAILABLE FOR IMMEDIATE DEPLOYMENT][0m`,

    github: () => `[92m>> ACCESSING GITHUB REPOSITORIES[0m

[95mPROFILE:[0m [94m${portfolioData.personal.github}[0m

[96mREPOSITORY HIGHLIGHTS:[0m
[92m>[0m Batch Processing Financial Transactions
[92m>[0m Resume Enhancement System  
[92m>[0m Real-Time Stock Trading Dashboard
[92m>[0m Full-stack applications
[92m>[0m Open source contributions

[91m[REPOSITORY ACCESS GRANTED][0m`,

    linkedin: () => `[92m>> LINKEDIN PROFILE ACCESS[0m

[95mPROFILE URL:[0m [94m${portfolioData.personal.linkedin}[0m

[96mNETWORKING AVAILABLE FOR:[0m
[92m>[0m Professional networking
[92m>[0m Job opportunities  
[92m>[0m Technical discussions
[92m>[0m Collaboration projects

[91m[PROFESSIONAL NETWORK ONLINE][0m`,

    whoami: () => {
        const data = portfolioData.personal;
        return `[96m${data.name.toLowerCase().replace(' ', '_')}[0m
[90m${data.title} | Master's Student @ Masaryk University[0m
[90mLocation: ${data.location}[0m`;
    },

    date: () => {
        const now = new Date();
        return `[96mSYSTEM TIME:[0m ${now.toLocaleDateString()} ${now.toLocaleTimeString()}
[96mTIMEZONE:[0m ${Intl.DateTimeFormat().resolvedOptions().timeZone}
[96mUPTIME:[0m ${Math.floor((Date.now() - new Date('2017-09-01').getTime()) / (1000 * 60 * 60 * 24))} days online`;
    },

    neofetch: () => {
        const data = portfolioData.personal;
        return `[92m
    ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄           [96m${data.name}@portfolio-terminal[0m
  ▄▀░░░░░░░░░░░░░░░░░░░░░▀▄         [90m--------------------------[0m
 ▄▀░░░░░░░░░░░░░░░░░░░░░░░▀▄        [93mOS:[0m HackOS Terminal v2.1
▄▀░░░░░░░░░░░░░░░░░░░░░░░░░▀▄       [93mHost:[0m abdul-basit-dev
█░░░░░░░░░░░░░░░░░░░░░░░░░░░█       [93mKernel:[0m Brain v${new Date().getFullYear() - 1995}.${new Date().getMonth() + 1}
█░░░░░░░░░░░░░░░░░░░░░░░░░░░█       [93mUptime:[0m ${Math.floor((Date.now() - new Date('2017-09-01').getTime()) / (1000 * 60 * 60 * 24 * 365))} years
█░░░░░░░░░░░░░░░░░░░░░░░░░░░█       [93mPackages:[0m ${portfolioData.projects?.length || 0} projects
▀▄░░░░░░░░░░░░░░░░░░░░░░░░░▄▀       [93mShell:[0m developer-bash
 ▀▄░░░░░░░░░░░░░░░░░░░░░░░▄▀        [93mTerminal:[0m JetBrains Mono
  ▀▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▀         [93mCPU:[0m Coffee-powered neural net
                                   [93mMemory:[0m ∞ passion for coding
[0m`;
    },

    clear: () => {
        terminalBody.innerHTML = '';
        return '';
    },

    // Easter eggs and additional commands
    sudo: () => `[91mACCESS DENIED: abdul_basit is not in the sudoers file[0m
[90mThis incident will be reported to /dev/null[0m
[95mNice try though! 😏[0m`,

    exit: () => `[92m>> TERMINATING SESSION[0m
[96mConnection closed.[0m
[90mTo exit, close this browser tab[0m
[95mThanks for exploring! 🚀[0m`,

    ls: () => `[96mtotal ${(portfolioData.projects?.length || 0) + 5}[0m
[94mdrwxr-xr-x[0m  2 abdul_basit hackers 4096 Aug 31 2025 [96m./[0m
[94mdrwxr-xr-x[0m  3 abdul_basit hackers 4096 Aug 31 2025 [96m../[0m
[92m-rw-r--r--[0m  1 abdul_basit hackers 2048 Aug 31 2025 about.md
[92m-rw-r--r--[0m  1 abdul_basit hackers 4096 Aug 31 2025 projects.json
[92m-rw-r--r--[0m  1 abdul_basit hackers 1024 Aug 31 2025 contact.txt
[92m-rw-r--r--[0m  1 abdul_basit hackers 3072 Aug 31 2025 resume.pdf
[92m-rw-r--r--[0m  1 abdul_basit hackers 1536 Aug 31 2025 certifications.json`,

    pwd: () => `[96m/home/abdul_basit/portfolio-terminal[0m`,

    cat: (args) => {
        if (!args) return `[91mcat: missing file operand[0m`;
        
        const file = args.trim().toLowerCase();
        const fileMap = {
            'about.md': 'about',
            'projects.json': 'projects', 
            'contact.txt': 'contact',
            'certifications.json': 'certifications',
            'skills.json': 'skills'
        };
        
        return fileMap[file] ? commands[fileMap[file]]() : `[91mcat: ${file}: No such file or directory[0m`;
    },

    echo: (args) => `[96m${args || ''}[0m`,

    tree: () => `[96mportfolio-terminal/[0m
├── [94mabout.md[0m
├── [94mprojects.json[0m  
├── [94mcertifications.json[0m
├── [94mskills.json[0m
├── [94mcontact.txt[0m
├── [94mresume.pdf[0m
└── [94machievements.json[0m

[93m${portfolioData.projects?.length || 0}[0m projects, [93m${portfolioData.certifications?.length || 0}[0m certifications, [93m∞[0m possibilities`,

    // Hacking-themed easter eggs
    matrix: () => `[92m>> MATRIX PROTOCOL INITIATED[0m

[32mWake up, Neo...[0m
[32mThe Matrix has you...[0m  
[32mFollow the white rabbit...[0m

[90mJust kidding! But my code is pretty magical ✨[0m`,

    hack: () => `[92m>> INITIATING HACK SEQUENCE[0m
[91m[ACCESSING MAINFRAME...][0m
[91m[BYPASSING FIREWALL...][0m
[91m[DOWNLOADING DATA...][0m
[92m[SUCCESS: Portfolio data extracted!][0m

[90mRelax, this is just a portfolio demo 😄[0m`,

    nmap: () => `[92m>> NETWORK SCANNING INITIATED[0m

[96mScanning portfolio.abdul-basit.dev...[0m
[92mPORT 22/tcp   OPEN  ssh[0m
[92mPORT 80/tcp   OPEN  http[0m  
[92mPORT 443/tcp  OPEN  https[0m
[92mPORT 3000/tcp OPEN  react-dev[0m
[92mPORT 8080/tcp OPEN  spring-boot[0m

[93mScan complete. 5 open ports detected.[0m
[90mAll services secured with talent and coffee ☕[0m`,

    exploit: () => `[91m>> VULNERABILITY SCANNER[0m

[96mScanning target: portfolio-system...[0m
[92mVulnerability found:[0m [95mExtreme competence in software development[0m
[91mExploit available:[0m [95mHire immediately for maximum impact[0m

[90mNo actual vulnerabilities detected! 🛡️[0m`
};

// Utility functions
function addOutput(content, className = '') {
    const outputDiv = document.createElement('div');
    outputDiv.className = `output-line compact ${className}`;
    outputDiv.innerHTML = parseTerminalColors(content);
    terminalBody.appendChild(outputDiv);
    terminalBody.scrollTop = terminalBody.scrollHeight;
}

function parseTerminalColors(text) {
    // Convert ANSI color codes to HTML
    const colorMap = {
        '[0m': '</span>',     // Reset
        '[90m': '<span style="color: #555555">',  // Dark gray
        '[91m': '<span style="color: #ff0000; text-shadow: 0 0 5px #ff0000">',  // Red
        '[92m': '<span style="color: #00ff00; text-shadow: 0 0 5px #00ff00">',  // Green  
        '[93m': '<span style="color: #ffff00; text-shadow: 0 0 5px #ffff00">',  // Yellow
        '[94m': '<span style="color: #0080ff; text-shadow: 0 0 5px #0080ff">',  // Blue
        '[95m': '<span style="color: #ff0080; text-shadow: 0 0 5px #ff0080">',  // Magenta
        '[96m': '<span style="color: #00ffff; text-shadow: 0 0 5px #00ffff">',  // Cyan
        '[32m': '<span style="color: #00ff41">',  // Matrix green
        '[33m': '<span style="color: #ffff00">',  // Yellow
        '[35m': '<span style="color: #ff00ff">',  // Magenta
        '[36m': '<span style="color: #00ffff">'   // Cyan
    };
    
    let result = text;
    Object.keys(colorMap).forEach(code => {
        result = result.replaceAll(code, colorMap[code]);
    });
    
    return result;
}

function showSuggestions(input) {
    const commandList = Object.keys(commands).concat([
        'project clemata', 'project veezlo', 'project condoapp', 
        'project batch', 'project resume', 'project stock', 'project gensols'
    ]);
    
    const matches = commandList.filter(cmd => cmd.startsWith(input.toLowerCase()));
    if (matches.length > 0 && input.length > 0) {
        suggestions.innerHTML = matches.map(cmd => 
            `<div class="suggestion" onclick="selectSuggestion('${cmd}')">[93m${cmd}[0m</div>`
        ).join('');
        suggestions.style.display = 'block';
    } else {
        suggestions.style.display = 'none';
    }
}

function selectSuggestion(command) {
    terminalInput.value = command;
    suggestions.style.display = 'none';
    terminalInput.focus();
}

function executeCommand(input) {
    const parts = input.trim().split(' ');
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1).join(' ');
    
    if (input.trim() && commandHistory[commandHistory.length - 1] !== input.trim()) {
        commandHistory.push(input.trim());
    }
    historyIndex = commandHistory.length;

    addOutput(`[95mroot@hackterm:~#[0m [93m${input}[0m`);

    if (commands[cmd]) {
        const result = commands[cmd](args);
        if (result) {
            addOutput(result);
        }
    } else if (cmd === '') {
        // Empty command
    } else {
        addOutput(`[91mCommand not found: ${cmd}[0m\n[90mType 'help' for available commands[0m`);
    }

    addOutput('');
    suggestions.style.display = 'none';
}

function handleKeyPress(e) {
    if (e.key === 'Enter') {
        const command = terminalInput.value;
        executeCommand(command);
        terminalInput.value = '';
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (historyIndex > 0) {
            historyIndex--;
            terminalInput.value = commandHistory[historyIndex] || '';
        }
    } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndex < commandHistory.length - 1) {
            historyIndex++;
            terminalInput.value = commandHistory[historyIndex] || '';
        } else {
            historyIndex = commandHistory.length;
            terminalInput.value = '';
        }
    } else if (e.key === 'Tab') {
        e.preventDefault();
        const input = terminalInput.value.toLowerCase();
        const commandList = Object.keys(commands);
        const matches = commandList.filter(cmd => cmd.startsWith(input));
        if (matches.length === 1) {
            terminalInput.value = matches[0];
        } else if (matches.length > 1) {
            addOutput(`[95mroot@hackterm:~#[0m [93m${input}[0m`);
            addOutput(`[96m${matches.join('  ')}[0m`);
            addOutput('');
        }
        suggestions.style.display = 'none';
    } else if (e.key === 'Escape') {
        suggestions.style.display = 'none';
    }
}

function initializeTerminal() {
    // Event listeners
    terminalInput.addEventListener('keydown', handleKeyPress);
    terminalInput.addEventListener('input', (e) => {
        showSuggestions(e.target.value);
    });

    // Keep input focused
    document.addEventListener('click', (e) => {
        if (!suggestions.contains(e.target)) {
            suggestions.style.display = 'none';
        }
        terminalInput.focus();
    });

    // Cursor effects
    terminalInput.addEventListener('focus', () => {
        cursor.style.display = 'inline-block';
    });

    terminalInput.addEventListener('blur', () => {
        setTimeout(() => {
            if (document.activeElement !== terminalInput) {
                cursor.style.display = 'none';
            }
        }, 100);
    });

    // Auto-execute welcome sequence
    setTimeout(() => {
        addOutput(`[92m>> INITIALIZING HACK TERMINAL[0m`);
        setTimeout(() => {
            addOutput(`[91m[BYPASSING SECURITY PROTOCOLS...][0m`);
            setTimeout(() => {
                addOutput(`[92m[ACCESS GRANTED][0m`);
                executeCommand('neofetch');
                setTimeout(() => {
                    addOutput(`[92m>> PORTFOLIO SYSTEM ONLINE[0m
[90mType 'help' to access command database[0m`);
                }, 1000);
            }, 800);
        }, 500);
    }, 300);
}

// Global function for suggestions
window.selectSuggestion = selectSuggestion;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', loadPortfolioData);