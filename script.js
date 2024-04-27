const hero = document.querySelector('.hero') ;
const arrowLeft = document.querySelector('.arrow-left');
const arrowRight = document.querySelector('.arrow-right');
const firstNumber = document.getElementById('first-number') ;

const navbar = document.querySelector('.navbar');
const heroHeight = document.querySelector('.hero').offsetHeight ;


window.addEventListener('scroll' , () => {
  
    if(window.scrollY > heroHeight) {      
        navbar.classList.add('navbar-scrolled');
    }
    else {
        navbar.classList.remove('navbar-scrolled');
        
    }
});
function changeBackground() {
    if(hero.classList.contains('url')) {
        hero.classList.remove('url') ;
        hero.classList.add('url2');
        firstNumber.textContent = "02" ;
    }
    else if(hero.classList.contains('url2')) {
        hero.classList.remove('url2') ;
        hero.classList.add('url');
        firstNumber.textContent = "01" ;
    }

}
arrowLeft.addEventListener('click' , () => {
    changeBackground();
    
});

arrowRight.addEventListener('click' , () => {
  changeBackground();

});


const left = document.getElementById('left');
const imageNumber = document.getElementById('image-number');
const right = document.getElementById('right');
const photo = document.getElementById('photo') ;


const photosUrls = [
    "https://images.pexels.com/photos/2055225/pexels-photo-2055225.jpeg?auto=compress&cs=tinysrgb&w=600" ,
    "https://images.pexels.com/photos/853406/pexels-photo-853406.jpeg?auto=compress&cs=tinysrgb&w=600" ,
    "https://images.pexels.com/photos/1024965/pexels-photo-1024965.jpeg?auto=compress&cs=tinysrgb&w=600"
];

right.addEventListener('click' , () => {
    if(photo.src === photosUrls[0]) {

        photo.src = photosUrls[1] ;
        imageNumber.textContent = "02" ;

    }
    else if(photo.src === photosUrls[1]) {
        photo.src = photosUrls[2] ;
        imageNumber.textContent = "03" ;
    }
    else if(photo.src === photosUrls[2]){
        photo.src = photosUrls[0] ;
        imageNumber.textContent = "01" ;
    }
   
});

left.addEventListener('click' , () => {
    if(photo.src === photosUrls[0]) {

        photo.src = photosUrls[2] ;
        imageNumber.textContent = "03" ;

    }
    else if(photo.src === photosUrls[2]) {
        photo.src = photosUrls[1] ;
        imageNumber.textContent = "02" ;
    }
    else if(photo.src === photosUrls[1]){
        photo.src = photosUrls[0] ;
        imageNumber.textContent = "01" ;
    }


});


const sliderImages = [
    "https://images.pexels.com/photos/8204443/pexels-photo-8204443.jpeg?auto=compress&cs=tinysrgb&w=600" ,
    "https://images.pexels.com/photos/1691922/pexels-photo-1691922.jpeg?auto=compress&cs=tinysrgb&w=600" ,
    "https://images.pexels.com/photos/11889744/pexels-photo-11889744.jpeg?auto=compress&cs=tinysrgb&w=600" ,
    "https://images.pexels.com/photos/13150527/pexels-photo-13150527.jpeg?auto=compress&cs=tinysrgb&w=600"
] ;



const wrapper = document.querySelector(".wrapper");
const carousel = document.querySelector(".carousel");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const arrowBtns = document.querySelectorAll(".wrapper i");
const carouselChildrens = [...carousel.children];

let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;


let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);


carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});


carouselChildrens.slice(0, cardPerView).forEach(card => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});


carousel.classList.add("no-transition");
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove("no-transition");


arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
    });
});

const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
   
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
    if(!isDragging) return; 
    
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
}

const infiniteScroll = () => {
    
    if(carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
        carousel.classList.remove("no-transition");
    }
    
    else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
    }

    
    clearTimeout(timeoutId);
    if(!wrapper.matches(":hover")) autoPlay();
}

const autoPlay = () => {
    if(window.innerWidth < 800 || !isAutoPlay) return; 
    timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2500);
}
autoPlay();

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);




