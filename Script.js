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

    // Verificar que EmailJS esté cargado correctamente
    if (typeof emailjs === 'undefined') {
        console.error('EmailJS no está cargado. Verifica la conexión a internet y el script de EmailJS.');
        return;
    }

    // Inicializar EmailJS con manejo de errores
    try {
        emailjs.init("Pr_N7azP6hgmQqWcN");
        console.log('EmailJS inicializado correctamente');
    } catch (error) {
        console.error('Error al inicializar EmailJS:', error);
    }

    // Función para validar el email
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // Función para validar el teléfono
    function isValidPhone(phone) {
        return /^[0-9\s+()-]{9,}$/.test(phone);
    }

    // Manejo del formulario de contacto
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Validaciones básicas
            const email = contactForm.email.value.trim();
            const telefono = contactForm.telefono.value.trim();
            
            if (!isValidEmail(email)) {
                alert('Por favor, introduce un email válido');
                return;
            }

            if (telefono && !isValidPhone(telefono)) {
                alert('Por favor, introduce un teléfono válido');
                return;
            }

            // Mostrar estado de carga
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = "Enviando...";
            submitButton.disabled = true;

            // Crear objeto de parámetros exactamente como aparecen en la plantilla
            const templateParams = {
                from_name: contactForm.nombre.value.trim(),  // o this.elements.nombre.value.trim()
                from_email: contactForm.email.value.trim(),
                phone: contactForm.telefono.value.trim(),
                service: contactForm.servicio.value,
                message: contactForm.mensaje.value.trim(),
                reply_to: contactForm.email.value.trim()
            };
            try {
                // Log para debugging
                console.log('Enviando email con parámetros:', templateParams);

                const response = await emailjs.send('service_xogxu0q', 'template_o8a2g9o', templateParams);
                
                console.log('SUCCESS!', response.status, response.text);
                alert('¡Mensaje enviado con éxito!');
                contactForm.reset();
            } catch (error) {
                console.error('FAILED...', error);
                alert('Error al enviar el mensaje: ' + error.text);
            } finally {
                // Restaurar estado del botón
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }
        });
    }
});
