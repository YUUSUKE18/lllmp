const input = process.stdin.read();
const parts = input.trim().split(/,+/);

let count = 0;
let sum = 0;

for (const part of parts) {
    const [value, freq] = part.split(':');
    const num = parseInt(value, 10);
    const numFreq = parseInt(freq, 10);

    if (isNaN(num) || isNaN(numFreq) || numFreq < 0) continue;

    count += num;
    sum += num * numFreq;
}

console.log(`count=${count} sum=${sum}`);
