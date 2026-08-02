/**
 * PrepPilot AI - Main Application Script
 * Vanilla JavaScript implementation for Translucent Glass Ambient Cursor & Micro-Interactions:
 * - 18px Translucent Glass Orb Cursor with Specular Gloss Highlight & 80px Blurred Aura Disk
 * - Eased 0.12 LERP Motion + Organic Motion Velocity Squash & Stretch
 * - Mouse Follow Ambient Light (Hero 650px, AI Planner 450px with 0.08 LERP)
 * - Desktop Magnetic CTA Buttons (Max 4px spring translation)
 * - Card 3D Tilt (Max 3° RotateX / RotateY with perspective)
 * - Upgraded Scroll Reveal Animations (Opacity, TranslateY, Scale, Stagger)
 * - Interactive AI Study Planner Preview Logic
 * - Exam Category Live Search & Filter
 * - Accessible FAQ Accordion
 * - Animated Statistics Counters
 */

document.addEventListener('DOMContentLoaded', () => {
    initGlassAmbientCursor();
    initMagneticButtons();
    initCard3DTilt();
    initNavigation();
    initScrollReveal();
    initPlannerPreview();
    initCategoryFilter();
    initFAQAccordion();
    initAnimatedCounters();
    updateCopyrightYear();
});

/* ==========================================================================
   1. Premium Glass Ambient Cursor System
   ========================================================================== */
function initGlassAmbientCursor() {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || prefersReducedMotion) return;

    // --- A. Translucent Glass Cursor DOM Creation ---
    const cursorWrapper = document.createElement('div');
    cursorWrapper.className = 'cursor-follower-wrapper';
    cursorWrapper.setAttribute('aria-hidden', 'true');

    const outerGlow = document.createElement('div');
    outerGlow.className = 'cursor-outer-glow';

    const innerOrb = document.createElement('div');
    innerOrb.className = 'cursor-inner-orb';

    cursorWrapper.appendChild(outerGlow);
    cursorWrapper.appendChild(innerOrb);
    document.body.appendChild(cursorWrapper);

    // --- B. Position & Motion Tracking Variables ---
    let mouseX = -100, mouseY = -100;
    let cursorX = -100, cursorY = -100;
    let isMouseActive = false;

    // Hero Section Ambient Light (650px)
    const heroSection = document.getElementById('hero');
    let heroTargetX = 0, heroTargetY = 0;
    let heroCurrentX = 0, heroCurrentY = 0;
    let isOverHero = false;

    // AI Planner Section Ambient Light (450px)
    const plannerSection = document.getElementById('planner');
    let plannerTargetX = 0, plannerTargetY = 0;
    let plannerCurrentX = 0, plannerCurrentY = 0;
    let isOverPlanner = false;

    // --- C. Event Listeners ---
    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        if (!isMouseActive) {
            document.body.classList.add('cursor-active');
            isMouseActive = true;
        }
    }, { passive: true });

    window.addEventListener('mouseleave', () => {
        document.body.classList.remove('cursor-active');
        isMouseActive = false;
    });

    if (heroSection) {
        heroSection.addEventListener('mousemove', (e) => {
            const rect = heroSection.getBoundingClientRect();
            heroTargetX = e.clientX - rect.left;
            heroTargetY = e.clientY - rect.top;
            isOverHero = true;
        }, { passive: true });

        heroSection.addEventListener('mouseleave', () => {
            isOverHero = false;
        });
    }

    if (plannerSection) {
        plannerSection.addEventListener('mousemove', (e) => {
            const rect = plannerSection.getBoundingClientRect();
            plannerTargetX = e.clientX - rect.left;
            plannerTargetY = e.clientY - rect.top;
            isOverPlanner = true;
        }, { passive: true });

        plannerSection.addEventListener('mouseleave', () => {
            isOverPlanner = false;
        });
    }

    // Hover scale target selectors
    const hoverSelector = `
        .btn-primary, .btn-primary-nav, .btn-secondary,
        .bento-card, .exam-card, .testimonial-card, .glass-panel,
        .nav-link, .brand-logo,
        .hour-btn, .strategy-btn, .custom-select, .custom-slider, .filter-pill
    `;

    document.querySelectorAll(hoverSelector).forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });

    // --- D. 60 FPS Unified requestAnimationFrame Loop ---
    function animationLoop() {
        // 1. Eased LERP smoothing (0.12 factor)
        const lerpFactor = 0.12;
        const prevCursorX = cursorX;
        const prevCursorY = cursorY;

        cursorX += (mouseX - cursorX) * lerpFactor;
        cursorY += (mouseY - cursorY) * lerpFactor;

        // Calculate motion velocity for subtle squash & stretch
        const vx = cursorX - prevCursorX;
        const vy = cursorY - prevCursorY;
        const speed = Math.hypot(vx, vy);

        let scaleX = 1;
        let scaleY = 1;
        let angle = 0;

        if (speed > 0.4) {
            angle = Math.atan2(vy, vx) * (180 / Math.PI);
            const stretch = Math.min(0.14, speed * 0.005);
            scaleX = 1 + stretch;
            scaleY = 1 - stretch * 0.75;
        }

        // Apply 3D transform matrix
        cursorWrapper.style.transform = `translate3d(${cursorX.toFixed(2)}px, ${cursorY.toFixed(2)}px, 0) rotate(${angle.toFixed(1)}deg) scale(${scaleX.toFixed(3)}, ${scaleY.toFixed(3)})`;

        // 2. Hero Section Ambient Light (0.08 LERP)
        if (heroSection && isOverHero) {
            const glowLerp = 0.08;
            heroCurrentX += (heroTargetX - heroCurrentX) * glowLerp;
            heroCurrentY += (heroTargetY - heroCurrentY) * glowLerp;
            heroSection.style.setProperty('--glow-x', `${heroCurrentX}px`);
            heroSection.style.setProperty('--glow-y', `${heroCurrentY}px`);
        }

        // 3. AI Planner Section Ambient Light (0.08 LERP)
        if (plannerSection && isOverPlanner) {
            const glowLerp = 0.08;
            plannerCurrentX += (plannerTargetX - plannerCurrentX) * glowLerp;
            plannerCurrentY += (plannerTargetY - plannerCurrentY) * glowLerp;
            plannerSection.style.setProperty('--glow-x', `${plannerCurrentX}px`);
            plannerSection.style.setProperty('--glow-y', `${plannerCurrentY}px`);
        }

        requestAnimationFrame(animationLoop);
    }

    requestAnimationFrame(animationLoop);
}

