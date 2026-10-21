import * as Y from 'yjs'

const CHANNEL_NAME = 'rich-text-memo-sync'

export type BroadcastSyncHandle = {
  destroy: () => void
}

export function connectBroadcastSync(doc: Y.Doc): BroadcastSyncHandle {
  const channel = new BroadcastChannel(CHANNEL_NAME)

  const onLocalUpdate = (update: Uint8Array, origin: unknown) => {
    if (origin === 'remote') {
      return
    }
    channel.postMessage(Array.from(update))
  }

  doc.on('update', onLocalUpdate)

  channel.onmessage = (event: MessageEvent<number[]>) => {
    const update = Uint8Array.from(event.data)
    Y.applyUpdate(doc, update, 'remote')
  }

  return {
    destroy: () => {
      doc.off('update', onLocalUpdate)
      channel.close()
    },
  }
}
