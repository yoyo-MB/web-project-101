
// Hero slideshow
let currentSlide = 0;
const slides = document.querySelectorAll('.hero-slideshow img');

function showSlide(n) {
    slides.forEach(slide => slide.classList.remove('active'));
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

// Change slide every 5 seconds
setInterval(nextSlide, 5000);// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});
// Search functionality
document.getElementById('searchButton').addEventListener('click', searchRecipes);
document.getElementById('searchInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') searchRecipes();
});

function searchRecipes() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const recipeCards = document.querySelectorAll('.recipe-card');
    
    recipeCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const description = card.querySelector('.recipe-description').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || description.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}
document.querySelectorAll('.expand-toggle').forEach(button => {
    button.addEventListener('click', function(e) {
        e.stopPropagation();
        const card = this.closest('.recipe-card');
        card.classList.toggle('expanded');
    });
});

document.querySelectorAll('.save-recipe').forEach(button => {
    button.addEventListener('click', function(e) {
        e.stopPropagation();
        this.classList.toggle('saved');
        this.textContent = this.classList.contains('saved') ? '♥ Saved' : '♡ Save';
    });
});