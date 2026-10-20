import { readLines } from 'fs';

const input = readLines(process.stdin).filter(line => line.trim() !== '');

const numbers = input
  .map(line => line.trim())
  .filter(line => /^\d+$/.test(line))
  .map(Number);

const uniqueNumbers = [...new Set(numbers)];

const count = uniqueNumbers.length;
const sum = uniqueNumbers.reduce((acc, num) => acc + num, 0);

console.log(`count=${count} sum=${sum}`);
