import { Readable, ReadTextEvent, ReadText } from 'stream';

const input = Readable.from(process.stdin);

let numbers: number[] = [];
let count = 0;
let sum = 0;

input.on('readText', text => {
  const value = text.trim();
  if (value === '') return;

  const parsed = parseInt(value, 10);
  if (!isNaN(parsed)) {
    numbers.push(parsed);
    count++;
    sum += parsed;
  }
});

input.on('end', () => {
  const uniqueNumbers = [...new Set(numbers)];
  const uniqueCount = uniqueNumbers.length;
  const uniqueSum = uniqueNumbers.reduce((a, b) => a + b, 0);

  console.log(`count=${uniqueCount} sum=${uniqueSum}`);
});
