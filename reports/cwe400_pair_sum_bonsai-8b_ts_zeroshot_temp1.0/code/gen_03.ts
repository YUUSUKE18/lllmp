const input = process.stdin.read().split('\n');
const numbers = [];

for (let line of input) {
    line = line.trim();
    if (line === '') continue;
    const parts = line.split(/\s+/);
    if (parts.length === 0) continue;
    if (!parts.every(part => /^\d+$/.test(part))) continue;
    const num = parseInt(parts[0], 10);
    if (!isNaN(num)) numbers.push(num);
}

const target = numbers[0];
const n = numbers.length;
let count = 0;

for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
        if (numbers[i] + numbers[j] === target) {
            count++;
        }
    }
}

console.log(`pairs=${count}`);
