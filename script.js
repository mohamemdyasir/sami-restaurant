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
// 3. دالة إظهار أرقام الدليفري (خاصة بالصفحة الترحيبية)
// ============================================================
const deliveryBtn = document.getElementById('deliveryBtn');
const deliveryNumbers = document.getElementById('deliveryNumbers');

if (deliveryBtn && deliveryNumbers) {
    deliveryBtn.addEventListener('click', function() {
        deliveryNumbers.classList.toggle('show');
        
        if (deliveryNumbers.classList.contains('show')) {
            deliveryBtn.innerHTML = '<i class="fas fa-phone"></i> اتصل بنا';
        } else {
            deliveryBtn.innerHTML = '<i class="fas fa-truck"></i> دليفري';
        }
    });
}

// ============================================================
// 4. توليد QR Code (خاص بصفحة المنيو)
// ============================================================
window.addEventListener('load', function() {
    const qrContainer = document.getElementById('qrcode');
    if (qrContainer && typeof QRCode !== 'undefined') {
        qrContainer.innerHTML = '';
        const currentUrl = window.location.href;
        new QRCode(qrContainer, {
            text: currentUrl,
            width: 200,
            height: 200,
            colorDark: "#F5C518",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });
    }
});

// ============================================================
// 5. السكرول الناعم وتفعيل الروابط (خاص بصفحة المنيو)
// ============================================================
const sections = document.querySelectorAll('.menu-section');
const navLinks = document.querySelectorAll('.nav-link:not([href*="landing"])');

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
// 6. منع السلوك الافتراضي للروابط الداخلية (للسكرول الناعم)
// ============================================================
document.querySelectorAll('.nav-link[href^="#"]').forEach(link => {
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
// 7. تهيئة أولية (لتحديد الرابط النشط عند التحميل)
// ============================================================
window.addEventListener('load', () => {
    changeActiveLink();
});
