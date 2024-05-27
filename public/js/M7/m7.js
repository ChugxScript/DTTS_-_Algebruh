document.addEventListener('DOMContentLoaded', function() {
    let slideIndex = 0;
    const slides = [
        "./m7-img/80.png",
        "./m7-img/81.png",
        "./m7-img/82.png",
        "./m7-img/83.png",
        "./m7-img/84.png",
        "./m7-img/85.png",
        "./m7-img/86.png",
        "./m7-img/87.png",
        "./m7-img/88.png",
        "./m7-img/89.png",
        "./m7-img/90.png",
        "./m7-img/91.png",
        "./m7-img/92.png",
        "./m7-img/93.png",
        "./m7-img/94.png",
        "./m7-img/95.png",
        "./m7-img/96.png"
    ];
  
    const showSlides = () => {
      const slideContainer = document.querySelector('.slides');
      slideContainer.innerHTML = ''; // Clear previous slides
  
      slides.forEach((imageUrl, index) => {
        const slide = document.createElement('img');
        slide.src = imageUrl;
        slide.alt = `Image ${index + 1}`;
        if (index === slideIndex) {
          slide.style.display = 'block';
        } else {
          slide.style.display = 'none';
        }
        slideContainer.appendChild(slide);
      });
    };
  
    const changeSlide = (n) => {
      slideIndex += n;
      if (slideIndex < 0) {
        slideIndex = 0; // Set slideIndex to 0 if it goes below 0
      } else if (slideIndex >= slides.length) {
        slideIndex = slides.length - 1; // Set slideIndex to the last index if it goes beyond the last image
      }
      showSlides();
    };
  
    showSlides();
  
    document.querySelector('.prev').addEventListener('click', () => {
      changeSlide(-1);
    });
  
    document.querySelector('.next').addEventListener('click', () => {
      changeSlide(1);
    });
  });
  