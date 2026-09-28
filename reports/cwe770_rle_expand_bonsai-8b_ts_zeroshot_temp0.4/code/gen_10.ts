const input = process.stdin.read().trim();
const elements = input.split(',').filter(e => e.trim() !== '');

let count = 0;
let sum = 0;

for (const element of elements) {
    const [value, num] = element.split(':').map(Number);
    if (isNaN(value) || isNaN(num)) continue;
    count += num;
    sum += value * num;
}

console.log(`count=${count} sum=${sum}`);
