## Live demo

https://hafizovs.github.io/react-rich-text/

# Rich text

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
