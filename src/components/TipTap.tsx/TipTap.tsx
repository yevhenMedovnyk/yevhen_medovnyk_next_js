'use client';

import React, { useState, useEffect } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import { Color } from '@tiptap/extension-color';
import { TextStyle } from '@tiptap/extension-text-style';
import {
  MdFormatBold,
  MdFormatItalic,
  MdFormatListBulleted,
  MdFormatListNumbered,
  MdLink,
  MdFormatColorText,
  MdFormatAlignLeft,
  MdFormatAlignCenter,
  MdFormatAlignRight,
} from 'react-icons/md';
import { TbH1, TbH2, TbH3, TbH4 } from 'react-icons/tb';
import { PiParagraphFill } from 'react-icons/pi';
import s from './TipTap.module.scss';

interface TipTapEditorProps {
  content?: string;
  onChange?: (content: string) => void;
}

const TipTapEditor: React.FC<TipTapEditorProps> = ({ content = '', onChange }) => {
  const [color, setColor] = useState('#000000');
  const [, setVersion] = useState(0); // для перерендеру кнопок при зміні виділення

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3, 4] }, // H1-H4
      }),
      Placeholder.configure({ placeholder: 'Введіть текст...' }),
      TextStyle,
      Color,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content: content || '<p></p>',
    immediatelyRender: false,
    onUpdate: ({ editor }) => onChange?.(editor.getHTML()),
  });

  useEffect(() => {
    if (!editor) return;
    const handler = () => setVersion((v) => v + 1);
    editor.on('selectionUpdate', handler);
    editor.on('transaction', handler);
    return () => {
      editor.off('selectionUpdate', handler);
      editor.off('transaction', handler);
    };
  }, [editor]);

  if (!editor) return null;

  const activeStyle = (active: boolean) => ({ color: active ? 'blue' : 'black' });
  const applyColor = (color: string) => editor.chain().focus().setColor(color).run();
  const setLink = () => {
    const url = window.prompt('Введіть URL');
    if (url) editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  return (
    <div>
      <div className={s.toolbar}>
        {/* Форматування */}
        <button onClick={() => editor.chain().focus().toggleBold().run()} style={activeStyle(editor.isActive('bold'))}>
          <MdFormatBold />
        </button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()} style={activeStyle(editor.isActive('italic'))}>
          <MdFormatItalic />
        </button>

        {/* Списки */}
        <button onClick={() => editor.chain().focus().toggleBulletList().run()} style={activeStyle(editor.isActive('bulletList'))}>
          <MdFormatListBulleted />
        </button>
        <button onClick={() => editor.chain().focus().toggleOrderedList().run()} style={activeStyle(editor.isActive('orderedList'))}>
          <MdFormatListNumbered />
        </button>

        {/* Посилання */}
        <button onClick={setLink} style={activeStyle(editor.isActive('link'))}>
          <MdLink />
        </button>

        {/* Колір */}
        <button onClick={() => applyColor(color)}>
          <MdFormatColorText />
        </button>
        <input type="color" value={color} onChange={(e) => setColor(e.target.value)} style={{ width: 25, height: 20 }} />

        {/* Вирівнювання */}
        <button onClick={() => editor.chain().focus().setTextAlign('left').run()} style={activeStyle(editor.isActive({ textAlign: 'left' }))}>
          <MdFormatAlignLeft />
        </button>
        <button onClick={() => editor.chain().focus().setTextAlign('center').run()} style={activeStyle(editor.isActive({ textAlign: 'center' }))}>
          <MdFormatAlignCenter />
        </button>
        <button onClick={() => editor.chain().focus().setTextAlign('right').run()} style={activeStyle(editor.isActive({ textAlign: 'right' }))}>
          <MdFormatAlignRight />
        </button>

        {/* Заголовки */}
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} style={activeStyle(editor.isActive('heading', { level: 1 }))}>
          <TbH1 />
        </button>
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} style={activeStyle(editor.isActive('heading', { level: 2 }))}>
          <TbH2 />
        </button>
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} style={activeStyle(editor.isActive('heading', { level: 3 }))}>
          <TbH3 />
        </button>
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()} style={activeStyle(editor.isActive('heading', { level: 4 }))}>
          <TbH4 />
        </button>

        {/* Параграф */}
        <button onClick={() => editor.chain().focus().setParagraph().run()} style={activeStyle(editor.isActive('paragraph'))}>
          <PiParagraphFill />
        </button>
      </div>

      <EditorContent editor={editor} className={s.content} />
    </div>
  );
};

export default TipTapEditor;