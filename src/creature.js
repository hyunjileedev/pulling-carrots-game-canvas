export default class Creature {
  constructor(x, y, velX, velY, size, exists) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.size = size;
    this.exists = exists;
  }

  draw(ctx, imgName) {
    ctx.drawImage(imgName, this.x, this.y);
  }

  update(width, height) {
    if (this.x + this.size >= width) {
      this.velX = -this.velX;
    }
    if (this.x <= 0) {
      this.velX = -this.velX;
    }
    if (this.y + this.size >= height) {
      this.velY = -this.velY;
    }
    if (this.y <= 0) {
      this.velY = -this.velY;
    }
    this.x += this.velX;
    this.y += this.velY;
  }
}
