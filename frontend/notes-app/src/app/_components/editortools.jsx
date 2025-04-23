import React from 'react'
import { Bold, Heading1, Heading2, Heading3, HighlighterIcon, Italic, Underline } from 'lucide-react'

const Editortools = ({ editor }) => {
    return (
        <div className="flex gap-2 p-2 ">
            {editor && (
                <>
                    <button
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        className={`p-2 rounded ${editor.isActive('bold') ? 'text-blue-500' : ''
                            }`}
                    >
                        <Bold size={20} />
                    </button>

                    <button
                        onClick={() => editor.chain().focus().toggleHighlight().run()}
                        className={`p-2 rounded ${editor.isActive('highlight') ? 'text-blue-500' : ''
                            }`}
                    >
                        <HighlighterIcon size={20} />
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        className={`p-2 rounded${editor.isActive('italic') ? 'text-blue-500' : ''}`}
                    >
                        <Italic size={20} />
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleUnderline().run()}
                        className={`p-2 rounded${editor.isActive('underline') ? 'text-blue-500' : ''}`}
                    >
                        <Underline size={20} />
                    </button>
                   
                </>
            )}
        </div>
    )
}

export default Editortools
