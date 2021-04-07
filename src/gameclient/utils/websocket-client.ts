enum API_MESSAGE_TYPES {
  GAME_STATE,
}

enum CLIENT_MESSAGE_TYPES {
  PING,
}

export type API_MESSAGE = { type: API_MESSAGE_TYPES; data?: any }
export type CLIENT_MESSAGE = {
  type: CLIENT_MESSAGE_TYPES
  data?: any
}

const webSocketApiEndpoint =
  "wss://gkdg76l7sh.execute-api.us-east-1.amazonaws.com/dev"

/**
 * Creates a connection to the WebSocket API
 *
 * It will wait until the connection is opened, so an await call can be used through the Promise
 */
const connect = () => {
  return new Promise<WebSocket>((resolve, reject) => {
    const maxNumberOfAttempts = 10
    const intervalTime = 200 // ms

    // WebSocket sends a message to API Gateway on creation that gets
    // routed to the '$connect' route
    const newWebSocketConnection = new WebSocket(webSocketApiEndpoint)

    /*
     * See https://html.spec.whatwg.org/multipage/indices.html#events-2
     * for details around each WebSocket event type.
     */
    newWebSocketConnection.onopen = (data) => {
      console.log("[WebSocketClient] Connected successfully.")
      resolve(newWebSocketConnection)
    }

    newWebSocketConnection.onerror = function (err) {
      console.error(err)
      reject(err)
    }

    /** Try to resolve the promise manually */
    let currentAttempt = 0
    const interval = setInterval(() => {
      if (currentAttempt > maxNumberOfAttempts - 1) {
        clearInterval(interval)
        reject(new Error("Maximum number of attempts exceeded"))
      } else if (
        newWebSocketConnection?.readyState === newWebSocketConnection?.OPEN
      ) {
        clearInterval(interval)
        resolve(newWebSocketConnection)
      }
      currentAttempt++
    }, intervalTime)
  })
}

/** Starts a WebSocket connection through this client and the WebSocket API */
export async function useWebSocketClient(
  /** Handler for new incoming messages from the API */
  handleNewMessage: (newMessage: API_MESSAGE) => void
) {
  /** Connect immediately */
  const websocket: WebSocket = await connect()

  websocket.onmessage = (message) => {
    const parsedMessage: API_MESSAGE = JSON.parse(message.data)
    console.log("[WebSocketClient] onmessage:    ")
    console.log(parsedMessage)

    handleNewMessage(parsedMessage)
  }

  const send = function (message?: CLIENT_MESSAGE) {
    message = message || {
      type: CLIENT_MESSAGE_TYPES.PING,
    }
    console.log("[WebSocketClient] Sending a message of type: " + message.type)

    if (!websocket) throw "No WebSocket found"

    return websocket.send(JSON.stringify(message))
  }

  const disconnect = function () {
    // WebSocket sends a message to API Gateway that gets routed to the
    // '$disconnect' route.
    console.log("[WebSocketClient] Closing the connection.")

    if (!websocket) throw "No WebSocket found"

    websocket.close()
  }

  return { websocket, send, disconnect }
}
