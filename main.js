
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
