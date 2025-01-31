window.addEventListener("scroll", () => {
    const section = document.getElementById("introduction");
    const image = document.getElementById("movingImage");
    
    // Get the position of the section
    const rect = section.getBoundingClientRect();
    
    // Calculate the percentage of scroll within the section
    const sectionHeight = rect.height;
    const scrollPosition = window.scrollY + window.innerHeight;
    
    // Determine if the scroll position is within the section's bounds
    if (scrollPosition >= rect.top && scrollPosition <= rect.bottom) {
        // Calculate the new Y position of the image based on scroll
        const startPosY = rect.top + (sectionHeight * 0.15);  // 15% of the section's height
        const endPosY = rect.top + (sectionHeight * 0.95);  // 95% of the section's height
        
        // Map the scroll position to the Y position of the image
        const scrollProgress = (scrollPosition - rect.top) / (rect.bottom - rect.top);
        const newPosY = startPosY + (scrollProgress * (endPosY - startPosY));
        
        // Set the new position of the image
        image.style.top = newPosY + "px";
    }
});
