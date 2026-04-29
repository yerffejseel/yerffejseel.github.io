/* =============================================================
   Portfolio — responsive interactions.
   - Sticky topbar gets a solid background past the hero
   - Active nav link tracks the visible section
   - Scroll-into-view reveal on sections / roles / projects
   - Smooth scroll for in-page anchors
   ============================================================= */

(function () {
    'use strict';

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ---- Topbar: solid background on scroll ------------------ */
    const topbar = document.querySelector('.topbar');
    if (topbar) {
        const updateTopbar = () => {
            topbar.classList.toggle('is-scrolled', window.scrollY > 24);
        };
        updateTopbar();
        window.addEventListener('scroll', updateTopbar, { passive: true });
    }

    /* ---- Active nav link via IntersectionObserver ------------ */
    const navLinks = Array.from(document.querySelectorAll('.topbar-nav a[href^="#"]'));
    const sectionMap = new Map();
    navLinks.forEach((link) => {
        const id = link.getAttribute('href').slice(1);
        const target = document.getElementById(id);
        if (target) sectionMap.set(target, link);
    });

    if (sectionMap.size && 'IntersectionObserver' in window) {
        const setActive = (link) => {
            navLinks.forEach((l) => l.classList.toggle('is-active', l === link));
        };

        const sectionObserver = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
                if (visible) {
                    const link = sectionMap.get(visible.target);
                    if (link) setActive(link);
                }
            },
            { rootMargin: '-30% 0px -55% 0px', threshold: [0, 0.2, 0.5] }
        );
        sectionMap.forEach((_, section) => sectionObserver.observe(section));
    }

    /* ---- Reveal motion --------------------------------------- */
    if (!reduceMotion && 'IntersectionObserver' in window) {
        const targets = document.querySelectorAll(
            '.section-head, .role, .project, .closing-block'
        );
        const viewportH = window.innerHeight;
        const offscreen = [];
        targets.forEach((el) => {
            const top = el.getBoundingClientRect().top;
            if (top > viewportH * 0.85) {
                el.classList.add('reveal');
                offscreen.push(el);
            }
        });

        const revealObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        revealObserver.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
        );
        offscreen.forEach((el) => revealObserver.observe(el));
    }

    /* ---- Smooth scroll for in-page anchors ------------------- */
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', (event) => {
            const id = anchor.getAttribute('href');
            if (id.length < 2) return;
            const target = document.querySelector(id);
            if (!target) return;
            event.preventDefault();
            target.scrollIntoView({
                behavior: reduceMotion ? 'auto' : 'smooth',
                block: 'start',
            });
            target.setAttribute('tabindex', '-1');
            target.focus({ preventScroll: true });
        });
    });
})();
