"use strict"

import "../unstable/burger.js";
import {debounce} from "../utils/helpers.js";

/**
 * Липкая шапка
 */
const header = document.querySelector('.header');
const HEADER_SCROLLED_CLASS = 'header--scrolled';
const HEADER_HIDDEN_CLASS = 'header--hidden';

let lastScrollY = 0;
function isWindowScrolled() {
  if (window.scrollY < 0) return;

  if (window.scrollY > lastScrollY) {
    const event = new Event("header-hide");
    header.dispatchEvent(event);
  } else {
    const event = new Event("header-show");
    header.dispatchEvent(event);
  }

  setTimeout(() => {
    lastScrollY  = window.scrollY;
  }, 5)

  return lastScrollY > 5;
}

header.addEventListener("header-hide", (e) => {
  // header.classList.add(HEADER_HIDDEN_CLASS);
});
header.addEventListener("header-show", (e) => {
  // header.classList.remove(HEADER_HIDDEN_CLASS);
});

function stickyHeader() {
  console.log('st')
  if (isWindowScrolled()) {
    header.classList.add(HEADER_SCROLLED_CLASS);
  } else {
    header.classList.remove(HEADER_SCROLLED_CLASS);
  }
}
window.addEventListener('scroll', debounce(stickyHeader, 300));
window.addEventListener('orientationchange', stickyHeader);
stickyHeader();

/*
function calcHeaderInvert() {
 invertHeaderBlocks.forEach((inverter, index, arr) => {
    const bounds = inverter.getBoundingClientRect();

    if (arr[0].getBoundingClientRect().top > 100) {
      header.classList.remove('header--light')
    }
    if (bounds.top > 100) return;

    if (bounds.top < 100) {
        header.classList.add('header--light')
    }  else {
      header.classList.remove('header--light')
    }
    if (bounds.bottom < 100) {
      header.classList.remove('header--light')
    }

  })
}
const invertHeaderBlocks = document.querySelectorAll('[data-invert-header]');
window.addEventListener("scroll", (e) => {
  calcHeaderInvert();
});
calcHeaderInvert();
*/
   

