'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Bold, Italic, List, ListOrdered, Heading2, Heading3, Type } from 'lucide-react'

interface RichTextEditorProps {
  content: string
  onChange: (content: string) => void
}

export default function RichTextEditor({ content, onChange }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: 'prose dark:prose-invert max-w-none focus:outline-none min-h-[200px] text-[17px] p-4 bg-background rounded-[14px]',
      },
    },
  })

  if (!editor) return null

  const MenuButton = ({ onClick, isActive, children, label }: any) => (
    <button
      type="button"
      onClick={onClick}
      className={`p-2 rounded-lg transition-all active:scale-90 ${
        isActive ? 'bg-primary text-primary-foreground ios-shadow' : 'text-muted-foreground hover:bg-secondary'
      }`}
      aria-label={label}
    >
      {children}
    </button>
  )

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center gap-1 p-2 bg-secondary/30 rounded-[18px] border border-border/40 backdrop-blur-sm sticky top-0 z-10">
        <MenuButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive('bold')}
          label="Bold"
        >
          <Bold className="h-4 w-4" />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive('italic')}
          label="Italic"
        >
          <Italic className="h-4 w-4" />
        </MenuButton>
        <div className="w-px h-6 bg-border mx-1" />
        <MenuButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          isActive={editor.isActive('heading', { level: 2 })}
          label="H2"
        >
          <Heading2 className="h-4 w-4" />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          isActive={editor.isActive('heading', { level: 3 })}
          label="H3"
        >
          <Heading3 className="h-4 w-4" />
        </MenuButton>
        <div className="w-px h-6 bg-border mx-1" />
        <MenuButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive('bulletList')}
          label="Bullet List"
        >
          <List className="h-4 w-4" />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive('orderedList')}
          label="Ordered List"
        >
          <ListOrdered className="h-4 w-4" />
        </MenuButton>
        <div className="w-px h-6 bg-border mx-1" />
        <MenuButton
          onClick={() => editor.chain().focus().clearNodes().run()}
          label="Clear formatting"
        >
          <Type className="h-4 w-4" />
        </MenuButton>
      </div>
      <div className="bg-card rounded-[20px] ios-shadow border border-border/40 overflow-hidden">
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}
