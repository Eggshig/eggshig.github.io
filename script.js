document.addEventListener('DOMContentLoaded', () => {
    // ═══════════════════════════════════════════════════════════
    //  1. Core Element References
    // ═══════════════════════════════════════════════════════════
    let currentLang = localStorage.getItem('cv_lang') || 'mn';
    const langBtns = document.querySelectorAll('.lang-btn');
    const navbar = document.querySelector('.navbar');
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    const navAnchorLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    const scrollProgress = document.getElementById('scroll-progress');
    const mouseGlow = document.getElementById('mouse-glow');
    const particlesCanvas = document.getElementById('particles-canvas');
    let revealObserver;
    let sectionObserver;
    let staggerObserver;

    // ═══════════════════════════════════════════════════════════
    //  2. Particle System
    // ═══════════════════════════════════════════════════════════
    function initParticles() {
        if (!particlesCanvas) return;
        const ctx = particlesCanvas.getContext('2d');
        let particles = [];
        const PARTICLE_COUNT = 60;

        function resize() {
            particlesCanvas.width = window.innerWidth;
            particlesCanvas.height = window.innerHeight;
        }
        resize();
        window.addEventListener('resize', resize);

        class Particle {
            constructor() {
                this.reset();
            }
            reset() {
                this.x = Math.random() * particlesCanvas.width;
                this.y = Math.random() * particlesCanvas.height;
                this.size = Math.random() * 1.5 + 0.3;
                this.speedX = (Math.random() - 0.5) * 0.3;
                this.speedY = (Math.random() - 0.5) * 0.3;
                this.opacity = Math.random() * 0.4 + 0.1;
                this.fadeDir = Math.random() > 0.5 ? 1 : -1;
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                this.opacity += this.fadeDir * 0.002;
                if (this.opacity >= 0.5) this.fadeDir = -1;
                if (this.opacity <= 0.05) this.fadeDir = 1;

                if (this.x < -10 || this.x > particlesCanvas.width + 10 ||
                    this.y < -10 || this.y > particlesCanvas.height + 10) {
                    this.reset();
                }
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(0, 240, 212, ${this.opacity})`;
                ctx.fill();
            }
        }

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            particles.push(new Particle());
        }

        // Draw lines between nearby particles
        function connectParticles() {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 120) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(0, 240, 212, ${0.03 * (1 - dist / 120)})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
        }

        function animate() {
            ctx.clearRect(0, 0, particlesCanvas.width, particlesCanvas.height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            connectParticles();
            requestAnimationFrame(animate);
        }
        animate();
    }

    // ═══════════════════════════════════════════════════════════
    //  3. Mouse Glow Effect
    // ═══════════════════════════════════════════════════════════
    function initMouseGlow() {
        if (!mouseGlow || window.innerWidth < 768) return;
        let mouseX = -500, mouseY = -500;
        let glowX = -500, glowY = -500;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function updateGlow() {
            glowX += (mouseX - glowX) * 0.08;
            glowY += (mouseY - glowY) * 0.08;
            mouseGlow.style.left = glowX + 'px';
            mouseGlow.style.top = glowY + 'px';
            requestAnimationFrame(updateGlow);
        }
        updateGlow();
    }

    // ═══════════════════════════════════════════════════════════
    //  4. Scroll Progress Bar
    // ═══════════════════════════════════════════════════════════
    function updateScrollProgress() {
        if (!scrollProgress) return;
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        scrollProgress.style.width = scrollPercent + '%';
    }

    // ═══════════════════════════════════════════════════════════
    //  5. Language Toggle
    // ═══════════════════════════════════════════════════════════
    function updateBtnState() {
        langBtns.forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-lang') === currentLang);
        });
    }

    // ═══════════════════════════════════════════════════════════
    //  6. Typing Effect
    // ═══════════════════════════════════════════════════════════
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
        if (roleIndex >= roles.length) roleIndex = 0;

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
            typingDelay = newRoleDelay;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingDelay = 500;
        }

        typingTimeout = setTimeout(type, typingDelay);
    }

    // ═══════════════════════════════════════════════════════════
    //  7. Rendering & i18n
    // ═══════════════════════════════════════════════════════════
    function getNestedValue(obj, path) {
        return path.split('.').reduce((acc, part) => acc && acc[part], obj);
    }

    // ═══════════════════════════════════════════════════════════
    //  8. Reveal Animations (Intersection Observer)
    // ═══════════════════════════════════════════════════════════
    function initRevealAnimations() {
        const revealTargets = document.querySelectorAll(
            '.hero-text, .hero-visual, .section-header, .section-subtitle, .glass-panel, .scroll-indicator, footer .social-links, footer p'
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
            threshold: 0.12,
            rootMargin: '0px 0px -6% 0px'
        });

        revealTargets.forEach((el, index) => {
            el.classList.add('reveal-item');
            el.style.setProperty('--reveal-delay', `${Math.min(index * 60, 400)}ms`);
            revealObserver.observe(el);
        });
    }

    // ═══════════════════════════════════════════════════════════
    //  9. Stagger Animation for Grid Children
    // ═══════════════════════════════════════════════════════════
    function initStaggerAnimations() {
        const containers = document.querySelectorAll(
            '.skills-grid, .projects-grid, .analysis-grid, .tags, .timeline'
        );

        if (!containers.length || !('IntersectionObserver' in window)) return;
        if (staggerObserver) staggerObserver.disconnect();

        staggerObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const children = entry.target.children;
                    Array.from(children).forEach((child, i) => {
                        child.classList.add('stagger-item');
                        child.style.transitionDelay = `${i * 80}ms`;
                        // Force reflow then add visible
                        requestAnimationFrame(() => {
                            requestAnimationFrame(() => {
                                child.classList.add('is-visible');
                            });
                        });
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.08,
            rootMargin: '0px 0px -4% 0px'
        });

        containers.forEach(container => staggerObserver.observe(container));
    }

    // ═══════════════════════════════════════════════════════════
    //  10. Active Navigation Observer
    // ═══════════════════════════════════════════════════════════
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

    // ═══════════════════════════════════════════════════════════
    //  11. Navbar Scroll State
    // ═══════════════════════════════════════════════════════════
    function updateNavbarState() {
        if (!navbar) return;
        navbar.classList.toggle('scrolled', window.scrollY > 30);
    }

    // ═══════════════════════════════════════════════════════════
    //  12. Render Content
    // ═══════════════════════════════════════════════════════════
    function renderContent(lang) {
        const data = cvData[lang];
        if (!data) return;

        // Static i18n texts
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

        // About section
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

        // Experience
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

        // Analysis
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

        // Skills
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

        // Projects
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

        // Init animations after rendering
        initRevealAnimations();
        initStaggerAnimations();
    }

    // ═══════════════════════════════════════════════════════════
    //  13. Initialize Everything
    // ═══════════════════════════════════════════════════════════
    updateBtnState();
    renderContent(currentLang);
    initActiveNavObserver();
    updateNavbarState();
    initParticles();
    initMouseGlow();

    // ═══════════════════════════════════════════════════════════
    //  14. Event Listeners
    // ═══════════════════════════════════════════════════════════

    // Language switch
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

    // Scroll events (throttled)
    let scrollTicking = false;
    window.addEventListener('scroll', () => {
        if (!scrollTicking) {
            requestAnimationFrame(() => {
                updateNavbarState();
                updateScrollProgress();
                scrollTicking = false;
            });
            scrollTicking = true;
        }
    });

    // Mobile menu
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

    // Auto-close mobile on resize
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

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }

            // Close mobile menu
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

    // ═══════════════════════════════════════════════════════════
    //  15. Toast Notification Helper
    // ═══════════════════════════════════════════════════════════
    let pdfToastTimer;
    let isPdfGenerating = false;

    function showPdfToast(msg, iconClass = 'bx-check-circle', type = 'success') {
        let toast = document.querySelector('.pdf-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.className = 'pdf-toast';
            toast.setAttribute('role', 'status');
            toast.setAttribute('aria-live', 'polite');
            document.body.appendChild(toast);
        }
        toast.classList.toggle('is-error', type === 'error');
        toast.replaceChildren();
        const icon = document.createElement('i');
        icon.className = `bx ${iconClass}`;
        icon.setAttribute('aria-hidden', 'true');
        const text = document.createElement('span');
        text.textContent = msg;
        toast.append(icon, text);
        toast.classList.add('show');
        clearTimeout(pdfToastTimer);
        pdfToastTimer = setTimeout(() => {
            toast.classList.remove('show');
        }, 4000);
    }

    function escapeHtml(value) {
        return String(value ?? '')
            .replaceAll('&', '&amp;')
            .replaceAll('<', '&lt;')
            .replaceAll('>', '&gt;')
            .replaceAll('"', '&quot;')
            .replaceAll("'", '&#039;');
    }

    function loadScript(src) {
        return new Promise((resolve, reject) => {
            const existing = document.querySelector(`script[src="${src}"]`);
            if (existing) {
                existing.addEventListener('load', resolve, { once: true });
                existing.addEventListener('error', reject, { once: true });
                return;
            }

            const script = document.createElement('script');
            script.src = src;
            script.onload = resolve;
            script.onerror = () => reject(new Error(`Failed to load ${src}`));
            document.head.appendChild(script);
        });
    }

    async function ensurePdfLibrary() {
        if (typeof window.html2pdf === 'function') return window.html2pdf;

        await loadScript('https://cdn.jsdelivr.net/npm/html2pdf.js@0.10.1/dist/html2pdf.bundle.min.js');
        if (typeof window.html2pdf !== 'function') {
            throw new Error('html2pdf library is unavailable');
        }
        return window.html2pdf;
    }

    async function waitForPdfFonts() {
        if (!document.fonts?.ready) return;
        const cyrillicSample = 'ӨҮөү Монгол хэл';
        const fontLoads = [
            document.fonts.load('400 12px "Noto Sans"', cyrillicSample),
            document.fonts.load('600 12px "Noto Sans"', cyrillicSample),
            document.fonts.load('700 12px "Noto Sans"', cyrillicSample),
            document.fonts.load('800 12px "Noto Sans"', cyrillicSample),
            document.fonts.load('600 12px "Noto Sans Mono"', cyrillicSample)
        ].map(load => load.catch(() => []));
        await Promise.race([
            Promise.all([...fontLoads, document.fonts.ready]),
            new Promise(resolve => setTimeout(resolve, 5000))
        ]);
    }

    // ═══════════════════════════════════════════════════════════
    //  16. High-Quality Executive PDF CV Template Generator
    // ═══════════════════════════════════════════════════════════
    function generateCvPdfHtml(lang) {
        const data = cvData[lang] || cvData.mn;
        const isMn = lang === 'mn';
        const safe = escapeHtml;

        const labels = {
            summary: isMn ? 'Мэргэжлийн товч танилцуулга' : 'Executive Summary',
            experience: isMn ? 'Ажлын туршлага' : 'Professional Work Experience',
            skills: isMn ? 'Технологийн ур чадварын матриц' : 'Technical Skills Matrix',
            analysis: isMn ? 'Технологийн ур чадвар ба Туршлагын шинжилгээний хүснэгт' : 'Technical Competency & Experience Matrix',
            colDomain: isMn ? 'Чиглэл & Хүрээ' : 'Domain & Category',
            colTools: isMn ? 'Ашигласан технологиуд' : 'Tools & Technologies',
            colImpact: isMn ? 'Системийн үр нөлөө & Бизнес ач холбогдол' : 'Architectural & Business Impact',
            projects: isMn ? 'Гүйцэтгэсэн гол шийдлүүд' : 'Key Implemented Engineering Solutions',
            education: isMn ? 'Боловсрол & Мэргэжил' : 'Education & Qualification',
            certs: isMn ? 'Сертификат & Баталгаажсан чадварууд' : 'Certifications & Credentials',
            achievements: isMn ? 'Бусад амжилтууд' : 'Key Achievements & Ranking',
            strategicSummary: isMn ? 'Гол үр нөлөөний дүгнэлт & Хамтын ажиллагаа' : 'Strategic Impact & Collaboration',
            footerText: isMn ? 'Албан ёсны технологийн CV • Боловсруулсан он сар: ' : 'Official Technology CV • Generated: '
        };

        const todayStr = new Date().toLocaleDateString(isMn ? 'mn-MN' : 'en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        // Skills HTML
        const skillsHtml = (data.skills?.categories || []).map(cat => `
            <div class="pdf-skill-box">
                <h4>${safe(cat.title)}</h4>
                <div class="pdf-skill-tags">
                    ${(cat.items || []).map(item => `<span class="pdf-skill-tag">${safe(item.name)}</span>`).join('')}
                </div>
            </div>
        `).join('');

        // Experience HTML
        const expHtml = (data.experience?.list || []).map(exp => `
            <div class="pdf-exp-item">
                <div class="pdf-exp-title">${safe(exp.title)}</div>
                <div class="pdf-exp-desc">${safe(exp.desc)}</div>
            </div>
        `).join('');

        // Analysis Table Rows
        const analysisRowsHtml = (data.analysis?.list || []).map(item => `
            <tr>
                <td class="td-category">${safe(item.category)}</td>
                <td class="td-tools">${safe(item.tools)}</td>
                <td class="td-impact">${safe(item.impact)}</td>
            </tr>
        `).join('');

        // Projects HTML
        const projectsHtml = (data.projects?.list || []).map(proj => `
            <div class="pdf-proj-box">
                <div class="pdf-proj-type">${safe(proj.type)}</div>
                <div class="pdf-proj-title">${safe(proj.title)}</div>
                <div class="pdf-proj-desc">${safe(proj.desc)}</div>
                <div class="pdf-proj-techs">
                    ${(proj.techs || []).map(t => `<span class="pdf-proj-tech">${safe(t)}</span>`).join('')}
                </div>
            </div>
        `).join('');

        // Strategic summary items
        const strategicItemsHtml = (data.analysis?.summaryItems || []).map(item => `
            <li><strong>${safe(item.label)}:</strong> ${safe(item.text)}</li>
        `).join('');

        const primaryRoles = (data.hero.roles || []).slice(0, 3).map(safe).join(' | ');

        return `
        <div class="pdf-document">
            <!-- ════════════ PAGE 1 ════════════ -->
            <div class="pdf-page">
                <!-- Header -->
                <div class="pdf-header">
                    <div class="pdf-header-left">
                        <h1>${safe(data.hero.name)}</h1>
                        <div class="pdf-role">${primaryRoles}</div>
                    </div>
                    <div class="pdf-header-right">
                        <div><i class='bx bx-envelope'></i> egshig.giiguulegch@gmail.com</div>
                        <div><i class='bx bxl-github'></i> github.com/eggshig</div>
                        <div><i class='bx bxl-medium'></i> medium.com/@egshig.giiguulegch</div>
                        <div><i class='bx bx-map-pin'></i> Ulaanbaatar, Mongolia</div>
                    </div>
                </div>

                <!-- Executive Summary -->
                <div class="pdf-summary-box">
                    <strong>${labels.summary}:</strong> ${safe(data.hero.summary)}
                </div>

                <!-- Section: Work Experience -->
                <div class="pdf-section-title">
                    <span class="pdf-badge-num">01</span> ${labels.experience}
                </div>
                <div class="pdf-exp-list">
                    ${expHtml}
                </div>

                <!-- Section: Technical Skills Matrix -->
                <div class="pdf-section-title">
                    <span class="pdf-badge-num">02</span> ${labels.skills}
                </div>
                <div class="pdf-skills-grid">
                    ${skillsHtml}
                </div>

                <!-- Section: Education & Certifications Dual Box -->
                <div class="pdf-section-title">
                    <span class="pdf-badge-num">03</span> ${labels.education} & ${labels.certs}
                </div>
                <div class="pdf-dual-row">
                    <div class="pdf-dual-box">
                        <h4>${safe(data.about.eduTitle)}</h4>
                        <p style="font-size: 9.5px; color: #475569; margin-bottom: 6px;">${safe(data.about.eduDesc)}</p>
                        <ul class="pdf-bullet-list">
                            ${(data.about.eduFeatures || []).map(f => `<li>${safe(f)}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="pdf-dual-box">
                        <h4>${safe(data.about.certTitle)}</h4>
                        <div class="pdf-skill-tags" style="margin-bottom: 6px;">
                            ${(data.about.certTags || []).map(tag => `<span class="pdf-skill-tag">${safe(tag)}</span>`).join('')}
                        </div>
                        <h4 style="margin-top: 6px; font-size: 10px;">${labels.achievements}:</h4>
                        <ul class="pdf-bullet-list">
                            ${(data.about.achievements || []).map(a => `<li><strong>${safe(a.name)}:</strong> ${safe(a.desc)}</li>`).join('')}
                        </ul>
                    </div>
                </div>

                <!-- Page 1 Footer -->
                <div class="pdf-footer">
                    <span>${labels.footerText} ${todayStr}</span>
                    <span>Page 1 / 2</span>
                </div>
            </div>

            <!-- ════════════ PAGE 2 ════════════ -->
            <div class="pdf-page pdf-page--compact">
                <!-- Header Sub-banner for Page 2 -->
                <div class="pdf-header" style="margin-bottom: 12px; padding-bottom: 10px;">
                    <div class="pdf-header-left">
                        <h1 style="font-size: 16px;">${safe(data.hero.name)}</h1>
                        <div class="pdf-role" style="font-size: 10px;">${labels.analysis}</div>
                    </div>
                    <div class="pdf-header-right" style="font-size: 9px;">
                        <div>Senior DevSecOps & Architecture Profile</div>
                    </div>
                </div>

                <!-- Section: Deep Dive Analysis Matrix Table -->
                <div class="pdf-section-title">
                    <span class="pdf-badge-num">04</span> ${labels.analysis}
                </div>
                <table class="pdf-table">
                    <thead>
                        <tr>
                            <th style="width: 26%;">${labels.colDomain}</th>
                            <th style="width: 28%;">${labels.colTools}</th>
                            <th>${labels.colImpact}</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${analysisRowsHtml}
                    </tbody>
                </table>

                <!-- Section: Implemented Solutions -->
                <div class="pdf-section-title">
                    <span class="pdf-badge-num">05</span> ${labels.projects}
                </div>
                <div class="pdf-projects-grid">
                    ${projectsHtml}
                </div>

                <!-- Section: Strategic Takeaways / Collaboration -->
                <div class="pdf-section-title">
                    <span class="pdf-badge-num">06</span> ${labels.strategicSummary}
                </div>
                <div class="pdf-summary-box" style="background: #f1f5f9; border-left-color: #0f172a; margin-bottom: 10px;">
                    <ul class="pdf-bullet-list">
                        ${strategicItemsHtml}
                    </ul>
                </div>

                <!-- Page 2 Footer -->
                <div class="pdf-footer">
                    <span>${labels.footerText} ${todayStr}</span>
                    <span>Page 2 / 2</span>
                </div>
            </div>
        </div>
        `;
    }

    // ═══════════════════════════════════════════════════════════
    //  17. PDF Download Execution Handler
    // ═══════════════════════════════════════════════════════════
    async function downloadPdfCv() {
        if (isPdfGenerating) return;
        isPdfGenerating = true;

        const btnHero = document.getElementById('btn-download-pdf');
        const btnNav = document.getElementById('nav-btn-download-pdf');
        const exportLang = currentLang;

        const originalHeroHtml = btnHero ? btnHero.innerHTML : '';
        const originalNavHtml = btnNav ? btnNav.innerHTML : '';

        // Set Loading State
        const loadingText = exportLang === 'mn' ? 'PDF боловсруулж байна...' : 'Generating PDF...';
        if (btnHero) {
            btnHero.classList.add('is-generating');
            btnHero.disabled = true;
            btnHero.setAttribute('aria-busy', 'true');
            btnHero.innerHTML = `<i class='bx bx-loader-alt bx-spin'></i> <span>${loadingText}</span>`;
        }
        if (btnNav) {
            btnNav.classList.add('is-generating');
            btnNav.disabled = true;
            btnNav.setAttribute('aria-busy', 'true');
            btnNav.innerHTML = `<i class='bx bx-loader-alt bx-spin'></i> <span>PDF...</span>`;
        }

        try {
            const pdfExporter = await ensurePdfLibrary();

            // Create wrapper in DOM
            let wrapper = document.getElementById('pdf-template-wrapper');
            if (!wrapper) {
                wrapper = document.createElement('div');
                wrapper.id = 'pdf-template-wrapper';
                document.body.appendChild(wrapper);
            }

            // Populate HTML
            wrapper.innerHTML = generateCvPdfHtml(exportLang);
            await waitForPdfFonts();

            const filename = exportLang === 'mn'
                ? 'CV_Чулуунцэцэг_Хонгор.pdf'
                : 'CV_Khongor_Chuluuntsetseg.pdf';

            const opt = {
                margin: [0, 0, 0, 0],
                filename: filename,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: {
                    scale: 2,
                    useCORS: true,
                    letterRendering: true,
                    backgroundColor: '#ffffff',
                    scrollX: 0,
                    scrollY: 0
                },
                jsPDF: {
                    unit: 'mm',
                    format: 'a4',
                    orientation: 'portrait'
                },
                pagebreak: { mode: 'legacy' }
            };

            const element = wrapper.querySelector('.pdf-document');
            if (!element) throw new Error('PDF template could not be created');
            await pdfExporter().set(opt).from(element).save();

            // Success feedback
            const successMsg = exportLang === 'mn'
                ? '✓ PDF CV амжилттай татагдлаа!'
                : '✓ PDF CV downloaded successfully!';
            showPdfToast(successMsg, 'bxs-file-pdf');

        } catch (error) {
            console.error('PDF Generation Error:', error);
            const errorMsg = exportLang === 'mn'
                ? 'PDF үүсгэхэд алдаа гарлаа. Интернэт холболтоо шалгаад дахин оролдоно уу.'
                : 'PDF generation failed. Check your connection and try again.';
            showPdfToast(errorMsg, 'bx-error-circle', 'error');
        } finally {
            isPdfGenerating = false;
            // Restore buttons
            if (btnHero) {
                btnHero.classList.remove('is-generating');
                btnHero.disabled = false;
                btnHero.removeAttribute('aria-busy');
                btnHero.innerHTML = originalHeroHtml;
            }
            if (btnNav) {
                btnNav.classList.remove('is-generating');
                btnNav.disabled = false;
                btnNav.removeAttribute('aria-busy');
                btnNav.innerHTML = originalNavHtml;
            }

            const wrapper = document.getElementById('pdf-template-wrapper');
            if (wrapper) wrapper.remove();
        }
    }

    // Attach PDF button click listeners
    const downloadPdfBtn = document.getElementById('btn-download-pdf');
    if (downloadPdfBtn) {
        downloadPdfBtn.addEventListener('click', (e) => {
            e.preventDefault();
            downloadPdfCv();
        });
    }

    const navDownloadPdfBtn = document.getElementById('nav-btn-download-pdf');
    if (navDownloadPdfBtn) {
        navDownloadPdfBtn.addEventListener('click', (e) => {
            e.preventDefault();
            downloadPdfCv();
        });
    }
});
