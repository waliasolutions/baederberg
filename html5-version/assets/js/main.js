
import { initMobileMenu } from './mobile-menu.js';
import { initGalleryFilters } from './gallery-filter.js';
import { initContactForm } from './contact-form.js';
import { initScrollEffects } from './scroll-effects.js';

document.addEventListener('DOMContentLoaded', function() {
  // Set current year in footer
  document.getElementById('currentYear').textContent = new Date().getFullYear();
  
  // Initialize all modules
  initMobileMenu();
  initGalleryFilters();
  initContactForm();
  initScrollEffects();
});
