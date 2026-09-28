const numbers = [];
const inputLines = process.stdin.read().split('\n');

for (let line of inputLines) {
    const trimmedLine = line.trim();
    if (!trimmedLine) continue;
    const value = parseInt(trimmedLine, 10);
    if (!isNaN(value)) {
        numbers.push(value);
    }
}

const total = numbers.reduce((sum, num) => sum + num, 0);
const count = 0;

for (let i = 0; i < numbers.length; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
        if (numbers[i] + numbers[j] === total) {
            count++;
        }
    }
}

console.log(`pairs=${count}`);
