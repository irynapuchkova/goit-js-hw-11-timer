
import './sass/main.scss';
import Swal from 'sweetalert2';

const btnStart = document.querySelector('[data-start]');
const inputDateSelector = document.querySelector('#date-selector')

const valueRefs = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]')
}

btnStart.addEventListener('click', () => { timer.start() })
inputDateSelector.addEventListener('change', () => { timer.stop() })

class Timer {
  constructor({onTick}) {
    this.intervalId = null;
    this.isActive = false;
    this.onTick = onTick;
  }
  start() {
    if (this.isActive) {
      return;
    }
    
    const FINISHED_DATE = Date.parse(inputDateSelector.value);
      if (FINISHED_DATE < Date.now()) {
        Swal.fire("Please choose a date in the future");
        // this.isActive = false;
        console.log(FINISHED_DATE);
        return;
      }

    this.isActive = true;
    
    this.intervalId = setInterval(() => {
      const START_DATE = Date.now();
      const deltaDate = FINISHED_DATE - START_DATE;
      const time = this.convertMs(deltaDate);

      console.log(time);
      this.onTick(time);
    }, 1000)
  }

  stop () {
    clearInterval(this.intervalId);
    this.isActive = false;

    const time = this.convertMs(0);

    this.onTick(time);
  }

  convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = this.pad(Math.floor(ms / day));
    // Remaining hours
    const hours = this.pad(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = this.pad(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = this.pad(Math.floor((((ms % day) % hour) % minute) / second));

    return { days, hours, minutes, seconds };
  }

  pad(value) {
    return String(value).padStart(2, '0')
  }
}

const timer = new Timer({
  onTick: changeTimerInterface,
  // defaultStart: removeBtnStartClick,
})

function changeTimerInterface({ days, hours, minutes, seconds }) {
  valueRefs.days.textContent = `${days}`;
  valueRefs.hours.textContent = `${hours}`;
  valueRefs.minutes.textContent = `${minutes}`;
  valueRefs.seconds.textContent = `${seconds}`;
}

// function removeBtnStartClick() {
//   if (changeTimerInterface() {
//     btnStart.removeEventListener('click', () => { timer.start() })
//   }
// }

// function handleInputDateSelector(e) {
//   return Date.parse(inputDateSelector.value);
// }
