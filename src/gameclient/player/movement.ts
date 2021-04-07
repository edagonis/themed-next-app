export function handlePlayerMovementInputs(player, state) {
  const speed = state.cursors?.shift.isDown ? 300 : 175
  const prevVelocity = player.body.velocity.clone()

  // Stop any previous movement from the last frame
  player.body.setVelocity(0)

  // Horizontal movement
  if (state.cursors?.left.isDown) {
    player.body.setVelocityX(-speed)
  } else if (state.cursors?.right.isDown) {
    player.body.setVelocityX(speed)
  }

  // Vertical movement
  if (state.cursors?.up.isDown) {
    player.body.setVelocityY(-speed)
  } else if (state.cursors?.down.isDown) {
    player.body.setVelocityY(speed)
  }

  // Normalize and scale the velocity so that player can't move faster along a diagonal
  player.body.velocity.normalize().scale(speed)

  // Update the animation last and give left/right animations precedence over up/down animations
  if (state.cursors?.left.isDown) {
    player.anims.play("player-left-walk", true)
  } else if (state.cursors?.right.isDown) {
    player.anims.play("player-right-walk", true)
  } else if (state.cursors?.up.isDown) {
    player.anims.play("player-top-walk", true)
  } else if (state.cursors?.down.isDown) {
    player.anims.play("player-bottom-walk", true)
  } else {
    player.anims.stop()

    // If we were moving, pick and idle frame to use
    /** left */
    if (prevVelocity.x < 0) player.setTexture(player.texture.key, 10)
    /** right */ else if (prevVelocity.x > 0)
      player.setTexture(player.texture.key, 4)
    /** bottom */ else if (prevVelocity.y < 0)
      player.setTexture(player.texture.key, 7)
    /** top */ else if (prevVelocity.y > 0)
      player.setTexture(player.texture.key, 1)
  }
}
