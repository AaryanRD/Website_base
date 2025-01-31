
document.getElementById("contact-form").addEventListener("submit", async function(event) {
    event.preventDefault(); // Prevent form from redirecting

    const form = event.target;
    const formData = new FormData(form);

    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const result = await response.json();

        if (result.success) {
            document.getElementById("success-message").style.display = "block";
            form.reset(); // Clear form fields
        } else {
            document.getElementById("error-message").style.display = "block";
        }
    } catch (error) {
        document.getElementById("error-message").style.display = "block";
    }
});
