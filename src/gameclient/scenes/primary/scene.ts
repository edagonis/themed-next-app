import Phaser from "phaser"
import { handlePlayerMovementInputs } from "../../player/movement"

import { handleMonstersSpawn, handleCharacterSpawn } from "../../spawns/helpers"

import { API_MESSAGE, useWebSocketClient } from "../../utils/websocket-client"
import { useAnimations } from "./animations"

export type Character = {
  name: string
  lookType: string
  position: { x: number; y: number }
}

interface PrimaryScene {
  preload(this: Phaser.Scene): void
  create(this: Phaser.Scene): void
  update(this: Phaser.Scene): void
}

interface GameState {
  loading: boolean
  /**
   * Current game spectators.
   * A spectator is a user that has been succesfully authenticated
   */
  spectators: Array<{
    characters: []
    loggedInCharacter: Character
    user: { email: string }
  }>
  /** Stack of messages from the API */
  messages: Array<API_MESSAGE>
  /** The logged-in character is the character in which the current user is attached to */
  loggedInCharacter?: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
  /** The current in-game characters which are logged-in */
  loggedInCharacters?: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody[]
}

interface SceneState {
  topLeftText?: Phaser.GameObjects.Text
  cursors?: Phaser.Types.Input.Keyboard.CursorKeys
}

/** Game State is the state generated based on the WebSocket connection. */
let __GAME_STATE: GameState = {
  loading: true,
  spectators: [],
  messages: [],
}

/** Scene State is the overall high-level variables to be manipulated through the scene */
const __SCENE_STATE: SceneState = {}

const ASSETS_SCALE = 1.5

const tilesImages = [
  { key: "otsp_tiles_01", file: "assets/tilesets/otsp_tiles_01.png" },
  { key: "otsp_nature_01", file: "assets/tilesets/otsp_nature_01.png" },
  { key: "otsp_walls_01", file: "assets/tilesets/otsp_walls_01.png" },
]

const handleNewMessage = function (newMessage: API_MESSAGE) {
  __GAME_STATE.messages = __GAME_STATE.messages.concat([newMessage])

  switch (newMessage.type) {
    case 0:
      /** Reassign the Game State by overriding the new variables */
      __GAME_STATE = { ...__GAME_STATE, ...newMessage.data }
      break

    default:
      break
  }
}

/**
 * Create Scene from object functions
 * Add custom properties, since this will be the head of the game scene
 */
