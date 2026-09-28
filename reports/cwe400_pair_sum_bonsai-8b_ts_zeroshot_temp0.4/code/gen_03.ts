const lines = process.stdin.read().split('\n');
let numbers = [];

for (let line of lines) {
    if (line.trim() === '') continue;
    const value = parseInt(line, 10);
    if (!isNaN(value)) numbers.push(value);
}

const total = numbers.reduce((a, b) => a + b, 0);
const pairs = [];

for (let i = 0; i < numbers.length; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
        if (numbers[i] + numbers[j] === total) {
            pairs.push([i, j]);
        }
    }
}

console.log(`pairs=${pairs.length}`);
