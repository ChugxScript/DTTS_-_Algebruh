  document.addEventListener('DOMContentLoaded', function() {
    let slideIndex = 0;
    const slides = [
        "./m4-img/1.png",
        "./m4-img/2.png",
        "./m4-img/3.png",
        "./m4-img/4.png",
        "./m4-img/5.png",
        "./m4-img/6.png",
        "./m4-img/7.png",
        "./m4-img/9.png",
        "./m4-img/10.png",
        "./m4-img/11.png",
        "./m4-img/12.png",
        "./m4-img/13.png",
        "./m4-img/14.png",
        "./m4-img/15.png",
        "./m4-img/16.png",
        "./m4-img/17.png",
        "./m4-img/18.png",
        "./m4-img/19.png",
        "./m4-img/20.png",
        "./m4-img/21.png",
        "./m4-img/22.png",
        "./m4-img/24.png",
        "./m4-img/25.png",
        "./m4-img/26.png",
        "./m4-img/27.png",
        "./m4-img/28.png",
        "./m4-img/29.png"
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
  