/* ==========================================================================
   2. Desktop Magnetic CTA Buttons (Max 4px Translation)
   ========================================================================== */
function initMagneticButtons() {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || prefersReducedMotion) return;

    const magneticBtns = document.querySelectorAll('.btn-primary, .btn-primary-nav, .btn-secondary');

    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const deltaX = (e.clientX - centerX) * 0.12;
            const deltaY = (e.clientY - centerY) * 0.12;

            const clampX = Math.max(-4, Math.min(4, deltaX));
            const clampY = Math.max(-4, Math.min(4, deltaY));

            btn.style.transform = `translate3d(${clampX}px, ${clampY}px, 0) translateY(-2px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate3d(0px, 0px, 0) translateY(0)';
        });
    });
}

/* ==========================================================================
   3. Card 3D Tilt Interaction (Max 3° RotateX/Y)
   ========================================================================== */
function initCard3DTilt() {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || prefersReducedMotion) return;

    const cards = document.querySelectorAll('.bento-card, .exam-card, .testimonial-card, .planner-interactive-wrapper');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = -((y - centerY) / centerY) * 3;
            const rotateY = ((x - centerX) / centerX) * 3;

            card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-6px) scale(1.01)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)';
        });
    });
}

/* ==========================================================================
   4. Navigation & Scrolled Glass State
   ========================================================================== */
function initNavigation() {
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const glassNav = document.querySelector('.glass-nav');

    if (mobileBtn && navMenu) {
        mobileBtn.addEventListener('click', () => {
            const isOpen = navMenu.classList.contains('mobile-open');
            navMenu.classList.toggle('mobile-open', !isOpen);
            mobileBtn.setAttribute('aria-expanded', !isOpen);
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('mobile-open');
                mobileBtn.setAttribute('aria-expanded', 'false');
            });
        });
    }

    if (glassNav) {
        window.addEventListener('scroll', () => {
            glassNav.classList.toggle('scrolled', window.scrollY > 20);
        }, { passive: true });
    }

    const sections = document.querySelectorAll('section[id]');
    if ('IntersectionObserver' in window && sections.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: '-30% 0px -60% 0px',
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const currentId = entry.target.getAttribute('id');
                    navLinks.forEach(link => {
                        link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
                    });
                }
            });
        }, observerOptions);

        sections.forEach(section => observer.observe(section));
    }
}

/* ==========================================================================
   5. Upgraded Scroll Reveal Animations
   ========================================================================== */
function initScrollReveal() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !('IntersectionObserver' in window)) return;

    const selectors = [
        '.section-header',
        '.hero-content',
        '.hero-visual',
        '.planner-interactive-wrapper',
        '.bento-card',
        '.exam-card',
        '.testimonial-card',
        '.faq-item',
        '.cta-card'
    ];

    const elementsToReveal = document.querySelectorAll(selectors.join(', '));
    elementsToReveal.forEach(el => el.classList.add('reveal-element'));

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-revealed');
                obs.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
    });

    elementsToReveal.forEach(el => observer.observe(el));
}

/* ==========================================================================
   6. AI Study Planner Preview Logic (Core Interactive Engine)
   ========================================================================== */
function initPlannerPreview() {
    const examSelect = document.getElementById('planner-exam-select');
    const daysSlider = document.getElementById('planner-days-slider');
    const daysDisplay = document.getElementById('days-val-display');
    const hourBtns = document.querySelectorAll('#hours-btn-group .hour-btn');
    const strategyBtns = document.querySelectorAll('#strategy-btn-group .strategy-btn');
    const generateBtn = document.getElementById('generate-plan-btn');

    const outputTitle = document.getElementById('output-exam-title');
    const outputHours = document.getElementById('out-total-hours');
    const outputReadiness = document.getElementById('out-readiness');
    const timelineContainer = document.getElementById('roadmap-timeline-container');
    const aiInsightText = document.getElementById('ai-insight-text');

    if (!examSelect || !timelineContainer) return;

    const examData = {
        upsc: {
            title: "UPSC Civil Services (IAS/IPS)",
            phase1: { title: "Phase 1: Indian Polity & Modern History", desc: "Core focus on Constitutional Framework, Laxmikanth high-yield chapters, and Spectrum History.", tags: ["High Weightage", "Paper 1", "Static Core"] },
            phase2: { title: "Phase 2: Geography, Economy & Environment", desc: "NCERT mapping, Macroeconomics concepts, and Current Affairs integration.", tags: ["Current Affairs", "Static Revision"] },
            phase3: { title: "Phase 3: Mains Answer Writing & GS Mocks", desc: "Daily 2-question evaluations + 10 full-length prelims mocks under timed conditions.", tags: ["Mock Test", "Answer Writing"] },
            insight: "UPSC prioritizes Indian Polity & Governance (approx 18% of paper). Allocated 35% extra focus time based on historical trend analysis."
        },
        tech_ai: {
            title: "Tech: AI & ML Engineer Track",
            phase1: { title: "Phase 1: Mathematics & ML Fundamentals", desc: "Linear Algebra, Calculus, Python NumPy/Pandas, and Supervised Learning Algorithms.", tags: ["Core Math", "High Yield", "Hands-on"] },
            phase2: { title: "Phase 2: Deep Learning & PyTorch/TF", desc: "Neural Networks, CNNs, Transformers, LLM fine-tuning, and PyTorch implementations.", tags: ["Deep Learning", "Projects"] },
            phase3: { title: "Phase 3: MLOps & Machine Learning System Design", desc: "Model deployment, latency optimization, vector databases, and system design interviews.", tags: ["System Design", "Mock Interview"] },
            insight: "Prioritized Deep Learning Architectures & LLM Fine-tuning first to match current high-yield tech hiring requirements."
        },
        ssc: {
            title: "SSC CGL / CHSL Track",
            phase1: { title: "Phase 1: Quant Shortcuts & Speed Math", desc: "Algebra, Geometry, Arithmetic shortcuts, and Data Interpretation calculation drills.", tags: ["Speed Drills", "Quant 50/50"] },
            phase2: { title: "Phase 2: Reasoning & General Awareness", desc: "Non-verbal reasoning logic, static GK, and monthly current affairs summaries.", tags: ["High Accuracy", "Revision"] },
            phase3: { title: "Phase 3: Speed Mock Tests & Error Log", desc: "30-minute rapid sectional tests + full Tier 1 mock simulation runs.", tags: ["Mock Test", "Error Radar"] },
            insight: "Emphasized speed drills in Quant & Reasoning. Target velocity adjusted to achieve 160+ in Tier 1."
        },
        ielts: {
            title: "IELTS Academic (Target Band 8.0+)",
            phase1: { title: "Phase 1: Writing Task 2 Structure & Vocab", desc: "Mastering essay templates, cohesive devices, and high-band vocabulary collocations.", tags: ["Band 8.0 Vocab", "Writing"] },
            phase2: { title: "Phase 2: Listening & Reading Speed Strategies", desc: "True/False/Not Given scanning techniques & audio accent familiarization.", tags: ["Scanning Drills", "Listening"] },
            phase3: { title: "Phase 3: AI Speaking Partner Simulations", desc: "Part 1, 2, and 3 cue card prompt practice with real-time fluency scoring.", tags: ["Speaking Bot", "Mock Test"] },
            insight: "AI Coach detected Writing Task 2 as the primary hurdle for Band 8.0. Prioritized daily essay structure feedback."
        },
        gre: {
            title: "GRE General Test (330+ Target)",
            phase1: { title: "Phase 1: High-Frequency Vocabulary & Quant Core", desc: "1,000 essential GRE words, flashcard active recall, and Algebra/Geometry rules.", tags: ["Vocab Flashcards", "Quant Core"] },
            phase2: { title: "Phase 2: Text Completion & Sentence Equivalence", desc: "Logic clues, tone analysis, and Advanced Quant comparison problem sets.", tags: ["Advanced Quant", "Verbal Logic"] },
            phase3: { title: "Phase 3: Full Adaptive Computer Mocks", desc: "Section-adaptive mock tests under official test timer conditions.", tags: ["Timed Mock", "Readiness Radar"] },
            insight: "Allocated 40% of verbal preparation to Sentence Equivalence logic elimination strategies."
        },
        gate: {
            title: "GATE Computer Science & IT",
            phase1: { title: "Phase 1: Data Structures, Algo & Programming", desc: "Asymptotic analysis, Trees, Graphs, Dynamic Programming, and C Code trace.", tags: ["High Yield", "Algo Core"] },
            phase2: { title: "Phase 2: Operating Systems, DBMS & TOC", desc: "Process sync, Deadlocks, SQL normalization, B-Trees, and Regular Languages.", tags: ["Core CS", "Formulas"] },
            phase3: { title: "Phase 3: Subject Tests & Previous Year Questions", desc: "15-year PYQ solving + subject-wise timed test series.", tags: ["PYQ Drills", "Full Mocks"] },
            insight: "Data Structures & Operating Systems represent high-scoring core modules. Prioritized early in the roadmap."
        }
    };

    let activeHours = 4;
    let activeStrategy = 'balanced';

    daysSlider.addEventListener('input', (e) => {
        daysDisplay.textContent = `${e.target.value} Days`;
    });

    hourBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            hourBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeHours = parseInt(btn.dataset.hours, 10);
        });
    });

    strategyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            strategyBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeStrategy = btn.dataset.strategy;
        });
    });

    function renderPlan() {
        const selectedExamKey = examSelect.value;
        const days = parseInt(daysSlider.value, 10);
        const data = examData[selectedExamKey] || examData.tech_ai;

        const totalHours = days * activeHours;
        let readiness = Math.min(98, Math.round(75 + (days / 180) * 15 + (activeHours / 8) * 10));
        if (activeStrategy === 'sprint') readiness = Math.min(99, readiness + 4);

        outputTitle.textContent = `AI Study Roadmap • ${data.title}`;
        outputHours.textContent = `${totalHours} Hours`;
        outputReadiness.textContent = `${readiness}%`;
        aiInsightText.textContent = data.insight;

        timelineContainer.innerHTML = `
            <div class="timeline-item">
                <div class="item-phase">Days 1 - ${Math.round(days * 0.35)}</div>
                <div class="item-details">
                    <h5>${data.phase1.title}</h5>
                    <p>${data.phase1.desc}</p>
                    <div class="item-tags">
                        ${data.phase1.tags.map(t => `<span class="tag high-yield">${t}</span>`).join('')}
                    </div>
                </div>
            </div>
            <div class="timeline-item">
                <div class="item-phase">Days ${Math.round(days * 0.35) + 1} - ${Math.round(days * 0.75)}</div>
                <div class="item-details">
                    <h5>${data.phase2.title}</h5>
                    <p>${data.phase2.desc}</p>
                    <div class="item-tags">
                        ${data.phase2.tags.map(t => `<span class="tag">${t}</span>`).join('')}
                    </div>
                </div>
            </div>
            <div class="timeline-item">
                <div class="item-phase">Days ${Math.round(days * 0.75) + 1} - ${days}</div>
                <div class="item-details">
                    <h5>${data.phase3.title}</h5>
                    <p>${data.phase3.desc}</p>
                    <div class="item-tags">
                        ${data.phase3.tags.map(t => `<span class="tag high-yield">${t}</span>`).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    renderPlan();

    generateBtn.addEventListener('click', () => {
        timelineContainer.style.opacity = '0.4';
        setTimeout(() => {
            renderPlan();
            timelineContainer.style.opacity = '1';
        }, 200);
    });

    examSelect.addEventListener('change', renderPlan);
}

