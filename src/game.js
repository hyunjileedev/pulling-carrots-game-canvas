import Info from './info.js';
import { Canvas, Item } from './canvas.js';
import * as Sound from './sound.js';

export const Reason = Object.freeze({
  win: 'win',
  lose: 'lose',
  replay: 'replay',
});

export class GameBuilder {
  withGameDuration(gameDuration) {
    this.gameDuration = gameDuration;
    return this;
  }

  withCarrotsCount(carrotsCount) {
    this.carrotsCount = carrotsCount;
    return this;
  }

  withBugsCount(bugsCount) {
    this.bugsCount = bugsCount;
    return this;
  }

  build() {
    return new Game(
      this.gameDuration, //
      this.carrotsCount,
      this.bugsCount
    );
  }
}

class Game {
  constructor(gameDuration, carrotsCount, bugsCount) {
    this.gameDuration = gameDuration;
    this.carrotsCount = carrotsCount;
    this.bugsCount = bugsCount;

    this.btn = document.querySelector('.header__btn');
    this.btn.addEventListener('click', this.onBtnClick);
    this.timer = document.querySelector('.header__timer');
    this.counter = document.querySelector('.header__counter');
    this.field = document.querySelector('.game__field');
    this.fieldRect = this.field.getBoundingClientRect();

    this.gameInfo = new Info();
    this.gameCanvas = new Canvas(
      this.fieldRect,
      this.carrotsCount,
      this.bugsCount
    );
    this.gameCanvas.setItemClickListener(this.onItemClick);

    this.isFinished = true;
    this.intervalForTimer;
    this.count = this.carrotsCount;
  }

  setFinishListener(onFinish) {
    this.onFinish = onFinish;
  }

  setResetListener(onReset) {
    this.onReset = onReset;
  }

  onBtnClick = () => {
    if (this.isFinished) {
      this.start();
    } else {
      this.finish(Reason.replay);
    }
  };

  onItemClick = item => {
    if (item === Item.carrot) {
      Sound.playCarrot();
      this.updateCounting();
      if (this.count === 0) {
        this.finish(Reason.win);
      }
    } else if (item === Item.bug) {
      this.finish(Reason.lose);
    }
  };

  start() {
    this.isFinished = false;
    this.gameInfo.hide();
    this.showBtn('stop');
    this.startTimer();
    this.startCounting();
    this.gameCanvas.activateItems();
    Sound.playBg();
  }

  finish(myResult) {
    this.isFinished = true;
    this.hideBtn();
    clearInterval(this.intervalForTimer);
    this.gameCanvas.deactivateItems();
    this.onFinish && this.onFinish(myResult);
    Sound.stopBg();
  }

  reset() {
    this.onReset && this.onReset();
    this.showBtn('play');
    this.resetTimer();
    this.resetCounting();
    this.gameCanvas.clear();
    this.gameInfo.show();
  }

  showBtn(btnName) {
    this.btn.innerHTML = `<i class="fas fa-${btnName}"></i>`;
    this.btn.style.visibility = 'visible';
  }

  hideBtn() {
    this.btn.style.visibility = 'hidden';
  }

  startTimer() {
    let sec = this.gameDuration;
    this.setTimer(sec);
    this.intervalForTimer = setInterval(() => {
      this.setTimer(--sec);
      if (sec === 0) {
        this.finish(Reason.lose);
      }
    }, 1000);
  }

  setTimer(sec) {
    const minute = Math.floor(sec / 60);
    const second = sec % 60;
    const modifiedMinute = this.modifyTime(minute);
    const modifiedSecond = this.modifyTime(second);
    this.timer.textContent = `${modifiedMinute}:${modifiedSecond}`;
  }

  modifyTime(time) {
    const modifiedTime = time < 10 ? `0${time}` : time;
    return modifiedTime;
  }

  resetTimer() {
    this.timer.textContent = '00:00';
  }

  startCounting() {
    this.counter.textContent = this.count;
  }

  resetCounting() {
    this.counter.textContent = '0';
    this.count = this.carrotsCount;
  }

  updateCounting() {
    this.counter.textContent = --this.count;
  }
}
