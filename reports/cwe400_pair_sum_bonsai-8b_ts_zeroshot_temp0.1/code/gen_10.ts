const numbers = [];
const lines = process.stdin.read().split('\n');

for (let line of lines) {
    const stripped = line.trim();
    if (!stripped) continue;
    const numStr = stripped.match(/\d+/, [0, 1]);
    if (numStr && !isNaN(numStr[0])) {
        numbers.push(parseInt(numStr[0], 10));
    }
}

const target = numbers[0] || 0;
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
