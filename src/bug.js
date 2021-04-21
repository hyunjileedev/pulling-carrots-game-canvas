import Creature from './creature.js';
import { Item } from './canvas.js';

export default class Bug extends Creature {
  constructor(x, y, velX, velY) {
    super(x, y, velX, velY, 50);
  }

  setClickListener(onClick) {
    this.onClick = onClick;
  }

  detectClick(e, fieldRect) {
    const x = e.clientX - fieldRect.left;
    const y = e.clientY - fieldRect.top;
    if (
      y > this.y &&
      y < this.y + this.size &&
      x > this.x &&
      x < this.x + this.size
    ) {
      this.onClick && this.onClick(Item.bug);
    }
  }
}
