export function parseXml(xmlString: string): Document {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlString.replace(/@/g, ''), 'text/xml');

  if (xmlDoc?.documentElement.nodeName === 'parsererror') {
    throw new Error('XML Parsing Error: Invalid XML structure.');
  } else {
    return xmlDoc;
  }
}
