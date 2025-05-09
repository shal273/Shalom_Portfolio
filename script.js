
// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu after clicking a link
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        }
    });
});

// Navbar scroll behavior
const navbar = document.querySelector('.navbar');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

// Function to update active nav link
function updateActiveNavLink() {
    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 150) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === currentSection) {
            link.classList.add('active');
        }
    });
}

// Add scroll event listener for active nav link
window.addEventListener('scroll', updateActiveNavLink);
// Call once on page load
updateActiveNavLink();

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');

hamburger.addEventListener('click', () => {
    navLinks.parentElement.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.parentElement.contains(e.target)) {
        navLinks.parentElement.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Close mobile menu on window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navLinks.parentElement.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Show navbar when scrolling up
let scrollTimeout;
window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        if (window.pageYOffset > 70) {
            navbar.style.transform = 'translateY(0)';
        }
    }, 150);
});

// Form submission handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Add your form submission logic here
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });
}

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(section);
});

// Show more/less projects functionality
const showMoreBtn = document.querySelector('.show-more-btn');
const projectsContainer = document.querySelector('.projects-container');
const hiddenProjects = document.querySelectorAll('.project-card.hidden');
let isExpanded = false;

showMoreBtn.addEventListener('click', () => {
    isExpanded = !isExpanded;

    if (isExpanded) {
        projectsContainer.classList.add('expanded');
        hiddenProjects.forEach(project => {
            project.classList.add('show');
        });
        showMoreBtn.textContent = 'Show Less Projects';
    } else {
        projectsContainer.classList.remove('expanded');
        hiddenProjects.forEach(project => {
            project.classList.remove('show');
        });
        showMoreBtn.textContent = 'Show More Projects';
    }
});