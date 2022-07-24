import { Color, Tile } from './types'

const Game = {
  matrix: new Array(6)
    .fill(null)
    .map(() => new Array(7).fill(null).map(() => new Tile())) as Tile[][],

  PrintMatrix() {
    console.log(
      this.matrix.map(arr => arr.map(el => el.color).join('')).join('\n') +
        '\n',
    )
  },

  PutDot(color: Color, x: number, y = 5): void {
    if (y < 0) {
      return console.log('err')
    }
    if (this.matrix[y][x].color !== Color.GREY) {
      return this.PutDot(color, x, y - 1)
    }
    this.matrix[y][x].color = color
    this.PrintMatrix()
    this.WinCondition(x, y)
  },

  WinCondition(x: number, y: number) {
    let win =
      this.WinHorizontally(y) ??
      this.WinVertically(x) ??
      this.WinDiagonally(x, y)
    if (win) {
      console.log(win + ' won')
    }
  },

  WinHorizontally(y: number) {
    const [count, color] = this.matrix[y].reduce(
      ([count, color], curr) => {
        if (count === 4) return [count, color]
        if (curr.color === color) return [count + 1, color]
        return [1, curr.color]
      },
      [0, Color.GREY] as [number, Color],
    )

    if (color !== Color.GREY && count === 4) return color
  },

  WinVertically(x: number) {
    const col = this.matrix.map(l => l[x])

    const [count, color] = col.reduce(
      ([count, color], curr) => {
        if (count === 4) return [count, color]
        if (curr.color === color) return [count + 1, color]
        return [1, curr.color]
      },
      [0, Color.GREY] as [number, Color],
    )

    if (color !== Color.GREY && count === 4) return color
  },

  WinDiagonally(x: number, y: number) {
    const arr = [-3, -2, -1, 0]

    return arr.reduce((color, curr) => {
      if (color) {
        return color
      }

      const indY = y + curr
      const indX = x + curr
      const t0 = this.matrix[indY]?.[indX]?.color
      let t1 = this.matrix[indY + 1]?.[indX + 1]?.color
      let t2 = this.matrix[indY + 2]?.[indX + 2]?.color
      let t3 = this.matrix[indY + 3]?.[indX + 3]?.color

      if (t0 !== Color.GREY && t0 === t1 && t1 === t2 && t2 === t3) {
        return t0
      }

      t1 = this.matrix[indY + 1]?.[indX - 1]?.color
      t2 = this.matrix[indY + 2]?.[indX - 2]?.color
      t3 = this.matrix[indY + 3]?.[indX - 3]?.color

      if (t0 !== Color.GREY && t0 === t1 && t1 === t2 && t2 === t3) {
        return t0
      }
    }, undefined as Color | undefined)
  },
}

Game.PutDot(Color.BLUE, 1)
Game.PutDot(Color.RED, 2)
Game.PutDot(Color.BLUE, 2)
Game.PutDot(Color.RED, 3)
Game.PutDot(Color.RED, 3)
Game.PutDot(Color.BLUE, 3)
Game.PutDot(Color.RED, 4)
Game.PutDot(Color.RED, 4)
Game.PutDot(Color.RED, 4)
Game.PutDot(Color.BLUE, 4)
