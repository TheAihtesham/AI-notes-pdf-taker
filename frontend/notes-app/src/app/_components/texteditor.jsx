'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Highlight from '@tiptap/extension-highlight'
import Editortools from './editortools'
import Underline from '@tiptap/extension-underline'
import Placeholder from '@tiptap/extension-placeholder'


const Tiptap = ({ pdfId }) => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Highlight,
            Underline,
            Placeholder.configure({
                placeholder:'Start Taking notes...'
            })
        ],
    
        editorProps: {
            attributes: {
                class: 'focus:outline-none h-screen pt-16' 
            }
        },
        immediatelyRender: false,
    })

    const onAIOpen = async () => {
        const selectedText = editor.state.doc.textBetween(
            editor.state.selection.from,
            editor.state.selection.to,
            ' '
        )
        console.log('Selected Text:', selectedText)

        if (!selectedText.trim()) {
            alert('Please select text to get an answer from AI');
            return;
        }

        try {
            const askAi = await fetch(`http://localhost:5000/pdf/ask/${pdfId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ question: selectedText })
            });

            const res = await askAi.json();
            if (res) {
                console.log('AI Response:', res);

                const newContent = `<b>${selectedText}</b><div style="margin-top: 15px;"><strong>AI Response:</strong><br>${res.answer}</div>`;

                editor.chain().focus().insertContent(newContent).run();
            } else {
                alert('No response from Gemini');
            }
        } catch (err) {
            console.error('Error:', err);
            alert('Something went wrong from the backend side');
        }
    }

    return (
        <div className="relative">
            <Editortools editor={editor} onAIOpen={onAIOpen} />
            <div>
                <EditorContent editor={editor} />
            </div>
        </div>
    )
}

export default Tiptap
