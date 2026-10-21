import Collaboration from '@tiptap/extension-collaboration'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useEffect, useMemo, useState } from 'react'
import * as Y from 'yjs'

import { EditorToolbar } from '@/features/editor-toolbar'
import { connectBroadcastSync } from '@/shared/lib/broadcast-sync'
import { hydrateDoc, saveDocToStorage } from '@/shared/lib/ydoc-storage'

export function MemoEditor() {
  const ydoc = useMemo(() => {
    const doc = new Y.Doc()
    hydrateDoc(doc)
    return doc
  }, [])

  const [peerCount, setPeerCount] = useState(1)

  useEffect(() => {
    const sync = connectBroadcastSync(ydoc)
    const ping = new BroadcastChannel('rich-text-memo-presence')
    const tabId = crypto.randomUUID()

    ping.postMessage({ type: 'hello', tabId })
    const peers = new Set<string>([tabId])

    ping.onmessage = (event) => {
      const data = event.data as { type: string; tabId: string }
      if (data.type === 'hello') {
        peers.add(data.tabId)
        ping.postMessage({ type: 'hello', tabId })
      }
      setPeerCount(peers.size)
    }

    const persist = () => saveDocToStorage(ydoc)
    ydoc.on('update', persist)

    return () => {
      sync.destroy()
      ping.close()
      ydoc.off('update', persist)
    }
  }, [ydoc])

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        undoRedo: false,
      }),
      Collaboration.configure({
        document: ydoc,
      }),
    ],
    editorProps: {
      attributes: {
        class:
          'prose prose-invert min-h-[280px] max-w-none px-1 py-3 focus:outline-none',
      },
    },
  })

  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4">
      <div className="mb-3 flex items-center justify-between gap-2">
        <p className="text-xs text-[var(--text)]">
          Yjs sync via BroadcastChannel — open another tab to collaborate.
        </p>
        <span className="rounded-full bg-[var(--accent-bg)] px-2 py-0.5 text-xs text-[var(--text-h)]">
          {peerCount} tab{peerCount === 1 ? '' : 's'}
        </span>
      </div>
      <EditorToolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  )
}
