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
        
        translator.load();
        translatorReady = true;
        
        setupLanguageButtons();
        
    } catch (err) {
        translatorReady = false;
    }
}

/* ==================== LANGUAGE SELECTOR ==================== */
function setupLanguageButtons() {
    const langButtons = document.querySelectorAll('.lang-btn');
    
    langButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const lang = e.target.getAttribute('data-lang');
            
            langButtons.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            
            if (translatorReady && translator) {
                translator.load(lang);
                localStorage.setItem('language', lang);
            }
        });
    });
    
    const savedLang = localStorage.getItem('language') || 'en';
    const savedBtn = document.querySelector(`[data-lang="${savedLang}"]`);
    if (savedBtn) {
        langButtons.forEach(b => b.classList.remove('active'));
        savedBtn.classList.add('active');
    }
}

// Initialize translator when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeTranslator);
} else {
    initializeTranslator();
}

/* ==================== DARK LIGHT THEME ==== */

const toggle = document.getElementById('themeToggle');
const toggleIcon = toggle ? toggle.querySelector('i') : null;

let theme = localStorage.getItem('data-theme');
if (theme == null) {
    localStorage.setItem('data-theme', 'light');
    theme = 'light';
}

function setThemeIcon(newTheme) {
    if (!toggleIcon) return;
    toggleIcon.classList.remove('fa-moon', 'fa-sun');
    toggleIcon.classList.add(newTheme === 'dark' ? 'fa-sun' : 'fa-moon');
}

if (theme == 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    setThemeIcon('dark');
} else {
    document.documentElement.setAttribute('data-theme', 'light');
    setThemeIcon('light');
}

if (toggle) {
    toggle.addEventListener('click', function() {
        let currentTheme = document.documentElement.getAttribute('data-theme');
        let newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('data-theme', newTheme);
        setThemeIcon(newTheme);
    });
}

/* ==================== CV DOWNLOAD ==================== */
function updateCvLink() {
    const cvLink = document.getElementById('cvDownload');
    if (!cvLink) return;
    
    const currentLang = localStorage.getItem('language') || 'es';
    
    if (currentLang === 'es') {
        cvLink.href = '/PDFs/IvanPerezHuete_CV.pdf';
        cvLink.querySelector('span').textContent = 'Descargar CV';
    } else {
        cvLink.href = '/PDFs/IvanPerezHuete_CV_en.pdf';
        cvLink.querySelector('span').textContent = 'Download CV';
    }
}

// Update CV link on page load
document.addEventListener('DOMContentLoaded', updateCvLink);

// Update CV link when language changes
const originalTranslatorLoad = translator && typeof translator.load === 'function' ? translator.load.bind(translator) : null;
if (translator) {
    const origLoad = translator.load.bind(translator);
    translator.load = function(lang) {
        origLoad(lang);
        setTimeout(updateCvLink, 100);
    };
}

/* ==================== NAVBAR MOBILE MENU ==================== */
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-menu a');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
        const isExpanded = navMenu.classList.contains('active');
        navToggle.setAttribute('aria-expanded', isExpanded);
    });
}

// Close menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        if (navToggle) {
            navToggle.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
        }
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-container')) {
        navMenu.classList.remove('active');
        if (navToggle) {
            navToggle.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
        }
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
        if (navToggle) {
            navToggle.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
        }
    }
});

/* ==================== NAVIGATION STATE ==================== */
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    let current = null;
    const scrollPos = window.scrollY + window.innerHeight / 3;
    
    sections.forEach(section => {
        if (scrollPos >= section.offsetTop) {
            current = section;
        }
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

/* ==================== BACK TO TOP BUTTON ==================== */
function setupBackToTopButton() {
    const backToTopBtn = document.getElementById('backToTop');
    if (!backToTopBtn) return;

    // Show/hide button based on proximity to bottom of page
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight;
        const windowHeight = window.innerHeight;
        const distanceFromBottom = docHeight - (scrollTop + windowHeight);

        // Show button only when within 500px of the bottom
        if (distanceFromBottom < 500) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    // Scroll to top when button is clicked
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

document.addEventListener('DOMContentLoaded', setupBackToTopButton);

/* ==================== CONTACT FORM ==================== */
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    const contactFormContainer = document.getElementById('contactFormContainer');
    
    if (!contactForm) return;
    
    // Function to update placeholders when language changes
    function updateFormPlaceholders() {
        const inputs = contactForm.querySelectorAll('[data-placeholder]');
        inputs.forEach(input => {
            const key = input.getAttribute('data-placeholder');
            if (translator && typeof translator.t === 'function') {
                input.placeholder = translator.t(key);
            }
        });
    }
    
    // Update placeholders after a short delay to ensure translations are loaded
    setTimeout(updateFormPlaceholders, 300);
    
    // Listen to language changes - hook into translator's load method
    if (translator && typeof translator.load === 'function') {
        const originalLoad = translator.load.bind(translator);
        translator.load = function(lang) {
            originalLoad(lang);
            // Update placeholders after translations load
            setTimeout(updateFormPlaceholders, 200);
        };
    }
    
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalButtonContent = submitButton.innerHTML;
        
        try {
            // Disable button and show loading state
            submitButton.disabled = true;
            
            // Get translated "Sending..." text
            const sendingText = translator && typeof translator.t === 'function' 
                ? translator.t('contact.sending') 
                : 'Sending...';
            
            submitButton.innerHTML = `<i class="fas fa-spinner fa-spin"></i> <span>${sendingText}</span>`;
            
            // Collect form data
            const formData = new FormData(contactForm);
            
            // Send to 99inbound
            const response = await fetch('https://app.99inbound.com/api/e/tYC6PXfp', {
                method: 'POST',
                body: formData
            });
            
            // Show success message
            showSuccessMessage(contactFormContainer);
            
        } catch (error) {
            console.error('Error sending form:', error);
            submitButton.innerHTML = originalButtonContent;
            submitButton.disabled = false;
            alert('Error sending message. Please try again.');
        }
    });
}

function showSuccessMessage(container) {
    const successHTML = `
        <div class="form-success-message">
            <i class="fas fa-check-circle"></i>
            <h3 data-i18n="contact.successTitle">Message Sent Successfully!</h3>
            <p data-i18n="contact.successMessage">Thank you for reaching out. I'll get back to you as soon as possible.</p>
            <div class="form-success-actions">
                <button type="button" class="btn btn-primary" onclick="window.location.href='#projects'">
                    <span data-i18n="contact.viewProjects">View My Projects</span>
                    <i class="fas fa-arrow-right"></i>
                </button>
                <button type="button" class="btn btn-secondary" onclick="location.reload()">
                    <span data-i18n="contact.sendAnother">Send Another</span>
                    <i class="fas fa-redo"></i>
                </button>
            </div>
        </div>
    `;
    
    container.innerHTML = successHTML;
    
    // Apply translations to the newly created elements
    if (translator && typeof translator.updatePageTranslations === 'function') {
        translator.updatePageTranslations();
    }
}

document.addEventListener('DOMContentLoaded', setupContactForm);

