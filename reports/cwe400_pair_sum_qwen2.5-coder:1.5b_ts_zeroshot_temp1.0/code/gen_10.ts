import { readFileSync } from 'fs';

const [targetValue, ...numbers] = readFileSync(process.stdin, 'utf8').split('\n');

const count = numbers.filter((_, index) => numbers.indexOf(targetValue - numbers[index], index + 1) !== -1).length;

console.log(`pairs=${count}`);
