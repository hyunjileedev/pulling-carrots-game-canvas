import Carrot from './carrot.js';
import Bug from './bug.js';

export const Item = Object.freeze({
  carrot: 'carrot',
  bug: 'bug',
});

export class Canvas {
  constructor(fieldRect, carrotsCount, bugsCount) {
    this.fieldRect = fieldRect;
    this.carrotsCount = carrotsCount;
    this.bugsCount = bugsCount;

    this.canvas = document.querySelector('.canvas');
    this.canvas.addEventListener('click', this.onClick);
    this.ctx = this.canvas.getContext('2d');
    this.width = this.canvas.width = this.fieldRect.width;
    this.height = this.canvas.height = this.fieldRect.height;

    this.carrots = [];
    this.carrotImg = new Image();
    this.carrotImg.src = './img/carrot.png';
    this.bugs = [];
    this.bugImg = new Image();
    this.bugImg.src = './img/bug.png';

    this.rAF;
  }

  setItemClickListener(onItemClick) {
    this.onItemClick = onItemClick;
  }

  onClick = e => {
    if (!this.carrots.length || !this.bugs.length) {
      return;
    }
    this.carrots.forEach(carrot => {
      carrot.detectClick(e, this.fieldRect);
    });
    this.bugs.forEach(bug => {
      bug.detectClick(e, this.fieldRect);
    });
  };

  activateItems = () => {
    while (this.carrots.length < this.carrotsCount) {
      const carrot = new Carrot(
        random(0, this.width - 80),
        random(0, this.height - 80)
      );
      carrot.setClickListener(this.onItemClick);
      this.carrots.push(carrot);
    }

    while (this.bugs.length < this.bugsCount) {
      const bug = new Bug(
        random(0, this.width - 50),
        random(0, this.height - 50),
        random(-3, 3),
        random(-3, 3)
      );
      bug.setClickListener(this.onItemClick);
      this.bugs.push(bug);
    }

    this.ctx.clearRect(0, 0, this.width, this.height);

    this.carrots.forEach(carrot => {
      if (!carrot.exists) {
        return;
      }
      carrot.draw(this.ctx, this.carrotImg);
      carrot.update(this.width, this.height);
    });

    this.bugs.forEach(bug => {
      bug.draw(this.ctx, this.bugImg);
      bug.update(this.width, this.height);
    });

    this.rAF = requestAnimationFrame(this.activateItems);
  };

  // 마지막 당근 제거 전 rAF가 cancel되는 문제 해결 위해 setTimeout 사용
  deactivateItems() {
    setTimeout(() => {
      cancelAnimationFrame(this.rAF);
      while (this.carrots.length > 0) {
        this.carrots.pop();
      }
      while (this.bugs.length > 0) {
        this.bugs.pop();
      }
    }, 30);
  }

  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }
}

function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}
