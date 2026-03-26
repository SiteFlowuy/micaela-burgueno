
lucide.createIcons();


gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
    

    gsap.fromTo(".gsap-hero", 
        { opacity: 0, y: 30 }, 
        { 
            opacity: 1, 
            y: 0, 
            duration: 1, 
            stagger: 0.2, 
            ease: "power3.out",
            delay: 0.1
        }
    );


    const fadeUpElements = document.querySelectorAll(".gsap-fade-up");
    
    fadeUpElements.forEach((el) => {
        gsap.to(el, {
            scrollTrigger: {
                trigger: el,
                start: "top 85%", // Triggers when top of element hits 85% of viewport height
                toggleActions: "play none none none"
            },
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out"
        });
    });


    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            nav.classList.add('shadow-sm');
        } else {
            nav.classList.remove('shadow-sm');
        }
    });
});

document.querySelectorAll('.faq-item').forEach((item) => {
  const button = item.querySelector('.faq-question');

  button.addEventListener('click', () => {
    const isActive = item.classList.contains('active');

    document.querySelectorAll('.faq-item').forEach((faq) => {
      faq.classList.remove('active');
    });

    if (!isActive) {
      item.classList.add('active');
    }
  });
});

// Menú mobile
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    menuToggle.classList.toggle('open'); // <- esto es lo nuevo
});

// Cerrar menú al hacer click en un link
mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        menuToggle.classList.remove('open'); // <- y esto
    });
});

// Formulario de contacto
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');
const submitBtn = document.getElementById('submit-btn');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Evita que la página se recargue

    // Cambia el botón mientras envía
    submitBtn.textContent = 'Enviando...';
    submitBtn.disabled = true;

    const data = new FormData(contactForm);

    try {
        const response = await fetch(contactForm.action, {
            method: 'POST',
            body: data,
            headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
            // Oculta el form y muestra el mensaje de éxito
            contactForm.classList.add('hidden');
            formSuccess.classList.remove('hidden');
        } else {
            submitBtn.textContent = 'Error al enviar. Intentá de nuevo.';
            submitBtn.disabled = false;
        }
    } catch (error) {
        submitBtn.textContent = 'Error al enviar. Intentá de nuevo.';
        submitBtn.disabled = false;
    }
});

// Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const lightboxClose = document.getElementById('lightbox-close');

// Abrir al hacer click en cualquier elemento con data-lightbox
document.querySelectorAll('[data-lightbox]').forEach(el => {
    el.addEventListener('click', () => {
        lightboxImg.src = el.dataset.lightbox;
        lightboxCaption.textContent = el.dataset.caption || '';
        lightbox.classList.add('open');
        document.body.classList.add('lightbox-open');
        lucide.createIcons(); // Re-inicializa el ícono X
    });
});

// Cerrar con el botón X
lightboxClose.addEventListener('click', closeLightbox);

// Cerrar haciendo click fuera de la imagen
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
});

// Cerrar con tecla Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
});

function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.classList.remove('lightbox-open');
}

// Contadores animados
const counters = document.querySelectorAll('[data-counter]');

const animateCounter = (el) => {
    const target = parseInt(el.dataset.counter);
    const valueEl = el.querySelector('.counter-value');
    const duration = 2000; // 2 segundos
    const start = performance.now();

    const update = (currentTime) => {
        const elapsed = currentTime - start;
        const progress = Math.min(elapsed / duration, 1);

        // Easing: empieza rápido, termina despacio
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(eased * target);

        valueEl.textContent = current;

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            valueEl.textContent = target; // asegura el número exacto al final
        }
    };

    requestAnimationFrame(update);
};

// Solo anima cuando el elemento entra en pantalla
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target); // anima solo una vez
        }
    });
}, { threshold: 0.5 });

counters.forEach(counter => counterObserver.observe(counter));