const lines = process.stdin.read().split('\n');
const numbers = [];

for (const line of lines) {
    if (line.trim() === '') continue;
    const numStr = line.trim();
    if (/^-?\d+$/g.test(numStr)) {
        numbers.push(parseInt(numStr, 10));
    }
}

const target = numbers[0];
const pairs = [];

for (let i = 0; i < numbers.length; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
        if (numbers[i] + numbers[j] === target) {
            pairs.push([i, j]);
        }
    }
}

console.log(`pairs=${pairs.length}`);
