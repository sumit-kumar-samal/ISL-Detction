document.addEventListener('DOMContentLoaded', function() {
    // Show loader
    const loader = document.querySelector('.loader-wrapper');
    const mainContent = document.querySelector('.main-content');

    // Simulate loading time (you can remove this setTimeout in production)
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
            mainContent.classList.remove('hidden');
        }, 500);
    }, 1690); // Shows loader for 2 seconds
});