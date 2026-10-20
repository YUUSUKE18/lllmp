import { stdin, stdout } from 'process';

const input = stdin.read().trim();
const numbers = input.split(',').filter(num => {
    const numStr = num.trim();
    if (!numStr || isNaN(numStr)) return false;
    return numStr.length <= 16 && numStr.length > 0;
}).map(num => parseInt(num, 10));

const uniqueNumbers = [...new Set(numbers)];
const count = uniqueNumbers.length;
const sum = uniqueNumbers.reduce((acc, num) => acc + num, 0);

stdout.write(`count=${count} sum=${sum}\n`);
