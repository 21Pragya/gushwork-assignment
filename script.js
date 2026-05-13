 
// ── DROPDOWN TOGGLE ──
const dropdownTrigger = document.querySelector('.dropdown__trigger');
const dropdownMenu = document.querySelector('.dropdown__menu');

dropdownTrigger.addEventListener('click', () => {
  const isOpen = dropdownMenu.classList.toggle('is-open');
  dropdownTrigger.setAttribute('aria-expanded', isOpen);
});

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
  if (!e.target.closest('.dropdown')) {
    dropdownMenu.classList.remove('is-open');
    dropdownTrigger.setAttribute('aria-expanded', 'false');
  }
});

// ── MOBILE HAMBURGER ──
const hamburger = document.getElementById('hamburger');
const headerNav = document.getElementById('headerNav');

hamburger.addEventListener('click', () => {
  const isOpen = headerNav.classList.toggle('is-open');
  hamburger.classList.toggle('is-open', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen);
});

// ── IMAGE CAROUSEL ──
const images = [
  'assets/images/Gushwok_image.jpg',
  'assets/images/Gushwok_image.jpg',
  'assets/images/Gushwok_image.jpg',
  'assets/images/Gushwok_image.jpg',
  'assets/images/Gushwok_image.jpg',
];

let currentIndex = 0;
const mainImage = document.getElementById('mainImage');
const thumbs = document.querySelectorAll('.thumb');

function goToSlide(index) {
  currentIndex = index;
  mainImage.src = images[index];
  thumbs.forEach(t => t.classList.remove('thumb--active'));
  thumbs[index].classList.add('thumb--active');
}

document.getElementById('prevBtn').addEventListener('click', () => {
  const newIndex = (currentIndex - 1 + images.length) % images.length;
  goToSlide(newIndex);
});

document.getElementById('nextBtn').addEventListener('click', () => {
  const newIndex = (currentIndex + 1) % images.length;
  goToSlide(newIndex);
});

thumbs.forEach(thumb => {
  thumb.addEventListener('click', () => {
    goToSlide(parseInt(thumb.dataset.index));
  });
});