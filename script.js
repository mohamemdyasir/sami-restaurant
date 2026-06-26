// ============================================================
// 1. قائمة التنقل (Toggle) للجوال
// ============================================================
const menuToggle = document.getElementById('menuToggle');
const nav = document.querySelector('.nav');

menuToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
});

// ============================================================
// 2. تبديل الثيم (دارك / لايت) مع الحفظ في LocalStorage
// ============================================================
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;

const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    htmlElement.setAttribute('data-theme', savedTheme);
    updateIcon(savedTheme);
} else {
    htmlElement.setAttribute('data-theme', 'dark');
    updateIcon('dark');
}

function updateIcon(theme) {
    const icon = themeToggle.querySelector('i');
    if (theme === 'dark') {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
}

themeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    let newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateIcon(newTheme);
});

// ============================================================
// 3. السكرول الناعم وتفعيل الروابط تلقائياً (Active Link)
// ============================================================
const sections = document.querySelectorAll('.menu-section');
const navLinks = document.querySelectorAll('.nav-link');

function changeActiveLink() {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', changeActiveLink);

// ============================================================
// 4. منع السلوك الافتراضي للروابط (للسكرول الناعم)
// ============================================================
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            nav.classList.remove('open');
        }
    });
});

// ============================================================
// 5. تهيئة أولية (لتحديد الرابط النشط عند التحميل)
// ============================================================
window.addEventListener('load', () => {
    changeActiveLink();
});