// Handle Other Node Types
// Currently, the html function only checks for HTMLElement instances.
// There are other node types like Text, Comment, DocumentFragment, SVGElement
// Solution:
// Modify the type check to include all Node instances:
// if (value instanceof Node) {
//   htmlParts.push(`<!--__placeholder_${i}__-->`);
//   placeholders.set(i, value);
// } else {
//   htmlParts.push(escapeHTML(String(value)));
// }

//TODO: do no allow null or undefined to get printed
function html(strings: TemplateStringsArray, ...values: any[]): DocumentFragment {
  const placeholders = new Map<number, HTMLElement>();
  const htmlParts: string[] = [];

  for (let i = 0; i < strings.length; i++) {
    htmlParts.push(strings[i]);

    if (i < values.length) {
      const value = values[i];

      if (value instanceof HTMLElement) {
        htmlParts.push(`<!--__placeholder_${i}__-->`);
        placeholders.set(i, value);
      } else {
        htmlParts.push(String(value));
      }
    }
  }

  const template = document.createElement('template');
  template.innerHTML = htmlParts.join('').trim();

  if (placeholders.size > 0) {
    const walker = document.createTreeWalker(
      template.content,
      NodeFilter.SHOW_COMMENT,
      null,
    );

    const comments = [];
    let comment = null;

    while ((comment = walker.nextNode() as Comment | null)) {
      comments.push(comment);
    }

    for (const comment of comments) {
      const match = /__placeholder_(\d+)__/.exec(comment.data);
      if (match) {
        const index = parseInt(match[1], 10);
        const placeholder = placeholders.get(index);
        if (placeholder) {
          comment.parentNode?.replaceChild(placeholder, comment);
        }
      }
    }
  }

  return template.content;
}

function withRefs<T extends Record<string, HTMLElement>>(
  ele: DocumentFragment,
): {
  ele: DocumentFragment;
  refs: T;
} {
  const refs = {} as T;
  const refElements = ele.querySelectorAll('[ref]');

  refElements.forEach(el => {
    const refValue = el.getAttribute('ref')!;
    (refs as Record<string, HTMLElement>)[refValue] = el as HTMLElement;
    el.removeAttribute('ref');
  });

  return {
    ele,
    refs,
  };
}

export { html, withRefs };
