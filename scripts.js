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