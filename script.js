document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    if (window.lucide) {
        lucide.createIcons();
    }

    // 1. Sticky Navbar Effect
    const navbar = document.getElementById('navbar') || document.querySelector('.navbar');
    const isStickyHomeNavbar = navbar && navbar.id === 'navbar' && !navbar.classList.contains('solid');
    const syncNavbarOnScroll = () => {
        if (!isStickyHomeNavbar || !navbar || navbar.classList.contains('menu-open')) {
            return;
        }

        if (window.scrollY > 50) {
            navbar.classList.add('solid');
        } else {
            navbar.classList.remove('solid');
        }
    };

    if (isStickyHomeNavbar) {
        syncNavbarOnScroll();
        window.addEventListener('scroll', syncNavbarOnScroll);
    }

    // 2. Reveal on Scroll Animation
    const revealElements = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, {
            threshold: 0.02,
            rootMargin: '0px 0px -8% 0px'
        });

        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        revealElements.forEach(el => el.classList.add('active'));
    }

    // 3. Smooth Scroll for Internal Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 4. Mobile Menu Toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinks = document.getElementById('nav-links');
    const mobileBreakpoint = window.matchMedia('(max-width: 992px)');

    if (mobileToggle && navLinks) {
        const closeMobileMenu = () => {
            navLinks.classList.remove('is-open');
            mobileToggle.setAttribute('aria-expanded', 'false');
            document.body.classList.remove('menu-open');

            if (navbar) {
                navbar.classList.remove('menu-open');
            }

            syncNavbarOnScroll();
        };

        mobileToggle.addEventListener('click', () => {
            const isOpen = navLinks.classList.toggle('is-open');
            mobileToggle.setAttribute('aria-expanded', String(isOpen));
            document.body.classList.toggle('menu-open', isOpen);

            if (navbar) {
                navbar.classList.toggle('menu-open', isOpen);
                if (isOpen) {
                    navbar.classList.add('solid');
                } else {
                    syncNavbarOnScroll();
                }
            }
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (mobileBreakpoint.matches) {
                    closeMobileMenu();
                }
            });
        });

        window.addEventListener('resize', () => {
            if (!mobileBreakpoint.matches) {
                closeMobileMenu();
            }
        });
    }

    // 5. Contact Form Submission (UX)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            btn.innerText = 'Sending...';
            setTimeout(() => {
                alert('Thank you! Your message has been sent.');
                btn.innerText = 'Send Message';
                contactForm.reset();
            }, 1500);
        });
    }
});
