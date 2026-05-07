document.addEventListener('DOMContentLoaded', () => {
    // 1. Language Setup
    let currentLang = localStorage.getItem('cv_lang') || 'mn';
    const langBtns = document.querySelectorAll('.lang-btn');
    const navbar = document.querySelector('.navbar');
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    const navAnchorLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    let revealObserver;
    let sectionObserver;

    // Update active button state
    function updateBtnState() {
        langBtns.forEach(btn => {
            if (btn.getAttribute('data-lang') === currentLang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    // 2. Typing Effect Variables & Logic
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingDelay = 100;
    let erasingDelay = 50;
    let newRoleDelay = 2000;
    let typingTimeout;
    
    const typingElement = document.querySelector('.typing-text');

    function stopTyping() {
        clearTimeout(typingTimeout);
    }

    function type() {
        const roles = cvData[currentLang].hero.roles;
        if(roleIndex >= roles.length) roleIndex = 0;
        
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingDelay = erasingDelay;
        } else {
            typingElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingDelay = 100;
        }
        
        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typingDelay = newRoleDelay; // Pause at the end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingDelay = 500; // Pause before typing new word
        }
        
        typingTimeout = setTimeout(type, typingDelay);
    }

    // 3. Rendering logic
    function getNestedValue(obj, path) {
        return path.split('.').reduce((acc, part) => acc && acc[part], obj);
    }

    function initRevealAnimations() {
        const revealTargets = document.querySelectorAll(
            '.hero-text, .hero-visual, .section-header, .section-subtitle, .glass-panel, footer .social-links, footer p'
        );

        if (!revealTargets.length) return;

        if (!('IntersectionObserver' in window)) {
            revealTargets.forEach(el => el.classList.add('is-visible'));
            return;
        }

        if (revealObserver) revealObserver.disconnect();

        revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.14,
            rootMargin: '0px 0px -8% 0px'
        });

        revealTargets.forEach((el, index) => {
            el.classList.add('reveal-item');
            el.style.setProperty('--reveal-delay', `${Math.min(index * 35, 280)}ms`);
            revealObserver.observe(el);
        });
    }

    function initActiveNavObserver() {
        if (!('IntersectionObserver' in window) || !navAnchorLinks.length) return;

        const sections = Array.from(navAnchorLinks)
            .map(link => document.querySelector(link.getAttribute('href')))
            .filter(Boolean);

        if (!sections.length) return;
        if (sectionObserver) sectionObserver.disconnect();

        sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                const currentId = `#${entry.target.id}`;
                navAnchorLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === currentId);
                });
            });
        }, {
            rootMargin: '-36% 0px -50% 0px',
            threshold: 0.01
        });

        sections.forEach(section => sectionObserver.observe(section));
    }

    function updateNavbarState() {
        if (!navbar) return;
        if (window.scrollY > 30) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    function renderContent(lang) {
        const data = cvData[lang];
        if (!data) return;

        // Render static texts
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            const value = getNestedValue(data, key);
            if (value) {
                el.innerHTML = value;
            }
        });

        // Restart typing effect
        stopTyping();
        typingElement.textContent = '';
        roleIndex = 0;
        charIndex = 0;
        isDeleting = false;
        type();

        // Render About section lists
        const eduList = document.getElementById('edu-features-list');
        eduList.innerHTML = data.about.eduFeatures.map(f => 
            `<li><i class='bx bx-check-circle'></i> ${f}</li>`
        ).join('');

        const certTags = document.getElementById('cert-tags-list');
        certTags.innerHTML = data.about.certTags.map(tag => 
            `<span class="tag"><i class='bx bxs-award'></i> ${tag}</span>`
        ).join('');

        const achievementsList = document.getElementById('achievements-list');
        achievementsList.innerHTML = data.about.achievements.map(a => 
            `<li><i class='bx ${a.name === "LeetCode" ? "bx-code-alt" : "bx-shield-quarter"}'></i> <strong>${a.name}:</strong> ${a.desc}</li>`
        ).join('');

        // Render Experience
        const expList = document.getElementById('experience-list');
        expList.innerHTML = data.experience.list.map(exp => `
            <div class="timeline-item">
                <div class="timeline-dot"></div>
                <div class="timeline-content glass-panel">
                    <div class="time-header">
                        <h3 class="job-title">${exp.title}</h3>
                    </div>
                    <p class="job-desc">${exp.desc}</p>
                </div>
            </div>
        `).join('');

        // Render Analysis
        if (data.analysis) {
            const analysisList = document.getElementById('analysis-list');
            analysisList.innerHTML = data.analysis.list.map(item => `
                <div class="project-card glass-panel analysis-card">
                    <div class="project-content">
                        <div class="project-type">${item.category}</div>
                        <h3 class="project-title analysis-tools">${item.tools}</h3>
                        <p class="project-desc analysis-impact">${item.impact}</p>
                    </div>
                </div>
            `).join('');

            const analysisSummaryList = document.getElementById('analysis-summary-list');
            analysisSummaryList.innerHTML = data.analysis.summaryItems.map(item => `
                <li class="analysis-summary-item">
                    <i class='bx bx-check-circle'></i> 
                    <div><strong>${item.label}:</strong> ${item.text}</div>
                </li>
            `).join('');
        }

        // Render Skills
        const skillsList = document.getElementById('skills-list');
        skillsList.innerHTML = data.skills.categories.map(cat => `
            <div class="skill-category glass-panel">
                <div class="category-icon"><i class='bx ${cat.icon}'></i></div>
                <h3>${cat.title}</h3>
                <div class="skill-items">
                    ${cat.items.map(item => `
                        <div class="skill-item">
                            ${item.icon ? `<i class='bx ${item.icon}'></i>` : ''} ${item.name}
                        </div>
                    `).join('')}
                </div>
            </div>
        `).join('');

        // Render Projects
        const projectsList = document.getElementById('projects-list');
        projectsList.innerHTML = data.projects.list.map(proj => `
            <div class="project-card glass-panel">
                <div class="project-content">
                    <div class="project-type">${proj.type}</div>
                    <h3 class="project-title">${proj.title}</h3>
                    <p class="project-desc">${proj.desc}</p>
                    <div class="project-tech">
                        ${proj.techs.map(t => `<span>${t}</span>`).join(' ')}
                    </div>
                </div>
            </div>
        `).join('');

        initRevealAnimations();
    }

    // Initialize
    updateBtnState();
    renderContent(currentLang);
    initActiveNavObserver();
    updateNavbarState();

    // Language switch listener
    langBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const selectedLang = e.target.getAttribute('data-lang');
            if (selectedLang !== currentLang) {
                currentLang = selectedLang;
                localStorage.setItem('cv_lang', currentLang);
                updateBtnState();
                renderContent(currentLang);
            }
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', updateNavbarState);

    if (mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileMenu.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('bx-menu');
                icon.classList.add('bx-x');
            } else {
                icon.classList.remove('bx-x');
                icon.classList.add('bx-menu');
            }
        });
    }

    window.addEventListener('resize', () => {
        if (window.innerWidth > 900 && navLinks && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            const icon = mobileMenu?.querySelector('i');
            if (icon) {
                icon.classList.remove('bx-x');
                icon.classList.add('bx-menu');
            }
        }
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Adjust for fixed navbar
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }

            // Close mobile menu if open
            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                if (mobileMenu) {
                    const icon = mobileMenu.querySelector('i');
                    if (icon) {
                        icon.classList.remove('bx-x');
                        icon.classList.add('bx-menu');
                    }
                }
            }
        });
    });
});