/* ==========================================================================
   7. Exam Category Search & Filter Logic
   ========================================================================== */
function initCategoryFilter() {
    const searchInput = document.getElementById('exam-search-input');
    const filterPills = document.querySelectorAll('#category-filter-pills .filter-pill');
    const examCards = document.querySelectorAll('.exams-grid .exam-card');

    if (!examCards.length) return;

    let currentCategory = 'all';
    let currentSearchTerm = '';

    function filterCards() {
        examCards.forEach(card => {
            const cardCategory = card.dataset.category;
            const keywords = (card.dataset.keywords || '').toLowerCase();
            const textContent = card.textContent.toLowerCase();

            const matchesCategory = currentCategory === 'all' || cardCategory === currentCategory;
            const matchesSearch = currentSearchTerm === '' || 
                                  keywords.includes(currentSearchTerm) || 
                                  textContent.includes(currentSearchTerm);

            if (matchesCategory && matchesSearch) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    }

    filterPills.forEach(pill => {
        pill.addEventListener('click', () => {
            filterPills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            currentCategory = pill.dataset.category;
            filterCards();
        });
    });

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            currentSearchTerm = e.target.value.trim().toLowerCase();
            filterCards();
        });
    }
}

/* ==========================================================================
   8. FAQ Accordion Logic
   ========================================================================== */
function initFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const trigger = item.querySelector('.faq-trigger');
        const content = item.querySelector('.faq-content');

        if (!trigger || !content) return;

        trigger.addEventListener('click', () => {
            const isOpen = item.classList.contains('active');

            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    const otherTrigger = otherItem.querySelector('.faq-trigger');
                    const otherContent = otherItem.querySelector('.faq-content');
                    if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
                    if (otherContent) otherContent.hidden = true;
                }
            });

            item.classList.toggle('active', !isOpen);
            trigger.setAttribute('aria-expanded', !isOpen);
            content.hidden = isOpen;
        });
    });
}

/* ==========================================================================
   9. Animated Metrics Counters
   ========================================================================== */
function initAnimatedCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    if (!statNumbers.length || !('IntersectionObserver' in window)) return;

    let animated = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animated = true;
                statNumbers.forEach(counter => {
                    const target = parseFloat(counter.dataset.target);
                    const decimals = parseInt(counter.dataset.decimals || '0', 10);
                    const duration = 1500;
                    const startTime = performance.now();

                    function updateNumber(currentTime) {
                        const elapsed = currentTime - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        const easedProgress = 1 - (1 - progress) * (1 - progress);
                        const currentValue = easedProgress * target;

                        counter.textContent = currentValue.toLocaleString(undefined, {
                            minimumFractionDigits: decimals,
                            maximumFractionDigits: decimals
                        });

                        if (progress < 1) {
                            requestAnimationFrame(updateNumber);
                        } else {
                            counter.textContent = target.toLocaleString(undefined, {
                                minimumFractionDigits: decimals,
                                maximumFractionDigits: decimals
                            });
                        }
                    }

                    requestAnimationFrame(updateNumber);
                });
            }
        });
    }, { threshold: 0.3 });

    const statsSection = document.getElementById('stats');
    if (statsSection) observer.observe(statsSection);
}

/* Update Footer Copyright Year */
function updateCopyrightYear() {
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}