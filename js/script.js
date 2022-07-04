"use strict";

const searchBtn = document.querySelector(".search_icon");
const searchBlock = document.querySelector(".search_block");

searchBtn.addEventListener("click", () => {
  searchBlock.classList.toggle("active");
});

//MAIN MENU

const menuBtn = document.querySelector(".menu_btn");
const menuBlock = document.querySelector(".header_menu_block");

menuBtn.addEventListener("click", () => {
  menuBlock.classList.toggle("active");
});

menuBlock.addEventListener("click", (event) => {
  if (menuBlock.classList.contains("active") && event.target.closest("a")) {
    menuBlock.classList.remove("active");
  }
});
