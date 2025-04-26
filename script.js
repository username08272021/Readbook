// Update your existing JavaScript with this improved version
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const pages = document.querySelectorAll('.page');
let currentPage = 0;
let touchStartX = 0;
let isSwiping = false;

function showPage(index) {
  // First reset all pages
  pages.forEach((page, i) => {
    if (i < index) {
      page.classList.add('flipped');
    } else {
      page.classList.remove('flipped');
    }
  });
  currentPage = index;
  updateButtons();
}

function flipNext() {
  if (currentPage < pages.length - 1) {
    showPage(currentPage + 1);
  }
}

function flipPrev() {
  if (currentPage > 0) {
    showPage(currentPage - 1);
  }
}

function updateButtons() {
  prevButton.style.visibility = currentPage > 0 ? 'visible' : 'hidden';
  nextButton.style.visibility = currentPage < pages.length - 1 ? 'visible' : 'hidden';
}

// Touch handling with debounce
document.addEventListener('touchstart', (e) => {
  if (isSwiping) return;
  touchStartX = e.touches[0].clientX;
  isSwiping = true;
}, { passive: true });

document.addEventListener('touchmove', (e) => {
  if (!isSwiping) return;
  e.preventDefault(); // Prevent page scroll during swipe
}, { passive: false });

document.addEventListener('touchend', (e) => {
  if (!isSwiping) return;
  
  const touchEndX = e.changedTouches[0].clientX;
  const swipeThreshold = 50;
  const swipeDistance = touchStartX - touchEndX;
  
  // Only allow one page turn per swipe
  if (swipeDistance > swipeThreshold) {
    flipNext();
  } else if (swipeDistance < -swipeThreshold) {
    flipPrev();
  }
  
  isSwiping = false;
}, { passive: true });

// Keep your existing button and keyboard events
nextButton.addEventListener('click', flipNext);
prevButton.addEventListener('click', flipPrev);

document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowRight') flipNext();
  if (event.key === 'ArrowLeft') flipPrev();
});

// Initialize
showPage(0);
