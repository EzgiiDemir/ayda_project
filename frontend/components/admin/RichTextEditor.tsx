'use client';

import { useEffect, useRef } from 'react';
import {
    Bold, Italic, Underline, List, ListOrdered,
    Link, Image, Code, Quote, Undo, Redo
} from 'lucide-react';

interface RichTextEditorProps {
    content: string;
    onChange: (html: string) => void;
}

export default function RichTextEditor({ content, onChange }: RichTextEditorProps) {
    const editorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (editorRef.current && editorRef.current.innerHTML !== content) {
            editorRef.current.innerHTML = content;
        }
    }, [content]);

    const handleInput = () => {
        if (editorRef.current) {
            onChange(editorRef.current.innerHTML);
        }
    };

    const execCommand = (command: string, value?: string) => {
        document.execCommand(command, false, value);
        editorRef.current?.focus();
    };

    const insertLink = () => {
        const url = prompt('Enter URL:');
        if (url) {
            execCommand('createLink', url);
        }
    };

    const insertImage = () => {
        const url = prompt('Enter image URL:');
        if (url) {
            execCommand('insertImage', url);
        }
    };

    const toolbarButtons = [
        { icon: Bold, command: 'bold', title: 'Bold (Ctrl+B)' },
        { icon: Italic, command: 'italic', title: 'Italic (Ctrl+I)' },
        { icon: Underline, command: 'underline', title: 'Underline (Ctrl+U)' },
        { icon: List, command: 'insertUnorderedList', title: 'Bullet List' },
        { icon: ListOrdered, command: 'insertOrderedList', title: 'Numbered List' },
        { icon: Quote, command: 'formatBlock', value: 'blockquote', title: 'Quote' },
        { icon: Code, command: 'formatBlock', value: 'pre', title: 'Code Block' },
    ];

    return (
        <div className="border border-gray-300 rounded-lg overflow-hidden">
            {/* Toolbar */}
            <div className="bg-gray-50 border-b border-gray-300 p-2 flex flex-wrap gap-1">
                {/* Text Formatting */}
                {toolbarButtons.map((btn, idx) => (
                    <button
                        key={idx}
                        type="button"
                        onClick={() => execCommand(btn.command, btn.value)}
                        className="p-2 hover:bg-gray-200 rounded transition-colors"
                        title={btn.title}
                    >
                        <btn.icon size={18} />
                    </button>
                ))}

                <div className="w-px h-6 bg-gray-300 mx-1" />

                {/* Link & Image */}
                <button
                    type="button"
                    onClick={insertLink}
                    className="p-2 hover:bg-gray-200 rounded transition-colors"
                    title="Insert Link"
                >
                    <Link size={18} />
                </button>
                <button
                    type="button"
                    onClick={insertImage}
                    className="p-2 hover:bg-gray-200 rounded transition-colors"
                    title="Insert Image"
                >
                    <Image size={18} />
                </button>

                <div className="w-px h-6 bg-gray-300 mx-1" />

                {/* Undo/Redo */}
                <button
                    type="button"
                    onClick={() => execCommand('undo')}
                    className="p-2 hover:bg-gray-200 rounded transition-colors"
                    title="Undo (Ctrl+Z)"
                >
                    <Undo size={18} />
                </button>
                <button
                    type="button"
                    onClick={() => execCommand('redo')}
                    className="p-2 hover:bg-gray-200 rounded transition-colors"
                    title="Redo (Ctrl+Y)"
                >
                    <Redo size={18} />
                </button>

                <div className="w-px h-6 bg-gray-300 mx-1" />

                {/* Heading Dropdown */}
                <select
                    onChange={(e) => {
                        if (e.target.value) {
                            execCommand('formatBlock', e.target.value);
                            e.target.value = '';
                        }
                    }}
                    className="px-2 py-1 text-sm border border-gray-300 rounded hover:bg-gray-200"
                    defaultValue=""
                >
                    <option value="">Heading</option>
                    <option value="h1">Heading 1</option>
                    <option value="h2">Heading 2</option>
                    <option value="h3">Heading 3</option>
                    <option value="p">Paragraph</option>
                </select>
            </div>

            {/* Editor Content */}
            <div
                ref={editorRef}
                contentEditable
                onInput={handleInput}
                className="min-h-[300px] p-4 focus:outline-none prose max-w-none"
                style={{
                    wordWrap: 'break-word',
                    overflowWrap: 'break-word',
                }}
            />
        </div>
    );
}