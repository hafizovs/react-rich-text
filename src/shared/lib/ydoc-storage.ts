import * as Y from 'yjs'

export const DOC_STORAGE_KEY = 'rich-text-memo-ydoc'

export function encodeDocState(doc: Y.Doc): Uint8Array {
  return Y.encodeStateAsUpdate(doc)
}

export function applyEncodedUpdate(doc: Y.Doc, update: Uint8Array): void {
  Y.applyUpdate(doc, update)
}

export function mergeDocUpdates(updates: Uint8Array[]): Uint8Array {
  const doc = new Y.Doc()
  for (const update of updates) {
    applyEncodedUpdate(doc, update)
  }
  return encodeDocState(doc)
}

export function loadDocFromStorage(key = DOC_STORAGE_KEY): Uint8Array | null {
  const raw = localStorage.getItem(key)
  if (!raw) {
    return null
  }
  const binary = Uint8Array.from(atob(raw), (char) => char.charCodeAt(0))
  return binary
}

export function saveDocToStorage(doc: Y.Doc, key = DOC_STORAGE_KEY): void {
  const encoded = encodeDocState(doc)
  const base64 = btoa(String.fromCharCode(...encoded))
  localStorage.setItem(key, base64)
}

export function hydrateDoc(doc: Y.Doc, key = DOC_STORAGE_KEY): void {
  const snapshot = loadDocFromStorage(key)
  if (snapshot) {
    applyEncodedUpdate(doc, snapshot)
  }
}
