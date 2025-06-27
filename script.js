document.addEventListener("DOMContentLoaded", () => {
  const langBtn = document.getElementById("lang-btn");
  const themeBtn = document.getElementById("theme-toggle");
  const ptVersion = document.getElementById("pt-version");
  const enVersion = document.getElementById("en-version");
  const body = document.body;

  // Set English as default and dark theme as primary
  enVersion.style.display = "block";
  ptVersion.style.display = "none";
  langBtn.textContent = "Português";

  // Language switching functionality
  langBtn.addEventListener("click", () => {
    if (enVersion.style.display === "none") {
      enVersion.style.display = "block";
      ptVersion.style.display = "none";
      langBtn.textContent = "Português";
    } else {
      enVersion.style.display = "none";
      ptVersion.style.display = "block";
      langBtn.textContent = "English";
    }
  });

  // Theme switching functionality - Dark as primary
  const currentTheme = localStorage.getItem("theme") || "dark";
  body.setAttribute("data-theme", currentTheme);
  updateThemeIcon(currentTheme);

  themeBtn.addEventListener("click", () => {
    const currentTheme = body.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    body.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    updateThemeIcon(newTheme);
  });

  function updateThemeIcon(theme) {
    const icon = themeBtn.querySelector("i");
    if (theme === "dark") {
      icon.className = "fas fa-sun";
    } else {
      icon.className = "fas fa-moon";
    }
  }

  // Smooth scrolling for internal links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Add scroll effect to navbar
  let lastScrollTop = 0;
  const navbar = document.querySelector(".navbar");

  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop && scrollTop > 100) {
      // Scrolling down
      navbar.style.transform = "translateY(-100%)";
    } else {
      // Scrolling up
      navbar.style.transform = "translateY(0)";
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  });

  // Add intersection observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observe all content sections
  document.querySelectorAll(".content-section, .job-card, .education-card").forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });

  // Enhanced typing effect for hero title
  const heroTitle = document.querySelector(".hero-title");
  if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = "";
    let i = 0;

    const typeWriter = () => {
      if (i < text.length) {
        heroTitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 80);
      } else {
        // Add cursor blink effect
        heroTitle.style.borderRight = "3px solid var(--accent-primary)";
        heroTitle.style.animation = "blink 1s infinite";
      }
    };

    // Start typing effect after a short delay
    setTimeout(typeWriter, 800);
  }

  // Enhanced particle effect with Monster theme colors
  createParticles();

  function createParticles() {
    const particlesContainer = document.createElement("div");
    particlesContainer.className = "particles";
    particlesContainer.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: -1;
    `;

    document.body.appendChild(particlesContainer);

    const colors = ["#6c5ce7", "#a29bfe", "#fd79a8", "#74b9ff"];

    for (let i = 0; i < 60; i++) {
      const particle = document.createElement("div");
      const color = colors[Math.floor(Math.random() * colors.length)];
      const size = Math.random() * 4 + 2;

      particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        border-radius: 50%;
        opacity: ${Math.random() * 0.5 + 0.2};
        animation: float ${Math.random() * 15 + 15}s infinite linear;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        box-shadow: 0 0 10px ${color};
      `;
      particlesContainer.appendChild(particle);
    }

    // Add CSS animations
    const style = document.createElement("style");
    style.textContent = `
      @keyframes float {
        0% { transform: translateY(0px) rotate(0deg); opacity: 0; }
        10% { opacity: 0.8; }
        90% { opacity: 0.8; }
        100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
      }
      
      @keyframes blink {
        0%, 50% { border-color: var(--accent-primary); }
        51%, 100% { border-color: transparent; }
      }
      
      @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
      }
    `;
    document.head.appendChild(style);
  }

  // Enhanced click effect with Monster theme
  document.querySelectorAll("button, .contact-item, .skill-tag, .job-card, .education-card").forEach((element) => {
    element.addEventListener("click", function (e) {
      const ripple = document.createElement("span");
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: radial-gradient(circle, rgba(108, 92, 231, 0.4) 0%, transparent 70%);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.8s ease-out;
        pointer-events: none;
        z-index: 1000;
      `;

      this.style.position = "relative";
      this.style.overflow = "hidden";
      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 800);
    });
  });

  // Add enhanced ripple animation
  const rippleStyle = document.createElement("style");
  rippleStyle.textContent = `
    @keyframes ripple {
      to {
        transform: scale(2.5);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(rippleStyle);

  // Add loading animation with Monster theme
  window.addEventListener("load", () => {
    document.body.classList.add("loaded");
  });

  // Add CSS for loading and welcome animations
  const loadingStyle = document.createElement("style");
  loadingStyle.textContent = `
    body:not(.loaded) .container {
      opacity: 0;
      transform: translateY(30px);
    }
    
    body.loaded .container {
      opacity: 1;
      transform: translateY(0);
      transition: opacity 1s ease, transform 1s ease;
    }
    
    @keyframes welcomeSlide {
      0% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
      20% { opacity: 1; transform: translate(-50%, -50%) scale(1.1); }
      80% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
      100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
    }
  `;
  document.head.appendChild(loadingStyle);

  // Add skill tag hover effects
  document.querySelectorAll(".skill-tag").forEach((tag) => {
    tag.addEventListener("mouseenter", function () {
      this.style.animation = "pulse 0.6s ease-in-out";
    });

    tag.addEventListener("animationend", function () {
      this.style.animation = "";
    });
  });

  // Add parallax effect to hero section
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector(".hero-section");
    if (heroSection) {
      heroSection.style.transform = `translateY(${scrolled * 0.1}px)`;
    }
  });

  // Add dynamic gradient animation to brand icon
  const brandIcon = document.querySelector(".brand-icon");
  if (brandIcon) {
    setInterval(() => {
      const gradients = [
        "linear-gradient(135deg, #6c5ce7 0%, #a29bfe 100%)",
        "linear-gradient(135deg, #fd79a8 0%, #fdcb6e 100%)",
        "linear-gradient(135deg, #00b894 0%, #00cec9 100%)",
        "linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)",
      ];
      const randomGradient = gradients[Math.floor(Math.random() * gradients.length)];
      brandIcon.style.background = randomGradient;
    }, 3000);
  }
});
