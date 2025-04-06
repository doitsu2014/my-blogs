import { hash } from 'crypto';
import { link } from 'fs';
import Quill from 'quill';
import slugify from 'slugify';

export function HeaderHashLink(quill: Quill, options: any) {
  function handleTextChange() {
    const editor = quill.root;
    const headers = editor.querySelectorAll('h1, h2, h3, h4, h5, h6');
    headers.forEach((header) => {
      const text = (header.textContent || '').trim();
      if (text) {
        const headerSize = header.tagName.toLowerCase(); // Get header size (e.g., h1, h2)
        const id = slugify(`${headerSize} ${text}`, { lower: true, strict: true }); // Generate a slug from the text

        if (id && header.id !== id) {
          header.id = id;

          // Update or create the hash link
          let hashLink = Array.from(header.querySelectorAll('a')).filter((a) =>
            a.innerHTML.includes('#')
          )[0];
          if (!hashLink) {
            hashLink = document.createElement('a');
            hashLink.innerHTML = `<span> #</span>`; // Update hash link content
            header.appendChild(hashLink); // Prepend the hash link to the header
          }
          hashLink.classList.add('hash-link', 'text-inherit', '!no-underline', 'hover:underline');
          hashLink.setAttribute('href', `#${id}`);
        }

        // Add hover and click styles to the header
        header.classList.add('cursor-pointer', 'relative', 'hover:underline');
        header.addEventListener('click', () => {
          window.location.hash = `#${id}`;
        });
      }
    });
  }

  quill.on(Quill.events.TEXT_CHANGE, handleTextChange);
}