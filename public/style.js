
let lastScrollTop = 0;

window.addEventListener('scroll', function() {
    const rows = document.querySelectorAll('#myTable tr');

    // Get the current scroll position
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    rows.forEach((row, index) => {
        if (scrollTop > lastScrollTop) {
            // Scrolling down
            row.classList.add('table-row');
            row.style.animationName = 'slideInFromRight';
            row.style.animationDelay = `${index * 0.1}s`; // Stagger the animation
        } else {
            // Scrolling up
            row.classList.add('table-row');
            row.style.animationName = 'slideOutToLeft';
            row.style.animationDelay = `${index * 0.1}s`; // Stagger the animation
        }
    });

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
});
