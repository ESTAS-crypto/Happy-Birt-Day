// ==========================================
// ROMANTIC BIRTHDAY SITE - INTERACTIVE LOGIC
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
  // 1. DYNAMIC DOM INJECTION FROM CONFIG
  document.title = `Untuk ${CONFIG.fullName} 💖`;
  document.getElementById("partner-nickname").textContent = CONFIG.nickname;
  document.getElementById("footer-fullname").textContent = CONFIG.fullName;
  
  // Set avatar photo (uses the first photo in the array if available)
  if (CONFIG.photos && CONFIG.photos.length > 0) {
    document.getElementById("girl-photo-avatar").src = CONFIG.photos[0].url;
  }
  
  // Set music source
  const bgMusic = document.getElementById("bg-music");
  bgMusic.src = CONFIG.musicUrl;
  
  // (Initialization calls moved to the bottom of the DOMContentLoaded handler)
  // 2. ENVELOPE OPEN FLOW
  const welcomeScreen = document.getElementById("welcome-screen");
  const envelopeMain = document.getElementById("envelope-main");
  const openEnvelopeBtn = document.getElementById("open-envelope-btn");
  const envelopeWrapper = document.querySelector(".envelope-wrapper");
  const mainContent = document.getElementById("main-content");
  const musicToggle = document.getElementById("music-toggle");
  
  let isEnvelopeOpened = false;

  envelopeWrapper.addEventListener("click", () => {
    if (isEnvelopeOpened) return;
    isEnvelopeOpened = true;
    
    // Add open class to envelope to trigger CSS animation
    envelopeMain.classList.add("open");
    
    // Attempt to play music early
    playMusic();
    
    // Smooth transition to main website
    setTimeout(() => {
      welcomeScreen.style.opacity = "0";
      welcomeScreen.style.visibility = "hidden";
      
      // Unlock vertical scrolling on envelope open
      document.body.style.overflow = "auto";
      document.body.style.overflowX = "hidden";
      
      mainContent.classList.remove("hidden");
      setTimeout(() => {
        mainContent.classList.add("visible");
        // Start typewriter only after main content becomes visible
        startTypewriter();
        musicToggle.classList.remove("hidden");
        
        // Auto trigger celebration disabled to keep entrance clean and not overwhelming
      }, 100);
      
    }, 1500); // Wait for envelope flap & letter slide animations
  });

  // 3. BACKGROUND MUSIC LOGIC
  musicToggle.addEventListener("click", () => {
    if (bgMusic.paused) {
      playMusic();
    } else {
      pauseMusic();
    }
  });

  function playMusic() {
    bgMusic.volume = 0;
    bgMusic.play().then(() => {
      musicToggle.classList.add("playing");
      musicToggle.innerHTML = '<i class="fas fa-pause"></i>';
      
      // Volume fade-in to max 70% (0.7)
      let vol = 0;
      const interval = setInterval(() => {
        vol += 0.05;
        if (vol >= 0.7) {
          bgMusic.volume = 0.7;
          clearInterval(interval);
        } else {
          bgMusic.volume = vol;
        }
      }, 100);
      
    }).catch(err => {
      console.log("Autoplay blocked by browser. Music will play upon user interaction: ", err);
    });
  }

  function pauseMusic() {
    bgMusic.pause();
    musicToggle.classList.remove("playing");
    musicToggle.innerHTML = '<i class="fas fa-play"></i>';
  }

  // 4. HEART PARTICLE CANVAS ANIMATION
  const canvas = document.getElementById("canvas-hearts");
  const ctx = canvas.getContext("2d");
  let particles = [];
  
  function initCanvasHearts() {
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    animateParticles();
  }

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  class HeartParticle {
    constructor() {
      this.reset();
      this.y = Math.random() * canvas.height; // Distribute initially
    }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = canvas.height + 20;
      this.size = Math.random() * 15 + 8;
      this.speedY = -(Math.random() * 1.5 + 0.5);
      this.speedX = Math.sin(Math.random() * 2) * 0.4;
      this.opacity = Math.random() * 0.6 + 0.2;
      this.rotation = Math.random() * Math.PI * 2;
      this.rotationSpeed = (Math.random() - 0.5) * 0.01;
      this.isDead = false;
      
      // Palette: Soft pinks, reds, light corals
      const colors = ['#ff4d6d', '#ff758f', '#ff85a1', '#ffb703', '#ffe5ec', '#ff0a54'];
      this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle = this.color;
      
      // Draw Heart Path
      ctx.beginPath();
      ctx.moveTo(0, 0);
      // Top left curve
      ctx.bezierCurveTo(-this.size / 2, -this.size / 2, -this.size, 0, 0, this.size);
      // Top right curve
      ctx.bezierCurveTo(this.size, 0, this.size / 2, -this.size / 2, 0, 0);
      ctx.fill();
      
      ctx.restore();
    }

    update() {
      this.y += this.speedY;
      this.x += this.speedX;
      this.rotation += this.rotationSpeed;
      
      // Fade out as it goes up
      if (this.y < canvas.height * 0.3) {
        this.opacity -= 0.003;
      }
      
      if (this.y < -30 || this.opacity <= 0) {
        if (this.isClickSpawned) {
          this.isDead = true;
        } else {
          this.reset();
        }
      }
    }
  }

  // Create initial particles
  const particleCount = 50;
  for (let i = 0; i < particleCount; i++) {
    particles.push(new HeartParticle());
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles = particles.filter(p => {
      p.update();
      p.draw();
      return !p.isDead;
    });
    
    requestAnimationFrame(animateParticles);
  }

  // Spawns sparkles dynamically (used for Fireworks)
  function createSparkles(x, y, count = 30) {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 4 + 2;
      const size = Math.random() * 4 + 2;
      const colors = ['#ffb703', '#ff4d6d', '#ffffff', '#00f5d4', '#e0aaff'];
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      const p = {
        x: x,
        y: y,
        speedX: Math.cos(angle) * speed,
        speedY: Math.sin(angle) * speed,
        size: size,
        color: color,
        opacity: 1,
        update() {
          this.x += this.speedX;
          this.y += this.speedY;
          this.speedY += 0.05; // gravity
          this.opacity -= 0.02;
        },
        draw() {
          ctx.save();
          ctx.globalAlpha = this.opacity;
          ctx.fillStyle = this.color;
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      };
      
      // Inject temporarily into heart particles loop or run separate animation
      // To keep it simple, we push it to the main animation array with custom type
      particles.push({
        x: p.x,
        y: p.y,
        speedY: p.speedY,
        speedX: p.speedX,
        opacity: p.opacity,
        color: p.color,
        size: p.size,
        isSparkle: true,
        update() {
          this.x += this.speedX;
          this.y += this.speedY;
          this.speedY += 0.08; // gravity
          this.opacity -= 0.025;
        },
        draw() {
          ctx.save();
          ctx.globalAlpha = Math.max(0, this.opacity);
          ctx.fillStyle = this.color;
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      });
    }
  }

  // Remove dead sparkles regularly
  setInterval(() => {
    particles = particles.filter(p => !p.isSparkle || p.opacity > 0);
  }, 1000);

  // 5. TYPEWRITER GREETING LETTER
  function startTypewriter() {
    const typewriterDiv = document.getElementById("typewriter-text");
    const letter = CONFIG.loveLetter;
    let i = 0;
    
    typewriterDiv.textContent = "";
    
    function type() {
      if (i < letter.length) {
        typewriterDiv.textContent += letter.charAt(i);
        i++;
        // Speed up slight punctuation marks
        const char = letter.charAt(i - 1);
        let delay = 35;
        if (char === '.' || char === '!' || char === '?') delay = 300;
        else if (char === ',') delay = 150;
        
        setTimeout(type, delay);
      }
    }
    type();
  }

  // 6. LOVE TIMER (Removed as requested)

  // 7. POLAROID PHOTO GALLERY GENERATION
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const lightboxCloseBtn = document.getElementById("lightbox-close-btn");

  function renderPolaroidGrid() {
    const grid = document.getElementById("polaroid-grid");
    grid.innerHTML = "";

    CONFIG.photos.forEach((photo, idx) => {
      const polaroid = document.createElement("div");
      polaroid.className = "polaroid card-glass";
      
      // Give random tilts/transforms for realistic organic look
      const tilt = (Math.random() * 8 - 4).toFixed(2); // Tilt between -4 and 4 degrees
      polaroid.style.transform = `rotate(${tilt}deg)`;
      polaroid.dataset.tilt = tilt; // cache the tilt for resets
      
      // Check if image custom styles are needed
      let imgStyle = "";
      const scale = photo.scale !== undefined ? photo.scale : (photo.rotate ? 1.35 : 1);
      const x = photo.x || 0;
      const y = photo.y || 0;
      const rotate = photo.rotate || 0;

      if (rotate || scale !== 1 || x !== 0 || y !== 0) {
        // translate(x, y) is applied in screen coordinates if placed before rotate/scale
        imgStyle = `style="transform: translate(${x}px, ${y}px) rotate(${rotate}deg) scale(${scale});"`;
      }
      
      polaroid.innerHTML = `
        <div class="polaroid-img-wrapper">
          <img src="${photo.url}" alt="Memory ${idx + 1}" ${imgStyle} loading="lazy">
        </div>
        <div class="polaroid-caption">${photo.caption}</div>
      `;

      // Expand image on click
      polaroid.addEventListener("click", () => {
        lightboxImg.src = photo.url;
        lightboxCaption.textContent = photo.caption;
        
        // Handle lightbox image rotation and custom scaling
        if (photo.rotate) {
          // If rotated, use a slightly adjusted transform for lightbox
          const lightboxScale = Math.min(1.1, scale);
          lightboxImg.style.transform = `scale(${lightboxScale}) rotate(${photo.rotate}deg) translate(${x}px, ${y}px)`;
        } else if (scale !== 1 || x !== 0 || y !== 0) {
          lightboxImg.style.transform = `scale(${scale}) translate(${x}px, ${y}px)`;
        } else {
          lightboxImg.style.transform = "scale(1)";
        }
        
        lightbox.style.display = "block";
        setTimeout(() => {
          lightbox.classList.add("show");
        }, 10);
      });

      grid.appendChild(polaroid);
    });
  }

  // Close Lightbox
  lightboxCloseBtn.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  function closeLightbox() {
    lightbox.classList.remove("show");
    setTimeout(() => {
      lightboxImg.style.transform = "";
      lightbox.style.display = "none";
    }, 300);
  }

  // 8. WHY I LOVE YOU INTERACTIVE CARDS CAROUSEL
  var activeReasonIdx = 0;
  var reasonCards = [];

  function renderReasonsDeck() {
    const deck = document.getElementById("reasons-deck");
    deck.innerHTML = "";

    CONFIG.reasons.forEach((reason, idx) => {
      const card = document.createElement("div");
      card.className = "reason-card card-glass";
      
      // Assign visual gradients to cards
      const gradients = [
        'linear-gradient(135deg, rgba(255, 77, 109, 0.25) 0%, rgba(22, 10, 15, 0.8) 100%)',
        'linear-gradient(135deg, rgba(255, 183, 3, 0.2) 0%, rgba(22, 10, 15, 0.8) 100%)',
        'linear-gradient(135deg, rgba(0, 245, 212, 0.15) 0%, rgba(22, 10, 15, 0.8) 100%)',
        'linear-gradient(135deg, rgba(224, 170, 255, 0.25) 0%, rgba(22, 10, 15, 0.8) 100%)'
      ];
      card.style.background = gradients[idx % gradients.length];
      
      card.innerHTML = `
        <div class="card-number">${(idx + 1).toString().padStart(2, '0')}</div>
        <p class="card-text">"${reason}"</p>
      `;
      
      deck.appendChild(card);
      reasonCards.push(card);
    });

    updateReasonsDeck();
  }

  function updateReasonsDeck() {
    reasonCards.forEach((card, idx) => {
      card.className = "reason-card card-glass"; // Reset classes
      
      if (idx === activeReasonIdx) {
        card.classList.add("active");
      } else if (idx === activeReasonIdx - 1 || (activeReasonIdx === 0 && idx === reasonCards.length - 1)) {
        card.classList.add("prev");
      } else {
        card.classList.add("next");
      }
    });
  }

  document.getElementById("prev-reason-btn").addEventListener("click", () => {
    activeReasonIdx = (activeReasonIdx - 1 + reasonCards.length) % reasonCards.length;
    updateReasonsDeck();
  });

  document.getElementById("next-reason-btn").addEventListener("click", () => {
    activeReasonIdx = (activeReasonIdx + 1) % reasonCards.length;
    updateReasonsDeck();
  });

  // Swipe gesture support for card deck (mobile friendly)
  let startX = 0;
  const deckContainer = document.getElementById("reasons-deck");
  
  deckContainer.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  }, { passive: true });

  deckContainer.addEventListener("touchend", (e) => {
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;
    
    if (diff > 50) {
      // Swipe Left -> Next
      activeReasonIdx = (activeReasonIdx + 1) % reasonCards.length;
      updateReasonsDeck();
    } else if (diff < -50) {
      // Swipe Right -> Prev
      activeReasonIdx = (activeReasonIdx - 1 + reasonCards.length) % reasonCards.length;
      updateReasonsDeck();
    }
  }, { passive: true });

  // 9. BIRTHDAY SURPRISES (CANDLE & BALLOONS)
  const candleFlame = document.getElementById("candle-flame");
  const blowCandleBtn = document.getElementById("blow-candle-btn");
  const fireworksBtn = document.getElementById("fireworks-btn");
  let candleBlown = false;

  blowCandleBtn.addEventListener("click", () => {
    if (candleBlown) {
      // Relight candle
      candleFlame.classList.remove("blown");
      blowCandleBtn.innerHTML = '<i class="fas fa-wind"></i> Tiup Lilin 🎂';
      candleBlown = false;
    } else {
      // Blow out
      candleFlame.classList.add("blown");
      blowCandleBtn.innerHTML = '<i class="fas fa-fire"></i> Nyalakan Lilin 🕯️';
      candleBlown = true;
      
      // Trigger romantic popups & balloon shower
      createBalloons(20);
      
      // Trigger mini fireworks burst on cake
      const rect = candleFlame.getBoundingClientRect();
      createSparkles(rect.left + rect.width / 2, rect.top + rect.height / 2, 40);
    }
  });

  fireworksBtn.addEventListener("click", () => {
    // Screen shake trigger
    document.body.classList.add("shake-screen");
    setTimeout(() => {
      document.body.classList.remove("shake-screen");
    }, 500);

    // Launch multiple sparkle explosions on canvas
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        const x = Math.random() * canvas.width;
        const y = Math.random() * (canvas.height * 0.6) + (canvas.height * 0.1);
        createSparkles(x, y, 35);
      }, i * 200);
    }
  });

  // Balloon shower generator
  function createBalloons(count) {
    const balloonColors = ['#ff4d6d', '#ff85a1', '#ffb703', '#00f5d4', '#e0aaff', '#9d4edd', '#ff9f1c'];
    
    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        const balloon = document.createElement("div");
        balloon.className = "balloon";
        
        // Random style attributes
        const color = balloonColors[Math.floor(Math.random() * balloonColors.length)];
        const left = Math.random() * 90 + 5; // 5% to 95% width
        const duration = Math.random() * 3 + 4; // 4s to 7s duration
        const sizeScale = Math.random() * 0.4 + 0.8; // 0.8 to 1.2 scaling
        
        balloon.style.color = color;
        balloon.style.backgroundColor = color;
        balloon.style.left = `${left}vw`;
        balloon.style.animationDuration = `${duration}s`;
        balloon.style.transform = `scale(${sizeScale})`;
        
        // Create the string element for realistic look
        const string = document.createElement("div");
        string.className = "balloon-string";
        balloon.appendChild(string);
        
        // Interaction: click to pop!
        balloon.addEventListener("click", () => {
          const rect = balloon.getBoundingClientRect();
          createSparkles(rect.left + rect.width / 2, rect.top + rect.height / 2, 12);
          balloon.remove();
        });
        
        const container = document.getElementById("balloons-container") || document.body;
        container.appendChild(balloon);
        
        // Clean up balloon after animation completes
        setTimeout(() => {
          balloon.remove();
        }, duration * 1000);
        
      }, i * 150); // Stagger spawn
    }
  }

  // 10. INITIALIZATION CALLS (Placed at the bottom to ensure all variables and functions are declared)
  renderPolaroidGrid();
  renderReasonsDeck();
  initCanvasHearts();
  initPolaroidTilts();

  // 11. CLICK TO SPAWN FIREWORKS ON SCREEN
  window.addEventListener("mousedown", (e) => {
    // Avoid spawning on buttons, polaroid cards, and floating controls
    if (e.target.tagName === 'BUTTON' || e.target.closest('button') || e.target.closest('.polaroid') || e.target.closest('.music-btn')) {
      return;
    }
    
    // Launch a firework explosion at click location!
    createSparkles(e.clientX, e.clientY, 35);
  });

  // 12. BIRTHDAY DETECTOR AND AUTO CELEBRATION
  function checkAndTriggerBirthdayCelebration() {
    const now = new Date();
    const bday = new Date(CONFIG.birthdayDate);
    
    // Verify if it is indeed today (Month & Day matches)
    if (now.getMonth() === bday.getMonth() && now.getDate() === bday.getDate()) {
      // 1. Trigger banner greeting
      showBirthdayBanner();
      
      // 2. Trigger balloons
      createBalloons(25);
      
      // 3. Launch fireworks
      for (let i = 0; i < 6; i++) {
        setTimeout(() => {
          const x = Math.random() * canvas.width;
          const y = Math.random() * (canvas.height * 0.5) + (canvas.height * 0.15);
          createSparkles(x, y, 40);
        }, i * 350);
      }
    }
  }

  function showBirthdayBanner() {
    const banner = document.createElement("div");
    banner.className = "birthday-banner-overlay";
    banner.innerHTML = `
      <div class="banner-content">
        <h2>Selamat Ulang Tahun, ${CONFIG.nickname}! 🎂✨</h2>
        <p>panjang umur dan makin dan di limpahkan rezeki nya yaaaa</p>
      </div>
    `;
    document.body.appendChild(banner);
    
    setTimeout(() => {
      banner.classList.add("show");
    }, 100);
    
    // Hide and remove after 5 seconds
    setTimeout(() => {
      banner.classList.remove("show");
      setTimeout(() => {
        banner.remove();
      }, 600);
    }, 5000);
  }

  // 13. 3D PARALLAX TILT EFFECT ON POLAROIDS
  function initPolaroidTilts() {
    const polaroids = document.querySelectorAll(".polaroid");
    
    polaroids.forEach(card => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left; // x coordinate inside element
        const y = e.clientY - rect.top;  // y coordinate inside element
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Calculate tilt angle based on cursor offset from center
        const rotateX = -(y - centerY) / 8; // Max tilt 10 degrees or so
        const rotateY = (x - centerX) / 8;
        
        // Apply 3D tilt transform
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.04, 1.04, 1.04)`;
        card.style.transition = "transform 0.1s ease"; // responsive follow
      });
      
      card.addEventListener("mouseleave", () => {
        // Reset tilt with cached randomized organic angle
        const tilt = card.dataset.tilt || 0;
        card.style.transform = `rotate(${tilt}deg)`;
        card.style.transition = "transform 0.5s ease"; // smooth reset
      });
    });
  }

  // 14. INTERACTIVE LOVE QUIZ LOGIC
  const startQuizBtn = document.getElementById("start-quiz-btn");
  const quizModal = document.getElementById("quiz-modal");
  const successModal = document.getElementById("success-modal");
  const yesBtn = document.getElementById("yes-btn");
  const noBtn = document.getElementById("no-btn");
  const closeSuccessBtn = document.getElementById("close-success-btn");
  const quizContent = document.querySelector(".quiz-modal-content");

  startQuizBtn.addEventListener("click", () => {
    quizModal.style.display = "flex";
    setTimeout(() => {
      quizModal.classList.add("show");
    }, 10);
  });

  // Teleport the 'Enggak' button when hovered or touched
  function teleportNoBtn() {
    // Switch to absolute positioning so it breaks out of the normal layout flow
    noBtn.style.position = "absolute";
    
    const modalRect = quizContent.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();
    
    // Calculate boundaries inside the modal content card (subtract margins/padding)
    const maxX = modalRect.width - btnRect.width - 40;
    const maxY = modalRect.height - btnRect.height - 40;
    
    const randomX = Math.random() * maxX + 20;
    const randomY = Math.random() * maxY + 20;
    
    // Position absolute coordinates relative to the modal content card
    noBtn.style.left = `${randomX}px`;
    noBtn.style.top = `${randomY}px`;
  }

  noBtn.addEventListener("mouseover", teleportNoBtn);
  noBtn.addEventListener("touchstart", (e) => {
    e.preventDefault(); // Prevent double triggers
    teleportNoBtn();
  }, { passive: false });
  noBtn.addEventListener("click", (e) => {
    e.preventDefault();
    teleportNoBtn();
  });

  // Click 'Sayang Banget' -> success state
  yesBtn.addEventListener("click", () => {
    quizModal.classList.remove("show");
    setTimeout(() => {
      quizModal.style.display = "none";
      
      // Open success modal
      successModal.style.display = "flex";
      setTimeout(() => {
        successModal.classList.add("show");
      }, 10);
      
      // Trigger romantic explosion (balloons & fireworks)
      createBalloons(30);
      for (let i = 0; i < 8; i++) {
        setTimeout(() => {
          const x = Math.random() * canvas.width;
          const y = Math.random() * (canvas.height * 0.5) + (canvas.height * 0.1);
          createSparkles(x, y, 45);
        }, i * 250);
      }
      
    }, 400);
  });

  closeSuccessBtn.addEventListener("click", () => {
    successModal.classList.remove("show");
    setTimeout(() => {
      successModal.style.display = "none";
      // Reset noBtn position and styling to normal layout
      noBtn.style.position = "";
      noBtn.style.left = "";
      noBtn.style.top = "";
    }, 400);
  });

});
