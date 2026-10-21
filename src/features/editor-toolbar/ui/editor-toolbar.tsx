import type { Editor } from '@tiptap/react'

import { Button } from '@/shared/ui/button'

type EditorToolbarProps = {
  editor: Editor | null
}

export function EditorToolbar({ editor }: EditorToolbarProps) {
  if (!editor) {
    return null
  }

  function toggle(
    command: () => void,
    attrs?: { active?: boolean; label: string },
  ) {
    return (
      <Button
        aria-label={attrs?.label}
        aria-pressed={attrs?.active}
        onClick={command}
        variant={attrs?.active ? 'active' : 'outline'}
      >
        {attrs?.label}
      </Button>
    )
  }

  return (
    <div className="flex flex-wrap gap-1 border-b border-[var(--border)] pb-2">
      {toggle(() => editor.chain().focus().toggleBold().run(), {
        active: editor.isActive('bold'),
        label: 'Bold',
      })}
      {toggle(() => editor.chain().focus().toggleItalic().run(), {
        active: editor.isActive('italic'),
        label: 'Italic',
      })}
      {toggle(() => editor.chain().focus().toggleHeading({ level: 2 }).run(), {
        active: editor.isActive('heading', { level: 2 }),
        label: 'H2',
      })}
      {toggle(() => editor.chain().focus().toggleBulletList().run(), {
        active: editor.isActive('bulletList'),
        label: 'List',
      })}
    </div>
  )
}
