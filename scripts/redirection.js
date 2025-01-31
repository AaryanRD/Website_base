
document.getElementById("contact-form").addEventListener("submit", async function(event) {
    event.preventDefault(); // Prevent default form submission

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
            document.getElementById("error-message").style.display = "none";
            form.reset(); // ✅ Clears the form fields after successful submission
        } else {
            document.getElementById("error-message").style.display = "block";
            document.getElementById("success-message").style.display = "none";
        }
    } catch (error) {
        document.getElementById("error-message").style.display = "block";
        document.getElementById("success-message").style.display = "none";
    }
});