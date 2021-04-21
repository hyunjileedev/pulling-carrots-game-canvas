import Creature from './creature.js';
import { Item } from './canvas.js';

export default class Carrot extends Creature {
  constructor(x, y) {
    super(x, y, 0, 0, 80, true);
  }

  setClickListener(onClick) {
    this.onClick = onClick;
  }

  detectClick(e, fieldRect) {
    if (!this.exists) {
      return;
    }
    const x = e.clientX - fieldRect.left;
    const y = e.clientY - fieldRect.top;
    if (
      y > this.y &&
      y < this.y + this.size &&
      x > this.x &&
      x < this.x + this.size
    ) {
      this.exists = false;
      this.onClick && this.onClick(Item.carrot);
    }
  }
}
