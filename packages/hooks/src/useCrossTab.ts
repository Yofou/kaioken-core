import { useLayoutEffect, useSignal } from "kaioken"

export const useCrossTab = <T>(name: string, initialValue: T) => {
  const state = useSignal(initialValue, name)

  useLayoutEffect(() => {
    let localVersion = 0
    const broadcastChannel = new BroadcastChannel(name)
    broadcastChannel.onmessage = (e) => {
      if (e.data.type === "GET") {
        broadcastChannel.postMessage({
          type: "SET",
          version: localVersion,
          value: state.value,
        })
      } else if (e.data.type === "SET" && e.data.version > localVersion) {
        localVersion = e.data.version
        state.value = e.data.value
      }
    }

    const unsub = state.subscribe((s) => {
      broadcastChannel.postMessage({
        type: "SET",
        version: ++localVersion,
        value: s,
      })
    })

    broadcastChannel.postMessage({ type: "GET" })
    return () => {
      broadcastChannel.close()
      unsub()
    }
  }, [])

  return state
}
