/* ==================== LOADER ==================== */
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loader').classList.add('hidden');
        document.body.style.overflow = 'auto';
    }, 2400);
});
document.body.style.overflow = 'hidden';

/* ==================== CUSTOM CURSOR ==================== */
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');
let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX - 4 + 'px';
    cursor.style.top = mouseY - 4 + 'px';
});

function animateFollower() {
    followerX += (mouseX - followerX) * 0.15;
    followerY += (mouseY - followerY) * 0.15;
    follower.style.left = followerX - 18 + 'px';
    follower.style.top = followerY - 18 + 'px';
    requestAnimationFrame(animateFollower);
}
animateFollower();

document.querySelectorAll('a, button, .skill-tag, .project-card, .cert-card, .contact-card, .info-card, .edu-card').forEach(el => {
    el.addEventListener('mouseenter', () => follower.classList.add('hovering'));
    el.addEventListener('mouseleave', () => follower.classList.remove('hovering'));
});

/* ==================== PARTICLES ==================== */
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
    constructor() {
        this.reset();
    }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.4 + 0.1;
        this.color = Math.random() > 0.5 ? '139,92,246' : '6,182,212';
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color},${this.opacity})`;
        ctx.fill();
    }
}

const particleCount = Math.min(80, Math.floor(window.innerWidth / 15));
for (let i = 0; i < particleCount; i++) particles.push(new Particle());

function drawLines() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 150) {
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.strokeStyle = `rgba(139,92,246,${0.06 * (1 - dist / 150)})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
            }
        }
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    drawLines();
    requestAnimationFrame(animateParticles);
}
animateParticles();

/* ==================== NAVBAR ==================== */
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
    document.getElementById('back-to-top').classList.toggle('visible', window.scrollY > 500);
    updateActiveNav();
});

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    navToggle.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    let current = '';
    sections.forEach(section => {
        const top = section.offsetTop - 100;
        if (window.scrollY >= top) current = section.getAttribute('id');
    });
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.toggle('active', link.getAttribute('data-section') === current);
    });
}

/* ==================== TYPING EFFECT ==================== */
const typingTexts = ['Full-Stack Developer', 'Software Engineer', 'Problem Solver', 'Tech Enthusiast', 'CS Student'];
let textIndex = 0, charIndex = 0, isDeleting = false;
const typingElement = document.getElementById('typing-text');

function typeEffect() {
    const current = typingTexts[textIndex];
    typingElement.textContent = current.substring(0, charIndex);

    if (!isDeleting) {
        charIndex++;
        if (charIndex > current.length) {
            isDeleting = true;
            setTimeout(typeEffect, 2000);
            return;
        }
    } else {
        charIndex--;
        if (charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % typingTexts.length;
        }
    }
    setTimeout(typeEffect, isDeleting ? 40 : 80);
}
setTimeout(typeEffect, 2500);

/* ==================== COUNTER ANIMATION ==================== */
function animateCounters() {
    document.querySelectorAll('.stat-number').forEach(counter => {
        if (counter.dataset.animated) return;
        const target = parseInt(counter.dataset.count);
        const rect = counter.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            counter.dataset.animated = 'true';
            let current = 0;
            const increment = target / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    counter.textContent = target;
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.ceil(current);
                }
            }, 30);
        }
    });
}

/* ==================== SCROLL REVEAL ==================== */
function revealOnScroll() {
    document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 80) {
            el.classList.add('revealed');
        }
    });
    animateCounters();
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', () => setTimeout(revealOnScroll, 2500));

/* ==================== BACK TO TOP ==================== */
document.getElementById('back-to-top').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ==================== CONTACT FORM ==================== */
document.getElementById('contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('.form-submit');
    btn.innerHTML = '<span>Message Sent!</span><i class="fas fa-check"></i>';
    btn.style.background = 'linear-gradient(135deg, #10b981, #06b6d4)';
    setTimeout(() => {
        btn.innerHTML = '<span>Send Message</span><i class="fas fa-paper-plane"></i>';
        btn.style.background = '';
        e.target.reset();
    }, 3000);
});

/* ==================== TILT EFFECT ON CARDS ==================== */
document.querySelectorAll('.project-card, .hero-code-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `perspective(1000px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-8px)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

/* ==================== SMOOTH SCROLL FOR HERO INDICATOR ==================== */
document.querySelector('.hero-scroll-indicator')?.addEventListener('click', () => {
    document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
});

/* ==================== MAGNETIC EFFECT ON BUTTONS ==================== */
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
    });
});
