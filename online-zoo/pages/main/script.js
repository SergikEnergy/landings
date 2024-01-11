// alert(
//   "Здравствуйте, прошу проверить, если можно, кросс-чек 12.10, еще не успел доелать Donate - основная работа не позволила. Спасибо за понимание!)"
// );
let overlayBlock = document.querySelector(".overlay-popup");
let headerLink = document.querySelector(".header__navigation-list");
let footerLink = document.querySelector(".footer__nav-list");
headerLink.addEventListener("click", (elem) => {
  let currentLink = elem.target;
  elem.target.classList.add("visited-link");
  let headerLinkAll = document.querySelectorAll(".header__navigation-link");
  for (let links of headerLinkAll) {
    let link = links.querySelector("a");
    if (link !== currentLink) {
      link.classList.remove("visited-link");
    }
  }
});

footerLink.addEventListener("click", (elem) => {
  let currentLink = elem.target;
  elem.target.classList.add("visited-link");
  let footerLinkAll = document.querySelectorAll(".footer__nav-link");
  for (let links of footerLinkAll) {
    let link = links.querySelector("a");
    if (link !== currentLink) {
      link.classList.remove("visited-link");
    }
  }
});

/*for burger onclick*/
let burgerIcon = document.querySelector(".burger-icon");

burgerIcon.addEventListener("click", () => {
  let burgerMenu = document.querySelector(".burger-menu");
  burgerMenu.classList.add("visible-element_burger");
  overlayBlock.classList.remove("blocked");
  overlayBlock.classList.add("non-blocked");
});
let burgerClose = document.querySelector(".burger-menu_close");
let burgerMenu = document.querySelector(".burger-menu");
burgerClose.addEventListener("click", () => {
  burgerMenu.classList.remove("visible-element_burger");
  overlayBlock.classList.remove("non-blocked");
  overlayBlock.classList.add("blocked");
});
overlayBlock.addEventListener("click", (e) => {
  if (e.target === overlayBlock) {
    burgerMenu.classList.remove("visible-element_burger");
    overlayBlock.classList.remove("non-blocked");
    overlayBlock.classList.add("blocked");
  }
});
/*for burger onclick script end*/

/*for pets carousel start*/
let petSets = document.querySelectorAll(".pets__images");
let currentSet = 0;
let isAnimationEnd = true;
let orderCollection = document.querySelectorAll(".pets__images-card");

function getRandom() {
  let min = 1;
  let max = 6;
  let randomNumber = Math.floor(max * Math.random()) + min;
  return randomNumber;
}

function changeOrder() {
  /*delete previous order*/
  for (let elem of orderCollection) {
    for (let i = 0; i <= orderCollection.length; i++) {
      let isFind = false;
      if (elem.classList.contains(`set-card-${i}`)) {
        elem.classList.remove(`set-card-${i}`);
        isFind = true;
        // console.log(elem.classList);
      }
      if (isFind) break;
    }
  }
  /*set new order*/
  for (let elem of orderCollection) {
    let i = getRandom();
    elem.classList.add(`set-card-${i}`);
    // console.log(elem.classList);
  }
}
// changeOrder();

function changeCurrentSet(n) {
  currentSet = (n + petSets.length) % petSets.length;
}

function hideSet(direction) {
  isAnimationEnd = false;
  petSets[currentSet].classList.add(direction);
  petSets[currentSet].addEventListener("animationend", function () {
    console.log(this);
    console.log(petSets[currentSet]);
    console.log(this == petSets[currentSet]);
    this.classList.remove("active-set", direction);
    this.classList.add("hidden-set");
  });
}

function showSet(direction) {
  petSets[currentSet].classList.remove("hidden-set");
  petSets[currentSet].classList.add("next", direction, "active-set");
  petSets[currentSet].addEventListener("animationend", function () {
    this.classList.remove("next", direction, "hidden-set");
    this.classList.add("active-set");
    isAnimationEnd = true;
  });
}

function previousSet(n) {
  hideSet("to-right");
  changeCurrentSet(n - 1);
  changeOrder();
  showSet("from-left");
}

function nextSet(n) {
  hideSet("to-left");
  changeCurrentSet(n + 1);
  changeOrder();
  showSet("from-right");
}

document
  .querySelector(".get-previous_card")
  .addEventListener("click", function () {
    if (isAnimationEnd) {
      previousSet(currentSet);
    }
  });

document.querySelector(".get-next_card").addEventListener("click", function () {
  if (isAnimationEnd) {
    nextSet(currentSet);
  }
});

/*for pets carousel end*/

/*for testimonials range carousel start*/
let testimonialsCards = document.querySelectorAll(
  ".testomonials__content-card"
);
let testimonialsSliderLine = document.querySelector(".testimonials__content");
let count = 0;
let width = testimonialsSliderLine.offsetWidth;
let widthElem = width / testimonialsCards.length / width;
let stepRange = [];
let inputRange = document.querySelector(".testimonials__scroll-active");
let maxStep = +inputRange.getAttribute("max");
let reLocation = [];
// console.log(maxStep, typeof maxStep);
for (let i = 0; i <= maxStep; i++) {
  stepRange.push(i);
  reLocation.push(Math.round(i * widthElem * 10000) / 100);
}
let currentValue;
function changeLocation(value) {
  let findIndex = stepRange.indexOf(+value);
  testimonialsSliderLine.style.transform = `translateX(-${reLocation[findIndex]}%)`;
}
inputRange.addEventListener("input", function () {
  currentValue = inputRange.value;
  changeLocation(currentValue);
  console.log("yep", widthElem);
});

/*for testimonials range carousel end*/

/*for testimonials popup start*/
let testimonialsCopy = document.querySelector(".testimonials-copy__card");

testimonialsSliderLine.addEventListener("click", (e) => {
  if (e.target != testimonialsSliderLine) {
    // console.log(e.target.closest(".testomonials__content-card").innerHTML);
    testimonialsCopy.classList.remove("hidden__testimonials-card");
    testimonialsCopy.querySelector(".testomonials__content-card").innerHTML =
      e.target.closest(".testomonials__content-card").innerHTML;
    overlayBlock.classList.remove("blocked");
    overlayBlock.classList.add("non-blocked");
  }
});

let closeTestimonialsCopy = document.querySelector(".close-copy__card");

closeTestimonialsCopy.addEventListener("click", () => {
  testimonialsCopy.classList.add("hidden__testimonials-card");
  overlayBlock.classList.remove("non-blocked");
  overlayBlock.classList.add("blocked");
});

overlayBlock.addEventListener("click", (e) => {
  if (e.target === overlayBlock) {
    testimonialsCopy.classList.add("hidden__testimonials-card");
    overlayBlock.classList.remove("non-blocked");
    overlayBlock.classList.add("blocked");
  }
});

/*for testimonials popup end*/
