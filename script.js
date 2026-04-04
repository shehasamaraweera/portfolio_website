
// Typing effect for the profession text
const typingText = document.querySelector('.typing-text span');
const professions = ['Web Developer', 'UI Designer', 'Full Stack Developer', 'Creative Coder'];
let professionIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentProfession = professions[professionIndex];
    
    if (isDeleting) {
        typingText.textContent = currentProfession.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentProfession.substring(0, charIndex + 1);
        charIndex++;
    }
    
    if (!isDeleting && charIndex === currentProfession.length) {
        isDeleting = true;
        setTimeout(typeEffect, 1500);
        return;
    }
    
    if (isDeleting && charIndex === 0) {
        isDeleting = false;
        professionIndex = (professionIndex + 1) % professions.length;
    }
    
    setTimeout(typeEffect, isDeleting ? 50 : 100);
}

// Start typing effect when page loads
document.addEventListener('DOMContentLoaded', typeEffect);

// Smooth scrolling and active link highlighting
const navLinks = document.querySelectorAll('nav a');

navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Remove active class from all links
        navLinks.forEach(l => l.classList.remove('active'));
        
        // Add active class to clicked link
        this.classList.add('active');
        
        // Smooth scroll to section
        const targetId = this.getAttribute('href').slice(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Update active link on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = ['home', 'services', 'skills', 'education', 'experience', 'contact'];
    
    sections.forEach(section => {
        const element = document.getElementById(section);
        if (element && element.offsetTop <= window.scrollY + 100) {
            current = section;
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});