document.addEventListener('DOMContentLoaded', () => {
    // Preloader
    const preloader = document.getElementById('preloader');
    if (preloader) { // VERIFICAÇÃO
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.classList.add('loaded');
            }, 500);
        });
    }

    // Navegação Suave e Ativação de Links
    const navLinks = document.querySelectorAll('#main-header nav ul li a');
    const header = document.getElementById('main-header');
    const headerHeight = header ? header.offsetHeight : 70; // Fallback se header não for encontrado

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Verifica se o link é uma âncora interna
            if (this.hash !== "" && this.pathname === window.location.pathname) {
                e.preventDefault();
                const hash = this.hash;
                const targetElement = document.querySelector(hash);
                if (targetElement) {
                    // A compensação do header agora é feita com scroll-margin-top no CSS
                    // Mas se precisar de um offset extra no JS por algum motivo:
                    // const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                    // const offsetPosition = elementPosition - headerHeight;
                    // window.scrollTo({ top: offsetPosition, behavior: "smooth" });

                    // Usando o scrollIntoView que respeita scroll-margin-top
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });


                    const mobileNav = document.querySelector('#main-header nav ul');
                    const mobileMenuToggle = document.getElementById('mobile-menu-toggle'); // Precisa ser definido aqui também
                    if (mobileNav && mobileNav.classList.contains('active') && mobileMenuToggle) { // VERIFICAÇÕES
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
        const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

        sections.forEach(section => {
            // Ajustar o offset para ser um pouco antes do topo da seção para melhor feedback
            const sectionTop = section.offsetTop - headerHeight - Math.round(window.innerHeight * 0.3);
            if (scrollPosition >= sectionTop) {
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
    setActiveLink();


    // Menu Mobile Toggle
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mainNavUl = document.querySelector('#main-header nav ul');
    if (mobileMenuToggle && mainNavUl) { // VERIFICAÇÕES
        mobileMenuToggle.addEventListener('click', () => {
            mainNavUl.classList.toggle('active');
            mobileMenuToggle.innerHTML = mainNavUl.classList.contains('active') ?
                '<i class="fas fa-times"></i>' :
                '<i class="fas fa-bars"></i>';
        });
    }


    // Animações On-Scroll com Intersection Observer
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    if (window.IntersectionObserver) { // VERIFICA se o browser suporta
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries, observerInstance) => { // Renomeado observer para observerInstance
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    // observerInstance.unobserve(entry.target); // Para animar apenas uma vez
                } else {
                    // entry.target.classList.remove('is-visible'); // Para animar toda vez
                }
            });
        }, observerOptions);

        animatedElements.forEach(el => {
            observer.observe(el);
        });
    } else {
        // Fallback para browsers que não suportam IntersectionObserver (ex: mostrar tudo)
        animatedElements.forEach(el => el.classList.add('is-visible'));
    }


    // Ano atual no Footer
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) { // VERIFICAÇÃO
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Modal de Projetos
    const projectDetailButtons = document.querySelectorAll('.project-details-button');
    const modal = document.getElementById('project-modal');
    const closeModalButton = modal ? modal.querySelector('.close-modal-button') : null; // Seleciona dentro do modal
    const modalProjectTitle = document.getElementById('modal-project-title');
    const modalProjectImage = document.getElementById('modal-project-image');
    const modalProjectDescriptionDiv = document.getElementById('modal-project-description'); // Renomeado para clareza
    const modalProjectLink = document.getElementById('modal-project-link');
    const modalProjectChallenges = document.getElementById('modal-project-challenges');
    const modalProjectSolutions = document.getElementById('modal-project-solutions');
    const modalProjectTags = document.getElementById('modal-project-tags');

    const projectData = { /* Seus dados de projeto aqui, como no exemplo anterior */
        alpha: { /* ... */ },
        inova: { /* ... */ }
    };

    // VERIFICAÇÕES para todos os elementos do modal
    if (modal && closeModalButton && modalProjectTitle && modalProjectImage && modalProjectDescriptionDiv && modalProjectLink && modalProjectChallenges && modalProjectSolutions && modalProjectTags) {

        projectDetailButtons.forEach(button => {
            button.addEventListener('click', () => {
                const projectId = button.dataset.projectId;
                const data = projectData[projectId];
                if (data) {
                    modalProjectTitle.textContent = data.title || "Título Indisponível";
                    modalProjectImage.src = data.image || "https://via.placeholder.com/600x350.png?text=Imagem+Indispon%C3%ADvel";
                    modalProjectImage.alt = `Imagem do ${data.title || "Projeto"}`;

                    const descP = modalProjectDescriptionDiv.querySelector('p:first-of-type'); // Pega o primeiro <p>
                    if (descP) {
                        descP.textContent = data.description || "Descrição indisponível.";
                    } else {
                        // Se não houver <p>, cria um (ou loga um erro)
                        const newP = document.createElement('p');
                        newP.textContent = data.description || "Descrição indisponível.";
                        // Limpa conteúdo antigo da div de descrição antes de adicionar
                        const firstChild = modalProjectDescriptionDiv.firstChild;
                        if (firstChild && firstChild.nodeName === 'P') {
                            modalProjectDescriptionDiv.insertBefore(newP, firstChild);
                        } else {
                            modalProjectDescriptionDiv.prepend(newP);
                        }

                    }

                    // Limpa e preenche listas e tags
                    modalProjectChallenges.innerHTML = '';
                    (data.challenges || []).forEach(item => {
                        const li = document.createElement('li');
                        li.textContent = item;
                        modalProjectChallenges.appendChild(li);
                    });

                    modalProjectSolutions.innerHTML = '';
                    (data.solutions || []).forEach(item => {
                        const li = document.createElement('li');
                        li.textContent = item;
                        modalProjectSolutions.appendChild(li);
                    });

                    modalProjectTags.innerHTML = '';
                    (data.tags || []).forEach(tagText => {
                        const tagSpan = document.createElement('span');
                        tagSpan.textContent = tagText;
                        modalProjectTags.appendChild(tagSpan);
                    });

                    if (data.link && data.link !== "#") {
                        modalProjectLink.href = data.link;
                        modalProjectLink.style.display = 'inline-block';
                    } else {
                        modalProjectLink.style.display = 'none';
                    }
                    modal.style.display = 'block';
                    document.body.style.overflow = 'hidden';
                } else {
                    console.warn(`Dados não encontrados para o projeto ID: ${projectId}`);
                }
            });
        });

        closeModalButton.addEventListener('click', () => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });

        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });

        // Fechar modal com a tecla ESC
        window.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && modal.style.display === 'block') {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });

    } else {
        console.warn("Um ou mais elementos do modal não foram encontrados no DOM. Funcionalidade do modal pode estar comprometida.");
    }


    // Formulário de Contato
    const contactForm = document.getElementById('contact-form');
    if (contactForm) { // VERIFICAÇÃO
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const nomeInput = this.querySelector('input[name="nome"]'); // Mais robusto
            alert('Obrigado pela sua mensagem, ' + (nomeInput ? nomeInput.value : '') + '! (Exemplo, sem envio real).');
            this.reset();
        });
    }
});