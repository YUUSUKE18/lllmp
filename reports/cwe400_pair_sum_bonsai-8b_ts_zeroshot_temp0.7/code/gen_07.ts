const numbers = [];
const lines = process.stdin.read().split('\n');

for (let line of lines) {
    if (line.trim() === '') continue;
    const value = parseInt(line, 10);
    if (!isNaN(value)) numbers.push(value);
}

const target = numbers[0];
const validPairs = [];

for (let i = 0; i < numbers.length; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
        if (numbers[i] + numbers[j] === target) {
            validPairs.push([i, j]);
        }
    }
}

console.log(`pairs=${validPairs.length}`);
