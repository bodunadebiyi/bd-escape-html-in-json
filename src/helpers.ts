export const isObject = (input: any): boolean => {
  return typeof input === 'object' && input !== null;
};

export const replaceCharacter = (character: string): string => {
  switch (character) {
    case '"':
      return '&quot;';
    case '&':
      return '&amp;';
    case "'":
      return '&#39;';
    case '<':
      return '&lt;';
    case '>':
      return '&gt;';
    default:
      return character;
  }
};
