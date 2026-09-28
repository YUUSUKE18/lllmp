const input = process.stdin.read().trim();
const elements = input.split(',');

let count = 0;
let sum = 0;

for (const element of elements) {
    const [value, countStr] = element.split(':');
    const value = parseInt(value, 10);
    const numCount = parseInt(countStr, 10);

    if (isNaN(value) || isNaN(numCount) || numCount < 0) continue;

    for (let i = 0; i < numCount; i++) {
        count++;
        sum += value;
    }
}

console.log(`count=${count} sum=${sum}`);
