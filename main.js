const closeFormBtn = document.querySelector('#close-form');
const openFormBtns = document.querySelectorAll("button.inscribe-btn");
const shadowDiv = document.querySelector(".shadow-div");
const daysEl = document.getElementById('days')
const hoursEl = document.getElementById('hours')
const minutesEl = document.getElementById('minutes')
const secondsEl = document.getElementById('seconds')

function toggleRegisterForm() {
  shadowDiv.classList.toggle("active");
}
openFormBtns.forEach(el => {
  el.addEventListener("click", toggleRegisterForm);
})


const eventDay = new Date(2022, 10, 30, 14);
const today = new Date();

// get total seconds between the times
let delta = Math.abs(eventDay - today) / 1000;

// calculate (and subtract) whole days
const days = Math.floor(delta / 86400);
delta -= days * 86400;

// calculate (and subtract) whole hours
const hours = Math.floor(delta / 3600) % 24;
delta -= hours * 3600;

// calculate (and subtract) whole minutes
const minutes = Math.floor(delta / 60) % 60;
delta -= minutes * 60;

// what's left is seconds
const seconds = Math.round(delta % 60);  // in theory the modulus is not required

const restDay = {
  days,
  hours,
  minutes,
  seconds
}

function decreaseSecond() {
  if (restDay.seconds === 0) {
    restDay.seconds = 59;
    if (restDay.minutes === 0) {
      restDay.minutes = 59;
      if (restDay.hours === 0) {
        if (restDay.days === 0)
          clearInterval(secondInterval)
      } else {
        restDay.hours--;
      }
    } else {
      restDay.minutes--;
    }
  } else {
    restDay.seconds--;
  }

  setCalenderEl();
}

function setCalenderEl() {
  daysEl.textContent = restDay.days < 10 ? '0'+restDay.days : restDay.days
  hoursEl.textContent = restDay.hours < 10 ? '0'+restDay.hours : restDay.hours
  minutesEl.textContent = restDay.minutes < 10 ? '0'+restDay.minutes : restDay.minutes
  secondsEl.textContent = restDay.seconds < 10 ? '0'+restDay.seconds : restDay.seconds
}

const secondInterval = setInterval(decreaseSecond, 1000);



