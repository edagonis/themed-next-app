import * as monsters from "../../monsters/index"

import { Monster } from "../../monsters/goblin"

export function useAnimations(anims: Phaser.Animations.AnimationManager) {
  let animations: Array<object> = []

  Object.keys(monsters).map((monsterName) => {
    const monster: Monster = monsters[monsterName]

    /** Monster walking animations */
    Object.keys(monster.animations.directions).map((key) => {
      const directionAnimationFrames = monster.animations.directions[key]

      animations.push({
        key: monster.name + "-direction" + key,
        frames: anims.generateFrameNames(
          monster.spriteKey,
          directionAnimationFrames
        ),
        frameRate: 10,
        repeat: -1,
      })
    })
  })

  animations.push(
    ...[
      /** Main avatar */
      {
        key: "player-bottom-walk",
        frames: anims.generateFrameNames("creatures_01", {
          start: 1,
          end: 3,
        }),
        frameRate: 10,
        repeat: -1,
      },
      {
        key: "player-right-walk",
        frames: anims.generateFrameNames("creatures_01", {
          start: 4,
          end: 6,
        }),
        frameRate: 10,
        repeat: -1,
      },
      {
        key: "player-top-walk",
        frames: anims.generateFrameNames("creatures_01", {
          start: 7,
          end: 9,
        }),
        frameRate: 10,
        repeat: -1,
      },
      {
        key: "player-left-walk",
        frames: anims.generateFrameNames("creatures_01", {
          start: 10,
          end: 12,
        }),
        frameRate: 10,
        repeat: -1,
      },
    ]
  )

  return animations
}
