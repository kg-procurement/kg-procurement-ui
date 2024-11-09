import 'ckeditor5/ckeditor5.css'

import { CKEditor, CKEditorContext } from '@ckeditor/ckeditor5-react'
import { useState } from 'react'

import { useHydrated } from '@/utils/common.ts'

interface RichTextEditorProps {
  content: string
  setContent: (content: string) => void
}

export function RichTextEditor({
  content,
  setContent,
}: Readonly<RichTextEditorProps>) {
  const hydrated = useHydrated()
  const [ckeditor, setCkeditor] = useState<
    typeof import('ckeditor5') | undefined
  >(undefined)

  if (!hydrated) {
    return 'Loading ...'
  }

  // This looks weird, but all its doing is importing ckeditor only when it is rendered in the client-side
  import('ckeditor5').then(mod => setCkeditor(mod))

  return (
    <div className="rich-text-editor-container" data-testid="rich-text-editor">
      {ckeditor && (
        <CKEditorContext
          context={ckeditor.Context}
          contextWatchdog={ckeditor.ContextWatchdog}
        >
          <div className="editor-wrapper" data-testid="email-editor">
            <CKEditor
              editor={ckeditor.ClassicEditor}
              config={{
                placeholder: 'Type here...',
                plugins: [
                  ckeditor.Essentials,
                  ckeditor.Bold,
                  ckeditor.Italic,
                  ckeditor.Underline,
                  ckeditor.Link,
                  ckeditor.List,
                  ckeditor.Paragraph,
                  ckeditor.Alignment,
                ], // Added email-like features
                toolbar: [
                  'undo',
                  'redo',
                  '|',
                  'bold',
                  'italic',
                  'underline',
                  '|',
                  'bulletedList',
                  'numberedList',
                  'alignment',
                  '|',
                  'link',
                ],
              }}
              data={content}
              onChange={(_, editor) => {
                const data = editor.getData()
                setContent(data)
              }}
            />
          </div>
        </CKEditorContext>
      )}
    </div>
  )
}

RichTextEditor.displayName = 'RichTextEditor'
