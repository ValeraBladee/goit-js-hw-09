import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
const { Notify } = require('notiflix');
const refs = {
  btnStart: document.querySelector('[data-start]'),
  input: document.querySelector('#datetime-picker'),
  daysNum: document.querySelector('[data-days]'),
  hoursNum: document.querySelector('[data-hours]'),
  minNum: document.querySelector('[data-minutes]'),
  secsNum: document.querySelector('[data-seconds]'),
};
refs.btnStart.disabled = 'true';
const currentDate = new Date();
const currTime = currentDate.getTime();
console.log(currTime);
let selectedTime;
const fp = flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    let selectedTime = selectedDates[0].getTime();

    if (selectedTime < currTime) {
      Notify.failure('Please choose a date in the future');
      refs.btnStart.disabled = true;
    }
    if (selectedTime > currTime) {
      refs.btnStart.disabled = false;
    }
  },
});

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

let timerTime;
refs.btnStart.addEventListener('click', onBtnStartClick);
function onBtnStartClick(event) {
  refs.btnStart.disabled = 'true';
  refs.input.disabled = 'true';
  setInterval(() => {
    selectedTime = fp.selectedDates[0].getTime();
    let timerTime = selectedTime - Date.now();
    if (timerTime <= 0) {
      refs.btnStart.disabled = 'true';
      return;
    } else {
      let timerArr = convertMs(timerTime);
      refs.daysNum.textContent = addLeadingZero(timerArr.days);
      refs.hoursNum.textContent = addLeadingZero(timerArr.hours);
      refs.minNum.textContent = addLeadingZero(timerArr.minutes);
      refs.secsNum.textContent = addLeadingZero(timerArr.seconds);
    }
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
