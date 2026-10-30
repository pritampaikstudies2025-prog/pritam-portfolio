// Portfolio interactions: mobile menu, scroll reveal, and certificate image slots.
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('#navLinks');

menuToggle?.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});
navLinks?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

// Fade content in as it enters the viewport.
const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach(item => observer.observe(item));
} else {
  revealItems.forEach(item => item.classList.add('visible'));
}

// Certificate images are optional. If a file is missing, its labelled placeholder stays visible.
// Add the JPG to assets/certificates/ with the exact filename shown on each card.
document.querySelectorAll('.certificate-image img').forEach(img => {
  const showImage = () => img.closest('.certificate-image')?.classList.add('has-image');
  img.addEventListener('load', showImage);
  img.addEventListener('error', () => img.closest('.certificate-image')?.classList.remove('has-image'));
  if (img.complete && img.naturalWidth > 0) showImage();
});

// Click a certificate preview to open the full image in a new tab.
document.querySelectorAll('.certificate-image').forEach(card => {
  const img = card.querySelector('img');
  card.style.cursor = 'zoom-in';
  card.addEventListener('click', () => {
    if (card.classList.contains('has-image') && img?.src) window.open(img.src, '_blank', 'noopener');
  });
});

document.querySelector('#year').textContent = new Date().getFullYear();
