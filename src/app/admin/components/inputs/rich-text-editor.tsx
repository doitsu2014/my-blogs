import React, { useRef, useEffect } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.min.css';
import '@/app/admin/components/inputs/rich-text-editor.css';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  name?: string; // Add name prop for form compatibility
  onBlur?: (event: React.FocusEvent<HTMLDivElement>) => void; // Add onBlur prop
  className?: string; // Add className prop for styling
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  name,
  onBlur,
  className
}) => {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const quillInstance = useRef<Quill | null>(null);

  useEffect(() => {
    if (editorRef.current) {
      quillInstance.current = new Quill(editorRef.current, {
        theme: 'snow',
        modules: {
          syntax: {
            hljs: hljs,
            languages: [
              { label: 'Rust', key: 'rust' },
              { label: 'YAML', key: 'yaml' }
            ]
          },
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'], // toggled buttons
            ['blockquote', 'code-block'],
            ['link', 'image', 'video', 'formula'],
            [{ header: 1 }, { header: 2 }], // custom button values
            [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
            [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
            [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
            [{ direction: 'rtl' }], // text direction
            [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ color: [] }, { background: [] }], // dropdown with defaults from theme
            [{ font: [] }],
            [{ align: [] }],
            ['clean'] // remove formatting button
          ],
          keyboard: {
            bindings: {
              bold: {
                key: 'B',
                shortKey: true,
                handler: () => {
                  const isBold = quillInstance.current?.getFormat()?.bold || false;
                  quillInstance.current?.format('bold', !isBold);
                }
              },
              codeBlock: {
                key: 'C',
                shortKey: true,
                shiftKey: true,
                handler: () => {
                  const isCodeBlock = quillInstance.current?.getFormat()?.['code-block'] || false;
                  quillInstance.current?.format('code-block', !isCodeBlock);
                }
              }
            }
          }
        }
      });

      const handleTextChange = () => {
        const html = editorRef.current?.querySelector('.ql-editor')?.innerHTML || '';
        onChange(html);
      };

      quillInstance.current.on('text-change', handleTextChange);

      return () => {
        quillInstance.current?.off('text-change', handleTextChange); // Remove event listener
        quillInstance.current = null;
      };
    }
  }, [onChange]);

  useEffect(() => {
    if (quillInstance.current && quillInstance.current.root.innerHTML !== value) {
      quillInstance.current.root.innerHTML = value;
    }
  }, [value]);

  return (
    <div
      ref={editorRef}
      className={className} // Use the className prop for styling
      data-name={name} // Add data attribute for name
      onBlur={onBlur} // Attach onBlur handler
    />
  );
};

export default RichTextEditor;
