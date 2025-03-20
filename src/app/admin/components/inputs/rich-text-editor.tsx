'use client';

import React, { useEffect, useLayoutEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.min.css';
import '@/app/admin/components/inputs/rich-text-editor.css';
import QuillToggleFullscreenButton from 'quill-toggle-fullscreen-button';
import htmlEditButton from 'quill-html-edit-button';

const FontAttributor: any = Quill.import('attributors/class/font');
FontAttributor.whitelist = ['roboto'];
Quill.register(FontAttributor, true);
Quill.register('modules/htmlEditButton', htmlEditButton);
Quill.register('modules/toggleFullscreen', QuillToggleFullscreenButton);

interface RichTextEditorProps {
  readOnly: boolean;
  defaultValue: any;
  onTextChange: (...args: any[]) => void;
  onSelectionChange: (...args: any[]) => void;
  className?: string; // Add className prop for styling
}

// Editor is an uncontrolled React component
const RichTextEditor: React.FC<RichTextEditorProps> = ({
  readOnly,
  defaultValue,
  onTextChange,
  onSelectionChange,
  className
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const editorRef = useRef<Quill | null>(null);
  const defaultValueRef = useRef(defaultValue);
  const onTextChangeRef = useRef(onTextChange);
  const onSelectionChangeRef = useRef(onSelectionChange);

  useLayoutEffect(() => {
    onTextChangeRef.current = onTextChange;
    onSelectionChangeRef.current = onSelectionChange;
  });

  useEffect(() => {
    editorRef.current?.enable(!readOnly);
  }, [readOnly]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const editorContainer = container.appendChild(container.ownerDocument.createElement('div'));

    const quill = new Quill(editorContainer, {
      theme: 'snow',
      modules: {
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
        ]
      }
    });

    // Add TailwindCSS typography styles to the editor
    const editorElement = editorContainer.querySelector('.ql-editor');
    if (editorElement) {
      editorElement.classList.add('prose', 'prose-sm', 'sm:prose-base', 'lg:prose-lg');
    }

    editorRef.current = quill;

    if (defaultValueRef.current) {
      quill.setContents(defaultValueRef.current);
    }

    quill.on(Quill.events.TEXT_CHANGE, (...args) => {
      onTextChangeRef.current?.(...args);
    });

    quill.on(Quill.events.SELECTION_CHANGE, (...args) => {
      onSelectionChangeRef.current?.(...args);
    });

    return () => {
      editorRef.current = null;
      container.innerHTML = '';
    };
  }, []);

  return <div ref={containerRef} className={className}></div>;
};

export default RichTextEditor;
