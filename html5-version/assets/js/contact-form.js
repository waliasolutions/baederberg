
// Contact form functionality
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
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
}

export { initContactForm };
