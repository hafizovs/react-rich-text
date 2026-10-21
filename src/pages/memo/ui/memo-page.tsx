import { MemoEditor } from '@/widgets/memo-editor'

export function MemoPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <header className="mb-4">
        <h1 className="text-2xl font-semibold text-[var(--text-h)]">Rich text memo</h1>
        <p className="text-sm text-[var(--text)]">
          TipTap editor with toolbar, Yjs CRDT sync across tabs, and localStorage snapshots.
        </p>
      </header>
      <MemoEditor />
    </main>
  )
}
