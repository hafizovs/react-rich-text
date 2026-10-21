# 11 Rich text memo

**Live:** https://hafizovs.github.io/react-rich-text/

Collaborative rich-text editor with TipTap, Yjs, and tab-to-tab sync over BroadcastChannel.

## Stack

- Vite, TipTap StarterKit, `@tiptap/extension-collaboration`, Yjs
- Document snapshots in `localStorage`


## How to run

```bash
# from portfolio_react/
pnpm install
pnpm dev
```

Open **http://localhost:5011**

See also [docs/RUNBOOK.md](../docs/RUNBOOK.md).

## Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Port **5011** (strict) |
| `pnpm check` | Typecheck, Vitest, oxlint |

## Manual check

1. Type in the editor — reload the page; content restores from localStorage.
2. Open a second tab on the same origin — edits sync live via BroadcastChannel.