export const primaryScene: PrimaryScene = {
  preload: function (this: Phaser.Scene) {
    /** Load each tileset image */
    tilesImages.map(({ key, file }) => {
      this.load.image({
        key,
        url: file,
      })
    })
    this.load.tilemapTiledJSON("map", "assets/tilemaps/town.json")

    this.load.spritesheet(
      "creatures_01",
      "assets/sprites/otsp_creatures_01.png",
      {
        frameWidth: 32,
      }
    )
  },

  create: async function (this: Phaser.Scene) {
    /** Init WebSocket connection */
    const { send } = await useWebSocketClient(handleNewMessage)

    /** Get the first game state asynchronously */
    console.log("[WebSocket] Getting game state")
    send()

    /** Ping to the WebSocket server through a 100ms delay Phaser's time event */
    this.time.addEvent({
      delay: 10000,
      callback: () => {
        send()
      },
      loop: true,
    })

    /** Wait for the first game state */
    await new Promise((resolve, reject) => {
      /** Wait for the first game message */
      /** Try to resolve the promise manually */
      const maxNumberOfAttempts = 10
      const intervalTime = 200 // ms
      let currentAttempt = 0
      const interval = setInterval(() => {
        if (currentAttempt > maxNumberOfAttempts - 1) {
          clearInterval(interval)
          reject(__GAME_STATE)
          throw new Error("Maximum number of attempts exceeded")
        } else if (__GAME_STATE.messages.length > 0) {
          resolve(__GAME_STATE)
          clearInterval(interval)
        }
        currentAttempt++
      }, intervalTime)
    })

    console.log(
      "[WebSocket] Initial game state has been found:\n " +
        JSON.stringify(__GAME_STATE)
    )

    __GAME_STATE.loading = false

    const map = this.make.tilemap({ key: "map" })

    /**
     * Add tileset images to the map
     *
     * Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
     * Phaser's cache (i.e. the name you used in preload)
     * */
    const tilesets = tilesImages.map(({ key }) => {
      return map.addTilesetImage(key)
    })

    /** Handle map layers creation from tilemap */
    let worldLayer
    map.layers.map((value, index) => {
      const layer = map.createLayer(index, tilesets, 0, 0)
      /** Layer depth comes from Tiled layer's "depth" property  */

      /** Set layer properties coming from Tiled as layer attribute values */
      map.getLayer(index).properties.map((property) => {
        const prop = property as { name: string; type: string; value: number }

        layer[prop.name] = prop.value
      })

      layer.setCollisionByProperty({ collides: true })

      layer.scale = ASSETS_SCALE

      if (value.name == "World") {
        worldLayer = layer
      }
    })

    /** Camera */
    const camera = this.cameras.main

    camera.setBounds(
      0,
      0,
      map.widthInPixels * ASSETS_SCALE,
      map.heightInPixels * ASSETS_SCALE
    )

    try {
      /**
       * Loop over all spectators to spawn every logged-in character
       *
       * @TODO Character rendering should be optimized to render only if it's on the client screen
       */
      console.log(__GAME_STATE.spectators)
      __GAME_STATE.loggedInCharacters = __GAME_STATE.spectators.map(
        (spectator) => {
          const { loggedInCharacter } = spectator

          const character = handleCharacterSpawn(this, loggedInCharacter, map)

          const characterName = this.add.text(
            character.x || 0,
            (character.y || 0) - 15,
            character.name,
            {
              fontSize: "11px",
              color: "#ababab",
            }
          )

          characterName.setDepth(10)

          /* Set sprite custom attribute for UI data (such as character name text) */
          character.setData("ui-elements", {
            nameTextElement: characterName,
          })

          if (spectator.user.email === window.userEmail) {
            __GAME_STATE.loggedInCharacter = character
          }

          return character
        }
      )

      /** Spawn monsters */
      const monsters = handleMonstersSpawn(map, this.physics, this.time)

      if (__GAME_STATE.loggedInCharacter) {
        /** Prevent the logged-in character and monsters from colliding to walls */
        this.physics.add.collider(
          [__GAME_STATE.loggedInCharacter, ...monsters],
          worldLayer
        )

        /** Collision between the logged-in character and the other characters and monsters */
        this.physics.add.collider(
          [...__GAME_STATE.loggedInCharacters, ...monsters],
          __GAME_STATE.loggedInCharacter
        )

        /** Put the camera to follow the logged-in character */
        camera.startFollow(__GAME_STATE.loggedInCharacter)
      }
    } catch (error) {
      console.error(error)
    }

    /** Create animations */
    const animations = useAnimations(this.anims)

    animations.forEach((animation) => {
      this.anims.create(animation)
    })

    __SCENE_STATE.cursors = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
      shift: Phaser.Input.Keyboard.KeyCodes.SHIFT,
    }) as Phaser.Types.Input.Keyboard.CursorKeys

    // Help text that has a "fixed" position on the screen
    __SCENE_STATE.topLeftText = this.add
      .text(
        16,
        16,
        __GAME_STATE.loading
          ? "Loading..."
          : 'WASD keys to move\nPress "F2" to show hitboxes\nHold SHIFT to run',
        {
          font: "18px monospace",
          padding: { x: 20, y: 10 },
          color: "#000",
          backgroundColor: "#ffffff",
        }
      )
      .setScrollFactor(0)
      .setDepth(30)

    // Debug graphics
    this.input.keyboard.once(
      Phaser.Input.Keyboard.Events.KEY_DOWN + "F2",
      () => {
        // Turn on physics debugging to show player's hitbox
        this.physics.world.createDebugGraphic()

        // Create worldLayer collision graphic above the player, but below the help text
        const graphics = this.add.graphics().setAlpha(0.75).setDepth(20)
        worldLayer.renderDebug(graphics, {
          tileColor: null, // Color of non-colliding tiles
          collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
          faceColor: new Phaser.Display.Color(40, 39, 37, 255), // Color of colliding face edges
        })
      }
    )
  },

  update: function update() {
    if (__GAME_STATE.loggedInCharacter) {
      handlePlayerMovementInputs(__GAME_STATE.loggedInCharacter, __SCENE_STATE)
    }

    __SCENE_STATE.topLeftText?.setText(
      __GAME_STATE.loading
        ? "Loading..."
        : 'WASD keys to move\nPress "F2" to show hitboxes\nHold SHIFT to run'
    )

    /**
     * Map over logged-in characters
     */
    __GAME_STATE.loggedInCharacters?.map((character) => {
      const characterUiData = character.getData("ui-elements")

      const { nameTextElement } = characterUiData

      nameTextElement.x = character.body.position.x
      nameTextElement.y = character.body.position.y - 15
    })
  },
}
