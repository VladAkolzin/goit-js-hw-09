const refs = {
  start: document.querySelector('button[data-start]'),
  stop: document.querySelector('button[data-stop]'),
};
let timerId;
refs.stop.setAttribute('disabled', true);
refs.start.addEventListener('click', () => {
  refs.stop.removeAttribute('disabled');
  refs.start.setAttribute('disabled', true);

  timerId = setInterval(() => {
    const randomColor = getRandomHexColor();
    document.body.style.backgroundColor = randomColor;
  }, 2000);
});
refs.stop.addEventListener('click', () => {
  refs.start.removeAttribute('disabled');
  refs.stop.setAttribute('disabled', true);
  clearInterval(timerId);
});
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
