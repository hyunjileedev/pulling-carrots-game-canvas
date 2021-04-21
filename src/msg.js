import { Reason } from './game.js';
import * as Sound from './sound.js';

export default class Msg {
  constructor() {
    this.msg = document.querySelector('.msg');
    this.result = document.querySelector('.msg__result');
    this.replay = document.querySelector('.msg__replay');
    this.cancel = document.querySelector('.msg__cancel');

    this.replay.addEventListener('click', () => {
      this.onReplay && this.onReplay();
    });

    this.cancel.addEventListener('click', () => {
      this.onCancel && this.onCancel();
    });
  }

  setReplayListener(onReplay) {
    this.onReplay = onReplay;
  }

  setCancelListener(onCancel) {
    this.onCancel = onCancel;
  }

  show = myResult => {
    switch (myResult) {
      case Reason.win:
        this.result.textContent = `🥕 YOU WIN 🥕`;
        Sound.playWin();
        break;
      case Reason.lose:
        this.result.textContent = `🐛 YOU LOSE 🐛`;
        Sound.playBug();
        break;
      case Reason.replay:
        this.result.textContent = `🎮 Replay? 🎮`;
        Sound.playAlert();
    }
    this.msg.style.visibility = 'visible';
  };

  hide = () => {
    this.msg.style.visibility = 'hidden';
  };
}
