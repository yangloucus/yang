// Scroll animation với khả năng lặp lại
 
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Thêm class visible khi card xuất hiện
            entry.target.classList.add('visible');
        } else {
            // Xóa class visible khi card ra khỏi viewport
            // Để hiệu ứng có thể lặp lại khi scroll lại
            entry.target.classList.remove('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

function updateCardFocus() {
    const cards = document.querySelectorAll('.detailed-feature.fade-in');
    const viewportCenter = window.innerHeight / 2;
    
    let closestCard = null;
    let closestDistance = Infinity;
    
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.top + rect.height / 2;
        const distance = Math.abs(cardCenter - viewportCenter);
        
        if (distance < closestDistance && rect.top < viewportCenter && rect.bottom > viewportCenter) {
            closestDistance = distance;
            closestCard = card;
        }
        
        card.classList.remove('in-focus');
    });
    
    if (closestCard && closestDistance < window.innerHeight * 0.4) {
        closestCard.classList.add('in-focus');
    }
}

let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }
    scrollTimeout = window.requestAnimationFrame(() => {
        updateCardFocus();
    });
});

window.addEventListener('load', updateCardFocus);

const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
            setTimeout(updateCardFocus, 500);
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            window.location.href = 'Index.html';
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            window.location.href = 'Index.html';
        });
    }
});
