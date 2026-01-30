// Hamburger menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const sidebar = document.getElementById('sidebar');

    if (hamburger && sidebar) {
        hamburger.addEventListener('click', function() {
            sidebar.classList.toggle('active');
        });

        // Close sidebar when clicking on a link
        const sidebarLinks = sidebar.querySelectorAll('a');
        sidebarLinks.forEach(link => {
            link.addEventListener('click', function() {
                sidebar.classList.remove('active');
            });
        });

        // Close sidebar when clicking outside
        document.addEventListener('click', function(e) {
            if (!sidebar.contains(e.target) && !hamburger.contains(e.target)) {
                sidebar.classList.remove('active');
            }
        });
    }
});

// Magical fairytale cursor trail - only in hero section
function createTrail(e) {
    // Get position for mouse or touch
    let clientX, clientY, pageX, pageY;
    if (e.touches) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
        pageX = e.touches[0].pageX;
        pageY = e.touches[0].pageY;
    } else {
        clientX = e.clientX;
        clientY = e.clientY;
        pageX = e.pageX;
        pageY = e.pageY;
    }

    // trail only inside hero
    const heroSection = document.querySelector('.hero');
    if (!heroSection) return;

    const heroRect = heroSection.getBoundingClientRect();
    const isInHero = clientX >= heroRect.left && clientX <= heroRect.right && clientY >= heroRect.top && clientY <= heroRect.bottom;
    if (!isInHero) return;

    const colors = [
        'rgba(255,182,193,0.9)',
        'rgba(186,225,255,0.95)',
        'rgba(204,255,229,0.9)',
        'rgba(255,204,255,0.9)'
    ];

    const selectedColor = colors[Math.floor(Math.random() * colors.length)];

    // main fairytale sparkle (longer-lived)
    const mainDur = 1600; // ms
    const sparkle = document.createElement('div');
    sparkle.className = 'trail-particle fairytale';
    sparkle.style.left = (pageX - 6) + 'px';
    sparkle.style.top = (pageY - 6) + 'px';
    sparkle.style.background = selectedColor;
    sparkle.style.pointerEvents = 'none';
    sparkle.style.zIndex = 1000;
    sparkle.style.animation = `trailFade ${mainDur}ms ease-out forwards`;
    document.body.appendChild(sparkle);
    setTimeout(() => { try { sparkle.remove(); } catch (e) {} }, mainDur + 60);

    // Create a couple of smaller mini sparkles to build a longer tail
    const miniCount = 2;
    for (let i = 0; i < miniCount; i++) {
        const mini = document.createElement('div');
        mini.className = 'mini-sparkle';
        const angle = (Math.PI * 2 * i) / Math.max(1, miniCount);
        const distance = 6 + i * 4;
        mini.style.left = (pageX + Math.cos(angle) * distance - 3) + 'px';
        mini.style.top = (pageY + Math.sin(angle) * distance - 3) + 'px';
        mini.style.background = selectedColor;
        mini.style.boxShadow = `0 0 8px 2px ${selectedColor}`;
        mini.style.pointerEvents = 'none';
        mini.style.zIndex = 999;
        const miniDur = 900 + i * 120;
        mini.style.animation = `miniSparkle ${miniDur}ms ease-out forwards`;
        document.body.appendChild(mini);
        setTimeout(() => { try { mini.remove(); } catch (e) {} }, miniDur + 40);
    }
}

document.addEventListener('mousemove', createTrail);
document.addEventListener('touchmove', createTrail);

// Initialize EmailJS
emailjs.init('_qigosJU8SQUdZ824');

// Contact Form Submission using EmailJS
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Show loading or disable button
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    // Send email using EmailJS
    emailjs.sendForm('service_6g7i3id', 'template_7ar2zz6', this)
        .then(function() {
            // Show success message
            const successMsg = document.getElementById('success-msg');
            successMsg.style.display = 'block';
            successMsg.style.color = '#00aaff';
            successMsg.textContent = 'Thanks! Your message has been sent.';

            // Reset form
            document.getElementById('contact-form').reset();

            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, function(error) {
            console.error('Error:', error);
            // Show error message
            const successMsg = document.getElementById('success-msg');
            successMsg.style.display = 'block';
            successMsg.style.color = '#ff4444';
            successMsg.textContent = 'Sorry, there was an error sending your message. Please try again.';

            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        });
});
