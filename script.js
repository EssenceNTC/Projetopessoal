// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Elementos DOM
    const typingElement = document.querySelector('.digitando');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section-div');
    const nav = document.querySelector('.navegacao-primaria');
    let cursorInterval; // Variável para controle do cursor
    
    // 1. Efeito de digitação
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
                cursorInterval = setInterval(() => {
                    typingElement.style.borderRightColor = 
                        typingElement.style.borderRightColor === 'transparent' ? '#3498db' : 'transparent';
                }, 750);
            }
        };
        
        // Iniciar efeito após 1 segundo
        setTimeout(typeWriter, 1000);
    }
    
    // 2. Navegação entre seções
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
            });
            
            // Mostrar a seção correspondente
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if(targetSection) {
                targetSection.classList.add('active');
                
                // Fechar menu mobile se aberto
                if(window.innerWidth <= 768) {
                    nav.classList.remove('active');
                    const toggleBtn = document.querySelector('.menu-toggle');
                    if(toggleBtn) {
                        toggleBtn.innerHTML = '<i class="fas fa-bars"></i>';
                        toggleBtn.setAttribute('aria-expanded', 'false');
                    }
                }
                
                // Rolagem suave para a seção
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 3. Menu responsivo para mobile
    if(window.innerWidth <= 768 && nav) {
        // Verificar se já existe um botão de menu
        if(!document.querySelector('.menu-toggle')) {
            // Criar botão de menu para mobile
            const toggleBtn = document.createElement('button');
            toggleBtn.innerHTML = '<i class="fas fa-bars"></i>';
            toggleBtn.className = 'menu-toggle';
            toggleBtn.setAttribute('aria-label', 'Abrir menu de navegação');
            toggleBtn.setAttribute('aria-expanded', 'false');
            
            // Inserir após o h1 no header
            const header = document.querySelector('header');
            header.appendChild(toggleBtn);
            
            // Inicialmente esconder navegação no mobile
            nav.classList.remove('active');
            
            toggleBtn.addEventListener('click', () => {
                const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
                
                // Alternar estado do menu
                nav.classList.toggle('active');
                
                // Atualizar ícone e atributo ARIA
                toggleBtn.setAttribute('aria-expanded', !isExpanded);
                toggleBtn.innerHTML = isExpanded ? 
                    '<i class="fas fa-bars"></i>' : 
                    '<i class="fas fa-times"></i>';
            });
        }
    }
    
    // 4. Ajustar menu em redimensionamento da janela
    window.addEventListener('resize', () => {
        // Usar debounce para melhor performance
        clearTimeout(this.resizeTimeout);
        this.resizeTimeout = setTimeout(() => {
            const toggleBtn = document.querySelector('.menu-toggle');
            
            if(window.innerWidth > 768) {
                // Em telas grandes: mostrar menu e remover botão toggle
                if(nav) {
                    nav.classList.remove('active');
                    nav.style.display = 'flex';
                }
                if(toggleBtn) {
                    toggleBtn.remove();
                }
            } else {
                // Em telas pequenas: criar botão toggle se não existir
                if(nav && !toggleBtn) {
                    const newToggleBtn = document.createElement('button');
                    newToggleBtn.innerHTML = '<i class="fas fa-bars"></i>';
                    newToggleBtn.className = 'menu-toggle';
                    newToggleBtn.setAttribute('aria-label', 'Abrir menu de navegação');
                    newToggleBtn.setAttribute('aria-expanded', 'false');
                    
                    document.querySelector('header').appendChild(newToggleBtn);
                    
                    // Esconder navegação inicialmente
                    nav.classList.remove('active');
                    
                    newToggleBtn.addEventListener('click', () => {
                        const isExpanded = newToggleBtn.getAttribute('aria-expanded') === 'true';
                        nav.classList.toggle('active');
                        newToggleBtn.setAttribute('aria-expanded', !isExpanded);
                        newToggleBtn.innerHTML = isExpanded ? 
                            '<i class="fas fa-bars"></i>' : 
                            '<i class="fas fa-times"></i>';
                    });
                }
            }
        }, 250);
    });
    
    // 5. Limpar intervalo do cursor quando sair da página
    window.addEventListener('beforeunload', () => {
        if(cursorInterval) {
            clearInterval(cursorInterval);
        }
    });
});