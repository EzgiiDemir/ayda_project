'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import { TextStyleKit } from '@tiptap/extension-text-style'
import Color from '@tiptap/extension-color';
import {
    Bold,
    Italic,
    Strikethrough,
    Code,
    List,
    ListOrdered,
    Quote,
    Undo,
    Redo,
    AlignLeft,
    AlignCenter,
    AlignRight,
    Link2,
    Image as ImageIcon,
    Palette,
} from 'lucide-react';

interface RichTextEditorProps {
    content: string;
    onChange: (content: string) => void;
}

export default function RichTextEditor({ content, onChange }: RichTextEditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Link.configure({
                openOnClick: false,
            }),
            Image,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            TextStyleKit,
            Color,
        ],
        content,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: 'prose prose-sm max-w-none focus:outline-none min-h-[200px] p-4',
            },
        },
    });

    if (!editor) {
        return null;
    }

    const addLink = () => {
        const url = window.prompt('Enter URL:');
        if (url) {
            editor.chain().focus().setLink({ href: url }).run();
        }
    };

    const addImage = () => {
        const url = window.prompt('Enter image URL:');
        if (url) {
            editor.chain().focus().setImage({ src: url }).run();
        }
    };

    const setColor = () => {
        const color = window.prompt('Enter color (hex):');
        if (color) {
            editor.chain().focus().setColor(color).run();
        }
    };

    const MenuButton = ({ onClick, active, children, title }: any) => (
        <button
            type="button"
            onClick={onClick}
            className={`p-2 rounded hover:bg-gray-100 transition-colors ${
                active ? 'bg-blue-100 text-blue-600' : 'text-gray-700'
            }`}
            title={title}
        >
            {children}
        </button>
    );

    return (
        <div className="border border-gray-300 rounded-lg overflow-hidden">
            {/* Toolbar */}
            <div className="bg-gray-50 border-b border-gray-300 p-2 flex flex-wrap gap-1">
                {/* Text Formatting */}
                <MenuButton
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    active={editor.isActive('bold')}
                    title="Bold"
                >
                    <Bold size={18} />
                </MenuButton>
                <MenuButton
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    active={editor.isActive('italic')}
                    title="Italic"
                >
                    <Italic size={18} />
                </MenuButton>
                <MenuButton
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    active={editor.isActive('strike')}
                    title="Strikethrough"
                >
                    <Strikethrough size={18} />
                </MenuButton>
                <MenuButton
                    onClick={() => editor.chain().focus().toggleCode().run()}
                    active={editor.isActive('code')}
                    title="Code"
                >
                    <Code size={18} />
                </MenuButton>

                <div className="w-px h-6 bg-gray-300 mx-1" />

                {/* Headings */}
                <MenuButton
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    active={editor.isActive('heading', { level: 2 })}
                    title="Heading 2"
                >
                    <span className="font-bold text-sm">H2</span>
                </MenuButton>
                <MenuButton
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    active={editor.isActive('heading', { level: 3 })}
                    title="Heading 3"
                >
                    <span className="font-bold text-sm">H3</span>
                </MenuButton>

                <div className="w-px h-6 bg-gray-300 mx-1" />

                {/* Lists */}
                <MenuButton
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    active={editor.isActive('bulletList')}
                    title="Bullet List"
                >
                    <List size={18} />
                </MenuButton>
                <MenuButton
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    active={editor.isActive('orderedList')}
                    title="Numbered List"
                >
                    <ListOrdered size={18} />
                </MenuButton>
                <MenuButton
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    active={editor.isActive('blockquote')}
                    title="Quote"
                >
                    <Quote size={18} />
                </MenuButton>

                <div className="w-px h-6 bg-gray-300 mx-1" />

                {/* Alignment */}
                <MenuButton
                    onClick={() => editor.chain().focus().setTextAlign('left').run()}
                    active={editor.isActive({ textAlign: 'left' })}
                    title="Align Left"
                >
                    <AlignLeft size={18} />
                </MenuButton>
                <MenuButton
                    onClick={() => editor.chain().focus().setTextAlign('center').run()}
                    active={editor.isActive({ textAlign: 'center' })}
                    title="Align Center"
                >
                    <AlignCenter size={18} />
                </MenuButton>
                <MenuButton
                    onClick={() => editor.chain().focus().setTextAlign('right').run()}
                    active={editor.isActive({ textAlign: 'right' })}
                    title="Align Right"
                >
                    <AlignRight size={18} />
                </MenuButton>

                <div className="w-px h-6 bg-gray-300 mx-1" />

                {/* Insert */}
                <MenuButton onClick={addLink} active={editor.isActive('link')} title="Add Link">
                    <Link2 size={18} />
                </MenuButton>
                <MenuButton onClick={addImage} title="Add Image">
                    <ImageIcon size={18} />
                </MenuButton>
                <MenuButton onClick={setColor} title="Text Color">
                    <Palette size={18} />
                </MenuButton>

                <div className="w-px h-6 bg-gray-300 mx-1" />

                {/* Undo/Redo */}
                <MenuButton
                    onClick={() => editor.chain().focus().undo().run()}
                    disabled={!editor.can().undo()}
                    title="Undo"
                >
                    <Undo size={18} />
                </MenuButton>
                <MenuButton
                    onClick={() => editor.chain().focus().redo().run()}
                    disabled={!editor.can().redo()}
                    title="Redo"
                >
                    <Redo size={18} />
                </MenuButton>
            </div>

            {/* Editor Content */}
            <EditorContent editor={editor} className="bg-white" />
        </div>
    );
}