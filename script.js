// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Elementos DOM
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.navegacao-primaria');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section-div');
    const typingElement = document.querySelector('.digitando');
    const contactForm = document.getElementById('messageForm');

    // Menu mobile toggle
    menuToggle?.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        const icon = this.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });

    // Fechar menu ao clicar em um link (mobile)
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('active');
                menuToggle.querySelector('i').classList.replace('fa-times', 'fa-bars');
            }
        });
    });

    // Navegação por seções com highlight ativo
    function setActiveSection() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    }

    // Mostrar apenas a seção ativa
    function showActiveSection() {
        const hash = window.location.hash || '#home';
        
        sections.forEach(section => {
            section.classList.remove('active');
            if (section.getAttribute('id') === hash.slice(1)) {
                section.classList.add('active');
            }
        });
    }

    // Efeito de digitação
    function typeWriter(element, text, i = 0) {
        if (i < text.length) {
            element.textContent = text.substring(0, i + 1);
            setTimeout(() => typeWriter(element, text, i + 1), 100);
        } else {
            // Repetir o efeito após pausa
            setTimeout(() => {
                element.textContent = '';
                typeWriter(element, text);
            }, 3000);
        }
    }

    // Inicializar efeito de digitação
    if (typingElement) {
        const texts = [
            'Desenvolvedor trainee',
        ];
        let textIndex = 0;
        
        function changeText() {
            typeWriter(typingElement, texts[textIndex]);
            textIndex = (textIndex + 1) % texts.length;
        }
        
        // Iniciar primeiro texto
        setTimeout(() => changeText(), 1000);
        
        // Mudar texto periodicamente
        setInterval(changeText, 8000);
    }

    // Formulário de contato (simulação)
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Coletar dados do formulário
            const formData = new FormData(this);
            const formValues = Object.fromEntries(formData);
            
            // Simular envio
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('Mensagem enviada com sucesso! Em breve entrarei em contato.');
                contactForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }

    // Scroll suave para âncoras
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Atualizar URL
                history.pushState(null, null, targetId);
                showActiveSection();
            }
        });
    });

    // Atualizar seção ativa durante o scroll
    window.addEventListener('scroll', function() {
        setActiveSection();
        
        // Header com efeito de blur no scroll
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.style.backgroundColor = 'rgba(10, 10, 10, 0.95)';
            header.style.backdropFilter = 'blur(15px)';
        } else {
            header.style.backgroundColor = 'rgba(10, 10, 10, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        }
    });

    // Efeito parallax suave
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.image-container, .section-header');
        
        parallaxElements.forEach(element => {
            const speed = element.classList.contains('image-container') ? 0.5 : 0.3;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });

    // Animar elementos quando entram na viewport
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observar elementos para animação
    document.querySelectorAll('.experience-card, .about-card, .portfolio-card, .contact-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Inicializar
    showActiveSection();
    setActiveSection();

    // Preloader (opcional)
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });
});