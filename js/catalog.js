"use strict";

//Catalog view switch

const catalogViewBtns = document.querySelectorAll(".view_model");
const catalogViewBtnsContainer = document.querySelector(".type_of_view");
const catalog = document.querySelector(".catalog_items");

catalogViewBtnsContainer.addEventListener("click", (event) => {
  for (let item of catalogViewBtns) {
    if (item.classList.contains("active")) {
      item.classList.remove("active");
    }
  }
  if (event.target.closest(".view_model")) {
    let target = event.target.closest(".view_model");
    target.classList.add("active");

    if (event.target.closest(".view_grid_model")) {
      catalog.className = "catalog_items grid";
    } else {
      catalog.className = "catalog_items column";
    }
  }
});
