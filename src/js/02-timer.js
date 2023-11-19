import { Notify } from 'notiflix/build/notiflix-notify-aio';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
const refs = {
  startBtn: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
  dateInput: document.querySelector('#datetime-picker'),
};
refs.startBtn.setAttribute('disabled', true);
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notify.failure('Please choose a date in the future');
    } else {
      refs.startBtn.removeAttribute('disabled');
    }
  },
};
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
refs.startBtn.addEventListener('click', handleClick);
function handleClick() {
  let interval = setInterval(() => {
    const currentDate = new Date();
    const selectedDate = new Date(refs.dateInput.value);
    const timeDifference = selectedDate - currentDate;
    if (timeDifference >= 0) {
      let convertedTime = convertMs(timeDifference);
      refs.days.textContent = addLeadingZero(convertedTime.days);
      refs.hours.textContent = addLeadingZero(convertedTime.hours);
      refs.minutes.textContent = addLeadingZero(convertedTime.minutes);
      refs.seconds.textContent = addLeadingZero(convertedTime.seconds);
    }
    if (timeDifference <= 0) {
      Notify.success('Час вийшов');
      refs.startBtn.removeAttribute('disabled');
      clearInterval(interval);
    }
  }, 1000);
}
flatpickr(refs.dateInput, options);
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
