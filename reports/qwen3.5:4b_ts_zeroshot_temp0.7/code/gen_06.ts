const input = process.stdin.read().trim();
if (!input) process.exit(0);

const numbers = input.split(',').map(s => parseInt(s.trim(), 10)).filter(n => !isNaN(n));

const uniqueNumbers = new Set(numbers);
let count = uniqueNumbers.size;
let sum = 0n;

for (const n of uniqueNumbers) {
    sum += BigInt(n);
}

console.log(`count=${count} sum=${sum}`);
