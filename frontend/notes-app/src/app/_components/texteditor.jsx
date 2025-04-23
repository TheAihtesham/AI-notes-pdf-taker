'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Highlight from '@tiptap/extension-highlight'
import Editortools from './editortools'
import Underline from '@tiptap/extension-underline'


const Tiptap = () => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Highlight,
            Underline

        ],
        content: '<p>Hello World! 🌎️</p>',
        editorProps: {
            attributes: {
                class: 'focus:outline-none h-screen'
            }
        },
        immediatelyRender: false,
    })

    return (
        <div>
            <Editortools editor={editor}/>
            <div>
                <EditorContent editor={editor} />
            </div>
        </div>
    )
}

export default Tiptap
