import React, { useRef, useEffect } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  name?: string; // Add name prop for form compatibility
  onBlur?: (event: React.FocusEvent<HTMLDivElement>) => void; // Add onBlur prop
  className?: string; // Add className prop for styling
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange, name, onBlur, className }) => {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const quillInstance = useRef<Quill | null>(null);

  useEffect(() => {
    if (editorRef.current) {
      quillInstance.current = new Quill(editorRef.current, {
        theme: 'snow',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'], // Formatting options
            [{ list: 'ordered' }, { list: 'bullet' }], // Lists
            ['link', 'image'], // Links and images
            [{ header: [1, 2, 3, false] }], // Headers
            [{ align: [] }], // Alignment
            ['clean'], // Remove formatting
          ],
        },
      });

      quillInstance.current.on('text-change', () => {
        const html = editorRef.current?.querySelector('.ql-editor')?.innerHTML || '';
        onChange(html);
      });
    }

    return () => {
      quillInstance.current = null;
    };
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
