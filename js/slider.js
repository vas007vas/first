"use strict";

let sliderBox = document.querySelector(".product_box_slider");
let sliderWidth = sliderBox.offsetWidth;
let sliderLine = document.querySelector(".product_box_slider_line");

let slides = document.querySelectorAll(".product_box_slide");
let cloneSlides = [];

let indexForSlider = 0;
let sliderInterval;

console.log(cloneSlides.length);

for (let slide of slides) {
  let clone = slide.cloneNode(true);
  cloneSlides.push(clone);
}

function moveSlider() {
  let clones = [];
  for (let clone of cloneSlides) {
    let slide = clone.cloneNode(true);
    clones.push(slide);
  }

  slides = document.querySelectorAll(".product_box_slide");
  if (!sliderLine.classList.contains("active")) {
    sliderLine.classList.add("active");
  }
  sliderLine.style.transform = `translateX(-${sliderWidth}px)`;

  setTimeout(() => {
    if (sliderLine.classList.contains("active")) {
      sliderLine.classList.remove("active");
    }
    sliderLine.style.transform = `translateX(0px)`;
    slides[0].remove();
    sliderLine.append(clones[indexForSlider]);
    if (indexForSlider < cloneSlides.length - 1) {
      indexForSlider++;
    } else {
      indexForSlider = 0;
    }
  }, 300);
}

sliderInterval = setInterval(moveSlider, 4000);
window.addEventListener("resize", () => {
  sliderWidth = sliderBox.offsetWidth;
});

const sliderBtnsBox = document.querySelector(".product_box_slider_buttons");
const sliderButtons = document.querySelectorAll(".product_box_slider_btn");

function moveReversSlider() {
  let clones = [];
  for (let clone of cloneSlides) {
    let slide = clone.cloneNode(true);
    clones.push(slide);
  }

  slides = document.querySelectorAll(".product_box_slide");
  if (sliderLine.classList.contains("active")) {
    sliderLine.classList.remove("active");
  }
  slides[slides.length - 1].remove();

  if (indexForSlider == 0) {
    indexForSlider = cloneSlides.length - 1;
  } else {
    indexForSlider--;
  }

  sliderLine.prepend(clones[indexForSlider]);
  sliderLine.style.transform = `translateX(-${sliderWidth}px)`;

  setTimeout(() => {
    sliderLine.classList.add("active");
    sliderLine.style.transform = `translateX(0px)`;
  }, 0);
}

function rightDirectMoving(count) {
  if (!sliderLine.classList.contains("active")) {
    sliderLine.classList.add("active");
  }

  let clones = [];
  for (let clone of cloneSlides) {
    let slide = clone.cloneNode(true);
    clones.push(slide);
  }

  let shiftValue = sliderWidth * count;
  let count2 = count;
  let insert = [];

  function removeAddSlides() {
    while (count) {
      slides = document.querySelectorAll(".product_box_slide");

      insert.push(clones[indexForSlider]);
      if (indexForSlider < cloneSlides.length - 1) {
        indexForSlider++;
      } else {
        indexForSlider = 0;
      }

      count--;
    }
    sliderLine.append(...insert);
    sliderLine.style.transform = `translateX(-${shiftValue}px)`;

    setTimeout(() => {
      if (sliderLine.classList.contains("active")) {
        sliderLine.classList.remove("active");
        while (count2) {
          slides = document.querySelectorAll(".product_box_slide");

          slides[0].remove();
          shiftValue -= sliderWidth;
          sliderLine.style.transform = `translateX(-${shiftValue}px)`;

          count2--;
        }
      }
    }, 300);
  }
  removeAddSlides();
}

function leftDirectMoving(count) {
  if (sliderLine.classList.contains("active")) {
    sliderLine.classList.remove("active");
  }
  let clones = [];
  for (let clone of cloneSlides) {
    let slide = clone.cloneNode(true);
    clones.push(slide);
  }
  let shiftValue = 0;
  let count2 = count;
  let insert = [];

  function addRemoveSlides() {
    while (count) {
      slides = document.querySelectorAll(".product_box_slide");

      if (indexForSlider == 0) {
        indexForSlider = cloneSlides.length - 1;
      } else {
        indexForSlider--;
      }
      insert.unshift(clones[indexForSlider]);
      shiftValue += sliderWidth;

      count--;
    }
    sliderLine = document.querySelector(".product_box_slider_line");
    slides = document.querySelectorAll(".product_box_slide");

    sliderLine.prepend(...insert);
    sliderLine.style.transform = `translateX(-${shiftValue}px)`;

    setTimeout(() => {
      if (!sliderLine.classList.contains("active")) {
        sliderLine.classList.add("active");
      }
      sliderLine.style.transform = `translateX(0px)`;
    }, 0);

    setTimeout(() => {
      while (count2) {
        slides = document.querySelectorAll(".product_box_slide");

        slides[slides.length - 1].remove();

        count2--;
      }
    }, 300);
  }
  addRemoveSlides();
}

function sliderBtnAction(event) {
  if (!event.target.closest(".product_box_slider_btn")) {
    return;
  }
  if (sliderInterval) {
    clearInterval(sliderInterval);
    sliderInterval = null;
  }

  let button = event.target.closest(".product_box_slider_btn");
  let buttonNumber = button.dataset.index;

  if (buttonNumber == indexForSlider) {
    return;
  }
  sliderBtnsBox.removeEventListener("click", sliderBtnAction);

  let count =
    buttonNumber > indexForSlider
      ? buttonNumber - indexForSlider
      : indexForSlider - buttonNumber;

  let trueFunction =
    buttonNumber > indexForSlider ? rightDirectMoving : leftDirectMoving;

  trueFunction(count);

  setTimeout(() => {
    sliderBtnsBox.addEventListener("click", sliderBtnAction);
  }, 300);
}

sliderBtnsBox.addEventListener("click", sliderBtnAction);
