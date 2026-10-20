const numbers = process.stdin.read().split(',').map(n => n.trim()).filter(n => /^\d+$/.test(n));
const uniqueNumbers = [...new Set(numbers.map(n => parseInt(n, 10)))];

const count = uniqueNumbers.length;
const sum = uniqueNumbers.reduce((acc, num) => acc + num, 0);

console.log(`count=${count} sum=${sum}`);
