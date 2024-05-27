document.addEventListener('DOMContentLoaded', function() {
    let slideIndex = 0;
    const slides = [
        "./m6-img/49.png",
        "./m6-img/50.png",
        "./m6-img/51.png",
        "./m6-img/52.png",
        "./m6-img/53.png",
        "./m6-img/54.png",
        "./m6-img/55.png",
        "./m6-img/56.png",
        "./m6-img/57.png",
        "./m6-img/58.png",
        "./m6-img/59.png",
        "./m6-img/60.png",
        "./m6-img/61.png",
        "./m6-img/62.png",
        "./m6-img/63.png",
        "./m6-img/64.png",
        "./m6-img/65.png",
        "./m6-img/66.png",
        "./m6-img/67.png",
        "./m6-img/68.png",
        "./m6-img/69.png",
        "./m6-img/70.png",
        "./m6-img/71.png",
        "./m6-img/72.png",
        "./m6-img/73.png",
        "./m6-img/74.png",
        "./m6-img/75.png",
        "./m6-img/76.png",
        "./m6-img/77.png",
        "./m6-img/78.png"      
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
  