const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.getElementById('nav-links');

mobileMenu.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('active');
    navLinks.classList.toggle('active', isOpen);
    mobileMenu.setAttribute('aria-expanded', String(isOpen));
    mobileMenu.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
});

function closeMobileMenu() {
    mobileMenu.classList.remove('active');
    navLinks.classList.remove('active');
    mobileMenu.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-label', 'Open navigation');
}

navLinks.addEventListener('click', (event) => {
    if (event.target.tagName === 'A') {
        closeMobileMenu();
    }
});

document.addEventListener('click', (event) => {
    if (!mobileMenu.contains(event.target) && !navLinks.contains(event.target)) {
        closeMobileMenu();
    }
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (event) {
        event.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

if (window.lucide) {
    window.lucide.createIcons();
}

document.querySelectorAll('[data-cover-src]').forEach((cover) => {
    const coverSrc = cover.getAttribute('data-cover-src');
    if (!coverSrc) {
        return;
    }

    const coverAlt = cover.getAttribute('data-cover-alt') || '';
    const image = document.createElement('img');
    image.src = coverSrc;
    image.alt = coverAlt;
    image.loading = 'lazy';
    image.decoding = 'async';

    cover.prepend(image);
    cover.classList.add('has-cover');
});

function balanceSkillsLayout() {
    const skillsContainer = document.querySelector('#skills .skills-container');
    if (!skillsContainer) {
        return;
    }

    const skillCategories = Array.from(skillsContainer.querySelectorAll('.skill-category'));
    if (!skillCategories.length) {
        return;
    }

    skillsContainer.innerHTML = '';

    if (window.innerWidth <= 980) {
        skillsContainer.classList.remove('skills-container-balanced');
        skillCategories.forEach((category) => {
            skillsContainer.appendChild(category);
        });
        return;
    }

    skillsContainer.classList.add('skills-container-balanced');

    const leftColumn = document.createElement('div');
    leftColumn.className = 'skills-column';

    const rightColumn = document.createElement('div');
    rightColumn.className = 'skills-column';

    skillsContainer.append(leftColumn, rightColumn);

    skillCategories.forEach((category) => {
        const targetColumn = leftColumn.offsetHeight <= rightColumn.offsetHeight ? leftColumn : rightColumn;
        targetColumn.appendChild(category);
    });
}

balanceSkillsLayout();

window.addEventListener('resize', () => {
    window.requestAnimationFrame(balanceSkillsLayout);
});

window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const links = document.querySelectorAll('.nav-links a');
    let current = '';

    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    links.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
});