// ==================== ARQUIVO: script.js ====================
// Este arquivo controla toda a interatividade do site:
// - Menu mobile responsivo
// - Navegação entre seções
// - Efeitos de scroll
// - Validação do formulário
// - Tratamento de erros (foto, currículo)

// ==================== 1. AGUARDAR CARREGAMENTO DA PÁGINA ====================
// DOMContentLoaded é um evento que dispara quando todo o HTML foi carregado
// Garante que o JavaScript só execute depois que a página estiver pronta
document.addEventListener('DOMContentLoaded', function() {
    
    // ==================== 2. MENU MOBILE (HAMBÚRGUER) ====================
    // Seleciona o botão do menu e o menu de navegação
    const menuMobile = document.querySelector('.menu-mobile');     // Botão com ícone ☰
    const navMenu = document.querySelector('.nav-menu');          // Menu com os links
    
    // Verifica se o botão do menu existe na página
    if (menuMobile) {
        // Adiciona evento de clique no botão do menu
        menuMobile.addEventListener('click', function(e) {
            e.stopPropagation(); // Impede que o clique se propague para outros elementos
            
            // Alterna a classe 'active' no menu (mostra/esconde)
            navMenu.classList.toggle('active');
            
            // Alterna o ícone: ☰ (barras) para ✕ (fechar) e vice-versa
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // ==================== 3. FECHAR MENU AO CLICAR FORA ====================
    // Adiciona evento de clique em toda a página
    document.addEventListener('click', function(e) {
        // Se o menu estiver aberto e o clique NÃO foi no menu E NÃO foi no botão...
        if (navMenu && navMenu.classList.contains('active')) {
            if (!navMenu.contains(e.target) && !menuMobile.contains(e.target)) {
                // Fecha o menu
                navMenu.classList.remove('active');
                // Volta o ícone para ☰
                const icon = menuMobile.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });
    
    // ==================== 4. FUNÇÃO PARA MOSTRAR SEÇÃO ESPECÍFICA ====================
    // Esta função controla qual seção está visível e qual link está ativo
    function showSection(sectionId) {
        // Passo 1: Esconde TODAS as seções
        const allSections = document.querySelectorAll('.section');
        allSections.forEach(section => {
            section.classList.remove('active'); // Remove a classe 'active' de cada seção
        });
        
        // Passo 2: Mostra APENAS a seção que queremos
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active'); // Adiciona a classe 'active' na seção alvo
        }
        
        // Passo 3: Atualiza a classe 'active' nos links do menu
        const allLinks = document.querySelectorAll('.nav-menu a');
        allLinks.forEach(link => {
            link.classList.remove('active'); // Remove 'active' de todos os links
            const linkHref = link.getAttribute('href').substring(1); // Pega o ID do link (ex: "sobre")
            if (linkHref === sectionId) {
                link.classList.add('active'); // Adiciona 'active' no link correspondente
            }
        });
    }
    
    // ==================== 5. EVENTO DE CLICK NOS LINKS DO MENU ====================
    // Seleciona todos os links de navegação
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    // Para cada link, adiciona um evento de clique
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Impede o comportamento padrão do link (navegar para #)
            
            // Pega o ID da seção destino (remove o # do início)
            // Ex: "#sobre" vira "sobre"
            const targetId = this.getAttribute('href').substring(1);
            
            // Mostra a seção correspondente
            showSection(targetId);
            
            // Fecha o menu mobile se estiver aberto (em telas pequenas)
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                const icon = menuMobile.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
            
            // ==================== SCROLL SUAVE ====================
            // Rola a página suavemente até a seção selecionada
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                // Calcula a altura do cabeçalho fixo para não sobrepor o conteúdo
                const headerHeight = document.querySelector('header').offsetHeight;
                // Posição do elemento menos a altura do cabeçalho
                const elementPosition = targetElement.offsetTop - headerHeight;
                
                // Rola a página suavemente até a posição calculada
                window.scrollTo({
                    top: elementPosition,
                    behavior: 'smooth' // Rolagem suave
                });
            }
        });
    });
    
    // ==================== 6. ATUALIZAR SEÇÃO ATIVA AO ROLAR A PÁGINA ====================
    // Esta função detecta qual seção está visível na tela e ativa o link correspondente
    function updateActiveSectionOnScroll() {
        const sections = document.querySelectorAll('.section');
        const headerHeight = document.querySelector('header').offsetHeight;
        
        let currentSection = '';
        
        // Percorre todas as seções para descobrir qual está visível
        sections.forEach(section => {
            // Calcula a posição topo da seção (descontando o cabeçalho)
            const sectionTop = section.offsetTop - headerHeight - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            // Verifica se a posição de scroll atual está dentro desta seção
            if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
                currentSection = section.getAttribute('id'); // Salva o ID da seção atual
            }
        });
        
        // Se encontrou uma seção ativa, atualiza os links
        if (currentSection) {
            const allLinks = document.querySelectorAll('.nav-menu a');
            allLinks.forEach(link => {
                link.classList.remove('active'); // Remove 'active' de todos
                const linkHref = link.getAttribute('href').substring(1);
                if (linkHref === currentSection) {
                    link.classList.add('active'); // Adiciona 'active' no link correto
                }
            });
        }
    }
    
    // Detecta quando o usuário rola a página e atualiza a seção ativa
    window.addEventListener('scroll', function() {
        updateActiveSectionOnScroll();
    });
    
    // ==================== 7. LINK DO CURRÍCULO (CORRIGIDO) ====================
    // Permite o download do currículo - sem bloqueios
    const btnCurriculo = document.querySelector('.btn-outline');
    if (btnCurriculo) {
        btnCurriculo.addEventListener('click', function(e) {
            // Apenas confirma no console que o download foi iniciado
            console.log('📄 Baixando currículo: ' + this.getAttribute('href'));
            // O download acontece normalmente porque NÃO usamos preventDefault()
        });
    }
    
    // ==================== 8. FORMULÁRIO DE CONTATO ====================
    // Seleciona o formulário e a área de mensagem
    const formContato = document.getElementById('formContato');
    const formMensagem = document.querySelector('.form-mensagem');
    
    // Se o formulário existe na página
    if (formContato) {
        // Adiciona evento de envio do formulário
        formContato.addEventListener('submit', function(e) {
            e.preventDefault(); // Impede o envio padrão (recarregar página)
            
            // Obtém os valores dos campos e remove espaços extras (.trim())
            const nome = document.getElementById('nome').value.trim();
            const email = document.getElementById('email').value.trim();
            const mensagem = document.getElementById('mensagem').value.trim();
            
            // ==================== VALIDAÇÃO DOS CAMPOS ====================
            // Verifica se algum campo está vazio
            if (nome === '' || email === '' || mensagem === '') {
                if (formMensagem) {
                    // Mostra mensagem de erro em vermelho
                    formMensagem.innerHTML = '<p style="color: #ff0000;">❌ Por favor, preencha todos os campos.</p>';
                    // Apaga a mensagem após 3 segundos
                    setTimeout(() => {
                        formMensagem.innerHTML = '';
                    }, 3000);
                }
                return; // Interrompe a execução
            }
            
            // Verifica se o email é válido (contém @ e .)
            if (!email.includes('@') || !email.includes('.')) {
                if (formMensagem) {
                    formMensagem.innerHTML = '<p style="color: #ff0000;">❌ Por favor, digite um e-mail válido.</p>';
                    setTimeout(() => {
                        formMensagem.innerHTML = '';
                    }, 3000);
                }
                return; // Interrompe a execução
            }
            
            // ==================== SIMULAÇÃO DE ENVIO ====================
            // Como não temos um servidor backend, simulamos o envio bem-sucedido
            if (formMensagem) {
                // Mostra mensagem de sucesso em verde
                formMensagem.innerHTML = '<p style="color: #00ff00;">✅ Mensagem enviada com sucesso! Em breve entrarei em contato.</p>';
                formContato.reset(); // Limpa todos os campos do formulário
                
                // Apaga a mensagem após 3 segundos
                setTimeout(() => {
                    formMensagem.innerHTML = '';
                }, 3000);
            }
        });
    }
    
    // ==================== 9. INICIALIZAR PRIMEIRA SEÇÃO ====================
    // Verifica se há um hash na URL (ex: site.com#sobre)
    const urlHash = window.location.hash.substring(1); // Remove o # do início
    
    // Se houver um hash válido, mostra aquela seção
    if (urlHash && document.getElementById(urlHash)) {
        showSection(urlHash);
    } else {
        // Caso contrário, mostra a seção inicial
        showSection('inicio');
    }
    
    // ==================== 10. TRATAMENTO DA FOTO (CASO NÃO CARREGUE) ====================
    // Seleciona a imagem de perfil
    const fotoPerfil = document.querySelector('.foto-perfil img');
    
    // Se a imagem existe
    if (fotoPerfil) {
        // Evento disparado quando a imagem não carrega (arquivo não encontrado)
        fotoPerfil.onerror = function() {
            this.style.display = 'none'; // Esconde a imagem quebrada
            
            const parent = this.parentElement; // Pega o container .foto-perfil
            
            // Cria um placeholder estilizado
            const placeholder = document.createElement('div');
            placeholder.style.cssText = `
                width: 100%;
                height: 100%;
                background: linear-gradient(135deg, #ff0000, #660000);
                display: flex;
                align-items: center;
                justify-content: center;
            `;
            // Adiciona um ícone de usuário dentro do placeholder
            placeholder.innerHTML = '<i class="fas fa-user" style="font-size: 80px; color: white;"></i>';
            
            // Adiciona o placeholder ao container
            parent.appendChild(placeholder);
        };
    }
    
    // ==================== 11. CONFIRMAÇÃO NO CONSOLE ====================
    // Mensagem no console do navegador para confirmar que tudo carregou corretamente
    console.log('✅ Portfólio carregado com sucesso!');
});