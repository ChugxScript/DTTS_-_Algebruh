document.addEventListener('DOMContentLoaded', function() {
    let slideIndex = 0;
    const slides = [
        "./m5-img/30.png",
        "./m5-img/31.png",
        "./m5-img/32.png",
        "./m5-img/33.png",
        "./m5-img/34.png",
        "./m5-img/35.png",
        "./m5-img/36.png",
        "./m5-img/37.png",
        "./m5-img/38.png",
        "./m5-img/39.png",
        "./m5-img/40.png",
        "./m5-img/41.png",
        "./m5-img/42.png",
        "./m5-img/43.png",
        "./m5-img/44.png",
        "./m5-img/45.png",
        "./m5-img/46.png",
        "./m5-img/47.png",
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
  