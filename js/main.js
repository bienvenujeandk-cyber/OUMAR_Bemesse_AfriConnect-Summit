// ===== DARK MODE =====
(function initTheme() {
    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = stored || (prefersDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme);
})();

const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
        // Mettre à jour l'icône
        themeToggle.innerHTML = next === 'dark' ? '<i class="bi bi-sun-fill"></i>' : '<i class="bi bi-moon-fill"></i>';
    });
    // Initialiser l'icône
    const initTheme = document.documentElement.getAttribute('data-theme');
    themeToggle.innerHTML = initTheme === 'dark' ? '<i class="bi bi-sun-fill"></i>' : '<i class="bi bi-moon-fill"></i>';
}

// ===== NAVBAR DYNAMIQUE =====
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== RÉSEAU ANIMÉ DES BANNIÈRES (hero + page-hero) =====
// Reprend le motif "nœuds reliés" du logo en fond de bannière :
// quelques dizaines de points dérivent lentement et se relient
// quand ils sont proches, formant un maillage évoquant la mise en
// réseau des talents tech africains.
(function initNetworkCanvases() {
    const canvases = document.querySelectorAll('.hero-canvas');
    if (!canvases.length) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    canvases.forEach(canvas => {
        const ctx = canvas.getContext('2d');
        let width, height, particles;

        function resize() {
            width = canvas.width = canvas.offsetWidth;
            height = canvas.height = canvas.offsetHeight;
        }

        function createParticles() {
            const maxParticles = parseInt(canvas.dataset.maxParticles || '60', 10);
            const count = Math.min(Math.round((width * height) / 22000), maxParticles);
            particles = Array.from({ length: count }, () => ({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.15,
                vy: (Math.random() - 0.5) * 0.15
            }));
        }

        function draw() {
            ctx.clearRect(0, 0, width, height);
            const accent = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#e67e22';

            if (!reduceMotion) {
                particles.forEach(p => {
                    p.x += p.vx;
                    p.y += p.vy;
                    if (p.x < 0 || p.x > width) p.vx *= -1;
                    if (p.y < 0 || p.y > height) p.vy *= -1;
                });
            }

            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 140) {
                        ctx.strokeStyle = `rgba(255,255,255,${0.09 * (1 - dist / 140)})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }

            particles.forEach(p => {
                ctx.beginPath();
                ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
                ctx.fillStyle = accent;
                ctx.globalAlpha = 0.7;
                ctx.fill();
                ctx.globalAlpha = 1;
            });

            if (!reduceMotion) requestAnimationFrame(draw);
        }

        resize();
        createParticles();
        draw();

        window.addEventListener('resize', () => {
            resize();
            createParticles();
        });
    });
})();

// ===== HAMBURGER MENU =====
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('open');
        hamburger.setAttribute('aria-expanded', String(isOpen));
    });
}

// ===== BACK TO TOP =====
const backBtn = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backBtn.classList.add('visible');
    } else {
        backBtn.classList.remove('visible');
    }
});
if (backBtn) {
    backBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ===== ANNÉE DYNAMIQUE =====
document.querySelectorAll('.current-year').forEach(el => {
    el.textContent = new Date().getFullYear();
});

// ===== COMPTE À REBOURS =====
// Ce bloc ne s'exécute que si un compte à rebours est présent sur la
// page (uniquement le hero de l'accueil). Sans cette garde, l'appel à
// un élément absent (#days, etc.) levait une erreur qui interrompait
// tout le reste du script sur les autres pages (onglets, filtres,
// formulaire ne s'initialisaient plus du tout).
const countdownEl = document.querySelector('.countdown');
if (countdownEl) {
    // Date fictive : 15 septembre 2026, 09:00
    const targetDate = new Date('2026-09-15T09:00:00').getTime();

    const updateCountdown = () => {
        const now = Date.now();
        const diff = targetDate - now;
        if (diff <= 0) {
            countdownEl.innerHTML = '<p>La conférence a commencé !</p>';
            return;
        }
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    };
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// ===== ANIMATIONS AU SCROLL (IntersectionObserver) =====
const animateElements = document.querySelectorAll('.fade-in, .slide-in, .zoom-in');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.2 });

animateElements.forEach(el => observer.observe(el));

// Filet de sécurité : si un élément n'a jamais déclenché l'observer
// (capture d'écran automatisée, très longue page, etc.), on force son
// affichage après un court délai plutôt que de le laisser invisible.
setTimeout(() => {
    animateElements.forEach(el => el.classList.add('visible'));
}, 2000);

// ===== COMPTEURS ANIMÉS =====
const counters = document.querySelectorAll('.stat-number');

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.getAttribute('data-target'));
            let count = 0;
            const increment = Math.ceil(target / 80);
            const timer = setInterval(() => {
                count += increment;
                if (count >= target) {
                    count = target;
                    clearInterval(timer);
                }
                entry.target.textContent = count + (entry.target.getAttribute('data-suffix') || '');
            }, 30);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

counters.forEach(counter => counterObserver.observe(counter));

// ===== SEGMENTED CONTROL (glow coulissant) =====
// Positionne le halo lumineux derrière le bouton actif d'un groupe
// (onglets du programme, filtres des intervenants) et le fait glisser
// en douceur lors des changements de sélection ou du redimensionnement.
function initSegmentedControl(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return null;
    const glow = container.querySelector('.segmented-glow');
    if (!glow) return null;

    function moveGlowTo(btn) {
        if (!btn) return;
        glow.style.width = btn.offsetWidth + 'px';
        glow.style.transform = `translateX(${btn.offsetLeft}px)`;
    }

    function refresh() {
        moveGlowTo(container.querySelector('.active'));
    }

    refresh();
    window.addEventListener('resize', refresh);
    return moveGlowTo;
}

const moveDayTabGlow = initSegmentedControl('dayTabs');
const moveFilterGlow = initSegmentedControl('speakerFilters');

// ===== PROGRAMME : ONGLETS =====
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Retirer la classe active de tous les onglets
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        if (moveDayTabGlow) moveDayTabGlow(btn);
        // Afficher le contenu correspondant
        const target = btn.getAttribute('data-tab');
        tabContents.forEach(content => {
            content.classList.remove('active');
            if (content.id === target) {
                content.classList.add('active');
            }
        });
    });
});

// ===== FILTRAGE DES INTERVENANTS =====
const filterBtns = document.querySelectorAll('.filter-btn');
const speakerCards = document.querySelectorAll('.speaker-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        if (moveFilterGlow) moveFilterGlow(btn);
        const filter = btn.getAttribute('data-filter');
        speakerCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-theme') === filter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// ===== VALIDATION DE FORMULAIRE =====
const form = document.getElementById('contactForm');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        // Réinitialiser les messages d'erreur
        document.querySelectorAll('.form-group').forEach(g => {
            g.classList.remove('error', 'success');
            const msg = g.querySelector('.error-message');
            if (msg) msg.style.display = 'none';
        });

        // Champs
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const phone = document.getElementById('phone');
        const participantType = document.getElementById('participantType');
        const country = document.getElementById('country');
        const message = document.getElementById('message');

        // Validation nom
        if (name.value.trim().length < 2) {
            setError(name, 'Le nom doit comporter au moins 2 caractères.');
            isValid = false;
        } else {
            setSuccess(name);
        }

        // Validation email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value.trim())) {
            setError(email, 'Veuillez entrer un email valide.');
            isValid = false;
        } else {
            setSuccess(email);
        }

        // Validation téléphone (8 chiffres min)
        const phoneDigits = phone.value.trim().replace(/\D/g, '');
        if (phoneDigits.length < 8) {
            setError(phone, 'Le téléphone doit contenir au moins 8 chiffres.');
            isValid = false;
        } else {
            setSuccess(phone);
        }

        // Validation type de participation
        if (participantType.value === '') {
            setError(participantType, 'Veuillez sélectionner un type.');
            isValid = false;
        } else {
            setSuccess(participantType);
        }

        // Validation pays
        if (country.value === '') {
            setError(country, 'Veuillez sélectionner un pays.');
            isValid = false;
        } else {
            setSuccess(country);
        }

        // Validation message (20 caractères min)
        if (message.value.trim().length < 20) {
            setError(message, 'Le message doit contenir au moins 20 caractères.');
            isValid = false;
        } else {
            setSuccess(message);
        }

        if (isValid) {
            // Afficher message de succès
            const successMsg = document.createElement('div');
            successMsg.className = 'alert alert-success';
            successMsg.textContent = '✅ Votre inscription a été envoyée avec succès !';
            successMsg.style.padding = '1rem';
            successMsg.style.background = '#2ecc71';
            successMsg.style.color = '#fff';
            successMsg.style.borderRadius = '8px';
            successMsg.style.marginTop = '1rem';
            form.appendChild(successMsg);
            form.reset();
            // Supprimer les classes success
            document.querySelectorAll('.form-group').forEach(g => g.classList.remove('success'));
            setTimeout(() => {
                successMsg.remove();
            }, 5000);
        }
    });
}

// ===== VALIDATION EN DIRECT (au blur) =====
if (form) {
    const liveValidators = {
        name: v => v.trim().length >= 2 ? '' : 'Le nom doit comporter au moins 2 caractères.',
        email: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? '' : 'Veuillez entrer un email valide.',
        phone: v => v.trim().replace(/\D/g, '').length >= 8 ? '' : 'Le téléphone doit contenir au moins 8 chiffres.',
        participantType: v => v !== '' ? '' : 'Veuillez sélectionner un type.',
        country: v => v !== '' ? '' : 'Veuillez sélectionner un pays.',
        message: v => v.trim().length >= 20 ? '' : 'Le message doit contenir au moins 20 caractères.'
    };

    Object.keys(liveValidators).forEach(id => {
        const field = document.getElementById(id);
        if (!field) return;
        field.addEventListener('blur', () => {
            const error = liveValidators[id](field.value);
            if (error) {
                setError(field, error);
            } else {
                field.closest('.form-group').classList.remove('error');
                setSuccess(field);
            }
        });
    });
}

function setError(input, message) {
    const group = input.closest('.form-group');
    group.classList.add('error');
    const msg = group.querySelector('.error-message');
    if (msg) {
        msg.textContent = message;
        msg.style.display = 'block';
    }
}

function setSuccess(input) {
    const group = input.closest('.form-group');
    group.classList.add('success');
}

// ===== MOT ANIMÉ DANS LA PHRASE DU HERO =====
// Ne réécrit que le mot cyclique : la phrase qui l'entoure (dates,
// lieu) reste toujours visible, contrairement à l'ancienne version
// qui remplaçait tout le sous-titre par le seul mot en cours.
const words = ["talents", "freelances", "experts", "développeurs"];
let wordIndex = 0, charIndex = 0, deleting = false;
const el = document.getElementById("typewriter");

function type() {
  if (!el) return;
  const word = words[wordIndex];
  el.textContent = deleting
    ? word.slice(0, --charIndex)
    : word.slice(0, ++charIndex);

  if (!deleting && charIndex === word.length)
    return setTimeout(() => { deleting = true; type(); }, 1500);
  if (deleting && charIndex === 0) {
    deleting = false;
    wordIndex = (wordIndex + 1) % words.length;
  }
  setTimeout(type, deleting ? 60 : 100);
}
if (el) type();
