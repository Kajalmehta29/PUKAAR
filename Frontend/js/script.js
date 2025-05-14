document.addEventListener("DOMContentLoaded", function() {
    console.log("Welcome to Pukaar Animal Shelter!");
});

let currentIndex = 0;

function showSlide(index) {
    const slides = document.querySelector(".carousel-inner");
    const totalSlides = document.querySelectorAll(".founder-card").length;
    
    if (index >= totalSlides) {
        currentIndex = 0;
    } else if (index < 0) {
        currentIndex = totalSlides - 1;
    } else {
        currentIndex = index;
    }

    const offset = -currentIndex * 100 + "%";
    slides.style.transform = "translateX(" + offset + ")";
}

function nextSlide() {
    showSlide(currentIndex + 1);
}

function prevSlide() {
    showSlide(currentIndex - 1);
}


setInterval(nextSlide, 5000);

   
    window.onscroll = function () {
        let button = document.getElementById("backToTop");
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            button.classList.add("show");
        } else {
            button.classList.remove("show");
        }
    };
    
  
    function scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    let index = 0;
    const slides = document.querySelectorAll(".testimonial-slide");
    
    function showTestimonial(n) {
        slides.forEach(slide => slide.classList.remove("active"));
        slides[n].classList.add("active");
    }
    
    function prevTestimonial() {
        index = (index - 1 + slides.length) % slides.length;
        showTestimonial(index);
    }
    
    function nextTestimonial() {
        index = (index + 1) % slides.length;
        showTestimonial(index);
    }
    
    showTestimonial(index);
    