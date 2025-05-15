'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Highlight from '@tiptap/extension-highlight'
import Underline from '@tiptap/extension-underline'
import Placeholder from '@tiptap/extension-placeholder'
import { useEffect, useRef } from 'react'
import Editortools from './editortools'
import { useSession } from 'next-auth/react'

const Tiptap = ({ pdfId, userId }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Highlight,
      Underline,
      Placeholder.configure({
        placeholder: 'Start Taking notes...'
      })
    ],
    editorProps: {
      attributes: {
        class: 'focus:outline-none h-screen pt-16'
      }
    }
  })

  const saveTimeout = useRef(null);
  const { data: session } = useSession()

  // Fetch existing note
  useEffect(() => {
    const fetchNote = async () => {
      if (!session?.accessToken) {
        console.error('No token available');
        return;
      }

      try {
        const res = await fetch(`http://localhost:5000/pdf/note/get/${pdfId}`, {
          headers: {
            'Authorization': `Bearer ${session.accessToken}`
          }
        });
        
        if (res.ok) {
          const data = await res.json();
          if (data.content && editor) {
            editor.commands.setContent(data.content);
          }
        } else {
          console.error('Failed to fetch note:', res.statusText);
        }
      } catch (err) {
        console.error('Failed to load note:', err);
      }
    }

    if (editor && session?.accessToken && pdfId) {
      fetchNote();
    }
  }, [editor, pdfId, session?.accessToken]); 

  // Auto-save note functionality 
  useEffect(() => {
    if (!editor) return;

    const saveNote = async () => {
      const content = editor.getJSON();
      try {
         await fetch(`http://localhost:5000/pdf/note/save/${pdfId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session?.accessToken}`
          },
          body: JSON.stringify({ pdfId, content })
        });
      } catch (err) {
        console.error('Failed to save note:', err);
      }
    }

    const handleUpdate = () => {
      if (saveTimeout.current) clearTimeout(saveTimeout.current);
      saveTimeout.current = setTimeout(saveNote, 1000); 
    }

    editor.on('update', handleUpdate);

    return () => {
      editor.off('update', handleUpdate);
      clearTimeout(saveTimeout.current);
    }
  }, [editor, pdfId, userId]);

  const onAIOpen = async () => {
    const selectedText = editor.state.doc.textBetween(
      editor.state.selection.from,
      editor.state.selection.to,
      ' '
    );
  
    if (!selectedText.trim()) {
      alert('Please select text to get an answer from AI');
      return;
    }
  
    try {
      const askAi = await fetch(`http://localhost:5000/pdf/ask/${pdfId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.accessToken}`
        },
        body: JSON.stringify({ question: selectedText })
      });
  
      const res = await askAi.json();
  
      if (res?.answer) {
        const structuredContent = [
          {
            type: 'paragraph',
            content: [
              { type: 'text', text: selectedText, marks: [{ type: 'bold' }] }
            ]
          },
          {
            type: 'paragraph',
            content: [
              { type: 'text', text: 'AI Response:', marks: [{ type: 'bold' }] }
            ]
          },
          ...res.answer
            .split('\n')
            .filter(line => line.trim() !== '')
            .map(line => ({
              type: 'paragraph',
              content: [{ type: 'text', text: line }]
            }))
        ];
  
        editor.chain().focus().insertContent(structuredContent).run();
      } else {
        alert('No response from Gemini');
      }
    } catch (err) {
      console.error('Error:', err);
      alert('Something went wrong from the backend side');
    }
  };

  return (
    <div className="relative">
      <Editortools editor={editor} onAIOpen={onAIOpen} />
      <EditorContent editor={editor} />
    </div>
  )
}

export default Tiptap;
