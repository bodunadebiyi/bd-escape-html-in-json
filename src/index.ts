import { replaceCharacter, isObject } from './helpers';

export const escapeHTMLString = (unescapedString: string) => {
  const matchHtmlRegExp = /["'&<>]/g;
  const replacerFunction = (match: string, ..._: any): string => replaceCharacter(match);
  return unescapedString.replace(matchHtmlRegExp, replacerFunction);
};

export const escapeObject = <T>(unEscapedObject: T[] | T, fieldsToExempt: string[]=[]): T[] | T => {
  if (Array.isArray(unEscapedObject)) {
    unEscapedObject.forEach((item) => escapeObject(item, fieldsToExempt));
  } else if (isObject(unEscapedObject)) {
    for (const [key, value] of Object.entries(unEscapedObject)) {
      if (!fieldsToExempt.includes(key) && isObject(value)) {
        escapeObject(value, fieldsToExempt);
      } else if (typeof value === 'string') {
        (unEscapedObject as any)[key] = escapeHTMLString(value);
      }
    }
  }

  return unEscapedObject;
};

export default escapeObject;
