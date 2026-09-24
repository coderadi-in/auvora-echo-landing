// ==================================================
// ELEMENT REFERENCE
// ==================================================

const sections = document.querySelectorAll('.section');
const initialTimeDelay = 0;

// ==================================================
// FUNCTIONS
// ==================================================

// * FUNCTION TO CREATE AN INTERSECTION OBSERVER
export function createIntersectionObserver() {
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    return observer;
}

// ==================================================
// EVENT LISTENERS
// ==================================================

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const observer = createIntersectionObserver();
        sections.forEach(section => { observer.observe(section); });
    }, initialTimeDelay);
});