import React, { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';

const TipTapEditor = ({ value, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value]);

  if (!editor) return null;

  const buttonClass = (active) =>
    `px-2 py-1 rounded text-sm ${
      active ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
    }`;

  return (
    <div className="border rounded bg-white">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center border-b p-2 gap-2">
        <button onClick={() => editor.chain().focus().undo().run()} className={buttonClass(false)}>↺ Undo</button>
        <button onClick={() => editor.chain().focus().redo().run()} className={buttonClass(false)}>↻ Redo</button>

        <button onClick={() => editor.chain().focus().toggleBold().run()} className={buttonClass(editor.isActive('bold'))}>B</button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()} className={buttonClass(editor.isActive('italic'))}>I</button>
        <button onClick={() => editor.chain().focus().toggleUnderline().run()} className={buttonClass(editor.isActive('underline'))}>U</button>

        <button onClick={() => editor.chain().focus().setParagraph().run()} className={buttonClass(editor.isActive('paragraph'))}>¶</button>

        {[1, 2, 3, 4, 5, 6].map((level) => (
          <button
            key={level}
            onClick={() => editor.chain().focus().setHeading({ level }).run()}
            className={buttonClass(editor.isActive('heading', { level }))}
          >
            H{level}
          </button>
        ))}

        <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={buttonClass(editor.isActive('bulletList'))}>• List</button>
        <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className={buttonClass(editor.isActive('orderedList'))}>1. List</button>
        <button onClick={() => editor.chain().focus().toggleBlockquote().run()} className={buttonClass(editor.isActive('blockquote'))}>❝ Quote</button>
        <button onClick={() => editor.chain().focus().toggleCodeBlock().run()} className={buttonClass(editor.isActive('codeBlock'))}>⎇ Code</button>
        <button onClick={() => editor.chain().focus().setHorizontalRule().run()} className={buttonClass(false)}>― HR</button>

        <button onClick={() => editor.chain().focus().setTextAlign('left').run()} className={buttonClass(editor.isActive({ textAlign: 'left' }))}>⯇</button>
        <button onClick={() => editor.chain().focus().setTextAlign('center').run()} className={buttonClass(editor.isActive({ textAlign: 'center' }))}>≡</button>
        <button onClick={() => editor.chain().focus().setTextAlign('right').run()} className={buttonClass(editor.isActive({ textAlign: 'right' }))}>⯈</button>
        <button onClick={() => editor.chain().focus().setTextAlign('justify').run()} className={buttonClass(editor.isActive({ textAlign: 'justify' }))}>☰</button>
      </div>

      {/* Editor */}
      <div className="p-2 min-h-[200px]">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default TipTapEditor;
