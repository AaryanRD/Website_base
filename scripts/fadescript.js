document.addEventListener('scroll', function() {
    const fadeElements = document.querySelectorAll('.fade-in');
    const windowHeight = window.innerHeight;

    fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;

        // Add the visible class when the element comes into view
        if (elementTop < windowHeight - 100) {
            element.classList.add('visible');
        }
    });
});
