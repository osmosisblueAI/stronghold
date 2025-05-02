document.addEventListener('DOMContentLoaded', function() {
    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });

    // Form Submission Handler
    const quickContactForm = document.getElementById('quick-contact-form');
    if (quickContactForm) {
        quickContactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Here you would normally send the form data to a server
            // For now, we'll just show a success message
            const formElements = quickContactForm.elements;
            let isValid = true;
            
            // Simple validation
            for (let i = 0; i < formElements.length; i++) {
                if (formElements[i].type !== 'submit' && formElements[i].required && !formElements[i].value.trim()) {
                    isValid = false;
                    formElements[i].classList.add('is-invalid');
                } else if (formElements[i].type !== 'submit') {
                    formElements[i].classList.remove('is-invalid');
                }
            }
            
            if (isValid) {
                // Replace form with success message
                const successMessage = document.createElement('div');
                successMessage.className = 'alert alert-success';
                successMessage.innerHTML = '<h4>Thank you for your message!</h4><p>We\'ll get back to you as soon as possible.</p>';
                
                quickContactForm.innerHTML = '';
                quickContactForm.appendChild(successMessage);
            }
        });
    }

    // Quote Form Handler (for quote.html)
    const quoteForm = document.getElementById('quote-request-form');
    if (quoteForm) {
        quoteForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            let isValid = true;
            const formElements = quoteForm.elements;
            
            for (let i = 0; i < formElements.length; i++) {
                if (formElements[i].type !== 'submit' && formElements[i].required && !formElements[i].value.trim()) {
                    isValid = false;
                    formElements[i].classList.add('is-invalid');
                } else if (formElements[i].type !== 'submit') {
                    formElements[i].classList.remove('is-invalid');
                }
            }
            
            if (isValid) {
                // Replace form with success message
                const successMessage = document.createElement('div');
                successMessage.className = 'alert alert-success mt-4';
                successMessage.innerHTML = '<h4>Thank you for your quote request!</h4><p>One of our representatives will contact you within 24 hours to discuss your project needs.</p>';
                
                quoteForm.innerHTML = '';
                quoteForm.appendChild(successMessage);
            }
        });
    }
    
    // Project Filter (for projects.html)
    const filterButtons = document.querySelectorAll('.project-filter button');
    const projectItems = document.querySelectorAll('.project-item');
    
    if (filterButtons.length > 0 && projectItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                projectItems.forEach(item => {
                    if (filterValue === 'all' || item.classList.contains(filterValue)) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.classList.add('show');
                        }, 50);
                    } else {
                        item.classList.remove('show');
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
    
    // Animate on scroll initialization
    // This uses the intersection observer API to add animation classes when elements come into view
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    if (animatedElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                }
            });
        }, { threshold: 0.1 });
        
        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }
    
    // Testimonial carousel (if we implement one later)
    const testimonialCarousel = document.querySelector('.testimonial-carousel');
    if (testimonialCarousel) {
        // This would initialize a carousel/slider if we add one later
        // For now, it's just a placeholder
    }
    
    // Back to top button
    const backToTopBtn = document.querySelector('.back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });
        
        backToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Mobile menu toggle enhancement
    const navbarToggler = document.querySelector('.navbar-toggler');
    if (navbarToggler) {
        navbarToggler.addEventListener('click', function() {
            document.body.classList.toggle('menu-open');
        });
    }
});
