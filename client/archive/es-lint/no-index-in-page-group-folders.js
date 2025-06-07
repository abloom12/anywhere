// eslint-plugin-custom-rules/no-index-in-page-group-folders.js

export const meta = {
  type: 'problem',
  docs: {
    description:
      'Disallow index.ts files inside grouping folders like (site)',
  },
  schema: [], // no options
};

export function create(context) {
  const filename = context.getFilename();

  // Normalize path for OS
  const parts = filename.split(/[\\/]/); // works for Windows and POSIX

  const fileName = parts[parts.length - 1];
  const folderName = parts[parts.length - 2];

  const isGroupingFolder = /^\(.*\)$/.test(folderName);
  const isIndexFile = fileName === 'index.ts';

  if (isGroupingFolder && isIndexFile) {
    context.report({
      loc: { line: 1, column: 0 },
      message: `Do not place 'index.ts' inside grouping folder '${folderName}' — this may conflict with root routes.`,
    });
  }

  return {};
}
