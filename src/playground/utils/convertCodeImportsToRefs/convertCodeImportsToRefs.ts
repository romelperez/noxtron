const convertCodeImportsToRefs = (
  codeSrc: string
): { code: string; importsLines: string[] } => {
  const importsLines: string[] = [];
  const code = codeSrc
    .split(/\r?\n/)
    .map((line) => {
      if (/^\s*import\s/.test(line)) {
        importsLines.push(line.trim());
        return '__NOXTRON_DEAD_LINE__';
      }
      return line;
    })
    .filter((line) => line !== '__NOXTRON_DEAD_LINE__')
    .join('\n')
    .trim();
  return { code, importsLines };
};

export { convertCodeImportsToRefs };
