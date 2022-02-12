abstract class Plant {
  readonly abstract cost: number;
  readonly abstract projectile: (new (x: number, y: number) => Projectile);
  abstract health: number;

  abstract fireRate: number;
  abstract countdown: number;

  constructor(cell?: Cell) {
    this.cell = cell;
  }

  protected abstract action(): void;

  update() {
    if (this.isZombieInfront()) {
      if (this.countdown <= 0) {
        this.action();
        this.countdown += this.fireRate;
      }
      this.countdown -= deltaTime;
    } else {
      this.countdown = 0;
    }
  }

  getEaten(zombie: Zombie): void {
    this.health -= zombie.dmg;
    if (this.health <= 0) {
      this.destroy();
    }
  }

  destroy(): void {
    this.cell.plant = null;
  }

  protected isZombieInfront() {
    return objects.zombies.filter((z) => z.lane === this.cell.y && z.x > this.cell.x * SCALE).length > 0;
  }

  protected isZombieBehind() {
    return objects.zombies.filter((z) => z.lane === this.cell.y && z.x < this.cell.x * SCALE).length > 0;
  }

  abstract draw(_x?: number, _y?: number, _size?: number): void;

  cell: Cell;
}