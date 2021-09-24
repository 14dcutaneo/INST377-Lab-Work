let slidePositon = 0;
const slides = document.querySelectorAll('.carousel-item');
const totalSlides = slides.length;

document.querySelector('#carousel_button--next').addEventListener('click', function() {
    moveToNextSlide();
});

document.querySelector('#carousel_button--prev').addEventListener('click', function() {
    moveToPrevSlide();
});

function updateSlidePosition(){
    for (let slide of slides){
        slide.classList.remove('first-item');
        slide.classList.add('carousel');
    }

    slides[slidePositon].classList.add('first-item');
}

function moveToNextSlide() {
    if (slidePositon === totalSlides - 1) {
        slidePositon = 0;
    } else {
        slidePositon++;
    }
    updateSlidePosition();
}

function moveToPrevSlide() {
    if (slidePositon === 0) {
        slidePositon = 4;
    } else {
        slidePositon--;
    }
    updateSlidePosition();
}