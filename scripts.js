document.addEventListener('DOMContentLoaded', () => {
    // Preloader
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => { // Adiciona um pequeno delay para garantir que tudo carregue visualmente
            preloader.classList.add('loaded');
        }, 500); // Ajuste o tempo conforme necessário
    });

    // Navegação Suave e Ativação de Links
    const navLinks = document.querySelectorAll('#main-header nav ul li a');
    const header = document.getElementById('main-header');
    const headerHeight = header.offsetHeight;

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.hash !== "") {
                e.preventDefault();
                const hash = this.hash;
                const targetElement = document.querySelector(hash);
                if (targetElement) {
                    const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                    const offsetPosition = elementPosition - headerHeight;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });

                    // Para fechar menu mobile se estiver aberto
                    const mobileNav = document.querySelector('#main-header nav ul');
                    if (mobileNav.classList.contains('active')) {
                        mobileNav.classList.remove('active');
                        mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                    }
                }
            }
        });
    });

    // Ativar link da navegação conforme scroll
    const sections = document.querySelectorAll('main section[id]');
    function setActiveLink() {
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 50; // Ajuste o offset
            if (window.pageYOffset >= sectionTop) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    } 

     window.addEventListener('scroll', setActiveLink);
    setActiveLink(); // Define o link ativo no carregamento da página


    // Menu Mobile Toggle
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mainNavUl = document.querySelector('#main-header nav ul');
    if (mobileMenuToggle && mainNavUl) {
        mobileMenuToggle.addEventListener('click', () => {
            mainNavUl.classList.toggle('active');
            if (mainNavUl.classList.contains('active')) {
                mobileMenuToggle.innerHTML = '<i class="fas fa-times"></i>';
            } else {
                mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    }

    // Animações On-Scroll com Intersection Observer
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // % do elemento visível para disparar
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // observer.unobserve(entry.target); // Descomente se quiser que a animação ocorra apenas uma vez
            } else {
                // entry.target.classList.remove('is-visible'); // Descomente se quiser que a animação reverta ao sair da tela
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => {
        observer.observe(el);
    });

     // Ano atual no Footer
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

     // Modal de Projetos (Exemplo Básico)
    const projectDetailButtons = document.querySelectorAll('.project-details-button');
    const modal = document.getElementById('project-modal');
    const closeModalButton = document.querySelector('.close-modal-button');
    const modalProjectTitle = document.getElementById('modal-project-title');
    const modalProjectImage = document.getElementById('modal-project-image');
    const modalProjectDescription = document.getElementById('modal-project-description'); // Div pai
    const modalProjectLink = document.getElementById('modal-project-link');
    // Elementos internos da descrição
    const modalProjectChallenges = document.getElementById('modal-project-challenges');
    const modalProjectSolutions = document.getElementById('modal-project-solutions');
    const modalProjectTags = document.getElementById('modal-project-tags');


    // Dados de exemplo para os projetos (substitua com dados reais)
    const projectData = {
        alpha: {
            title: "Sistema de Gestão XPTO",
            image: "https://via.placeholder.com/600x350.png?text=Detalhe+Projeto+Alpha",
            description: "Uma plataforma web robusta desenvolvida para otimizar os processos internos da empresa XPTO, resultando em um aumento de 30% na eficiência operacional. O sistema inclui módulos de gerenciamento de clientes, faturamento e relatórios analíticos.",
            challenges: ["Integrar com sistemas legados.", "Garantir alta performance com grande volume de dados.", "Interface intuitiva para usuários não técnicos."],
            solutions: ["API de integração customizada.", "Otimização de queries e cache.", "Workshops de UX com os stakeholders."],
            tags: ["React", "Node.js", "MongoDB", "UX Design"],
            link: "#" // Link real do projeto
        },
        inova: {
            title: "App Mobile InovaHealth",
            image: "https://via.placeholder.com/600x350.png?text=Detalhe+App+Inova",
            description: "Aplicativo móvel para iOS e Android que facilita o agendamento de consultas e o acompanhamento de tratamentos de saúde. Foco em uma experiência de usuário simples e acessível.",
            challenges: ["Segurança dos dados do paciente (LGPD).", "Performance em dispositivos variados.", "Notificações em tempo real."],
            solutions: ["Criptografia ponta-a-ponta e conformidade com LGPD.", "Desenvolvimento nativo otimizado.", "Uso de Firebase Cloud Messaging."],
            tags: ["React Native", "Firebase", "UX/UI Mobile"],
            link: "#" // Link real do projeto
        }