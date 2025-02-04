let navbar = document.querySelector(".navbar-container");
window.addEventListener("scroll", ()=> {
 
    navbar.style.visibility="visible";
});


document.addEventListener("DOMContentLoaded", function() {
    const floatingElements = document.querySelectorAll('.floating-bg');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target); // Stop observing after animation triggers
            }
        });
    }, {
        threshold: 0.3 // Trigger when 30% of element is visible
    });

    floatingElements.forEach(element => {
        observer.observe(element);
    });
});
function toggleMenu() {
    const navItems = document.querySelector('.nav-items');
    navItems.classList.toggle('active'); // Toggle the 'active' class
}


document.addEventListener("DOMContentLoaded", function () {
    const elements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right');

    function handleScroll() {
        elements.forEach(element => {
            const position = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (position < windowHeight * 0.85) {
                element.classList.add('active');
            } else {
                element.classList.remove('active'); // Remove when scrolling up
            }
        });
    }

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Trigger on load for already visible elements
});
