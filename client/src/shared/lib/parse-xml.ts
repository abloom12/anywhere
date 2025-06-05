import { CustomError } from '../util/custom-error';

export function parseXml(xmlString: string): XMLDocument {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(
    xmlString.replace(/@/g, ''),
    'text/xml',
  ) as XMLDocument;

  if (xmlDoc?.documentElement.nodeName === 'parsererror') {
    throw new CustomError('xml', 'XML Parsing Error: Invalid XML structure.');
  } else {
    return xmlDoc;
  }
}
