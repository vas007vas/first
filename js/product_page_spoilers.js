"use strict";

const spoilersButtonsBlock = document.querySelector(
  ".product_box_info_spoilers_btns"
);
const spoilerBtns = document.querySelectorAll(".product_box_spoiler_btn");
const spoilers = document.querySelectorAll(".product_box_spoiler");

function swichSpoiler(event) {
  if (!event.target.closest(".product_box_spoiler_btn")) {
    return;
  }

  let targetBtn = event.target.closest(".product_box_spoiler_btn");

  if (targetBtn.classList.contains("active")) {
    return;
  }
  for (let btn of spoilerBtns) {
    if (btn == targetBtn && !btn.classList.contains("active")) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  }

  for (let spoiler of spoilers) {
    if (
      spoiler.dataset.spoilerId == targetBtn.dataset.spoilerBtnId &&
      !spoiler.classList.contains("active")
    ) {
      spoiler.classList.add("active");
    } else {
      spoiler.classList.remove("active");
    }
  }
}

spoilersButtonsBlock.addEventListener("click", swichSpoiler);
