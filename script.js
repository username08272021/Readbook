const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const pages = document.querySelectorAll('.page');
let currentPage = 0;

// Function to flip to the next page
function flipNext() {
  if (currentPage < pages.length - 1) {
    pages[currentPage].classList.add('flipped');
    currentPage++;
  }
}

// Function to flip to the previous page
function flipPrev() {
  if (currentPage > 0) {
    currentPage--;
    pages[currentPage].classList.remove('flipped');
  }
}

// Event listeners for buttons
nextButton.addEventListener('click', flipNext);
prevButton.addEventListener('click', flipPrev);

// Optional: Add keyboard support for flipping
document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowRight') {
    flipNext();
  } else if (event.key === 'ArrowLeft') {
    flipPrev();
  }
});