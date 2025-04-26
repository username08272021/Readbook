const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const pages = document.querySelectorAll('.page');
let currentPage = 0;

// Your original flip functions - unchanged
function flipNext() {
  if (currentPage < pages.length - 1) {
    pages[currentPage].classList.add('flipped');
    currentPage++;
  }
}

function flipPrev() {
  if (currentPage > 0) {
    currentPage--;
    pages[currentPage].classList.remove('flipped');
  }
}

// Your original button events - unchanged
nextButton.addEventListener('click', flipNext);
prevButton.addEventListener('click', flipPrev);

// Your original keyboard support - unchanged
document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowRight') flipNext();
  else if (event.key === 'ArrowLeft') flipPrev();
});

// New simple swipe support - won't affect fonts
let touchStartX = 0;

document.addEventListener('touchstart', (e) => {
  touchStartX = e.touches[0].clientX;
}, { passive: true });

document.addEventListener('touchend', (e) => {
  const touchEndX = e.changedTouches[0].clientX;
  const threshold = 50;
  
  if (touchStartX - touchEndX > threshold) flipNext();
  else if (touchEndX - touchStartX > threshold) flipPrev();
}, { passive: true });
