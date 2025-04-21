
document.addEventListener('DOMContentLoaded', function() {
  // Set current year in footer
  document.getElementById('currentYear').textContent = new Date().getFullYear();
  
  // Mobile menu toggle
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const mobileMenu = document.createElement('div');
  mobileMenu.className = 'mobile-menu';
  document.body.appendChild(mobileMenu);
  
  if (menuToggle) {
    menuToggle.addEventListener('click', function() {
      this.classList.toggle('active');
      document.body.classList.toggle('menu-open');
      mobileMenu.classList.toggle('active');
      
      if (mobileMenu.classList.contains('active')) {
        // Create mobile menu content
        mobileMenu.innerHTML = `
          <div class="mobile-menu-inner">
            <div class="mobile-menu-header">
              <div class="logo">
                <div class="logo-container">
                  <img src="assets/images/logo.png" alt="Bäderberg Logo" class="logo-img">
                </div>
                Bäderberg
              </div>
              <button class="mobile-menu-close">×</button>
            </div>
            <nav class="mobile-nav">
              <ul>
                <li><a href="#services" class="mobile-menu-link">Leistungen</a></li>
                <li><a href="#gallery" class="mobile-menu-link">Projekte</a></li>
                <li><a href="#about" class="mobile-menu-link">Über Uns</a></li>
                <li class="mobile-submenu">
                  <div class="mobile-submenu-header">
                    <span>Regionen</span>
                    <button class="mobile-submenu-toggle">+</button>
                  </div>
                  <ul class="mobile-submenu-content">
                    <li><a href="region-zurich.html">Zürich</a></li>
                    <li><a href="region-richterswil.html">Richterswil</a></li>
                    <li><a href="region-waedenswil.html">Wädenswil</a></li>
                    <li><a href="region-lachen.html">Lachen</a></li>
                    <li><a href="region-pfaeffikon.html">Pfäffikon SZ</a></li>
                  </ul>
                </li>
              </ul>
            </nav>
            <div class="mobile-menu-footer">
              <a href="#contact" class="btn btn-primary mobile-menu-link">Kostenlose Beratung</a>
            </div>
          </div>
        `;
        
        // Mobile menu close button
        const mobileMenuClose = mobileMenu.querySelector('.mobile-menu-close');
        if (mobileMenuClose) {
          mobileMenuClose.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            document.body.classList.remove('menu-open');
            mobileMenu.classList.remove('active');
          });
        }
        
        // Mobile submenu toggle
        const mobileSubmenuToggle = mobileMenu.querySelector('.mobile-submenu-toggle');
        if (mobileSubmenuToggle) {
          mobileSubmenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            const content = this.closest('.mobile-submenu').querySelector('.mobile-submenu-content');
            if (content) {
              content.classList.toggle('active');
              this.textContent = content.classList.contains('active') ? '−' : '+';
            }
          });
        }
        
        // Mobile menu links (close menu when clicked)
        const mobileMenuLinks = mobileMenu.querySelectorAll('.mobile-menu-link');
        mobileMenuLinks.forEach(link => {
          link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            document.body.classList.remove('menu-open');
            mobileMenu.classList.remove('active');
          });
        });
      }
    });
  }
  
  // Project filters
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  
  if (filterButtons.length > 0 && projectCards.length > 0) {
    filterButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        const filter = this.getAttribute('data-filter');
        
        // Show all projects or filter by tag
        projectCards.forEach(card => {
          if (filter === 'all' || card.getAttribute('data-tags').includes(filter)) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }
  
  // Smooth scrolling for anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#') {
        e.preventDefault();
        const targetElement = document.querySelector(href);
        if (targetElement) {
          const headerHeight = document.querySelector('.site-header').offsetHeight;
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });
  
  // Header scroll effect
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }
  
  // Form submission
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Here you would normally handle form submission via AJAX
      // For WordPress integration, you'll need to use WordPress's ajax functions
      
      // Simple validation
      let isValid = true;
      const formFields = contactForm.querySelectorAll('input, textarea');
      
      formFields.forEach(field => {
        if (field.hasAttribute('required') && !field.value.trim()) {
          field.classList.add('error');
          isValid = false;
        } else {
          field.classList.remove('error');
        }
        
        if (field.type === 'email' && field.value.trim()) {
          const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailPattern.test(field.value)) {
            field.classList.add('error');
            isValid = false;
          }
        }
      });
      
      if (isValid) {
        // Show success message (for demo purposes)
        const formMessage = document.createElement('div');
        formMessage.className = 'form-message success';
        formMessage.textContent = 'Vielen Dank für Ihre Nachricht! Wir werden uns so schnell wie möglich bei Ihnen melden.';
        
        contactForm.innerHTML = '';
        contactForm.appendChild(formMessage);
      }
    });
  }
  
  // Add custom CSS for mobile menu
  const style = document.createElement('style');
  style.textContent = `
    body.menu-open {
      overflow: hidden;
    }
    
    .mobile-menu {
      position: fixed;
      top: 0;
      right: -100%;
      width: 100%;
      max-width: 400px;
      height: 100vh;
      background-color: white;
      z-index: 1000;
      transition: right 0.3s ease;
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
      display: flex;
      flex-direction: column;
    }
    
    .mobile-menu.active {
      right: 0;
    }
    
    .mobile-menu-inner {
      display: flex;
      flex-direction: column;
      height: 100%;
    }
    
    .mobile-menu-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem;
      border-bottom: 1px solid var(--border-color);
    }
    
    .mobile-menu-close {
      background: none;
      border: none;
      font-size: 2rem;
      cursor: pointer;
      color: var(--text-color);
    }
    
    .mobile-nav {
      padding: 1rem;
      flex-grow: 1;
      overflow-y: auto;
    }
    
    .mobile-nav ul {
      display: grid;
      gap: 0.75rem;
    }
    
    .mobile-nav ul > li > a {
      display: block;
      padding: 0.75rem;
      font-weight: 500;
      border-radius: var(--radius);
    }
    
    .mobile-nav ul > li > a:hover {
      background-color: var(--secondary-color);
    }
    
    .mobile-submenu-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.75rem;
      font-weight: 500;
      cursor: pointer;
    }
    
    .mobile-submenu-toggle {
      background: none;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
    }
    
    .mobile-submenu-content {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.3s ease;
      padding-left: 1rem;
    }
    
    .mobile-submenu-content.active {
      max-height: 500px;
    }
    
    .mobile-submenu-content a {
      display: block;
      padding: 0.75rem;
      color: var(--text-muted);
    }
    
    .mobile-menu-footer {
      padding: 1rem;
      border-top: 1px solid var(--border-color);
    }
    
    .mobile-menu-toggle.active span:nth-child(1) {
      transform: rotate(45deg) translate(5px, 5px);
    }
    
    .mobile-menu-toggle.active span:nth-child(2) {
      opacity: 0;
    }
    
    .mobile-menu-toggle.active span:nth-child(3) {
      transform: rotate(-45deg) translate(5px, -5px);
    }
    
    .form-message {
      padding: 2rem;
      text-align: center;
      border-radius: var(--radius);
    }
    
    .form-message.success {
      background-color: #d1fae5;
      color: #047857;
    }
    
    .form-group input.error,
    .form-group textarea.error {
      border-color: #ef4444;
    }
    
    .header-inner {
      height: 60px;
    }
    
    .site-header.scrolled {
      padding: 0.5rem 0;
      box-shadow: var(--shadow-md);
    }
  `;
  document.head.appendChild(style);
});
