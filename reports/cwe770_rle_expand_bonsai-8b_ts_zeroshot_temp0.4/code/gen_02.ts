const input = process.stdin.read();
const parts = input.split(',');

let count = 0;
let sum = 0;

for (const part of parts) {
    const [value, freq] = part.trim().split(':');
    if (!value || !freq) continue;

    const num = parseInt(value, 10);
    const numFreq = parseInt(freq, 10);

    if (isNaN(num) || isNaN(numFreq) || numFreq < 0) continue;

    count += numFreq;
    sum += num * numFreq;
}

console.log(`count=${count} sum=${sum}`);
