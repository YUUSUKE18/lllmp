const stdin = process.stdin;
const lines = stdin.readAllLines();

let target = 0;
let numbers = [];

for (const line of lines) {
    const stripped = line.trim();
    if (!stripped) continue;

    const numStr = stripped.match(/(-?\d+)$/);
    if (numStr) {
        const num = parseInt(numStr[0], 10);
        if (num !== 0) {
            numbers.push(num);
        }
    }
}

const pairs = [];

for (let i = 0; i < numbers.length; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
        if (numbers[i] + numbers[j] === target) {
            pairs.push([i, j]);
        }
    }
}

const count = pairs.length;

console.log(`pairs=${count}`);
