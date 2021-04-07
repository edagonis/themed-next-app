import * as React from "react"

import createGame from "../../src/gameclient/utils/game"

export interface IGameProps {
  user: {
    email: string
    name: string
  }
}

function Game(props: IGameProps) {
  const [mounted, setMounted] = React.useState(false)

  const { user } = props

  React.useEffect(() => {
    setMounted(true)
    console.log("mounting...")

    return () => {
      console.log("unmounting...")
      setMounted(false)
    }
  }, [mounted, setMounted])

  if (user && user.email) {
    if (!mounted) {
      createGame()
    }

    window.userEmail = user.email
  }

  return (
    <React.Fragment>
      <div id="phaser-root"></div>
    </React.Fragment>
  )
}

export default Game
