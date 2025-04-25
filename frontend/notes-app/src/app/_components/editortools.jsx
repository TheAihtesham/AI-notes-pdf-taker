import React from 'react';
import { Bold, HighlighterIcon, Italic, Underline, Sparkle } from 'lucide-react';

const Editortools = ({ editor, onAIOpen }) => {
    return (
        <div
            className="w-full fixed top-10 left-0 sm:w-[49.9%] z-10 flex gap-2 p-2 bg-white shadow-lg"
            style={{ paddingTop: '10px', paddingBottom: '10px' }}
        >
            {editor && (
                <>
                    <button
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        className={`p-2 rounded ${editor.isActive('bold') ? 'text-blue-500' : 'text-gray-500'} hover:text-blue-500`}
                    >
                        <Bold size={20} />
                    </button>

                    <button
                        onClick={() => editor.chain().focus().toggleHighlight().run()}
                        className={`p-2 rounded ${editor.isActive('highlight') ? 'text-blue-500' : 'text-gray-500'} hover:text-blue-500`}
                    >
                        <HighlighterIcon size={20} />
                    </button>

                    <button
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        className={`p-2 rounded ${editor.isActive('italic') ? 'text-blue-500' : 'text-gray-500'} hover:text-blue-500`}
                    >
                        <Italic size={20} />
                    </button>

                    <button
                        onClick={() => editor.chain().focus().toggleUnderline().run()}
                        className={`p-2 rounded ${editor.isActive('underline') ? 'text-blue-500' : 'text-gray-500'} hover:text-blue-500`}
                    >
                        <Underline size={20} />
                    </button>
                    
                    <button
                        onClick={() => onAIOpen()}
                        className="p-2 rounded hover:text-blue-500"
                    >
                        <Sparkle size={20} />
                    </button>
                </>
            )}
        </div>
    );
};

export default Editortools;
