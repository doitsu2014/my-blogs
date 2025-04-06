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
        const textSlug = slugify(text, { lower: true, strict: true }); // Generate a slug from the text
        const id = btoa(`${textSlug}-${headerSize}`) // Generate a base64 hash of text and header size
          .replace(/=+$/, ''); // Remove padding characters

        if (id && header.id !== id) {
          header.id = id;

          // Update or create the hash link
          let hashLink = header.querySelector('a.hash-link');
          if (!hashLink) {
            hashLink = document.createElement('a');
            hashLink.classList.add('hash-link', 'text-inherit', '!no-underline', 'hover:underline');
            hashLink.innerHTML = `<span> #</span>`; // Update hash link content
            header.appendChild(hashLink); // Prepend the hash link to the header
          }
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
