const track = document.querySelector(".carousel-track");
const slides = Array.from(track.children);
const nextButton = document.querySelector(".next");
const prevButton = document.querySelector(".prev");

let index = 0;
const imagesPerView = 3; 
const slideWidth = slides[0].getBoundingClientRect().width;


function moveToSlide(newIndex) {
    
    if (newIndex < 0) {
        index = slides.length - imagesPerView;
    } else if (newIndex >= slides.length - imagesPerView + 1) {
        index = 0;
    } else {
        index = newIndex;
    }
    track.style.transform = `translateX(-${index * slideWidth}px)`;
}

let autoSlide = setInterval(() => moveToSlide(index + 1), 10000);

function resetAutoSlide() {
    clearInterval(autoSlide);
    autoSlide = setInterval(() => moveToSlide(index + 1), 10000);
}

nextButton.addEventListener("click", () => {
    moveToSlide(index + 1);
    resetAutoSlide();
});

prevButton.addEventListener("click", () => {
    moveToSlide(index - 1);
    resetAutoSlide();
});

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
    if (movedBy > 50) moveToSlide(index + 1);
    else if (movedBy < -50) moveToSlide(index - 1); 
    else moveToSlide(index);
    resetAutoSlide();
});

track.addEventListener("mouseleave", () => {
    isDragging = false;
});


window.addEventListener("load", () => {
    moveToSlide(index);
});
