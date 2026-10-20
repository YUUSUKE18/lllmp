import { readInteger, readUTF8 } from 'readable';

const input = readUTF8();
const numbers = input
  .split(',')
  .map(str => {
    const strTrim = str.trim();
    if (strTrim === '') return null;
    const result = readInteger(strTrim);
    if (result === null) return null;
    return result;
  })
  .filter(n => n !== null);

const uniqueNumbers = [...new Set(numbers)];
const count = uniqueNumbers.length;
const sum = uniqueNumbers.reduce((a, b) => a + b, 0);

console.log(`count=${count} sum=${sum}`);
