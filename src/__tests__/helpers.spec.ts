import { isObject, replaceCharacter } from '../helpers';

describe('isObject: Checks if input is a valid object', () => {
  it('returns true when input is an object', () => {
    expect(isObject({})).toEqual(true);
  });

  it('returns false when input is a string', () => {
    expect(isObject('')).toEqual(false);
  });

  it('returns false when input is null', () => {
    expect(isObject(null)).toEqual(false);
  });

  it('returns false when input is a number', () => {
    expect(isObject(10)).toEqual(false);
  });

  it('returns false when input is undefined', () => {
    expect(isObject(undefined)).toEqual(false);
  });

  it('returns false when input is a function', () => {
    expect(isObject(function () {})).toEqual(false);
  });
});

describe('replaceCharacter: replace html entities with its escaped version', () => {
  it('replaces the & character with &amp;', () => {
    expect(replaceCharacter('&')).toEqual('&amp;');
  });

  it('replaces the < character with &lt;', () => {
    expect(replaceCharacter('<')).toEqual('&lt;');
  });

  it('replaces the > character with &lt;', () => {
    expect(replaceCharacter('>')).toEqual('&gt;');
  });

  it("replaces the ' character with &#39;", () => {
    expect(replaceCharacter("'")).toEqual('&#39;');
  });

  it('replaces the " character with &quot;', () => {
    expect(replaceCharacter('"')).toEqual('&quot;');
  });
});
