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
        threshold: 0.3 
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
                element.classList.remove('active'); 
            }
        });
    }

    window.addEventListener("scroll", handleScroll);
    handleScroll(); 
});


document.addEventListener("DOMContentLoaded", function () {
            const navbar = document.querySelector(".navbar-container");
            const pageWrapper = document.getElementById("page-wrapper");

            const totalAnimationTime = 4600; 
    
            setTimeout(() => {       
                navbar.classList.add("show");
                pageWrapper.classList.add("show");

                document.body.style.overflow = "auto";
            }, totalAnimationTime);

            animationPlayed = true; 


    document.addEventListener("visibilitychange", function () {
        if (document.visibilityState === "visible" && !animationPlayed) {
            playHeroAnimation();
        }
    });
});

document.addEventListener("DOMContentLoaded", function () { 
    const fadeInElements = document.querySelectorAll(".fade-in-up");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target); 
            }
        });
    }, {
        threshold: 0.1,
    });

    
    fadeInElements.forEach((element) => {
        observer.observe(element);
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const video = document.getElementById("myVideo");
    const loadingSpinner = document.getElementById("loadingSpinner");

    video.addEventListener("canplaythrough", () => {
        loadingSpinner.style.display = "none"; // Hide the spinner
        document.getElementById("page-wrapper").classList.add("show"); // Show the content
    });
});