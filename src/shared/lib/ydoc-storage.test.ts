import * as Y from 'yjs'
import { describe, expect, it } from 'vitest'

import {
  applyEncodedUpdate,
  encodeDocState,
  mergeDocUpdates,
} from './ydoc-storage'

describe('ydoc update helpers', () => {
  it('merges sequential updates into one doc state', () => {
    const docA = new Y.Doc()
    const textA = docA.getText('shared')
    textA.insert(0, 'hello')

    const docB = new Y.Doc()
    applyEncodedUpdate(docB, encodeDocState(docA))
    docB.getText('shared').insert(5, ' world')

    const merged = mergeDocUpdates([encodeDocState(docA), encodeDocState(docB)])

    const target = new Y.Doc()
    applyEncodedUpdate(target, merged)
    expect(target.getText('shared').toString()).toBe('hello world')
  })
})
