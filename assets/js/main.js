/* ============================================
   B S FIRE SERVICE - MAIN JAVASCRIPT
   Component 1: Header & Navigation
   ============================================ */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== MOBILE MENU FUNCTIONALITY =====
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const menuOverlay = document.getElementById('menuOverlay');
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.querySelector('.header');
    
    // Toggle mobile menu
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            menuOverlay.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
    }
    
    // Close menu when overlay is clicked
    if (menuOverlay) {
        menuOverlay.addEventListener('click', function() {
            closeMenu();
        });
    }
    
    // Close menu when navigation link is clicked
    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            closeMenu();
        });
    });
    
    // Function to close mobile menu
    function closeMenu() {
        if (menuToggle) menuToggle.classList.remove('active');
        if (navMenu) navMenu.classList.remove('active');
        if (menuOverlay) menuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Close menu on window resize (if user rotates device)
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            if (window.innerWidth > 768) {
                closeMenu();
            }
        }, 250);
    });
    
    
    // ===== HEADER SCROLL EFFECT =====
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Add shadow to header when scrolled
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    
    // ===== ACTIVE NAVIGATION HIGHLIGHT ON SCROLL =====
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavigation() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(function(section) {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 150;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector('.nav-menu a[href="#' + sectionId + '"]');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                // Remove active class from all links
                navLinks.forEach(function(link) {
                    link.classList.remove('active');
                });
                
                // Add active class to current section link
                if (navLink) {
                    navLink.classList.add('active');
                }
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavigation);
    
    
    // ===== SMOOTH SCROLL FOR NAVIGATION LINKS =====
    const allNavLinks = document.querySelectorAll('.nav-menu a, .logo');
    
    allNavLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            const href = link.getAttribute('href');
            
            // Only handle internal anchor links
            if (href && href.startsWith('#')) {
                const target = document.querySelector(href);
                
                if (target) {
                    e.preventDefault();
                    
                    const headerHeight = header.offsetHeight;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });
                    
                   
                }
            }
        });
    });
    
    
    // ===== HANDLE DIRECT URL HASH ON PAGE LOAD =====
    if (window.location.hash) {
        const target = document.querySelector(window.location.hash);
        
        if (target) {
            setTimeout(function() {
                const headerHeight = header.offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth"
                });
            }, 100);
        }
    }
    
    
    // ===== ACCESSIBILITY: ESC KEY TO CLOSE MOBILE MENU =====
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            closeMenu();
        }
    });
    
    
    // ===== PREVENT SCROLL WHEN MENU IS OPEN (iOS FIX) =====
    navMenu.addEventListener('touchmove', function(e) {
        if (navMenu.classList.contains('active')) {
            e.stopPropagation();
        }
    }, { passive: false });
    
    
    // ===== COMPONENT 2: HERO SECTION ANIMATIONS =====
    
    // Intersection Observer for hero section animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, observerOptions);
    
    // Observe hero elements
    const heroElements = document.querySelectorAll('.hero-content, .hero-image');
    heroElements.forEach(function(element) {
        observer.observe(element);
    });
    
    // Smooth scroll for hero buttons
    const heroButtons = document.querySelectorAll('.hero-buttons .btn');
    heroButtons.forEach(function(button) {
        button.addEventListener('click', function(e) {
            const href = button.getAttribute('href');
            
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    const headerHeight = header.offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Scroll indicator click
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const heroSection = document.querySelector('.hero-section');
            const nextSection = heroSection.nextElementSibling;
            
            if (nextSection) {
                const headerHeight = header.offsetHeight;
                const targetPosition = nextSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }
    
    // Animate stats counter on scroll
    const statsNumbers = document.querySelectorAll('.stat-number');
    let statsAnimated = false;
    
    function animateStats() {
        if (statsAnimated) return;
        
        const heroStats = document.querySelector('.hero-stats');
        if (!heroStats) return;
        
        const rect = heroStats.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
        
        if (isVisible) {
            statsAnimated = true;
            
            statsNumbers.forEach(function(stat) {
                const text = stat.textContent;
                const hasPlus = text.includes('+');
                const number = parseInt(text);
                
                if (!isNaN(number)) {
                    animateCounter(stat, 0, number, 2000, hasPlus);
                }
            });
        }
    }
    
    function animateCounter(element, start, end, duration, hasPlus, hasPercent) {
        const range = end - start;
        const increment = range / (duration / 16);
        let current = start;
        
        const timer = setInterval(function() {
            current += increment;
            
            if (current >= end) {
                element.textContent = end + (hasPlus ? '+' : '') + (hasPercent ? '%' : '');
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + (hasPlus ? '+' : '') + (hasPercent ? '%' : '');
            }
        }, 16);
    }
    
    window.addEventListener('scroll', animateStats);
    animateStats(); // Check on load
    
    
    // ===== COMPONENT 3: ABOUT SECTION ANIMATIONS =====
    
    // Observe about section elements
    const aboutElements = document.querySelectorAll('.about-text, .about-image, .section-header');
    aboutElements.forEach(function(element) {
        observer.observe(element);
    });
    
    // Animate about features on scroll
    const aboutFeatures = document.querySelectorAll('.feature-item');
    let featuresAnimated = false;
    
    function animateFeatures() {
        if (featuresAnimated) return;
        
        const featuresContainer = document.querySelector('.about-features');
        if (!featuresContainer) return;
        
        const rect = featuresContainer.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight - 100 && rect.bottom >= 0;
        
        if (isVisible) {
            featuresAnimated = true;
            
            aboutFeatures.forEach(function(feature, index) {
                setTimeout(function() {
                    feature.style.animation = 'fadeInUp 0.6s ease-out forwards';
                }, index * 150);
            });
        }
    }
    
    window.addEventListener('scroll', animateFeatures);
    animateFeatures(); // Check on load
    
    // Stagger animation for about list items
    const aboutListItems = document.querySelectorAll('.about-list li');
    let listAnimated = false;
    
    function animateList() {
        if (listAnimated) return;
        
        const aboutList = document.querySelector('.about-list');
        if (!aboutList) return;
        
        const rect = aboutList.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight - 100 && rect.bottom >= 0;
        
        if (isVisible) {
            listAnimated = true;
            
            aboutListItems.forEach(function(item, index) {
                setTimeout(function() {
                    item.style.opacity = '0';
                    item.style.transform = 'translateX(-20px)';
                    item.style.transition = 'all 0.5s ease-out';
                    
                    setTimeout(function() {
                        item.style.opacity = '1';
                        item.style.transform = 'translateX(0)';
                    }, 50);
                }, index * 100);
            });
        }
    }
    
    window.addEventListener('scroll', animateList);
    animateList(); // Check on load
    
    
    // ===== COMPONENT 4: SERVICES SECTION ANIMATIONS =====
    
    // Observe service cards
    const serviceCards = document.querySelectorAll('.service-card');
    
    const serviceObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry, index) {
            if (entry.isIntersecting) {
                // Add stagger effect
                setTimeout(function() {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    serviceCards.forEach(function(card) {
        // Set initial state
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        
        serviceObserver.observe(card);
    });
    
    // Animate service features on hover
    serviceCards.forEach(function(card) {
        const features = card.querySelectorAll('.service-features li');
        
        card.addEventListener('mouseenter', function() {
            features.forEach(function(feature, index) {
                setTimeout(function() {
                    feature.style.transform = 'translateX(5px)';
                    feature.style.transition = 'transform 0.3s ease-out';
                }, index * 50);
            });
        });
        
        card.addEventListener('mouseleave', function() {
            features.forEach(function(feature) {
                feature.style.transform = 'translateX(0)';
            });
        });
    });
    
    // Animate CTA box
    const ctaBox = document.querySelector('.services-cta');
    if (ctaBox) {
        const ctaObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateY(30px)';
                    entry.target.style.transition = 'all 0.8s ease-out';
                    
                    setTimeout(function() {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, 300);
                }
            });
        }, {
            threshold: 0.1
        });
        
        ctaObserver.observe(ctaBox);
    }
    
    
    // ===== COMPONENT 5: PRODUCTS SECTION =====
    
    // Product category filtering
    const tabButtons = document.querySelectorAll('.tab-button');
    const productCards = document.querySelectorAll('.product-card');
    
    tabButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            const category = button.getAttribute('data-category');
            
            // Update active tab
            tabButtons.forEach(function(btn) {
                btn.classList.remove('active');
            });
            button.classList.add('active');
            
            // Filter products
            productCards.forEach(function(card, index) {
                const cardCategory = card.getAttribute('data-category');
                
                if (category === 'all' || cardCategory === category) {
                    card.classList.remove('hidden');
                    card.classList.add('show');
                    
                    // Stagger animation
                    setTimeout(function() {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, index * 50);
                } else {
                    card.classList.add('hidden');
                    card.classList.remove('show');
                }
            });
        });
    });
    
    // Animate products on scroll
    const productObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry, index) {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                setTimeout(function() {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    entry.target.classList.add('animated');
                }, index * 100);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    productCards.forEach(function(card) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        productObserver.observe(card);
    });
    
    // Animate product info boxes
    const infoItems = document.querySelectorAll('.info-item');
    const infoObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry, index) {
            if (entry.isIntersecting) {
                setTimeout(function() {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 150);
            }
        });
    }, {
        threshold: 0.1
    });
    
    infoItems.forEach(function(item) {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
        infoObserver.observe(item);
    });
    
    
    // ===== COMPONENT 6: INDUSTRIES SECTION =====
    
    // Animate industry cards on scroll
    const industryCards = document.querySelectorAll('.industry-card');
    
    const industryObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    industryCards.forEach(function(card) {
        industryObserver.observe(card);
    });
    
    // Animate industry stats
    const statCards = document.querySelectorAll('.stat-card');
    let industryStatsAnimated = false;
    
    function animateIndustryStats() {
        if (industryStatsAnimated) return;
        
        const firstStatCard = statCards[0];
        if (!firstStatCard) return;
        
        const rect = firstStatCard.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight - 100 && rect.bottom >= 0;
        
        if (isVisible) {
            industryStatsAnimated = true;
            
            statCards.forEach(function(card, index) {
                card.style.opacity = '0';
                card.style.transform = 'translateY(30px)';
                card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
                
                setTimeout(function() {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 150);
            });

        }
    }
    
    window.addEventListener('scroll', animateIndustryStats);
    animateIndustryStats(); // Check on load
    
    // Animate industries CTA
    const industriesCta = document.querySelector('.industries-cta');
    if (industriesCta) {
        const ctaObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'scale(0.95)';
                    entry.target.style.transition = 'all 0.8s ease-out';
                    
                    setTimeout(function() {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'scale(1)';
                    }, 200);
                }
            });
        }, {
            threshold: 0.1
        });
        
        ctaObserver.observe(industriesCta);
    }
    
    
    // ===== COMPONENT 7: CLIENTS SECTION =====
    
    // Animate client cards on scroll
    const clientCards = document.querySelectorAll('.client-card');
    
    const clientObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    clientCards.forEach(function(card) {
        clientObserver.observe(card);
    });
    
    // Animate testimonial cards on scroll
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    const testimonialObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    testimonialCards.forEach(function(card) {
        testimonialObserver.observe(card);
    });
    
    // Animate clients more section
    const clientsMore = document.querySelector('.clients-more');
    if (clientsMore) {
        const moreObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'scale(0.95)';
                    entry.target.style.transition = 'all 0.8s ease-out';
                    
                    setTimeout(function() {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'scale(1)';
                    }, 200);
                }
            });
        }, {
            threshold: 0.1
        });
        
        moreObserver.observe(clientsMore);
    }
    
    // Animate trust statement
    const trustStatement = document.querySelector('.trust-statement');
    if (trustStatement) {
        const trustObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateY(20px)';
                    entry.target.style.transition = 'all 0.6s ease-out';
                    
                    setTimeout(function() {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, 100);
                }
            });
        }, {
            threshold: 0.1
        });
        
        trustObserver.observe(trustStatement);
    }
    
    // ===== LOGO CAROUSEL ENHANCEMENTS =====
    
    // Adjust speed based on number of logos
    const logoCarousels = document.querySelectorAll('.logo-carousel');
    
    logoCarousels.forEach(function(carousel) {
        const track = carousel.querySelector('.logo-track');
        const logoCount = track.querySelectorAll('.logo-item').length / 2; // Divide by 2 (duplicates)
        
        // Adjust animation duration based on logo count
        // More logos = slower speed for readability
        const duration = Math.max(30, logoCount * 3);
        track.style.animationDuration = duration + 's';
    });
    
    // Add smooth pause/resume on section visibility
    const clientsSection = document.querySelector('.clients-section');
    if (clientsSection) {
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                const tracks = entry.target.querySelectorAll('.logo-track');
                tracks.forEach(function(track) {
                    if (entry.isIntersecting) {
                        track.style.animationPlayState = 'running';
                    } else {
                        track.style.animationPlayState = 'paused';
                    }
                });
            });
        }, { threshold: 0.1 });
        
        observer.observe(clientsSection);
    }
    
    
    // ===== COMPONENT 8: WHY CHOOSE US SECTION =====
    
    // Animate why cards on scroll
    const whyCards = document.querySelectorAll('.why-card');
    
    const whyObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    whyCards.forEach(function(card) {
        whyObserver.observe(card);
    });
    
    // Animate value cards on scroll
    const valueCards = document.querySelectorAll('.value-card');
    
    const valueObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    valueCards.forEach(function(card) {
        valueObserver.observe(card);
    });
    
    // Animate why CTA
    const whyCta = document.querySelector('.why-cta');
    if (whyCta) {
        const whyCtaObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'scale(0.95)';
                    entry.target.style.transition = 'all 0.8s ease-out';
                    
                    setTimeout(function() {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'scale(1)';
                    }, 200);
                }
            });
        }, {
            threshold: 0.1
        });
        
        whyCtaObserver.observe(whyCta);
    }
    
    
    // ===== COMPONENT 9: CONTACT SECTION =====
    
    // Animate info cards on scroll
    const infoCards = document.querySelectorAll('.info-card');
    
    const infoCardObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry, index) {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateX(-30px)';
                entry.target.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
                
                setTimeout(function() {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                    entry.target.classList.add('animated');
                }, index * 100);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    infoCards.forEach(function(card) {
        infoCardObserver.observe(card);
    });
    
    // Animate contact form
    const contactFormWrapper = document.querySelector('.contact-form-wrapper');
    if (contactFormWrapper) {
        const formObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateY(30px)';
                    entry.target.style.transition = 'all 0.8s ease-out';
                    
                    setTimeout(function() {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, 200);
                }
            });
        }, {
            threshold: 0.1
        });
        
        formObserver.observe(contactFormWrapper);
    }
    
    // ===== CONTACT FORM - EMAIL + WHATSAPP =====
    
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                phone: document.getElementById('phone').value,
                email: document.getElementById('email').value,
                service: document.getElementById('service').value,
                message: document.getElementById('message').value
            };
            
            // Get submit button
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalBtnHTML = submitBtn.innerHTML;
            
            // Show sending state
            submitBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="width:20px;height:20px;animation:spin 1s linear infinite;"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="4" opacity="0.3"/><path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg> Sending...';
            submitBtn.disabled = true;
            
            // Get current date/time in India timezone
            const currentDate = new Date().toLocaleString('en-IN', {
                timeZone: 'Asia/Kolkata',
                dateStyle: 'full',
                timeStyle: 'short'
            });
            
            // Send email via EmailJS
            emailjs.send(
                'service_dc6ebl8',      
                'template_rd857he',     
                {
                    name: formData.name,
                    phone: formData.phone,
                    email: formData.email,
                    service: formData.service,
                    message: formData.message,
                    date: currentDate
                }
            ).then(
                function(emailResponse) {
                    console.log('✅ Email sent successfully!', emailResponse);
                    
                    // Create WhatsApp message
                    const whatsappMessage = 
                        `*🔥 New Inquiry from Website*%0A%0A` +
                        `*👤 Name:* ${formData.name}%0A` +
                        `*📱 Phone:* ${formData.phone}%0A` +
                        `*📧 Email:* ${formData.email || 'Not provided'}%0A` +
                        `*🛠️ Service:* ${formData.service}%0A%0A` +
                        `*💬 Message:*%0A${formData.message}%0A%0A` +
                        `_Sent from website on ${currentDate}_`;
                    
                    // Open WhatsApp
                    window.open(`https://wa.me/916900700844?text=${whatsappMessage}`, '_blank');
                    
                    // Show success message
                    alert('✅ SUCCESS!\n\n📧 Email sent to your inbox\n📱 WhatsApp message opened\n\nWe will contact you soon!');
                    
                    // Reset form
                    contactForm.reset();
                    submitBtn.innerHTML = originalBtnHTML;
                    submitBtn.disabled = false;
                },
                function(emailError) {
                    console.error('❌ Email failed:', emailError);
                    
                    // Email failed, but still try WhatsApp
                    const whatsappMessage = 
                        `*🔥 New Inquiry from Website*%0A%0A` +
                        `*👤 Name:* ${formData.name}%0A` +
                        `*📱 Phone:* ${formData.phone}%0A` +
                        `*📧 Email:* ${formData.email || 'Not provided'}%0A` +
                        `*🛠️ Service:* ${formData.service}%0A%0A` +
                        `*💬 Message:*%0A${formData.message}`;
                    
                    window.open(`https://wa.me/916900700844?text=${whatsappMessage}`, '_blank');
                    
                    // Show partial success
                    alert('⚠️ Email sending failed, but WhatsApp message opened.\n\nPlease also call us: +91 6900700844');
                    
                    // Reset button
                    submitBtn.innerHTML = originalBtnHTML;
                    submitBtn.disabled = false;
                }
            );
        });
        
        // Form validation feedback
        const inputs = contactForm.querySelectorAll('input[required], select[required], textarea[required]');
        inputs.forEach(function(input) {
            input.addEventListener('invalid', function() {
                input.style.borderColor = '#E31E24';
            });
            
            input.addEventListener('input', function() {
                if (input.validity.valid) {
                    input.style.borderColor = 'transparent';
                }
            });
        });
    }
    
    // Animate map section
    const mapSection = document.querySelector('.map-section');
    if (mapSection) {
        const mapObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'scale(0.95)';
                    entry.target.style.transition = 'all 0.8s ease-out';
                    
                    setTimeout(function() {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'scale(1)';
                    }, 300);
                }
            });
        }, {
            threshold: 0.1
        });
        
        mapObserver.observe(mapSection);
    }
    
    
    // ===== COMPONENT 10: FOOTER - BACK TO TOP BUTTON =====
    
    const backToTopButton = document.getElementById('backToTop');
    
    if (backToTopButton) {
        backToTopButton.addEventListener('click', function () {
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
        });
        
        // Show/hide back to top button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 500) {
                backToTopButton.style.opacity = '1';
            } else {
                backToTopButton.style.opacity = '0.7';
            }
        });
    }
    
    const yearSpan = document.getElementById("currentYear");
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }   
    
    
    // ===== FLOATING WHATSAPP BUTTON =====
    const whatsappButton = document.querySelector('.whatsapp-float');
    
    // Track WhatsApp button clicks (optional analytics)
    if (whatsappButton) {
        whatsappButton.addEventListener('click', function() {
            console.log('WhatsApp button clicked');
            // You can add analytics tracking here if needed
        });
    }
    
    // Show/hide WhatsApp button based on scroll position
    let whatsappVisible = true;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Hide button when at very top of page (optional)
        if (scrollTop < 100 && whatsappVisible) {
            // Keep visible - you can add hide logic if needed
        }
    });
    
    // ===== PORTFOLIO SLIDESHOW =====
    
    let slideIndex = 1;
    let slideTimer;
    
    // Initialize slideshow
    function initSlideshow() {
        showSlides(slideIndex);
        startAutoSlide();
    }
    
    // Auto-play slideshow
    function startAutoSlide() {
        slideTimer = setInterval(function() {
            changeSlide(1);
        }, 5000); // Change slide every 5 seconds
    }
    
    // Stop auto-play when user interacts
    function stopAutoSlide() {
        clearInterval(slideTimer);
    }
    
    // Next/previous controls
    function changeSlide(n) {
        stopAutoSlide();
        showSlides(slideIndex += n);
        startAutoSlide();
    }
    
    // Thumbnail image controls
    function currentSlide(n) {
        stopAutoSlide();
        showSlides(slideIndex = n);
        startAutoSlide();
    }
    
    // Show slides
    function showSlides(n) {
        let i;
        const slides = document.querySelectorAll('.portfolio-slide');
        const dots = document.querySelectorAll('.dot');
        
        if (!slides.length) return; // Exit if no slides
        
        if (n > slides.length) {
            slideIndex = 1;
        }
        
        if (n < 1) {
            slideIndex = slides.length;
        }
        
        // Hide all slides
        for (i = 0; i < slides.length; i++) {
            slides[i].classList.remove('active');
        }
        
        // Remove active from all dots
        for (i = 0; i < dots.length; i++) {
            dots[i].classList.remove('active');
        }
        
        // Show current slide
        slides[slideIndex - 1].classList.add('active');
        dots[slideIndex - 1].classList.add('active');
    }
    
    // Initialize when page loads
    if (document.querySelector('.slideshow-container')) {
        initSlideshow();
    }
    
    // Pause slideshow when tab is hidden
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            stopAutoSlide();
        } else {
            startAutoSlide();
        }
    });
    
    
    // ===== LIGHTBOX FUNCTIONALITY =====
    
    function openLightbox(imgSrc, caption) {
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        const lightboxCaption = document.getElementById('lightbox-caption');
        
        lightbox.classList.add('active');
        lightboxImg.src = imgSrc;
        lightboxCaption.textContent = caption;
        stopAutoSlide(); // Pause slideshow
    }
    
    function closeLightbox() {
        const lightbox = document.getElementById('lightbox');
        lightbox.classList.remove('active');
        startAutoSlide(); // Resume slideshow
    }
    
    // Add click listeners to all slide images
    document.querySelectorAll('.portfolio-slide img').forEach(function(img) {
        img.style.cursor = 'pointer';
        img.addEventListener('click', function(e) {
            e.stopPropagation();
            const caption = this.nextElementSibling.querySelector('h4').textContent;
            openLightbox(this.src, caption);
        });
    });
    
    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeLightbox();
        }
    });
    
}); // End DOMContentLoaded