'use client';

import hljs from 'highlight.js';
import 'quill/dist/quill.snow.css';
import 'highlight.js/styles/github-dark.min.css';

import { useEffect } from 'react';

export default function PostContent({ contentHtml }: { contentHtml: string }) {
  useEffect(() => {
    const document = window.document.querySelectorAll('pre');
    document.forEach((block) => {
      block.classList.add('not-prose', 'rounded', 'px-4!', 'py-2!');
      hljs.highlightElement(block);
    });
  }, [contentHtml]);

  return (
    <>
      <div
        className="ql-editor !prose !max-w-full w-full"
        dangerouslySetInnerHTML={{ __html: contentHtml.replace(/&nbsp;/g, ' ') }}></div>
    </>
  );
}
