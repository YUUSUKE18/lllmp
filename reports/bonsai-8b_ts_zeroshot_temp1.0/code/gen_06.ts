import { stdin, stdout } from 'process';

const input = stdin.read().trim();
const numbers = input.split(',').map(num => num.trim()).filter(num => !isNaN(num));

const uniqueNumbers = [...new Set(numbers.map(num => parseInt(num, 10)))];

const count = uniqueNumbers.length;
const sum = uniqueNumbers.reduce((acc, num) => acc + num, 0);

stdout.write(`count=${count} sum=${sum}\n`);
