'use strict';

/**
 * element toggle function
 */

// Copyright: 2024. 
// Made By: Prince

const elemToggleFunc = function (elem) { elem.classList.toggle("active"); }


/**
 * header sticky & go to top
 */

const header = document.querySelector("[data-header]");
const goTopBtn = document.querySelector("[data-go-top]");

window.addEventListener("scroll", function () {

  if (window.scrollY >= 10) {
    header.classList.add("active");
    goTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    goTopBtn.classList.remove("active");
  }

});


/**
 * navbar toggle
 */

const navToggleBtn = document.querySelector("[data-nav-toggle-btn]");
const navbar = document.querySelector("[data-navbar]");

navToggleBtn.addEventListener("click", function () {

  elemToggleFunc(navToggleBtn);
  elemToggleFunc(navbar);
  elemToggleFunc(document.body);

});


/**
 * skills toggle
 */

const toggleBtnBox = document.querySelector("[data-toggle-box]");
const toggleBtns = document.querySelectorAll("[data-toggle-btn]");
const skillsBox = document.querySelector("[data-skills-box]");

for (let i = 0; i < toggleBtns.length; i++) {
  toggleBtns[i].addEventListener("click", function () {

    elemToggleFunc(toggleBtnBox);
    for (let i = 0; i < toggleBtns.length; i++) {
      elemToggleFunc(toggleBtns[i]);
    }
    elemToggleFunc(skillsBox);

  });
}


/**
 * dark theme ONLY (light mode disabled)
 */

const themeToggleBtn = document.querySelector("[data-theme-btn]");

// Toggle button remains, but dark mode is forced
themeToggleBtn.addEventListener("click", function () {

  // keep button animation if any
  elemToggleFunc(themeToggleBtn);

  // force dark theme always
  document.body.classList.remove("light_theme");
  document.body.classList.add("dark_theme");
  localStorage.setItem("theme", "dark_theme");

});


/**
 * force dark theme on page load
 */

document.body.classList.remove("light_theme");
document.body.classList.add("dark_theme");
localStorage.setItem("theme", "dark_theme");

const words = [
  "Web Designer",
  "Video Editor",
  "Creator",
  "Graphic Designer"
];

const typingEl = document.getElementById("typing");

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let lastTime = 0;
let pauseTime = 0;

const TYPE_SPEED = 75;
const DELETE_SPEED = 45;
const PAUSE_DURATION = 1200;

function typingLoop(time) {
  const delta = time - lastTime;
  const currentWord = words[wordIndex];

  if (!isDeleting && delta > TYPE_SPEED) {
    charIndex++;
    typingEl.textContent = currentWord.slice(0, charIndex);
    lastTime = time;

    if (charIndex === currentWord.length) {
      pauseTime = time;
      isDeleting = true;
    }
  }

  if (isDeleting && time - pauseTime > PAUSE_DURATION && delta > DELETE_SPEED) {
    charIndex--;
    typingEl.textContent = currentWord.slice(0, charIndex);
    lastTime = time;

    if (charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length; // 🔁 infinite loop
    }
  }

  requestAnimationFrame(typingLoop);
}

requestAnimationFrame(typingLoop);
