// html.test.ts
import { describe, expect, it } from 'vitest';
import { html } from '@/core/html';

describe('html function', () => {
  it('should handle strings only', () => {
    const fragment = html`<div>Hello World</div>`;
    const div = fragment.querySelector('div');

    expect(div).not.toBeNull();
    expect(div?.textContent).toBe('Hello World');
  });

  it('should handle numbers', () => {
    const number = 42;
    const fragment = html`<div>${number}</div>`;
    const div = fragment.querySelector('div');
    expect(div).not.toBeNull();
    expect(div?.textContent).toBe('42');
  });

  it('should handle HTMLElements', () => {
    const span = document.createElement('span');
    span.textContent = 'Hello';

    const fragment = html`<div>${span}</div>`;
    const div = fragment.querySelector('div');
    expect(div).not.toBeNull();

    const childSpan = div?.querySelector('span');
    expect(childSpan).not.toBeNull();
    expect(childSpan?.textContent).toBe('Hello');
    expect(childSpan).toBe(span);
  });

  it('should handle multiple HTMLElements', () => {
    const span1 = document.createElement('span');
    span1.textContent = 'Hello';

    const span2 = document.createElement('span');
    span2.textContent = 'World';

    const fragment = html`<div>${span1} ${span2}</div>`;
    const div = fragment.querySelector('div');
    expect(div).not.toBeNull();

    const spans = div?.querySelectorAll('span');
    expect(spans).toHaveLength(2);
    expect(spans?.[0].textContent).toBe('Hello');
    expect(spans?.[1].textContent).toBe('World');
  });

  it('should handle nested HTMLElements', () => {
    const span = document.createElement('span');
    span.textContent = 'Nested';

    const divInner = document.createElement('div');
    divInner.appendChild(span);

    const fragment = html`<div>${divInner}</div>`;
    const div = fragment.querySelector('div');
    expect(div).not.toBeNull();

    const innerDiv = div?.querySelector('div');
    expect(innerDiv).not.toBeNull();

    const innerSpan = innerDiv?.querySelector('span');
    expect(innerSpan).not.toBeNull();
    expect(innerSpan?.textContent).toBe('Nested');
  });

  it('should handle strings and HTMLElements mixed', () => {
    const span = document.createElement('span');
    span.textContent = 'World';

    const fragment = html`<div>Hello ${span}</div>`;
    const div = fragment.querySelector('div');
    expect(div).not.toBeNull();

    expect(div?.childNodes.length).toBe(2);
    expect(div?.childNodes[0].nodeType).toBe(Node.TEXT_NODE);
    expect(div?.childNodes[0].textContent).toBe('Hello ');

    expect(div?.childNodes[1]).toBe(span);
  });

  it('should handle empty strings', () => {
    const fragment = html``;
    expect(fragment.childNodes.length).toBe(0);
  });

  it('should handle multiple elements', () => {
    const fragment = html`<div>First</div>
      <div>Second</div>`;
    const divs = fragment.querySelectorAll('div');
    expect(divs).toHaveLength(2);
    expect(divs[0].textContent).toBe('First');
    expect(divs[1].textContent).toBe('Second');
  });

  it('should handle attributes with placeholders', () => {
    const className = 'my-class';
    const fragment = html`<div class="${className}">Content</div>`;
    const div = fragment.querySelector('div');
    expect(div).not.toBeNull();
    expect(div?.getAttribute('class')).toBe('my-class');
    expect(div?.textContent).toBe('Content');
  });

  it('should handle nested placeholders', () => {
    const span = document.createElement('span');
    span.textContent = 'inner';

    const fragment = html`<div><p>${span}</p></div>`;
    const spanInFragment = fragment.querySelector('span');
    expect(spanInFragment).not.toBeNull();
    expect(spanInFragment?.textContent).toBe('inner');
  });

  //? do we even want to worry about boolean values
  // it('should handle boolean values', () => {
  //   const fragment = html`<div>${true}</div>
  //     <div>${false}</div>`;
  //   const divs = fragment.querySelectorAll('div');
  //   expect(divs).toHaveLength(2);
  //   expect(divs[0].textContent).toBe('true');
  //   expect(divs[1].textContent).toBe('false');
  // });

  it('should handle comments properly', () => {
    const fragment = html`<div><!-- a comment --></div>`;
    const div = fragment.querySelector('div');
    expect(div).not.toBeNull();

    const comments = [];
    const iterator = document.createNodeIterator(div as Node, NodeFilter.SHOW_COMMENT);
    let node;
    while ((node = iterator.nextNode())) {
      comments.push(node);
    }

    expect(comments.length).toBe(1);
    expect((comments[0] as Comment).data.trim()).toBe('a comment');
  });

  it('should replace null and undefined values with empty string', () => {
    const fragment = html`<div>${null}</div>
      <div>${undefined}</div>`;
    const divs = fragment.querySelectorAll('div');
    expect(divs).toHaveLength(2);
    expect(divs[0].textContent).toBe('');
    expect(divs[1].textContent).toBe('');
  });
});
