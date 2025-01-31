const track = document.querySelector(".carousel-track");
const slides = Array.from(track.children);
const nextButton = document.querySelector(".next");
const prevButton = document.querySelector(".prev");

let index = 0;
const imagesPerView = 3; // Maximum images visible at once
const slideWidth = slides[0].getBoundingClientRect().width;

// Function to move slides one at a time
function moveToSlide(newIndex) {
    // Wrap around logic, preventing index from going out of bounds
    if (newIndex < 0) {
        index = slides.length - imagesPerView;
    } else if (newIndex >= slides.length - imagesPerView + 1) {
        index = 0;
    } else {
        index = newIndex;
    }
    track.style.transform = `translateX(-${index * slideWidth}px)`;
}

// Auto-slide every 3 seconds
let autoSlide = setInterval(() => moveToSlide(index + 1), 3000);

// Restart auto-slide on interaction
function resetAutoSlide() {
    clearInterval(autoSlide);
    autoSlide = setInterval(() => moveToSlide(index + 1), 3000);
}

// Button event listeners
nextButton.addEventListener("click", () => {
    moveToSlide(index + 1);
    resetAutoSlide();
});

prevButton.addEventListener("click", () => {
    moveToSlide(index - 1);
    resetAutoSlide();
});

// Dragging functionality
let isDragging = false;
let startX, currentTranslate, prevTranslate;

track.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.clientX;
    prevTranslate = index * -slideWidth;
    track.style.transition = "none";
});

track.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    const currentX = e.clientX;
    currentTranslate = prevTranslate + (currentX - startX);
    track.style.transform = `translateX(${currentTranslate}px)`;
});

track.addEventListener("mouseup", (e) => {
    isDragging = false;
    track.style.transition = "transform 0.5s ease-in-out";
    const movedBy = startX - e.clientX;
    if (movedBy > 50) moveToSlide(index + 1); // Move to the next slide if dragged sufficiently
    else if (movedBy < -50) moveToSlide(index - 1); // Move to the previous slide if dragged sufficiently
    else moveToSlide(index); // Stay on the current slide if not dragged enough
    resetAutoSlide();
});

track.addEventListener("mouseleave", () => {
    isDragging = false;
});

// Ensure initial display of images
window.addEventListener("load", () => {
    moveToSlide(index); // Move to the starting index
});
