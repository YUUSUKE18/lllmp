const numbers = [];
const input = process.stdin.read().split('\n');

for (let line of input) {
    const stripped = line.trim();
    if (!stripped) continue;
    const numStr = stripped.match(/\d+/, [0, 1]);
    if (numStr && !isNaN(numStr[0])) {
        numbers.push(parseInt(numStr[0], 10));
    }
}

const target = numbers[0];
const pairs = [];

for (let i = 1; i < numbers.length; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
        if (numbers[i] + numbers[j] === target) {
            pairs.push([i, j]);
        }
    }
}

console.log(`pairs=${pairs.length}`);
