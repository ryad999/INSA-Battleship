document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent page reload

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        let errors = [];

        if (!name) {
            errors.push("Le champ 'Nom' est vide.");
        }
        if (!email) {
            errors.push("Le champ 'Email' est vide.");
        } else if (!validateEmail(email)) {
            errors.push("L'adresse email n'est pas valide.");
        }
        if (!message) {
            errors.push("Le champ 'Message' est vide.");
        }

        if (errors.length > 0) {
            Swal.fire({
                icon: 'error',
                title: 'Erreur de validation',
                html: errors.join('<br>'), // Display errors in separate lines
            });
        } else {
            Swal.fire({
                icon: 'success',
                title: 'Message envoyé',
                text: 'Votre message a été envoyé avec succès !',
            });
            contactForm.reset(); // Reset form fields
        }
    });

    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});
