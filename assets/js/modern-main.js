import Translator from "./translator.js";

/* ==================== TRANSLATOR ==================== */
let translator = null;
let translatorReady = false;

// Initialize translator when DOM is ready
function initializeTranslator() {
    try {
        translator = new Translator({
            persist: true,
            languages: ["en", "es"],
            defaultLanguage: "es",
            detectLanguage: true,
            filesLocation: "./i18n"
        });
        
        // Load with saved language or default
        translator.load();
        translatorReady = true;
        
        console.log('Translator initialized successfully');
        console.log('Current language:', localStorage.getItem('language') || 'system default');
        
        // Register the language button event listeners and initialize state
        setupLanguageButtons();
        
    } catch (err) {
        console.error('Failed to initialize Translator:', err);
        translatorReady = false;
    }
}

/* ==================== LANGUAGE SELECTOR ==================== */
function setupLanguageButtons() {
    const langButtons = document.querySelectorAll('.lang-btn');
    console.log('Setting up language buttons, found:', langButtons.length);
    
    langButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const lang = e.target.getAttribute('data-lang');
            console.log('Language change requested:', lang);
            
            // Update button states FIRST before changing language
            langButtons.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            
            if (translatorReady && translator) {
                translator.load(lang);
                localStorage.setItem('language', lang);
                console.log('Language changed to:', lang);
            } else {
                console.warn('Translator not ready');
            }
        });
    });
    
    // Set initial state
    const savedLang = localStorage.getItem('language') || 'en';
    const savedBtn = document.querySelector(`[data-lang="${savedLang}"]`);
    if (savedBtn) {
        langButtons.forEach(b => b.classList.remove('active'));
        savedBtn.classList.add('active');
        console.log('Language button initialized to:', savedLang);
    }
}

// Initialize translator when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeTranslator);
} else {
    initializeTranslator();
}

/* ==================== DARK LIGHT THEME ==== */

let toggle = document.getElementById('themeToggle');

// Initialize theme from localStorage
let theme = localStorage.getItem('data-theme');
if (localStorage.getItem('data-theme') == null) {
    localStorage.setItem('data-theme', 'light');
    theme = 'light';
}

// Apply saved theme
if (theme == 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    if (toggle) toggle.innerHTML = '<i class="fas fa-sun"></i>';
} else {
    document.documentElement.setAttribute('data-theme', 'light');
    if (toggle) toggle.innerHTML = '<i class="fas fa-moon"></i>';
}

// Theme toggle handler
if (toggle) {
    toggle.addEventListener('click', function() {
        let currentTheme = document.documentElement.getAttribute('data-theme');
        let newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('data-theme', newTheme);
        
        if (newTheme === 'dark') {
            toggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            toggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
        
        console.log('Theme changed to:', newTheme);
    });
}

/* ==================== NAVBAR MOBILE MENU ==================== */
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-menu a');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
}

// Close menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        if (navToggle) navToggle.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-container')) {
        navMenu.classList.remove('active');
        if (navToggle) navToggle.classList.remove('active');
    }
});

/* ==================== SMOOTH SCROLL ENHANCEMENT ==================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

/* ==================== SCROLL ANIMATIONS ==================== */
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.project-card, .timeline-item, .skill-category, .stat-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

/* ==================== NAVBAR SCROLL EFFECT ==================== */
const navbar = document.querySelector('.navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.05)';
        }
    });
}

/* ==================== ACCESSIBILITY ==================== */
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (navMenu) navMenu.classList.remove('active');
        if (navToggle) navToggle.classList.remove('active');
    }
});

/* ==================== NAVIGATION STATE ==================== */
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    const current = Array.from(sections).find(section => {
        return section.offsetTop <= window.scrollY + 200;
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (current && link.getAttribute('href') === `#${current.id}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);
document.addEventListener('DOMContentLoaded', updateActiveNavLink);

/* ==================== INITIALIZATION ==================== */
console.log('Modern Portfolio loaded successfully!');

