import { Game } from "phaser/dist/phaser"

import { primaryScene } from "../scenes/primary/scene"

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  scale: {
    max: {
      width: 1024,
      height: 768,
    },
    mode: Phaser.Scale.FIT,
  },
  parent: "phaser-root",

  physics: {
    default: "arcade",
  },
  scene: [primaryScene],
}

declare global {
  interface Window {
    userEmail: string
    createGame: () => Phaser.Game
  }
}

const createGame = () => new Game(config)

export default createGame
