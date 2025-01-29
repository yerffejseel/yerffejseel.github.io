const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, {
    threshold: 0.1 // Trigger when at least 10% of the element is visible
});

// Get all elements you want to animate
window.addEventListener('DOMContentLoaded', () => {
    //Animate title
    const title = document.getElementById('title');
    const subtitle = document.getElementById('subtitle');
    title.classList.remove('hidden');
    subtitle.classList.remove('hidden');
    
    // Animate project cards
    document.querySelectorAll('.project-card').forEach((card, index) => {
        card.classList.add('hidden', `delay-${index + 1}`);
        observer.observe(card);
    });

    // Animate skill cards
    document.querySelectorAll('.skill-card').forEach((card, index) => {
        card.classList.add('hidden', `delay-${index + 1}`);
        observer.observe(card);
    });

    // Animate icons
    document.querySelectorAll('.icons').forEach((icon, index) => {
        icon.classList.add('hidden', `delay-${index + 1}`);
        observer.observe(icon);
    });

    // Animate sections
    document.querySelectorAll('section h2').forEach(heading => {
        heading.classList.add('hidden');
        observer.observe(heading);
    });

    document.querySelectorAll('#description').forEach((card, index) => {
        card.classList.add('hidden', `delay-${index + 1}`);
        observer.observe(card);
    });

    document.querySelectorAll('#about-pic').forEach((card, index) => {
        card.classList.add('hidden', `delay-${index + 1}`);
        observer.observe(card);
    });

});