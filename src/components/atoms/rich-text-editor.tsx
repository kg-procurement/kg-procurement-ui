import 'ckeditor5/ckeditor5.css'

import { CKEditor, CKEditorContext } from '@ckeditor/ckeditor5-react'
import { Alignment, Bold, ClassicEditor, Context, ContextWatchdog, Essentials, Italic, Link, List, Paragraph, Underline } from 'ckeditor5'

interface RichTextEditorProps {
  content: string
  setContent: (content: string) => void
}

export function RichTextEditor({ content, setContent }: RichTextEditorProps) {
  return (
    <div className="rich-text-editor-container" data-testid="rich-text-editor">
      <CKEditorContext
        context={Context}
        contextWatchdog={ContextWatchdog}
      >
        <div className="editor-wrapper" data-testid="email-editor">
          <CKEditor
            editor={ClassicEditor}
            config={{
              plugins: [Essentials, Bold, Italic, Underline, Link, List, Paragraph, Alignment], // Added email-like features
              toolbar: ['undo', 'redo', '|', 'bold', 'italic', 'underline', '|', 'bulletedList', 'numberedList', 'alignment', '|', 'link'],
            }}
            data={content}
            onChange={(_, editor) => {
              const data = editor.getData()
              setContent(data)
            }}
            onReady={(editor) => {
              console.log('Email editor is ready to use!', editor)
            }}
          />
        </div>
      </CKEditorContext>
    </div>
  )
}

RichTextEditor.displayName = 'RichTextEditor'
