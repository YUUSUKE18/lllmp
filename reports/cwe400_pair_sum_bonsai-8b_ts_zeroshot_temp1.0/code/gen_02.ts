const input = process.stdin.read().trim().split('\n');
let numbers: number[] = [];

for (let line of input) {
    if (line === '') continue;
    const parts = line.split(/\s+/);
    if (parts.length < 1) continue;
    const value = parseInt(parts[0], 10);
    if (!isNaN(value)) {
        numbers.push(value);
    }
}

const target = numbers.length === 0 ? 0 : numbers[0];
const result = [];

for (let i = 0; i < numbers.length; i++) {
    const num = numbers[i];
    if (num === target) continue;
    for (let j = i + 1; j < numbers.length; j++) {
        const otherNum = numbers[j];
        if (num + otherNum === target) {
            result.push([i, j]);
        }
    }
}

result = result.filter(pair => pair[0] < pair[1]).map(pair => `${pair[0]} ${pair[1]}`).join(', ');

console.log(`pairs=${result}`);
