let headerLink = document.querySelector(".header__navigation-list");
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
let footerLink = document.querySelector(".footer__nav-list");
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
});
let burgerClose = document.querySelector(".burger-menu_close");
burgerClose.addEventListener("click", () => {
  let burgerMenu = document.querySelector(".burger-menu");
  burgerMenu.classList.remove("visible-element_burger");
});

/*for highlight circle and sum start*/
let circlesSum = document.querySelectorAll(".donate-circle");
let sumText = document.querySelectorAll(".range__donate-sums>span");
let circlesWrapper = document.querySelector(".range__donate-wrapper");
let inputSum = document.querySelector(".sum__donate");

function limitNumber(input) {
  let max = 4;
  if (input.value.length > max && typeof input.value.length !== "number") {
    input.value = 0;
  }
}

circlesWrapper.addEventListener("click", (e) => {
  let temp;
  sumText.forEach((span) => {
    if (span.classList.contains("active-span"))
      span.classList.remove("active-span");
  });
  for (let elem of circlesSum) {
    if (elem.classList.contains("active-donate")) {
      elem.classList.remove("active-donate");
    }
    if (e.target.closest(".donate-circle") === elem) {
      elem.classList.add("active-donate");
      temp = e.target
        .closest(".donate-circle")
        .querySelector("img")
        .getAttribute("alt");
    }
  }
  sumText.forEach((span) => {
    if (span.classList.contains(temp)) span.classList.add("active-span");
  });
  inputSum.value = +temp.replace("bucks-", "");
});
inputSum.addEventListener("input", () => {
  limitNumber(inputSum);
  let sum = inputSum.value;
  for (let i = 0; i < circlesSum.length; i++) {
    let sumAttribute = circlesSum[i].querySelector("img").getAttribute("alt");
    let money = +sumAttribute.replace("bucks-", "");
    if (sum == money) {
      sumText.forEach((span) => {
        if (span.classList.contains("active-span"))
          span.classList.remove("active-span");
        if (span.classList.contains(sumAttribute))
          span.classList.add("active-span");
      });
      circlesSum.forEach((element) => {
        if (element.classList.contains("active-donate"))
          element.classList.remove("active-donate");
      });
      circlesSum[i].classList.add("active-donate");
    }
  }
});
/*for highlight circle and sum end*/
