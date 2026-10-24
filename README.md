## Live demo

https://hafizovs.github.io/react-rich-text/

# Rich text

## About

Collaborative rich-text editor with TipTap and Yjs. Reloading the page restores the document from localStorage. A second tab on the same origin syncs edits live over BroadcastChannel.

## Capabilities

- TipTap editor with Yjs
- Restore from `localStorage` after reload
- Live tab-to-tab sync over BroadcastChannel

## Functionality

- Type in the editor and reload; the text restores from localStorage
- Open a second tab on the same origin and edit in either tab

Collaborative rich-text editor with TipTap, Yjs, and tab-to-tab sync over BroadcastChannel.

## Scripts

```bash
pnpm install
pnpm dev          # http://localhost:5011
pnpm check
pnpm build
```

## Manual demo

1. Type in the editor — reload the page; content restores from localStorage.
2. Open a second tab on the same origin — edits sync live via BroadcastChannel.
