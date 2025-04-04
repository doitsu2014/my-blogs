'use client';

import React, { useEffect, useLayoutEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.min.css';
import '@/app/admin/components/inputs/rich-text-editor.css';
import QuillToggleFullscreenButton from 'quill-toggle-fullscreen-button';
import htmlEditButton from 'quill-html-edit-button';
import QuillResizeImage from 'quill-resize-image';

Quill.register('modules/htmlEditButton', htmlEditButton);
Quill.register('modules/toggleFullscreen', QuillToggleFullscreenButton);
Quill.register('modules/resize', QuillResizeImage);

interface RichTextEditorProps {
  id?: string; // Optional id prop for the container
  readOnly?: boolean;
  defaultValue?: string; // Keep value prop for controlled behavior
  onTextChange?: (...args: any[]) => void;
  onSelectionChange?: (...args: any[]) => void;
  className?: string; // Add className prop for styling
}

// Editor is an uncontrolled React component
const RichTextEditor: React.FC<RichTextEditorProps> = ({
  id,
  readOnly,
  defaultValue, // Destructure value prop
  onTextChange,
  onSelectionChange,
  className
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const editorRef = useRef<Quill | null>(null);
  const onTextChangeRef = useRef(onTextChange);
  const onSelectionChangeRef = useRef(onSelectionChange);

  useLayoutEffect(() => {
    onTextChangeRef.current = onTextChange ?? (() => {});
    onSelectionChangeRef.current = onSelectionChange ?? (() => {});
  });

  useEffect(() => {
    if (readOnly !== undefined) {
      editorRef.current?.enable(!readOnly);
    }
  }, [readOnly]);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.root.innerHTML = defaultValue || ''; // Update the editor's content for value
    }
  }, [defaultValue]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Clear any existing content in the container to avoid conflicts
    container.innerHTML = '';

    // Create a unique editor container
    const editorContainer = document.createElement('div');
    container.appendChild(editorContainer);

    const quill = new Quill(editorContainer, {
      theme: 'snow',
      modules: {
        resize: {
          locale: {}
        },
        toggleFullscreen: {
          buttonTitle: 'Toggle fullscreen',
          buttonHTML: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">
            <polyline class="ql-even ql-stroke" points="12 3 15 3 15 6" />
            <polyline class="ql-even ql-stroke" points="6 15 3 15 3 12" />
            <polyline class="ql-even ql-stroke" points="12 15 15 15 15 12" />
            <polyline class="ql-even ql-stroke" points="6 3 3 3 3 6" />
          </svg>`
        },
        htmlEditButton: {
          debug: false, // logging, default:false
          msg: 'Edit the content in HTML format', //Custom message to display in the editor, default: Edit HTML here, when you click "OK" the quill editor's contents will be replaced
          okText: 'Ok', // Text to display in the OK button, default: Ok,
          cancelText: 'Cancel', // Text to display in the cancel button, default: Cancel
          buttonHTML: '&lt;&gt;', // Text to display in the toolbar button, default: <>
          buttonTitle: 'Show HTML source', // Text to display as the tooltip for the toolbar button, default: Show HTML source
          syntax: true, // Show the HTML with syntax highlighting. Requires highlightjs on window.hljs (similar to Quill itself), default: false
          prependSelector: 'div#myelement', // a string used to select where you want to insert the overlayContainer, default: null (appends to body),
          editorModules: {
            syntax: {
              hljs: hljs
            }
          } // The default mod
        },
        syntax: {
          hljs: hljs,
          languages: [
            { label: 'Rust', key: 'rust' },
            { label: 'YAML', key: 'yaml' }
          ]
        },
        clipboard: {
          matchVisual: false // Ensures \n is not added during copy/paste
        },
        toolbar: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [{ align: ['center', 'right', 'justify'] }],
          ['bold', 'italic', 'underline', 'strike'], // toggled buttons
          [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
          ['blockquote', 'code-block'],
          ['link', 'image', 'video', 'formula'],
          [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
          ['clean'] // remove formatting button

          // [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
          // [{ direction: 'rtl' }], // text direction
          // [{ color: [] }, { background: [] }], // dropdown with defaults from theme
          // [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
        ]
      }
      // formats: [
      //   'image',
      // ],
    });

    // Handlers can also be added post initialization
    const toolbar: any = quill.getModule('toolbar');
    toolbar.addHandler('image', handleImageUpload);

    editorRef.current = quill;

    quill.on(Quill.events.TEXT_CHANGE, (...args) => {
      const finalText = quill.root.innerHTML; // Collect final text content
      onTextChangeRef.current?.(finalText);
    });

    quill.on(Quill.events.SELECTION_CHANGE, (...args) => {
      onSelectionChangeRef.current?.(...args);
    });

    return () => {
      // Cleanup editor instance and container
      editorRef.current = null;
      container.innerHTML = '';
    };
  }, []);

  const handleImageUpload = () => {
    const quill = editorRef.current;

    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.onchange = async () => {
      const file = input.files?.[0];
      if (file) {
        const formData = new FormData();
        formData.append('image', file);

        try {
          const response = await fetch('/api/admin/media/images', {
            method: 'POST',
            body: formData
          });

          if (!response.ok) {
            throw new Error('Image upload failed');
          }

          const json = await response.json();
          const range = quill?.getSelection();
          quill?.insertEmbed(range?.index || 0, 'image', json.data.imgproxy_url);
        } catch (error) {
          console.error('Error uploading image:', error);
        }
      }
    };
    input.click();
  };

  return <div id={id} ref={containerRef} className={className}></div>;
};

export default RichTextEditor;
