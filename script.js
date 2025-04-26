const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const pages = document.querySelectorAll('.page');
let currentPage = 0;
let touchStartX = 0;
let touchEndX = 0;

// Function to update button visibility
function updateButtons() {
  prevButton.style.visibility = currentPage > 0 ? 'visible' : 'hidden';
  nextButton.style.visibility = currentPage < pages.length - 1 ? 'visible' : 'hidden';
}

// Function to flip to the next page
function flipNext() {
  if (currentPage < pages.length - 1) {
    pages[currentPage].classList.add('flipped');
    currentPage++;
    updateButtons();
  }
}

// Function to flip to the previous page
function flipPrev() {
  if (currentPage > 0) {
    currentPage--;
    pages[currentPage].classList.remove('flipped');
    updateButtons();
  }
}

// Event listeners for buttons
nextButton.addEventListener('click', flipNext);
prevButton.addEventListener('click', flipPrev);

// Touch event handlers for mobile swipe
document.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
});

function handleSwipe() {
  const swipeThreshold = 50; // Minimum swipe distance in pixels
  
  if (touchStartX - touchEndX > swipeThreshold) {
    // Swipe left - next page
    flipNext();
  } else if (touchEndX - touchStartX > swipeThreshold) {
    // Swipe right - previous page
    flipPrev();
  }
}

// Keyboard support for desktop
document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowRight') {
    flipNext();
  } else if (event.key === 'ArrowLeft') {
    flipPrev();
  }
});

// Initialize button visibility
updateButtons();
