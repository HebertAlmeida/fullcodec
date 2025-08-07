
document.addEventListener('DOMContentLoaded', () => {

  /***************************************/
  /*           UI & UX Enhancements      */
  /***************************************/
  
  // Preloader
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    preloader.classList.add('loaded');
  });

  // Header Scroll Effect
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Mobile Navigation
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.innerHTML = navMenu.classList.contains('active') ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
  });
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      hamburger.innerHTML = '<i class="fas fa-bars"></i>';
    });
  });

  // Active Nav Link on Scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (window.pageYOffset >= sectionTop - 150) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').includes(current)) {
        link.classList.add('active');
      }
    });
  });
  
  // Reveal Elements on Scroll
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
  }, { threshold: 0.1 });
  
  document.querySelectorAll('.about-content, .service-card, .project-card, .contact-content').forEach(el => {
      el.classList.add('reveal');
      revealObserver.observe(el);
  });
  
  // Contact Form Simulation
  const contactForm = document.querySelector('.contact-form');
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const submitBtn = this.querySelector('button[type="submit"]');
    submitBtn.textContent = 'Enviando...';
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.textContent = 'Mensagem Enviada!';
      submitBtn.style.backgroundColor = '#10b981';
      setTimeout(() => {
        submitBtn.textContent = 'Enviar Mensagem';
        submitBtn.disabled = false;
        submitBtn.style.backgroundColor = '';
        this.reset();
      }, 2000);
    }, 1500);
  });
  

  /***************************************/
  /*        ON-PAGE EDITING SYSTEM       */
  /***************************************/

  // --- Configuration ---
  const ADMIN_PASSWORD = 'admin'; // !!! CHANGE THIS PASSWORD !!!
  const ADMIN_AUTH_KEY = 'portfolioAdminAuthenticated';
  const CONTENT_STORAGE_KEY = 'portfolioContent';

  let adminMode = false;
  
  // --- Core Functions ---

  function loadContent() {
    try {
      const storedContent = localStorage.getItem(CONTENT_STORAGE_KEY);
      if (storedContent) {
        const contentStore = JSON.parse(storedContent);
        for (const id in contentStore) {
          const element = document.querySelector(`[data-editable="${id}"], [data-editable-src="${id}"]`);
          if (element) {
            if (element.hasAttribute('data-editable')) {
                element.innerHTML = contentStore[id];
            } else if (element.hasAttribute('data-editable-src')) {
                element.src = contentStore[id];
            }
          }
        }
        console.log('Conteúdo carregado do Local Storage.');
      }
    } catch (error) {
      console.error('Falha ao carregar conteúdo:', error);
      localStorage.removeItem(CONTENT_STORAGE_KEY);
    }
  }

  function saveContent() {
    const newContent = {};
    document.querySelectorAll('[data-editable]').forEach(el => {
      newContent[el.dataset.editable] = el.innerHTML;
    });
    document.querySelectorAll('[data-editable-src]').forEach(el => {
      newContent[el.dataset.editableSrc] = el.src;
    });
    
    try {
        localStorage.setItem(CONTENT_STORAGE_KEY, JSON.stringify(newContent));
        alert('Alterações salvas com sucesso no seu navegador!');
    } catch (error) {
        console.error('Falha ao salvar conteúdo:', error);
        alert('Erro ao salvar. O armazenamento local pode estar cheio.');
    }
  }

  function toggleAdminMode(enable) {
    adminMode = enable;
    document.body.classList.toggle('admin-mode', adminMode);

    document.querySelectorAll('[data-editable]').forEach(el => {
      el.contentEditable = adminMode;
    });

    if (adminMode) {
      console.log('Modo de edição ATIVADO.');
      addEditListeners();
    } else {
      console.log('Modo de edição DESATIVADO.');
      sessionStorage.removeItem(ADMIN_AUTH_KEY); // End session on exit
      removeEditListeners();
    }
  }

  function authenticateAndEdit() {
    if (sessionStorage.getItem(ADMIN_AUTH_KEY) === 'true') {
        toggleAdminMode(true);
        return;
    }

    const password = prompt('Digite a senha de administrador para ativar o modo de edição:');
    if (password === ADMIN_PASSWORD) {
        sessionStorage.setItem(ADMIN_AUTH_KEY, 'true');
        toggleAdminMode(true);
    } else if (password !== null) { // User didn't click cancel
        alert('Senha incorreta.');
    }
  }


  // --- Event Handlers & Listeners ---

  const handleImageEdit = (e) => {
    if (!adminMode) return;
    const imgElement = e.currentTarget;
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = () => {
      const file = input.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          imgElement.src = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  function addEditListeners() {
      document.querySelectorAll('[data-editable-src]').forEach(el => {
          el.addEventListener('click', handleImageEdit);
      });
  }
  
  function removeEditListeners() {
      document.querySelectorAll('[data-editable-src]').forEach(el => {
          el.removeEventListener('click', handleImageEdit);
      });
  }

  function initializeAdmin() {
    // Check for query param to activate
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('edit') === 'true') {
        window.history.replaceState({}, document.title, window.location.pathname);
        authenticateAndEdit();
    } else if (sessionStorage.getItem(ADMIN_AUTH_KEY) === 'true') {
        toggleAdminMode(true);
    }

    // Add keyboard shortcut to toggle
    document.addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.altKey && e.key.toLowerCase() === 'e') {
        e.preventDefault();
        if (adminMode) {
            toggleAdminMode(false);
        } else {
            authenticateAndEdit();
        }
      }
    });

    // Admin panel buttons
    document.getElementById('save-button').addEventListener('click', saveContent);
    document.getElementById('exit-button').addEventListener('click', () => toggleAdminMode(false));
  }

  // --- Initial Execution ---
  
  loadContent();
  initializeAdmin();

});
