
// Mobile menu functionality
function initMobileMenu() {
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
                    <li><a href="region-zollikon.html">Zollikon</a></li>
                    <li><a href="region-kilchberg.html">Kilchberg</a></li>
                    <li><a href="region-kuesnacht.html">Küsnacht</a></li>
                    <li><a href="region-meilen.html">Meilen</a></li>
                    <li><a href="region-erlenbach.html">Erlenbach</a></li>
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
}

export { initMobileMenu };
