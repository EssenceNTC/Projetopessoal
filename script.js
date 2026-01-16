// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Elementos DOM
    const typingElement = document.querySelector('.digitando');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section-div');
    
    // Efeito de digitação
    if(typingElement) {
        const text = "Desenvolvedor Web em Treinamento";
        typingElement.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                typingElement.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                // Manter o cursor piscando
                setInterval(() => {
                    typingElement.style.borderRightColor = 
                        typingElement.style.borderRightColor === 'transparent' ? '#3498db' : 'transparent';
                }, 750);
            }
        };
        
        // Iniciar efeito após 1 segundo
        setTimeout(typeWriter, 1000);
    }
    
    // Navegação entre seções
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remover classe ativa de todos os links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Adicionar classe ativa ao link clicado
            this.classList.add('active');
            
            // Esconder todas as seções
            sections.forEach(section => {
                section.classList.remove('active');
                section.style.display = 'none';
            });
            
            // Mostrar a seção correspondente
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if(targetSection) {
                targetSection.classList.add('active');
                targetSection.style.display = 'flex';
                
                // Rolagem suave para a seção
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Ativar/desativar menu em telas pequenas (opcional)
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.navegacao-primaria');
    
    if(window.innerWidth <= 768) {
        // Criar botão de menu para mobile
        const toggleBtn = document.createElement('button');
        toggleBtn.innerHTML = '<i class="fas fa-bars"></i>';
        toggleBtn.className = 'menu-toggle';
        document.querySelector('header').appendChild(toggleBtn);
        
        toggleBtn.addEventListener('click', () => {
            nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
        });
    }
    
    // Ajustar menu em redimensionamento
    window.addEventListener('resize', () => {
        if(window.innerWidth > 768) {
            nav.style.display = 'flex';
        }
    });
});