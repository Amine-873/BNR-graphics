// Script para el menú mobile
document.addEventListener('DOMContentLoaded', function() {
    // Variables
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav ul');
    const navLinks = document.querySelectorAll('nav ul li a');
    const contactForm = document.getElementById('contact-form');
    const header = document.querySelector('header');
    
    // Función para toggle del menú mobile
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
            
            const spans = menuToggle.querySelectorAll('span');
            
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
    
    // Cierra el menú al hacer clic en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            document.body.classList.remove('no-scroll');
            
            const spans = menuToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });
    
    // Detección de scroll para cambiar estilo del header
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
  // Update your EmailJS implementation
emailjs.init("Pr_N7azP6hgmQqWcN"); // Your public key seems correct

// Modify your form submission handler
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show loading state
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = "Enviando...";
        submitButton.disabled = true;

        // Create parameters object
        const templateParams = {
            nombre: contactForm.nombre.value,
            email: contactForm.email.value,
            telefono: contactForm.telefono.value,
            servicio: contactForm.servicio.value,
            mensaje: contactForm.mensaje.value
        };

        // Send using emailjs.send() instead
        emailjs.send('service_xogxu0q', 'template_o8a2g9o', templateParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            alert('Mensaje enviado con éxito');
            contactForm.reset();
        }, function(error) {
            console.error('FAILED...', error);
            alert('Hubo un problema al enviar el mensaje: ' + error.text);
        })
        .finally(function() {
            // Reset button state
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        });
    });
}
});
