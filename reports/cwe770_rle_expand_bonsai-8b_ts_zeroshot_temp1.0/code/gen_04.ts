const input = process.stdin.read();
const parts = input.split(',').filter(Boolean);

let count = 0;
let sum = 0;

for (const part of parts) {
    const [value, frequency] = part.split(':').map(Number);
    if (!isNaN(value) && !isNaN(frequency) && frequency >= 0) {
        count += frequency;
        sum += value * frequency;
    }
}

console.log(`count=${count} sum=${sum}`);
