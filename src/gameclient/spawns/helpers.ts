import { Monster } from "../monsters/goblin"
import { Character } from "../scenes/primary/scene"
import * as monsterModules from "../monsters/index"

enum DIRECTION {
  UP,
  DOWN,
  LEFT,
  RIGHT,
}

const ASSETS_SCALE = 1.5

function handleMonsterRandomDirection(
  monster: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
) {
  const speed = 50
  // const prevVelocity = monster.body.velocity.clone()

  // Stop any previous movement from the last frame
  monster.body.setVelocity(0)

  const newDirection = Phaser.Math.Between(0, 3)

  switch (newDirection) {
    case DIRECTION.LEFT:
      monster.anims.play(monster.name + "-direction" + DIRECTION.LEFT, true)
      monster.body.setVelocityX(-speed)
      break

    case DIRECTION.RIGHT:
      monster.anims.play(monster.name + "-direction" + DIRECTION.RIGHT, true)
      monster.body.setVelocityX(speed)
      break

    case DIRECTION.UP:
      monster.anims.play(monster.name + "-direction" + DIRECTION.UP, true)
      monster.body.setVelocityY(-speed)
      break

    case DIRECTION.DOWN:
      monster.anims.play(monster.name + "-direction" + DIRECTION.DOWN, true)
      monster.body.setVelocityY(speed)
      break

    default:
      break
  }

  // Normalize and scale the velocity so that monster can't move faster along a diagonal
  monster.body.velocity.normalize().scale(speed)
}

export function handleMonstersSpawn(
  map: Phaser.Tilemaps.Tilemap,
  physics: Phaser.Physics.Arcade.ArcadePhysics,
  time: Phaser.Time.Clock
) {
  const monsterSpawnsObjects = map.filterObjects(
    "Spawns",
    (obj) => obj.name === "Monster"
  )

  const gameMonsters = monsterSpawnsObjects.map((spawn) => {
    if (!spawn.x || !spawn.y) console.error("No spawn location has been found")

    const monsterName = spawn.properties.find(
      (property) => property.name === "name"
    ).value

    if (!monsterName)
      console.error("No monster name has been found on this spawn object")

    const monster: Monster = monsterModules[monsterName]

    if (!monsterName)
      console.error("No monster has been found on this spawn object")

    const gameMonster = physics.add
      .sprite(
        (spawn.x || 1000) * ASSETS_SCALE || 0,
        (spawn.y || 1000) * ASSETS_SCALE || 0,
        monster.spriteKey,
        monster.animations.idle
      )
      .setSize(24, 24)
      .setScale(ASSETS_SCALE)

    gameMonster.setName(monster.name)

    /** Make monster immovable by pushes */
    gameMonster.setPushable(false)

    return gameMonster
  })

  /** Add event for the monster to be walking around */
  gameMonsters.forEach((monster) => {
    time.addEvent({
      delay: 2000,
      callback: () => {
        handleMonsterRandomDirection(monster)
      },
      loop: true,
    })
  })

  return gameMonsters
}

export function handleCharacterSpawn(
  _this: Phaser.Scene,
  character: Character,
  map: Phaser.Tilemaps.Tilemap
): Phaser.Types.Physics.Arcade.SpriteWithDynamicBody {
  // Object layers in Tiled let you embed extra info into a map - like a spawn point or custom
  // collision shapes. In the tmx file, there's an object layer with a point named "Spawn Point"
  const spawnPoint = map.findObject("Spawns", (obj) => obj.name === "Player")

  if (!spawnPoint) throw "No spawn point has been found"

  console.log("[Spawns] Spawning character " + character.name)
  // Create a sprite with physics enabled via the physics system. The image used for the sprite has
  // a bit of whitespace, so I'm using setSize & setOffset to control the size of the player's body.
  const created = _this.physics.add
    .sprite(
      (character.position.x && character.position.x * ASSETS_SCALE) || 0,
      (character.position.y && character.position.y * ASSETS_SCALE) || 0,
      "creatures_01",
      1
    )
    .setSize(24, 24)
    .setScale(ASSETS_SCALE)

  created.setName(character.name)

  /** Make player immovable by pushes */
  created.setPushable(false)

  return created
}
