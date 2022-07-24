export enum Color {
  RED = '🔴',
  BLUE = '🔵',
  GREY = '⚪️',
}

export class Tile {
  color: Color

  constructor(c = Color.GREY) {
    this.color = c
  }
}

export type Position = [x: number, y: number]

export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>
