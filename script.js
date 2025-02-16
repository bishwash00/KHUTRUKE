`use strict`;

//ELEMENTS
const sectionFeatures = document.querySelector('.section-features');
const sectionsDelay = document.querySelectorAll('.section-to-delay');
const learnMoreBtn = document.querySelector('.learn-more-btn');
const header = document.querySelector('.header');
const btnMobileNav = document.querySelector('.btn-mobile-nav');
const btnCloseMobileNav = document.querySelector('.btn-close-mobile-nav ');
const headerSec = document.querySelector('.header-section');
const headerPlaceholder = document.querySelector('.header-placeholder');
const secFeatured = document.querySelector('.section-featured');
const nav = document.querySelector('.main-nav');
const navLogo = document.querySelector('.nav-logo');
const navLinks = document.querySelectorAll('.nav-link');
const featuredLogosContainer = document.querySelector('.featured-logos');
const featuredImgs = document.querySelectorAll('.featured-img');
const imgFeatures = document.querySelectorAll('.features-img');
const signUpbtns = document.querySelectorAll('.sign-up-btn');
const cookieContainer = document.querySelector('.cookie-msg');
const btnCloseCokkie = document.querySelector('.cookie-close-btn');
const modalSignUp = document.querySelector('.sign-up-modal');
const formOverlay = document.querySelector('.form-overlay');
const closeFormbtn = document.querySelector('.btn--close-modal');
const allSlides = document.querySelectorAll('.testimonial');
const slideLeftbtn = document.querySelector('.btn-swipe-left');
const slideRightbtn = document.querySelector('.btn-swipe-right');
const dotContainer = document.querySelector('.dots');
//WORKING

//Constants

///Testimonial SLider Constant
let currentSlide = 0;
const totalSlide = allSlides.length;

//FUNCIONS
const openForm = function () {
  modalSignUp.classList.remove('hidden');
  formOverlay.classList.remove('hidden');
};
const closeForm = function () {
  modalSignUp.classList.add('hidden');
  formOverlay.classList.add('hidden');
};

const blurElement = function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav-link')) {
    navLogo.style.opacity = '0.5';
    navLinks.forEach(function (item) {
      if (item != e.target) item.style.opacity = '0.5';
    });
  }
  if (e.target.classList.contains('featured-img')) {
    featuredImgs.forEach(function (item) {
      if (item != e.target) item.style.opacity = '0.3';
    });
  }
};
const restoreElements = function (e) {
  navLogo.style.opacity = '1';
  navLinks.forEach(function (item) {
    if (item != e.target) item.style.opacity = '1';
  });
  featuredImgs.forEach(function (item) {
    if (item != e.target) item.style.opacity = '0.6';
  });
};

const createSliderDots = function () {
  allSlides.forEach(function (_, i) {
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `<div class="dots__dot" data-slide="${i}"></div>`
    );
  });
};
const moveSliderDots = function (currentSlide) {
  allDots.forEach(dot => dot.classList.remove('dots__dot__active'));
  allDots.forEach(dot => {
    if (dot.dataset.slide == currentSlide)
      dot.classList.add('dots__dot__active');
  });
};

const moveSlider = function (currentSlide) {
  moveSliderDots(currentSlide);
  allSlides.forEach(function (slide, i) {
    slide.style.transform = `translateX(${100 * (i - currentSlide)}%)`;
  });
};

const addStickyNav = function ([entries]) {
  if (!entries.isIntersecting) {
    header.classList.add('header--sticky');
    headerPlaceholder.style.display = 'block';
  } else {
    header.classList.remove('header--sticky');
    headerPlaceholder.style.display = 'none';
  }
};
///INITIALIZATIONS
createSliderDots();
const allDots = document.querySelectorAll('.dots__dot');
moveSlider(currentSlide);
////////////////////////

const moveNextSlide = function () {
  if (currentSlide === totalSlide - 1) currentSlide = 0;
  else currentSlide++;
  moveSlider(currentSlide);
};
const movePreviousSlide = function () {
  if (currentSlide === 0) currentSlide = totalSlide - 1;
  else currentSlide--;
  moveSlider(currentSlide);
};

//Learn More btn
learnMoreBtn.addEventListener('click', function () {
  sectionFeatures.scrollIntoView({ behavior: 'smooth' });
});

//Sign Up btn
signUpbtns.forEach(function (btn) {
  btn.addEventListener('click', openForm);
});
closeFormbtn.addEventListener('click', closeForm);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modalSignUp.classList.contains('hidden'))
    closeForm();
});

//Nav Hover
nav.addEventListener('mouseover', function (e) {
  blurElement(e);
});
nav.addEventListener('mouseout', function (e) {
  restoreElements(e);
});

//Nav Sticky
const headerCoords = header.getBoundingClientRect();

const navObserver = new IntersectionObserver(addStickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${headerCoords.height}px`,
});
navObserver.observe(headerSec);

//Nav Scroll
nav.addEventListener('click', function (e) {
  if (e.target.classList.contains('nav-link')) {
    e.preventDefault();
    const target = e.target.getAttribute('href');
    document.querySelector(target).scrollIntoView({ behavior: 'smooth' });
  }
});

//Featured Hover
featuredLogosContainer.addEventListener('mouseover', function (e) {
  blurElement(e);
});
featuredLogosContainer.addEventListener('mouseout', function (e) {
  restoreElements(e);
});

//Testimonial Slider
slideRightbtn.addEventListener('click', moveNextSlide);
slideLeftbtn.addEventListener('click', movePreviousSlide);

document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowRight') moveNextSlide(currentSlide);
  if (e.key === 'ArrowLeft') movePreviousSlide(currentSlide);
});

dotContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    currentSlide = e.target.dataset.slide;
    moveSlider(currentSlide);
  }
});

//Delay Sections
const delaySection = function (entries, observer) {
  entries.forEach(function (entry) {
    if (!entry.isIntersecting) return;
    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target);
  });
};
const sectionObserver = new IntersectionObserver(delaySection, {
  root: null,
  threshold: 0.15,
});
sectionsDelay.forEach(section => {
  section.classList.add('section--hidden');
  sectionObserver.observe(section);
});

const imgDelay = function (entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.src = entry.target.dataset.src;
    entry.target.addEventListener('load', function () {
      entry.target.classList.remove('lazy-img');
    });
    observer.unobserve(entry.target);
  });
};
const imgObserver = new IntersectionObserver(imgDelay, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});
imgFeatures.forEach(img => imgObserver.observe(img));

//Cookie-SEC
btnCloseCokkie.addEventListener('click', function () {
  cookieContainer.remove();
});

//Mobile Nav Button
btnMobileNav.addEventListener('click', function (e) {
  header.classList.add('nav-open');
});
btnCloseMobileNav.addEventListener('click', function (e) {
  header.classList.remove('nav-open');
});
