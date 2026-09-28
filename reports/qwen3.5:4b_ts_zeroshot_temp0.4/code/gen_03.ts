const input = process.stdin.read().trim();
if (!input) {
    console.log(`count=0 sum=0`);
    return;
}

const parts = input.split(',').map(s => s.trim()).filter(s => s !== '');
const numbers: number[] = [];

for (const part of parts) {
    const num = parseInt(part, 10);
    if (!isNaN(num)) {
        numbers.push(num);
    }
}

const uniqueNumbers = [...new Set(numbers)];
const count = uniqueNumbers.length;
const sum = uniqueNumbers.reduce((a, b) => a + b, 0);

console.log(`count=${count} sum=${sum}`);
