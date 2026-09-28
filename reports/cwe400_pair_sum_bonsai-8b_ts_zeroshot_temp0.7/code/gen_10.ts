const numbers = [];
const input = process.stdin.read().split('\n');

for (let i = 1; i < input.length; i++) {
    const line = input[i].trim();
    if (!line) continue;
    const num = parseInt(line, 10);
    if (!isNaN(num)) {
        numbers.push(num);
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

const count = pairs.length;
console.log(`pairs=${count}`);
