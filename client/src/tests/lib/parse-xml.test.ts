import { describe, it, expect } from 'vitest';
import { parseXml } from '@/shared/lib/parse-xml'; // ← adjust path as needed
import { CustomError } from '@/shared/util/custom-error'; // ← adjust path as needed

describe('parseXml', () => {
  const validXml = `
    <results>
      <permissions>
        <window_name>Token</window_name>
        <permission>Token</permission>
        <special_data>848f067f26e4cccf4ada09f5f9cf6014</special_data>
      </permissions>
    </results>
  `.trim();

  it('parses a well-formed XML string into an XMLDocument', () => {
    const xmlDoc = parseXml(validXml);
    expect(xmlDoc).toBeInstanceOf(XMLDocument);

    const getText = (tag: string) => xmlDoc.getElementsByTagName(tag)[0]?.textContent;

    expect(getText('window_name')).toBe('Token');
    expect(getText('permission')).toBe('Token');
    expect(getText('special_data')).toBe('848f067f26e4cccf4ada09f5f9cf6014');
  });

  it('strips out all "@" characters before parsing', () => {
    const xmlWithAts = '@<root>@<foo>@bar@</foo>@</root>@';
    const xmlDoc = parseXml(xmlWithAts);
    expect(xmlDoc.getElementsByTagName('foo')[0].textContent).toBe('bar');
  });

  it('throws a CustomError when the XML is invalid', () => {
    const badXml = '<results><unclosedTag></results>';
    expect(() => parseXml(badXml)).toThrow(CustomError);
    expect(() => parseXml(badXml)).toThrow('XML Parsing Error');
  });
});
