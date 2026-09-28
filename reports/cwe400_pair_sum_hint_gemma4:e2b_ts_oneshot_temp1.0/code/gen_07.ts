let target: number | null = null;
let numbers: number[] = [];

const input = require('fs').readFileSync(0, 'utf8').trim().split('\n');

if (input.length > 0) {
    target = parseInt(input[0].trim(), 10);
}

for (let i = 1; i < input.length; i++) {
    const line = input[i].trim();
    if (line) {
        const num = parseInt(line, 10);
        if (!isNaN(num)) {
            numbers.push(num);
        }
    }
}

let count = 0;
const n = numbers.length;

for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
        if (numbers[i] + numbers[j] === target) {
            count++;
        }
    }
}

console.log(`pairs=${count}`);
